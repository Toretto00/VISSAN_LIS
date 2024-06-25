"use client";

import React, { useEffect, useState, useCallback } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import api from "@/app/api/client";

// import "@/app/globals.module.css";
import styles from "./requestForm.module.scss";

import FullFeaturedCrudGrid from "@/components/requestDataGrid/page";

import {
  TextField,
  Button,
  Container,
  Box,
  Typography,
  Checkbox,
  FormGroup,
  FormLabel,
  FormControl,
  FormControlLabel,
  Alert,
  createTheme,
  ThemeProvider,
  Autocomplete,
  Grid,
} from "@mui/material";

import dayjs, { Dayjs } from "dayjs";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { GridRowId } from "@mui/x-data-grid";

import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import Header from "@/components/header/header";

import AddIcon from "@mui/icons-material/Add";
import SendIcon from "@mui/icons-material/Send";

const theme = createTheme({
  palette: {
    primary: {
      main: "#00a47e", // Replace with your preferred color
    },
  },
});

interface category {
  id: number;
  name: string;
  code: string;
}

interface product {
  id: number;
  category: category;
  name: string;
  code: string;
  description: string;
  created: string;
  updated: string;
}

interface row {
  id: number;
  name: product | undefined;
  quantity: number;
  unit: string;
  rowManufactureDate: any;
}

interface Inventory {
  id: number;
  location: {
    id: number;
    warehouseid: string;
    storeid: string;
    retailname: string;
    retailsystem: string;
    shortname: string;
  };
  product: {
    id: number;
    category: {
      id: number;
      name: string;
      code: string;
    };
    name: string;
    code: string;
    description: string;
    created: string;
    updated: string;
  };
  quantity: number;
  created: string;
  updated: string;
}

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.guess();

const RequestForm = () => {
  const [display, setDisplay] = useState("none");
  const [productList, setProductList] = useState<product[]>([]);
  const [productSelected, setProductSelected] = useState<product | null>();
  const [unit, setUnit] = useState("Kg");

  const [productName, setProductName] = useState("");
  const [manufactureDate, setManufactureDate] = useState<Dayjs | null>(
    dayjs.utc()
  );
  const [quantity, setQuantity] = useState("");

  const [requestType, setRequestType] = useState("");

  const [inventory, setInventory] = useState<row[]>([]);
  const [invoice, setInvoice] = useState<row[]>([]);

  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("requestType");

  useEffect(() => {
    if (search) setRequestType(search);
  }, [search]);

  useEffect(() => {
    handleLoadProductList();
  }, []);

  const handleLoadProductList = async () => {
    api
      .get("Products", {
        headers: {
          Authorization: `Bearer ${
            typeof window !== "undefined" ? sessionStorage.getItem("token") : ""
          }`,
        },
      })
      .then((res: any) => {
        setProductList(res.data);
      })
      .catch((e) => console.log(e));
  };

  const resetValue = () => {
    // setProductName("");
    setManufactureDate(dayjs());
    setQuantity("");
  };

  const handleAddSample = () => {
    if (productSelected === null) {
      setDisplay("flex");
      return;
    }
    if (manufactureDate === null) {
      setDisplay("flex");
      return;
    }
    if (quantity === "") {
      setDisplay("flex");
      return;
    }
    console.log(invoice);
    let count = 0;
    if (requestType === "1") {
      let newRows = [...invoice];
      newRows.forEach((element) => {
        if (element.name?.code == productSelected?.code) {
          element.quantity += parseInt(quantity);
          count++;
        }
      });
      if (count === 0) {
        let newRow = {
          id: invoice.length + 1,
          name: productSelected,
          unit: unit,
          quantity: +quantity,
          rowManufactureDate: manufactureDate?.format("DD/MM/YYYY").toString(),
        };
        newRows.push(newRow);
      }
      setInvoice(newRows);
      resetValue();
      return;
    } else if (requestType === "2") {
      let newRows = [...inventory];
      newRows.forEach((element) => {
        if (element.name?.code == productSelected?.code) {
          element.quantity += parseInt(quantity);
          count++;
        }
      });
      if (count === 0) {
        let newRow = {
          id: inventory.length + 1,
          name: productSelected,
          unit: unit,
          quantity: +quantity,
          rowManufactureDate: manufactureDate?.format("DD/MM/YYYY").toString(),
        };
        newRows.push(newRow);
      }
      setInventory(newRows);
      resetValue();
      return;
    }
  };

  const handleSendRequest = () => {
    api
      .post(
        "Invoices",
        {
          date: dayjs().format("DD/MM/YYYY").toString(),
          status: "pending",
          user:
            typeof window !== "undefined"
              ? sessionStorage.getItem("userID")
              : 1,
          created: dayjs().format("DD/MM/YYYY").toString(),
          updated: dayjs().format("DD/MM/YYYY").toString(),
        },
        {
          headers: {
            Authorization: `Bearer ${
              typeof window !== "undefined"
                ? sessionStorage.getItem("token")
                : ""
            }`,
          },
        }
      )
      .then((res) => {
        if (res.status === 201) {
          invoice.forEach((element) => {
            api.post(
              "Invoice_Product",
              {
                product: element.name?.id,
                invoice: +res.data.id,
                quantity: +quantity,
                created: manufactureDate?.toString(),
                updated: manufactureDate?.toString(),
              },
              {
                headers: {
                  Authorization: `Bearer ${
                    typeof window !== "undefined"
                      ? sessionStorage.getItem("token")
                      : ""
                  }`,
                },
              }
            );
          });
        }
      })
      .catch((e) => console.log(e));
    setInvoice([]);
  };

  const handleCreateInventory = () => {
    let newInventory: any[] = [];
    if (typeof window !== "undefined") {
      inventory.forEach((element) => {
        newInventory.push({
          product: {
            code: element?.name?.code,
          },
          quantity: element?.quantity,
          created: manufactureDate?.format("DD/MM/YYYY").toString(),
          updated: manufactureDate?.format("DD/MM/YYYY").toString(),
        });
      });
      api
        .post(
          `Inventories?location=${sessionStorage.getItem("store")}`,
          newInventory,
          {
            headers: {
              Authorization: `Bearer ${
                typeof window !== "undefined"
                  ? sessionStorage.getItem("token")
                  : ""
              }`,
            },
          }
        )
        .catch((e) => {
          console.log(e);
          sessionStorage.clear();
          router.push("/login");
        });
      setInventory([]);
    }
  };

  const handleDeleteItem = (id: any, requestType: string) => {
    if (requestType === "1") {
      if (typeof id !== "number") {
        setInvoice([]);
        return;
      }
      const newRows = invoice.slice(id, 1);
      // newRows.map((row, index) => {
      //   row["id"] = index + 1;
      // });
      setInvoice(newRows);
    } else {
      if (typeof id !== "number") {
        setInventory([]);
        return;
      }
      const newRows = inventory.slice(id, 1);
      // newRows.map((row, index) => {
      //   row["id"] = index + 1;
      // });
      setInventory(newRows);
    }
  };

  return (
    <div className={styles.container}>
      {/* <Header /> */}
      <Container maxWidth="lg">
        <Grid container spacing={2} sx={{ mb: "16px" }}>
          <Grid item lg={3} md={4} xs={12}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  timezone="Asia/Ho_Chi_Minh"
                  format="DD/MM/YYYY"
                  label="Ngày sản xuất"
                  value={manufactureDate}
                  onChange={setManufactureDate}
                  sx={{ width: "100%" }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item lg={3} md={4} xs={6}>
            <Autocomplete
              options={productList}
              onChange={(event, value) => setProductSelected(value)}
              autoHighlight
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Tên sản phẩm"
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "new-password", // disable autocomplete and autofill
                  }}
                />
              )}
            />
          </Grid>
          <Grid item lg={3} md={4} xs={3}>
            <TextField
              required
              fullWidth
              type="number"
              label="Số lượng"
              value={quantity}
              onChange={(e) => {
                setQuantity(e.target.value);
              }}
              className={styles.formChild}
            />
          </Grid>
          <Grid item lg={3} md={4} xs={3}>
            <TextField
              disabled
              fullWidth
              label="KG"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className={styles.formChild}
            />
          </Grid>
          <Grid item lg={3} md={6} xs={12}>
            <Button
              variant="contained"
              fullWidth
              onClick={() => handleAddSample()}
              sx={{ height: "100%" }}
            >
              <AddIcon sx={{ mr: "6px" }} />
              Thêm
            </Button>
          </Grid>
        </Grid>

        <FullFeaturedCrudGrid
          Row={requestType === "1" ? invoice : inventory}
          requestType={requestType}
          handleDeleteItem={handleDeleteItem}
        />

        <Button
          fullWidth
          variant="contained"
          type="submit"
          onClick={(e) => {
            requestType === "1" ? handleSendRequest() : handleCreateInventory();
          }}
        >
          <SendIcon sx={{ mr: "6px" }} />
          {requestType === "1" ? "Gửi yêu cầu đặt hàng" : "Gửi báo cáo tồn kho"}
        </Button>
        {/* <Alert
          severity="warning"
          sx={{ display: display }}
          onClose={() => {
            setDisplay("none");
          }}
        >
          Vui lòng nhập đầy đủ thông tin!
        </Alert> */}
      </Container>
    </div>
  );
};

export default RequestForm;
