"use client";

import React, { useEffect, useState, useCallback } from "react";

import { useRouter } from "next/navigation";

import "../globals.css";
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
} from "@mui/material";

import dayjs, { Dayjs } from "dayjs";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { DataGrid, GridColDef } from "@mui/x-data-grid";

import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

const theme = createTheme({
  palette: {
    primary: {
      main: "#00a47e", // Replace with your preferred color
    },
  },
});

const types: { id: number; name: string; checked: boolean }[] = [
  { id: 1, name: "Xúc Xích", checked: false },
  { id: 2, name: "Thịt nguội các loại", checked: false },
  { id: 3, name: "Đồ hộp, hạt nêm", checked: false },
  { id: 4, name: "Lạp xưởng", checked: false },
  { id: 5, name: "Thịt tẩm ướp các loại", checked: false },
  { id: 6, name: "Hàng chế biến khô", checked: false },
  { id: 7, name: "Hàng chế biến đông lạnh", checked: false },
];

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Tên mẫu", editable: true, width: 300 },
  {
    field: "rowManufactureDate",
    headerName: "Ngày sản xuất",
    editable: true,
    width: 240,
  },
  {
    field: "quantity",
    headerName: "Số lượng",
    editable: true,
    width: 90,
  },
];

const row: {
  id: number;
  name: string;
  rowManufactureDate: any;
  quantity: string;
}[] = [
  { id: 1, name: "Snow", rowManufactureDate: "Jon", quantity: "35" },
  { id: 2, name: "Lannister", rowManufactureDate: "Cersei", quantity: "42" },
  { id: 3, name: "Lannister", rowManufactureDate: "Jaime", quantity: "45" },
  { id: 4, name: "Stark", rowManufactureDate: "Arya", quantity: "16" },
  { id: 5, name: "Targaryen", rowManufactureDate: "Daenerys", quantity: "16" },
  {
    id: 6,
    name: "Melisandre",
    rowManufactureDate: "Daenerys",
    quantity: "150",
  },
  { id: 7, name: "Clifford", rowManufactureDate: "Ferrara", quantity: "44" },
  { id: 8, name: "Frances", rowManufactureDate: "Rossini", quantity: "36" },
  { id: 9, name: "Roxie", rowManufactureDate: "Harvey", quantity: "65" },
];

dayjs.extend(utc);
dayjs.extend(timezone);

const RequestForm = () => {
  const [loading, setLoading] = useState(false);
  const [display, setDisplay] = useState("none");

  const [productTypesChecked, setProductTypesChecked] = useState(types);
  const [productName, setProductName] = useState("");
  const [manufactureDate, setManufactureDate] = useState<Dayjs | null>(
    dayjs.utc()
  );
  const [quantity, setQuantity] = useState("");
  const [rows, setRows] = useState(row);

  const router = useRouter();

  const handleProductTypeChecked = (id: number) => {
    setProductTypesChecked((prevTypes) =>
      prevTypes.map((productType) =>
        productType.id === id
          ? { ...productType, checked: !productType.checked }
          : productType
      )
    );
  };

  const resetValue = () => {
    setProductName("");
    setManufactureDate(dayjs());
    setQuantity("");
  };

  const handleDeleteSample = () => {
    console.log(rows);
  };

  const handleAddSample = () => {
    if (productName === "") {
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
      name: productName,
      rowManufactureDate: manufactureDate?.format("DD/MM/YYYY").toString(),
      quantity: quantity,
    };
    const newArr = [...rows];
    newArr[rows.length] = newRow;
    setRows(newArr);
    resetValue();
  };

  return (
    <ThemeProvider theme={theme}>
      <div className={styles.login}>
        <Container maxWidth="lg">
          <FormControl>
            <FormLabel>Chủng loại sản phẩm cần kiểm mẫu:</FormLabel>
            <FormGroup className={styles.productTypes}>
              {productTypesChecked.map((productType) => (
                <FormControlLabel
                  key={productType.id}
                  control={
                    <Checkbox
                      checked={productType.checked}
                      onChange={() => handleProductTypeChecked(productType.id)}
                      name={productType.name}
                    />
                  }
                  label={productType.name}
                />
              ))}
            </FormGroup>
          </FormControl>
          <Box className={styles.form}>
            <TextField
              required
              label="Tên sản phẩm cần kiểm mẫu"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
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
            <TextField
              required
              label="Số lượng"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className={styles.formChild}
            />
          </Box>
          <Button variant="contained" onClick={() => handleAddSample()}>
            Add
          </Button>

          {/* <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            // checkboxSelection
          /> */}

          <FullFeaturedCrudGrid Row = {rows}/>

          {/* <Button variant="contained" onClick={() => handleDeleteSample()}>
            Delete
          </Button> */}

          <Button
            fullWidth
            variant="contained"
            className="btn--submit"
            type="submit"
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
