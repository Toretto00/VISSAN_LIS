"use client";

import { useState, ReactElement, useEffect } from "react";

import { useSearchParams, useRouter } from "next/navigation";

import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

import * as XLSX from "xlsx";

import Style from "./Inventory.module.scss";

import api from "@/app/api/client";

import { Box, Container, Button } from "@mui/material";

import {
  DataGrid,
  GridColDef,
  GridEventListener,
  GridRowId,
  GridRowSelectionModel,
} from "@mui/x-data-grid";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

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

interface Inventory {
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
}

dayjs.extend(utc);
dayjs.extend(timezone);

const Inventory = () => {
  const [infoList, setInfoList] = useState<infoContent[]>([]);
  const [rows, setRows] = useState<Inventory[]>([]);
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const [rowSelectionModel, setRowSelectionModel] =
    useState<GridRowSelectionModel>([]);

  const handleDeleteRowSelection = () => {
    api
      .delete("Inventories", {
        data: rowSelectionModel,
        headers: {
          Authorization: `Bearer ${
            typeof window !== "undefined" ? sessionStorage.getItem("token") : ""
          }`,
        },
      })
      .then((res) => {
        handleLoadProductList();
      })
      .catch((e) => {
        console.log(e);
        sessionStorage.clear();
        router.push("/login");
      });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    let list: any[] = [];
    list.push(id);
    api
      .delete("Inventories", {
        data: list,
        headers: {
          Authorization: `Bearer ${
            typeof window !== "undefined" ? sessionStorage.getItem("token") : ""
          }`,
        },
      })
      .then((res) => {
        handleLoadProductList();
      })
      .catch((e) => {
        console.log(e);
        sessionStorage.clear();
        router.push("/login");
      });
  };

  const columns: GridColDef<(typeof rows)[number]>[] = [
    {
      field: "location.storeid",
      headerName: "Mã cửa hàng",
      width: 240,
      valueGetter: (value, row) => {
        return `${row.location.storeid}`;
      },
    },
    {
      field: "location.name",
      headerName: "Tên cửa hàng",
      width: 320,
      valueGetter: (value, row) => {
        return `${row.location.retailname}`;
      },
    },
    {
      field: "location.retailsystem",
      headerName: "Hệ thống",
      width: 240,
      valueGetter: (value, row) => {
        return `${row.location.retailsystem}`;
      },
    },
    {
      field: "created",
      headerName: "Ngày báo tồn",
      width: 240,
    },
  ];

  useEffect(() => {
    handleGetInfo();
  }, [infoList]);

  useEffect(() => {
    handleLoadProductList();
  }, [date]);

  const handleLoadProductList = async () => {
    api
      .get(`Inventories?date=${date?.format("DD/MM/YYYY").toString()}`, {
        headers: {
          Authorization: `Bearer ${
            typeof window !== "undefined" ? sessionStorage.getItem("token") : ""
          }`,
        },
      })
      .then((res: any) => {
        setRows(res.data);
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
        sessionStorage.clear();
        router.push("/login");
      });
  };

  const handleGetInfo = () => {
    api
      .get("/Info", {
        headers: {
          Authorization: `Bearer ${
            typeof window !== "undefined" ? sessionStorage.getItem("token") : ""
          }`,
        },
      })
      .then((res) => {
        var temp = infoContentList;
        temp[0].number = res.data.clients;
        temp[1].number = res.data.invoices;
        temp[2].number = res.data.pending;
        temp[3].number = res.data.done;
        setInfoList(temp);
      })
      .catch((e) => {
        console.log(e);
        sessionStorage.clear();
        router.push("/login");
      });
  };

  const router = useRouter();

  const searchParams = useSearchParams();

  const handleRowClick: GridEventListener<"rowClick"> = (param) => {
    const params = new URLSearchParams(searchParams);
    params.set("inventory_id", param.id.toString());
    router.push(`/Inventory/${param.id}?${params.toString()}`);
  };

  const handleDownloadInventory = () => {
    api
      .post(
        `Inventories/ExportExcel?date=${date?.format("DD/MM/YYYY").toString()}`,
        {
          responseType: "arraybuffer",
          headers: {
            Authorization: `Bearer ${
              typeof window !== "undefined"
                ? sessionStorage.getItem("token")
                : ""
            }`,
          },
        }
      )
      .then((res) => {
        const data = new Uint8Array(res.data);
        const workbook = XLSX.read(data, { type: "array" });

        XLSX.writeFile(workbook, "Inventory.xlsx");
      })
      .catch((e) => {
        console.log(e);
        sessionStorage.clear();
        router.push("/login");
      });
  };

  return (
    <Container maxWidth="xl">
      <Box className={Style.container}>
        {/* infomation */}
        {/* <Grid container className={Style.infoContainer}>
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
                  <Typography className={Style.infoTitle}>
                    {item.name}
                  </Typography>
                </Box>
                <Box className={Style.infoIcon}>{item.icon}</Box>
              </Paper>
            </Grid>
          ))}
        </Grid> */}

        {/* Table */}
        <Box className={Style.tableContainer}>
          {/* Actions */}
          <Box className={Style.tableAction}>
            <Box>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    timezone="Asia/Ho_Chi_Minh"
                    format="DD/MM/YYYY"
                    value={date}
                    onChange={(newValue: any) => {
                      newValue.format("DD/MM/YYYY");
                      setDate(newValue);
                      console.log(date?.toDate().toString());
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Box>
            <Box>
              <Button variant="contained" onClick={handleDownloadInventory}>
                Download
              </Button>
              <Button
                variant="contained"
                onClick={handleDeleteRowSelection}
                disabled={rowSelectionModel.length <= 0 ? true : false}
              >
                Delete
              </Button>
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
                  pageSize: 10,
                },
              },
            }}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
            onRowClick={handleRowClick}
            onRowSelectionModelChange={(newRowSelectionModel) => {
              setRowSelectionModel(newRowSelectionModel);
            }}
            rowSelectionModel={rowSelectionModel}
          />
        </Box>
      </Box>
    </Container>
  );
};
export default Inventory;
