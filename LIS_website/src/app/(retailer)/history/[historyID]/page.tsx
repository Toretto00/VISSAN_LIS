"use client";

import React, { useEffect, useState } from "react";

import { useSearchParams, usePathname, useRouter } from "next/navigation";

import api from "@/app/api/client";

import FullFeaturedCrudGrid from "@/components/requestDataGrid/page";

import { Container, Box, createTheme, ThemeProvider } from "@mui/material";

import dayjs, { Dayjs } from "dayjs";

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
  id: 2;
  category: null;
  name: string;
  code: string;
  description: null;
  created: string;
  updated: string;
}

interface invoice {
  id: number;
  date: string;
  status: string;
  user: null;
  created: string;
  updated: string;
}

interface row {
  id: 2;
  product: product;
  invoice: invoice;
  quantity: 0;
  created: string;
  updated: string;
}

dayjs.extend(utc);
dayjs.extend(timezone);

const HistoryDetail = ({ params }: { params: { invoice: string } }) => {
  const [loading, setLoading] = useState(false);
  const [productSelected, setProductSelected] = useState<product | null>();
  const [unit, setUnit] = useState("Kg");
  const [rows, setRows] = useState<row[]>([]);

  const router = useRouter();

  const searchParams = useSearchParams();
  const search = searchParams.get("listings_id");

  useEffect(() => {
    handleLoadProductList();
  }, []);

  const handleLoadProductList = async () => {
    api.get(`Invoice_Product/${search}`).then((res: any) => {
      setRows(res.data);
      console.log(res.data);
    });
  };

  const columns: GridColDef<(typeof rows)[number]>[] = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "product.code",
      headerName: "Mã sản phẩm",
      valueGetter: (value, row) => {
        return `${row.product.code}`;
      },
      width: 320,
      editable: true,
    },
    {
      field: "product.name",
      headerName: "Tên sản phẩm",
      valueGetter: (value, row) => {
        return `${row.product.name}`;
      },
      width: 320,
      editable: true,
    },
    {
      field: "quantity",
      headerName: "Số lượng",
      width: 180,
      editable: true,
    },
    {
      field: "unit",
      headerName: "Đơn vị",
      width: 180,
      editable: true,
    },
    {
      field: "created",
      headerName: "Ngày sản xuất",
      width: 240,
      editable: true,
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <div style={{ marginTop: "120px" }}>
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
            />
          </Box>
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default HistoryDetail;
