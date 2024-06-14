"use client";

import React, { useEffect, useState, useCallback } from "react";

import { useRouter } from "next/navigation";

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
} from "@mui/material";

import dayjs, { Dayjs } from "dayjs";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import Header from "@/components/header/header";
import { ok } from "assert";

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

dayjs.extend(utc);
dayjs.extend(timezone);

const RequestForm = () => {
  const [loading, setLoading] = useState(false);
  const [display, setDisplay] = useState("none");
  const [productList, setProductList] = useState<product[]>([]);
  const [productSelected, setProductSelected] = useState<product | null>();
  const [unit, setUnit] = useState("Kg");

  const [productName, setProductName] = useState("");
  const [manufactureDate, setManufactureDate] = useState<Dayjs | null>(
    dayjs.utc()
  );
  const [quantity, setQuantity] = useState("");
  const [rows, setRows] = useState<row[]>([]);

  const router = useRouter();

  useEffect(() => {
    handleLoadProductList();
  }, []);

  const handleLoadProductList = async () => {
    api
      .get("Products")
      .then((res: any) => {
        setProductList(res.data);
      })
      .catch((e) => console.log(e));
  };

  const resetValue = () => {
    setProductName("");
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
    const newRow = {
      id: rows.length + 1,
      name: productSelected,
      unit: unit,
      quantity: +quantity,
      rowManufactureDate: manufactureDate?.format("DD/MM/YYYY").toString(),
    };
    const newRows = [...rows];
    newRows.push(newRow);
    setRows(newRows);
    resetValue();
  };

  const handleSendRequest = () => {
    api
      .post("Invoices", {
        date: dayjs.utc(),
        status: "pending",
        user: window?.localStorage?.getItem("userID"),
        created: dayjs.utc(),
        updated: dayjs.utc(),
      })
      .then((res) => {
        if (res.status === 201) {
          rows.forEach((element) => {
            api.post("Invoice_Product", {
              product: element.name?.id,
              invoice: +res.data.id,
              quantity: +quantity,
              created: manufactureDate?.toString(),
              updated: manufactureDate?.toString(),
            });
          });
        }
      })
      .catch((e) => console.log(e));
    setRows([]);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className={styles.login}>
        {/* <Header /> */}
        <Container maxWidth="lg">
          <Box className={styles.form}>
            <Autocomplete
              sx={{ width: 300 }}
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
            <TextField
              required
              type="number"
              label="Số lượng"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className={styles.formChild}
            />
            <TextField
              disabled
              label="KG"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className={styles.formChild}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  timezone="Asia/Ho_Chi_Minh"
                  format="DD/MM/YYYY"
                  label="Ngày sản xuất"
                  value={manufactureDate}
                  onChange={setManufactureDate}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Box>
          <Button variant="contained" onClick={() => handleAddSample()}>
            Thêm
          </Button>

          <FullFeaturedCrudGrid Row={rows} />

          <Button
            fullWidth
            variant="contained"
            className="btn--submit"
            type="submit"
            onClick={(e) => {
              handleSendRequest();
            }}
          >
            Send
          </Button>
          <Alert
            severity="warning"
            sx={{ display: display }}
            onClose={() => {
              setDisplay("none");
            }}
          >
            Vui lòng nhập đầy đủ thông tin!
          </Alert>
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default RequestForm;
