"use client";

import { useEffect, useState } from "react";

import { useSearchParams, useRouter } from "next/navigation";

import Image from "next/image";

import * as XLSX from "xlsx";

import api from "@/app/api/client";

import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Divider,
  Button,
  TextField,
} from "@mui/material";

import Style from "./InventoryDetail.module.scss";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

interface product {
  id: number;
  inventory: {
    id: number;
    location: {
      id: number;
      warehouseid: string;
      storeid: string;
      retailname: string;
      retailsystem: string;
      shortname: string;
    };
    created: string;
    updated: string;
  };
  product: {
    id: number;
    category: null;
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

interface data {
  store: {
    id: number;
    warehouseid: string;
    storeid: string;
    retailname: string;
    retailsystem: string;
    shortname: string;
  };
  products: product[];
  created: string;
  updated: string;
}

dayjs.extend(utc);
dayjs.extend(timezone);

const InventoryDetail = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("inventory_id");

  const [data, setData] = useState<data>();
  const [total, setTotal] = useState<number>();

  const [edit, setEdit] = useState(false);

  const [editRow, setEditRow] = useState<any[]>([]);
  // var editRow: any[] = [];

  const router = useRouter();

  useEffect(() => {
    handleLoadInventoryDetail();
  }, [data]);

  const handleLoadInventoryDetail = () => {
    api
      .get(`Inventories/${search}`)
      .then((res) => {
        setData(res.data);
        var temp = 0;
        data?.products.map((item) => {
          temp = temp + item.quantity;
        });
        setTotal(temp);
      })
      .catch((e) => console.log(e));
  };

  const onGetExporProduct = (title?: string, worksheetname?: string) => {
    try {
      if (data?.products && Array.isArray(data.products)) {
        const dataToExport = data.products.map((row: any, index) => ({
          code: row.code,
          name: row.name,
          quantity: row.quantity[index],
          unit: "Kg",
        }));
        // Create Excel workbook and worksheet
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils?.json_to_sheet(dataToExport);
        XLSX.utils.book_append_sheet(workbook, worksheet, worksheetname);
        // Save the workbook as an Excel file
        XLSX.writeFile(workbook, `${title}.xlsx`);
        console.log(`Exported data to ${title}.xlsx`);
      } else {
        console.log("#==================Export Error");
      }
    } catch (error: any) {
      console.log("#==================Export Error", error.message);
    }
  };

  const handleDownload = () => {
    let title = search + "_" + data?.created;
    let worksheet = "#" + search;
    onGetExporProduct(title, worksheet);
  };

  const handleEdit = () => {
    setEdit(true);
  };

  const handleSaveChange = () => {
    console.log(editRow);
    api
      .put(`Inventories/${search}`, editRow)
      .then((res) => console.log(res.data))
      .catch((e) => console.log(e));
    router.back();
    setEdit(false);
  };

  const handleCancelChange = () => {
    setEdit(false);
  };

  const handleEditQuantity = (
    product_inventory_id: number,
    quantity: number,
    index: number
  ) => {
    let count = 0;
    let temp: any[] = editRow;
    for (let i = 0; i < temp.length; i++) {
      if (temp[i].id === product_inventory_id) {
        count++;
        temp[i].quantity = quantity;
        setEditRow(temp);
      }
    }
    if (count === 0) {
      temp.push({
        id: product_inventory_id,
        quantity: quantity,
        updated: dayjs().format("DD/MM/YYYY").toString(),
      });
      setEditRow(temp);
    }
    console.log(editRow);
  };

  return (
    <Container maxWidth="xl" className={Style.container}>
      <Grid container spacing={2}>
        <Grid item lg={9}>
          <Paper className={Style.InventoryContent}>
            <Box className={Style.inventoryHeader}>
              <Box>
                <Box className={Style.firmInfo}>
                  <Image
                    priority
                    src={"/logo-vissan.png"}
                    alt="logo"
                    width={43}
                    height={36}
                  />
                  <Typography className={Style.title}>Vissan</Typography>
                </Box>
                <Box className={Style.subTitle}>
                  <Typography className={Style.textColor}>
                    Số 420, đường Nơ Trang Long, pường 13, Quận Bình Thạnh,
                    TP.HCM, Việt Nam
                  </Typography>
                  <Typography>(84 28) 3553 3999 - 3553 3888</Typography>
                </Box>
              </Box>
              <Box className={Style.inventoryTime}>
                <Typography variant="h5" component="h5">
                  # {search}
                </Typography>
                <Typography className={Style.subTitle}>
                  Ngày tạo: {data?.created}
                </Typography>
              </Box>
            </Box>
            <Box className={Style.store}>
              <Typography sx={{ mb: "12px", fontWeight: "500" }}>
                Cửa hàng:
              </Typography>
              <Typography className={Style.textColor}>
                {data?.store.storeid}
              </Typography>
              <Typography className={Style.textColor}>
                {data?.store.retailname}
              </Typography>
              <Typography className={Style.textColor}>
                {data?.store.retailsystem}
              </Typography>
            </Box>
            <Box>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Mã sản phẩm</TableCell>
                      <TableCell align="right">Tên sản phẩm</TableCell>
                      <TableCell align="right">Số lượng</TableCell>
                      <TableCell align="right">Đơn vị</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data?.products.map((row, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.product.code}
                        </TableCell>
                        <TableCell align="right">{row.product.name}</TableCell>
                        <TableCell align="right">
                          {edit ? (
                            <TextField
                              defaultValue={row.quantity}
                              type="number"
                              onChange={(e) =>
                                handleEditQuantity(
                                  row.id,
                                  parseInt(e.target.value),
                                  index
                                )
                              }
                            />
                          ) : (
                            <Typography>{row.quantity}</Typography>
                          )}
                        </TableCell>
                        <TableCell align="right">Kg</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
            <Box className={Style.totalContainer}>
              <Box className={Style.total}>
                <Typography className={Style.textColor}>Tạm tính:</Typography>
                <Typography>{total}</Typography>
              </Box>
              <Divider className={Style.total} sx={{ margin: "12px 0" }} />
              <Box className={Style.total}>
                <Typography className={Style.textColor}>Tổng cộng:</Typography>
                <Typography>{total}</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid item lg={3}>
          <Box className={Style.actions}>
            <Grid container spacing={2}>
              <Grid item lg={12}>
                <Button
                  variant="contained"
                  fullWidth
                  className={Style.button}
                  onClick={handleDownload}
                >
                  Download
                </Button>
              </Grid>
              <Grid item lg={6}>
                <Button variant="contained" fullWidth className={Style.button}>
                  Print
                </Button>
              </Grid>
              <Grid item lg={6}>
                <Button
                  variant="contained"
                  fullWidth
                  className={Style.button}
                  onClick={handleEdit}
                >
                  Edit
                </Button>
              </Grid>
              <Grid item lg={12}>
                <Button
                  variant="contained"
                  fullWidth
                  disabled={!edit || editRow.length <= 0}
                  onClick={handleSaveChange}
                >
                  Save Change
                </Button>
              </Grid>
              <Grid item lg={12}>
                <Button
                  variant="contained"
                  fullWidth
                  disabled={!edit}
                  onClick={handleCancelChange}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default InventoryDetail;
