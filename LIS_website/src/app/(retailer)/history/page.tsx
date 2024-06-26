"use client";

import { useEffect, useState, Suspense } from "react";

import { useSearchParams, usePathname, useRouter } from "next/navigation";

// import "@/app/globals.module.css";
import Styles from "./history.module.scss";

import api from "@/app/api/client";

import { Container, Box, Grid, Button, Typography } from "@mui/material";

import dayjs, { Dayjs } from "dayjs";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { DataGrid, GridColDef, GridEventListener } from "@mui/x-data-grid";

import FilterAltIcon from "@mui/icons-material/FilterAlt";

interface product {
  id: number;
  category: number;
  name: string;
  code: string;
  description: string;
  created: string;
  updated: string;
  no: 1;
}

interface row {
  id: number;
  name: product | undefined;
  quantity: string;
  unit: string;
  rowManufactureDate: any;
}

dayjs.extend(utc);
dayjs.extend(timezone);

interface button {
  id: number;
  name: string;
}

let button: button[] = [
  { id: 1, name: "Đặt hàng" },
  { id: 2, name: "Tồn kho" },
];

const History = () => {
  const [manufactureDate, setManufactureDate] = useState<Dayjs | null>(
    dayjs.utc()
  );
  const [invoice, setInvoice] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [btnFocus, setBtnFocus] = useState(1);

  const [from, setFrom] = useState<Dayjs | null>();
  const [to, setTo] = useState<Dayjs | null>();

  const router = useRouter();

  useEffect(() => {
    handleLoadInvoice();
    handleLoadInventory();
  }, []);

  const handleLoadInvoice = async () => {
    api
      .get(
        `Invoices/StoreInvoices?userid=${window.sessionStorage.getItem(
          "userID"
        )}&${
          from !== undefined
            ? "from=" + from?.format("DD/MM/YYYY").toString()
            : ""
        }&${
          to !== undefined ? "to=" + to?.format("DD/MM/YYYY").toString() : ""
        }`,
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
        setInvoice(res.data);
      })
      .catch((e) => {
        console.log(e);
        sessionStorage.clear();
        router.push("/login");
      });
  };

  const handleLoadInventory = () => {
    api
      .get(
        `Inventories/StoreInventories?storeid=${window.sessionStorage.getItem(
          "store"
        )}&${
          from !== undefined
            ? "from=" + from?.format("DD/MM/YYYY").toString()
            : ""
        }&${
          to !== undefined ? "to=" + to?.format("DD/MM/YYYY").toString() : ""
        }`,
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
        setInventory(res.data);
      })
      .catch((e) => {
        console.log(e);
        sessionStorage.clear();
        router.push("/login");
      });
  };

  const invoiceColumns: GridColDef<[number]>[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "date",
      headerName: "Ngày đặt hàng",
      width: 150,
    },
    {
      field: "status",
      headerName: "Trạng thái đơn hàng",
      width: 150,
    },
  ];

  const inventoryColumns: GridColDef<[number]>[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "created",
      headerName: "Ngày báo tồn",
      width: 150,
    },
    {
      field: "updated",
      headerName: "Ngày cập nhật",
      width: 150,
    },
  ];

  const searchParams = useSearchParams();

  const handleRowClick: GridEventListener<"rowClick"> = (param) => {
    const params = new URLSearchParams(searchParams);
    if (btnFocus === 1) params.set("type", "invoice");
    else params.set("type", "inventory");
    params.set("id", param.id.toString());
    router.push(`/history/${param.id}?${params.toString()}`);
  };

  const handleChangeTab = (id: number) => {
    setBtnFocus(id);
  };

  return (
    <div style={{ backgroundColor: "white", minHeight: "100vh" }}>
      <Container maxWidth="lg" sx={{ pt: "94px" }}>
        <Grid container spacing={2} sx={{ justifyContent: "right" }}>
          <Grid item lg={3}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  timezone="Asia/Ho_Chi_Minh"
                  format="DD/MM/YYYY"
                  label="Từ ngày"
                  value={from}
                  onChange={setFrom}
                  sx={{ width: "100%" }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>
          <Grid item lg={3}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  timezone="Asia/Ho_Chi_Minh"
                  format="DD/MM/YYYY"
                  label="Đến ngày"
                  value={to}
                  onChange={setTo}
                  sx={{ width: "100%" }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>
          <Grid item lg={3}>
            <Button
              variant="contained"
              fullWidth
              sx={{ height: "100%" }}
              onClick={btnFocus === 1 ? handleLoadInvoice : handleLoadInventory}
            >
              <FilterAltIcon /> Lọc
            </Button>
          </Grid>
        </Grid>
        <Grid
          container
          sx={{
            mt: "16px",
            height: "64px",
          }}
        >
          {button.map((btn, index) => (
            <Grid key={index} item lg={3}>
              <Button
                fullWidth
                variant="contained"
                className={btn.id === btnFocus ? Styles.btnFocus : Styles.btn}
                onClick={(e) => handleChangeTab(btn.id)}
              >
                {btn.name}
              </Button>
            </Grid>
          ))}
        </Grid>
        <DataGrid
          rows={btnFocus === 1 ? invoice : inventory}
          columns={btnFocus === 1 ? invoiceColumns : inventoryColumns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5, 10, 25]}
          checkboxSelection
          disableRowSelectionOnClick
          onRowClick={handleRowClick}
        />
      </Container>
    </div>
  );
};

export default History;
