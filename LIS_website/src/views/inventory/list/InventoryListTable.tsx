'use client'

// React Imports
import { useState, useMemo, useEffect } from 'react'

// Next Imports
import { useRouter } from "next/navigation";

// Type Imports
import type { InventoryType } from '@/types/inventoryTypes'
import type { Dayjs } from 'dayjs';
import type { StoreLocationType } from '@/types/storeLocationTypes';
import type { TextFieldProps } from '@mui/material/TextField'
import type {
  ColumnDef,
  FilterFn,
} from '@tanstack/react-table'

// Componet Imports
import CustomTextField from '@/@core/components/mui/TextField'
import { fetchesClient, excelExport, deleteInventoryItem, GetStoreInventories } from '@/stores/inventory'

// MUI Imports
import { Card, CardHeader, MenuItem, Checkbox, Typography, IconButton, Button, TablePagination } from '@mui/material'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

// Third-party Imports
import {
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  createColumnHelper,
  flexRender
} from '@tanstack/react-table'
import { rankItem } from '@tanstack/match-sorter-utils'
import classnames from 'classnames'
import dayjs from 'dayjs'
import * as XLSX from "xlsx";

// Style Imports
import tableStyles from '@core/styles/table.module.css'
import TablePaginationComponent from '@/components/TablePaginationComponent'
import Link from 'next/link'

type InventoryTypeWithAction = InventoryType & {
  action?: string
}

const columnHelper = createColumnHelper<InventoryTypeWithAction>()

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value)

  // Store the itemRank info
  addMeta({
    itemRank
  })

  // Return if the item should be filtered in/out
  return itemRank.passed
}

const DebouncedInput = ({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number
  onChange: (value: string | number) => void
  debounce?: number
} & Omit<TextFieldProps, 'onChange'>) => {
  // States
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return <CustomTextField {...props} value={value} onChange={e => setValue(e.target.value)} />
}

const getData = async (storeid: string, startDate: string, endDate: string) => {
  const res = await GetStoreInventories("", startDate, endDate)

  if (!res.ok) {
    throw new Error('Fail to fetch inventory data')
  }

  return res.json()
}

const handleGetExcelFile = async (from: string, to: string, id: number) => {
  const res = await excelExport(from, to, id)

  if (!res.ok)

    throw new Error("Fail to get excel file!")

  return res.arrayBuffer();

}

const handleExcelExport = async (from: string, to: string, id: number) => {
  try {
    const data = await handleGetExcelFile(from, to, id)

    const excel = new Uint8Array(data);

    const workbook = XLSX.read(excel, { type: "array" });

    XLSX.writeFile(workbook, (from !== dayjs().format("DD/MM/YYYY").toString() ? from + "_" : "") + (to !== "" ? to + "_" : "") + (id.toString() !== "0" ? id.toString() + "_" : "") + "Inventory.xlsx");
  } catch (error) {
    throw new Error("Fail to export excel file!");
  }
}

const InventoryListTable = ({ tableData, storeLocations }: { tableData: InventoryType[], storeLocations: StoreLocationType[] }) => {
  const [isSideBarOpen, setOpen] = useState(false)
  const [data, setData] = useState(...[tableData])
  const [rowSelection, setRowSelection] = useState({})
  const [globalFilter, setGlobalFilter] = useState('')
  const [dateSelected, setDateSelected] = useState<string | undefined>(dayjs().format("DD/MM/YYYY").toString())
  const [startDate, setStartDate] = useState<Dayjs | null>(null)
  const [endDate, setEndDate] = useState<Dayjs>(dayjs())
  const [selectStore, setSelectStore] = useState<StoreLocationType | null>(null)

  const router = useRouter()

  const destroyEvent = async (id: number) => {
    const list: any[] = [];

    list.push(id);

    const res = await deleteInventoryItem(JSON.stringify(list));

    if (!res.ok) {
      throw new Error("Fail to delete inventory item!")
    }

    // router.refresh()
    window.location.reload()

    return res.json()
  }

  const columns = useMemo<ColumnDef<InventoryTypeWithAction, any>[]>(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler()
            }}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            {...{
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler()
            }}
          />
        )
      },
      columnHelper.accessor('id', {
        header: 'ID',
        cell: ({ row }) => (
          <div className='flex items-center'>
            <div className='flex flex-col'>
              <Typography color='text.primary' className='font-medium'>
                {row.original.id}
              </Typography>
            </div>
          </div>
        )
      }),
      columnHelper.accessor('location.storeid', {
        header: 'Mã cửa hàng',
        cell: ({ row }) => (
          <div className='flex items-center'>
            <Typography className='capitalize' color='text.primary'>
              {row.original.location.storeid}
            </Typography>
          </div>
        )
      }),
      columnHelper.accessor('location.retailname', {
        header: 'Tên cửa hàng',
        cell: ({ row }) => (
          <div className='flex items-center'>
            <Typography className='capitalize' color='text.primary'>
              {row.original.location.retailname}
            </Typography>
          </div>
        )
      }),
      columnHelper.accessor('location.retailsystem', {
        header: 'Tên hệ thống',
        cell: ({ row }) => (
          <div className='flex items-center'>
            <Typography className='capitalize' color='text.primary'>
              {row.original.location.retailsystem}
            </Typography>
          </div>
        )
      }),
      columnHelper.accessor('created', {
        header: 'Ngày báo tồn kho',
        cell: ({ row }) => (
          <div className='flex items-center'>
            <Typography className='capitalize' color='text.primary'>
              {row.original.created}
            </Typography>
          </div>
        )
      }),
      columnHelper.accessor('action', {
        header: 'Action',
        cell: ({ row }) => (
          <div className='flex items-center'>
            <IconButton>
              <Link href={`preview/${row.original.id}`} className='flex'>
                <i className='tabler-eye text-[22px] text-textSecondary' />
              </Link>
            </IconButton>
            <IconButton >
              <Link href={`edit/${row.original.id}`} className='flex'>
                <i className='tabler-edit text-[22px] text-textSecondary' />
              </Link>
            </IconButton>
            <IconButton
              onClick={() => destroyEvent(row.original.id)}
            >
              <i className='tabler-trash text-[22px] text-textSecondary' />
            </IconButton>
          </div>
        ),
        enableSorting: false
      })
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const table = useReactTable({
    data: data as InventoryType[],
    columns,
    filterFns: {
      fuzzy: fuzzyFilter
    },
    state: {
      rowSelection,
      globalFilter
    },
    initialState: {
      pagination: {
        pageSize: 10
      }
    },
    enableRowSelection: true,
    globalFilterFn: fuzzyFilter,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues()
  })

  return (
    <>
      <Card>
        <CardHeader title={
          <Typography variant='h5' color='text.primary'>
            Filters
          </Typography>
        } />
        <div className='flex justify-between flex-col items-start md:flex-row md:items-center p-6 border-bs gap-4'>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker
                label='Từ ngày'
                value={startDate}
                maxDate={endDate}
                format='DD/MM/YYYY'
                onChange={(date: any) => {
                  setStartDate((prev: any) => prev = date)
                }}
              />
            </DemoContainer>
            <DemoContainer components={['DatePicker']}>
              <DatePicker
                label='Đến ngày'
                value={endDate}
                minDate={startDate}
                maxDate={dayjs()}
                format='DD/MM/YYYY'
                onChange={(date: any) => {
                  setEndDate((prev: any) => prev = date)
                }}
              />
            </DemoContainer>
          </LocalizationProvider>
          {/* <CustomTextField select
            value={selectStore ? selectStore : ""}
            onChange={e => {
              e.preventDefault()

              const code = e.target.value
              const store = storeLocations.find(item => item.storeid === code)!

              setSelectStore(prev => prev = store)
            }}
          >
            {storeLocations.map((store, index) => (
              <MenuItem
                key={store.storeid}
                value={store.storeid}
                className='p-4'
              >
                {store.storeid}
              </MenuItem>
            ))}
          </CustomTextField> */}
          <Button
            color='secondary'
            variant='tonal'
            startIcon={<i className='tabler-refresh' />}
            className='is-full sm:is-auto p-4'
            disabled={!startDate && !selectStore}
            onClick={async (e) => {
              e.preventDefault()

              setStartDate((prev: any) => prev = null)
              setEndDate((prev: any) => prev = dayjs())

              // setSelectStore((prev: any) => prev = null)

              const data = await getData("", dayjs().format("DD/MM/YYYY").toString(), endDate.format("DD/MM/YYYY").toString())

              setData(prev => prev = data)
            }}
          >
            Đặt lại bộ lọc
          </Button>
          <Button
            variant='contained'
            startIcon={<i className='tabler-report-search' />}
            className='is-full sm:is-auto p-4'
            disabled={!startDate}
            onClick={async (e) => {
              e.preventDefault()

              const data = await getData("", (!startDate ? "" : startDate.format("DD/MM/YYYY").toString()), endDate.format("DD/MM/YYYY").toString())

              setData(prev => prev = data)
            }}>
            Xem kết quả
          </Button>
        </div>
        <div className='flex justify-between flex-col items-start md:flex-row md:items-center p-6 border-bs gap-4'>
          <CustomTextField select
            value={table.getState().pagination.pageSize}
            onChange={e => table.setPageSize(Number(e.target.value))}
            className='is-[70px]'
          >
            <MenuItem value='10'>10</MenuItem>
            <MenuItem value='25'>25</MenuItem>
            <MenuItem value='50'>50</MenuItem>
          </CustomTextField>
          <div className='flex flex-col sm:flex-row is-full sm:is-auto items-start sm:items-center gap-4'>
            {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker
                  label='Ngày báo tồn'
                  onChange={async (value) => {
                    const date = value?.format('DD/MM/YYYY').toString()
                    const data = await getData(date)

                    setDateSelected(date)

                    setData(data)

                  }}
                />
              </DemoContainer>
            </LocalizationProvider> */}
            <DebouncedInput
              value={globalFilter ?? ''}
              onChange={value => setGlobalFilter(String(value))}
              placeholder='Search Inventory'
              className='is-full sm:is-auto'
            />
            {/* <Button
              color='secondary'
              variant='tonal'
              startIcon={<i className='tabler-upload' />}
              className='is-full sm:is-auto'
              disabled
            >
              Import
            </Button> */}
            <Button
              color='secondary'
              variant='tonal'
              startIcon={<i className='tabler-download' />}
              className='is-full sm:is-auto'
              onClick={() => {
                handleExcelExport(startDate ? startDate.format("DD/MM/YYYY").toString() : endDate.format("DD/MM/YYYY").toString(), endDate.format("DD/MM/YYYY").toString(), 0)
              }}
              disabled={data.length === 0}
            >
              Export
            </Button>
            <Button
              variant='contained'
              startIcon={<i className='tabler-plus' />}
              onClick={() => setOpen(!isSideBarOpen)}
              className='is-full sm:is-auto'
            >
              Add New Inventory
            </Button>
          </div>
        </div>
        <div className='overflow-x-auto'>
          <table className={tableStyles.table}>
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th key={header.id}>
                      {header.isPlaceholder ? null : (
                        <>
                          <div
                            className={classnames({
                              'flex items-center': header.column.getIsSorted(),
                              'cursor-pointer select-none': header.column.getCanSort()
                            })}
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            {{
                              asc: <i className='tabler-chevron-up text-xl' />,
                              desc: <i className='tabler-chevron-down text-xl' />
                            }[header.column.getIsSorted() as 'asc' | 'desc'] ?? null}
                          </div>
                        </>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            {table.getFilteredRowModel().rows.length === 0 ? (
              <tbody>
                <tr>
                  <td colSpan={table.getVisibleFlatColumns().length} className='text-center'>
                    No data available
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                {table
                  .getRowModel()
                  .rows.slice(0, table.getState().pagination.pageSize)
                  .map(row => {
                    return (
                      <tr key={row.id} className={classnames({ selected: row.getIsSelected() })}>
                        {row.getVisibleCells().map(cell => (
                          <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                        ))}
                      </tr>
                    )
                  })}
              </tbody>
            )}
          </table>
        </div>
        <TablePagination
          component={() => <TablePaginationComponent table={table} />}
          count={table.getFilteredRowModel().rows.length}
          rowsPerPage={table.getState().pagination.pageSize}
          page={table.getState().pagination.pageIndex}
          onPageChange={(_, page) => {
            table.setPageIndex(page)
          }}
        />
      </Card >
    </>
  )
}

export default InventoryListTable
