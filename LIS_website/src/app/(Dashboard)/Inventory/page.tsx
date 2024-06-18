"use client";

import { useState, ReactElement, useEffect } from "react";

import Style from "./Inventory.module.scss";

import api from "@/app/api/client";

import {
  Box,
  Grid,
  Paper,
  Typography,
  Divider,
  Button,
  Autocomplete,
  TextField,
} from "@mui/material";

import { DataGrid, GridColDef, GridEventListener } from "@mui/x-data-grid";

import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import DoneAllOutlinedIcon from "@mui/icons-material/DoneAllOutlined";
import PendingActionsOutlinedIcon from "@mui/icons-material/PendingActionsOutlined";

interface infoContent {
  number: number;
  name: string;
  icon: ReactElement;
}

var infoContentList: infoContent[] = [
  {
    number: 1,
    name: "Clients",
    icon: (
      <PersonOutlineOutlinedIcon
        sx={{
          fontSize: "26px",
        }}
      />
    ),
  },
  {
    number: 1,
    name: "Invoices",
    icon: (
      <DescriptionOutlinedIcon
        sx={{
          fontSize: "26px",
        }}
      />
    ),
  },
  {
    number: 1,
    name: "Pending",
    icon: (
      <DoneAllOutlinedIcon
        sx={{
          fontSize: "26px",
        }}
      />
    ),
  },
  {
    number: 1,
    name: "Done",
    icon: (
      <PendingActionsOutlinedIcon
        sx={{
          fontSize: "26px",
        }}
      />
    ),
  },
];

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

const Inventory = () => {
  const [productList, setProductList] = useState<product[]>([]);
  const [infoList, setInfoList] = useState<infoContent[]>([]);
  const [rows, setRows] = useState([]);
  const columns: GridColDef<(typeof rows)[number]>[] = [
    { field: "location.storeID", headerName: "Mã cửa hàng", width: 240 },
    {
      field: "location.name",
      headerName: "Tên cửa hàng",
      width: 320,
    },
    {
      field: "status",
      headerName: "Hệ thống",
      width: 240,
    },
    {
      field: "status",
      headerName: "Ngày báo tốn",
      width: 240,
    },
  ];

  useEffect(() => {
    handleGetInfo();
  }, [infoList]);

  useEffect(() => {
    handleLoadProductList();
  }, []);

  const handleLoadProductList = async () => {
    api.get("Inventories").then((res) => {
      setRows(res.data);
    });
  };

  const handleGetInfo = () => {
    api
      .get("/Info")
      .then((res) => {
        var temp = infoContentList;
        temp[0].number = res.data.clients;
        temp[1].number = res.data.invoices;
        temp[2].number = res.data.pending;
        temp[3].number = res.data.done;
        setInfoList(temp);
      })
      .catch((e) => console.log(e));
  };

  return (
    <Box className={Style.container}>
      {/* infomation */}
      <Grid container className={Style.infoContainer}>
        {infoList.map((item, index) => (
          <Grid key={index} item lg={3} md={6} xs={12}>
            <Paper elevation={0} className={Style.info}>
              <Box>
                <Typography
                  variant="h4"
                  component="h4"
                  className={Style.infoHeading}
                >
                  {item.number}
                </Typography>
                <Typography className={Style.infoTitle}>{item.name}</Typography>
              </Box>
              <Box className={Style.infoIcon}>{item.icon}</Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Table */}
      <Box className={Style.tableContainer}>
        {/* Actions */}
        <Box className={Style.tableAction}>
          <Box>
            <Button variant="contained">Create inventory</Button>
          </Box>
          <Box>
            <Autocomplete
              sx={{ width: 300 }}
              options={productList}
              // onChange={(event, value) => setProductSelected(value)}
              autoHighlight
              // getOptionLabel={(option) => option.name}
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
          </Box>
        </Box>

        {/* List */}
        <DataGrid
          rows={rows}
          columns={columns}
          className={Style.table}
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
          // onRowClick={handleRowClick}
        />
      </Box>
    </Box>
  );
};
export default Inventory;
