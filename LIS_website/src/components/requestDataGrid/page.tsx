"use client";

import * as React from "react";

import { useState, useEffect } from "react";

import { Box, Button, Grid } from "@mui/material";

import DeleteIcon from "@mui/icons-material/DeleteOutlined";

import {
  GridRowModesModel,
  DataGrid,
  GridColDef,
  GridActionsCellItem,
  GridRowId,
} from "@mui/x-data-grid";

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

interface row {
  id: number;
  name: product | undefined;
  quantity: number;
  unit: string;
  rowManufactureDate: any;
}
interface GridProps {
  Row: row[];
  requestType: string;
  handleDeleteItem: (data: GridRowId | [], requestType: string) => void;
}

export default function FullFeaturedCrudGrid(props: GridProps) {
  const [rows, setRows] = useState<row[]>([]);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  useEffect(() => {
    if (props.Row == undefined) return;
    setRows(props.Row);
  }, [props.Row]);

  const handleDeleteClick = (id: GridRowId | [], requestType: string) => () => {
    props.handleDeleteItem(id, requestType);
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "name.code",
      headerName: "Mã sản phẩm",
      valueGetter: (value, row) => {
        return `${row.name.code}`;
      },
      width: 120,
    },
    {
      field: "name.name",
      headerName: "Tên sản phẩm",
      valueGetter: (value, row) => {
        return `${row.name.name}`;
      },
      width: 220,
    },
    {
      field: "quantity",
      headerName: "Số lượng",
    },
    {
      field: "unit",
      headerName: "Đơn vị",
    },
    // {
    //   field: "rowManufactureDate",
    //   headerName: "Ngày sản xuất",
    //   width: 240,
    //   editable: true,
    // },
    {
      field: "actions",
      type: "actions",
      headerName: "Xóa",
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            key={id}
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id, props.requestType)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        maxHeight: "100vh",
        width: "100%",
        marginTop: "16px",
      }}
    >
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pagination
          rowHeight={60}
          autoHeight
          disableColumnMenu
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          pageSizeOptions={[5]}
          rowModesModel={rowModesModel}
        />
      </div>
      <Grid container spacing={2}>
        <Grid item lg={3} md={6} xs={6}>
          <Button
            variant="contained"
            fullWidth
            disabled={rows.length === 0 ? true : false}
            onClick={handleDeleteClick([], props.requestType)}
            sx={{ margin: "16px 0" }}
          >
            <DeleteIcon sx={{ mr: "6px" }} />
            Xóa tất cả
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
