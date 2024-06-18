"use client";

import { useState, ReactElement, useEffect } from "react";

import Style from "./Invoice.module.scss";

import api from "@/app/api/client";

import { Box, Grid, Paper, Typography, Divider, Button } from "@mui/material";

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

// dayjs.extend(utc);
// dayjs.extend(timezone);

const Invoice = () => {
  const [infoList, setInfoList] = useState<infoContent[]>([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    handleGetInfo();
  }, [infoList]);

  useEffect(() => {
    handleLoadProductList();
  }, []);

  const handleLoadProductList = async () => {
    api.get("Invoices").then((res) => {
      setRows(res.data);
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

  const handleRowClick: GridEventListener<"rowClick"> = (param) => {
    // const params = new URLSearchParams(searchParams);
    // params.set("listings_id", param.id.toString());
    // router.push(`/history/${param.id}?${params.toString()}`);
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
      <Box className={Style.tableContainer}>
        <Box className={Style.tableAction}>
          <Box>
            <Button variant="contained">Create invoice</Button>
          </Box>
          <Box>
            <Button variant="contained"></Button>
          </Box>
        </Box>
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
    </Box>
  );
};

export default Invoice;
