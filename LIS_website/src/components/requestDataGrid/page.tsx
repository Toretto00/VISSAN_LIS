"use client";

import * as React from "react";

import * as XLSX from "xlsx";

import { useState, useEffect } from "react";

import { Box, Button } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";

import {
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";

export default function FullFeaturedCrudGrid(props: any) {
  const [rows, setRows] = useState<any[]>([]);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  const onGetExporProduct = (title?: string, worksheetname?: string) => {
    try {
      if (rows && Array.isArray(rows)) {
        const dataToExport = rows.map((row: any) => ({
          title: row.id,
          price: row.name,
          category: row.rowManufactureDate,
          description: row.quantity,
        }));
        // Create Excel workbook and worksheet
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils?.json_to_sheet(dataToExport);
        XLSX.utils.book_append_sheet(workbook, worksheet, worksheetname);
        // Save the workbook as an Excel file
        XLSX.writeFile(workbook, `${title}.xlsx`);
        console.log(`Exported data to ${title}.xlsx`);
        // setLoading(false);
      } else {
        // setLoading(false);
        console.log("#==================Export Error");
      }
    } catch (error: any) {
      // setLoading(false);
      console.log("#==================Export Error", error.message);
    }
  };

  useEffect(() => {
    if (props.Row == undefined) return;
    setRows(props.Row);
  }, [props.Row]);

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    const newRows = rows.filter((row) => row?.id !== id);
    newRows.map((row, index) => {
      row["id"] = index + 1;
    });
    setRows(newRows);
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "name.code",
      headerName: "Mã sản phẩm",
      valueGetter: (value, row) => {
        return `${row.name.code}`;
      },
      width: 320,
      editable: true,
    },
    {
      field: "name.name",
      headerName: "Tên sản phẩm",
      valueGetter: (value, row) => {
        return `${row.name.name}`;
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
      field: "rowManufactureDate",
      headerName: "Ngày sản xuất",
      width: 240,
      editable: true,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              key={id}
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              key={id}
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            key={id}
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            key={id}
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        // height: 500,
        minHeight: 500,
        maxHeight: 800,
        width: "100%",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <Button
        variant="contained"
        disabled={rows.length === 0 ? true : false}
        onClick={(e) => {
          onGetExporProduct();
        }}
      >
        Export
      </Button>

      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowHeight={60}
        sx={{
          minHeight: 300 + 52 + 56,
          maxHeight: 600 + 52 + 56,
        }}
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
      />
      <Button
        variant="contained"
        disabled={rows.length === 0 ? true : false}
        onClick={(e) => {
          setRows([]);
        }}
      >
        Xóa tất cả
      </Button>
    </Box>
  );
}
