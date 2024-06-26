"use client";

import { useState, useEffect, Suspense } from "react";

import { useSearchParams, useRouter } from "next/navigation";

import Image from "next/image";

import api from "@/app/api/client";

import Style from "../../../(Dashboard)/Inventory/[InventoryID]/InventoryDetail.module.scss";

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

import dayjs, { Dayjs } from "dayjs";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

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

const HistoryDetail = () => {
  const [data, setData] = useState<data>();
  const [total, setTotal] = useState<number>();

  const router = useRouter();

  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const search = searchParams.get("id");

  useEffect(() => {
    handleLoadProductList();
  }, []);

  const handleLoadProductList = async () => {
    api
      .get(type == "invoice" ? `Invoices/${search}` : `Inventories/${search}`, {
        headers: {
          Authorization: `Bearer ${
            typeof window !== "undefined" ? sessionStorage.getItem("token") : ""
          }`,
        },
      })
      .then((res: any) => {
        setData(res.data);
        var temp = 0;
        data?.products.map((item) => {
          temp = temp + item.quantity;
        });
        setTotal(temp);
      })
      .catch((e) => {
        console.log(e);
        sessionStorage.clear();
        router.push("/login");
      });
  };

  return (
    <div style={{ backgroundColor: "white" }}>
      <Container maxWidth="lg" className={Style.container} sx={{ mt: "72px" }}>
        <Grid container spacing={2}>
          <Grid item lg={12}>
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
                          <TableCell align="right">
                            {row.product.name}
                          </TableCell>
                          <TableCell align="right">
                            <Typography>{row.quantity}</Typography>
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
                  <Typography className={Style.textColor}>
                    Tổng cộng:
                  </Typography>
                  <Typography>{total}</Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default HistoryDetail;
