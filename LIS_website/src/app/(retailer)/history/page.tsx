"use client";

import React, { useEffect, useState, useCallback } from "react";

import { useRouter } from "next/navigation";

// import "@/app/globals.module.css";
import styles from "./history.module.scss";

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
  const [rows, setRows] = useState<row[]>([]);

  const router = useRouter();

  useEffect(() => {
    handleLoadProductList();
  }, []);

  const handleLoadProductList = async () => {
    fetch("./data/HistoryReport.json")
      .then(function (res) {
        return res.json();
      })
      .then((data) => {
        setRows(data);

        console.log(data);
      })
      .catch(function (err) {
        console.log(err, " error");
      });
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
      id: -1,
      name: productSelected,
      unit: unit,
      quantity: quantity,
      rowManufactureDate: manufactureDate?.format("DD/MM/YYYY").toString(),
    };
    // setRows(newRow);
    resetValue();
  };

  return (
    <ThemeProvider theme={theme}>
      <div className={styles.login}>
        {/* <Header /> */}
        <Container maxWidth="lg">
          {/* <Box className={styles.form}>
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
          </Box> */}
          {/* <Button variant="contained" onClick={() => handleAddSample()}>
            Thêm
          </Button> */}

          <FullFeaturedCrudGrid Row={rows} />

          {/* <Button
            fullWidth
            variant="contained"
            className="btn--submit"
            type="submit"
          >
            Send
          </Button> */}
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

export default History;
