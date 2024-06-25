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

const theme = createTheme({
  palette: {
    primary: {
      main: "#00a47e", // Replace with your preferred color
    },
  },
});

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
  const [rows, setRows] = useState([]);

  const router = useRouter();

  useEffect(() => {
    handleLoadProductList();
  }, []);

  const handleLoadProductList = async () => {
    api
      .get(`Invoices/${window.sessionStorage.getItem("userID")}`, {
        headers: {
          Authorization: `Bearer ${
            typeof window !== "undefined" ? sessionStorage.getItem("token") : ""
          }`,
        },
      })
      .then((res) => {
        setRows(res.data);
      })
      .catch((e) => {
        console.log(e);
        sessionStorage.clear();
        router.push("/login");
      });
  };

  const columns: GridColDef<(typeof rows)[number]>[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "date",
      headerName: "Date",
      width: 150,
    },
    {
      field: "status",
      headerName: "Status",
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
    <Suspense>
      <ThemeProvider theme={theme}>
        <div className={styles.login}>
          <Container maxWidth="lg">
            <Box sx={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={rows}
                columns={columns}
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
            </Box>
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
    </Suspense>
  );
};

export default History;
