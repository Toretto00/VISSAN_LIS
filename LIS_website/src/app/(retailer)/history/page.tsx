"use client";

import { useEffect, useState, Suspense } from "react";

import { useSearchParams, usePathname, useRouter } from "next/navigation";

// import "@/app/globals.module.css";
import styles from "./history.module.scss";

import api from "@/app/api/client";

import {
  Container,
  Box,
  Alert,
  createTheme,
  ThemeProvider,
} from "@mui/material";

import dayjs, { Dayjs } from "dayjs";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { DataGrid, GridColDef, GridEventListener } from "@mui/x-data-grid";

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

const History = () => {
  const [display, setDisplay] = useState("none");

  const [manufactureDate, setManufactureDate] = useState<Dayjs | null>(
    dayjs.utc()
  );
  const [invoice, setInvoice] = useState([]);

  const router = useRouter();

  useEffect(() => {
    handleLoadInvoice();
  }, []);

  const handleLoadInvoice = async () => {
    api
      .get(`Invoices/${window.sessionStorage.getItem("userID")}`, {
        headers: {
          Authorization: `Bearer ${
            typeof window !== "undefined" ? sessionStorage.getItem("token") : ""
          }`,
        },
      })
      .then((res) => {
        setInvoice(res.data);
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

  const searchParams = useSearchParams();

  const handleRowClick: GridEventListener<"rowClick"> = (param) => {
    const params = new URLSearchParams(searchParams);
    params.set("listings_id", param.id.toString());
    router.push(`/history/${param.id}?${params.toString()}`);
  };

  return (
    <Container maxWidth="lg">
      <Box></Box>
      <DataGrid
        rows={invoice}
        columns={invoiceColumns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        onRowClick={handleRowClick}
      />
    </Container>
  );
};

export default History;
