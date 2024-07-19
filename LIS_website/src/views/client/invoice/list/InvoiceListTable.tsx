'use client'

// React Imports
import { useState, useMemo, useEffect } from 'react'

// Next Imports
import { useRouter, redirect } from "next/navigation";
import Link from 'next/link'

// Type Imports
import type { InvoiceType } from '@/types/invoiceTypes'

// Componet Imports
import CustomTextField from '@/@core/components/mui/TextField'

// import { fetchesClient, excelExport, deleteInventoryItem, GetStoreInventories } from '@/stores/inventory'
import { getInvoiceClient } from '@/stores/invoice'
import TablePaginationComponent from '@/components/TablePaginationComponent'

// MUI Imports
import { Card, CardHeader, MenuItem, Checkbox, Typography, IconButton, Button, TablePagination } from '@mui/material'
import type { TextFieldProps } from '@mui/material/TextField'
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
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs'
import * as XLSX from "xlsx";

import type {
  ColumnDef,
  FilterFn,
} from '@tanstack/react-table'

// Style Imports
import tableStyles from '@core/styles/table.module.css'

type InvoiceTypeWithAction = InvoiceType & {
  action?: string
}

const columnHelper = createColumnHelper<InvoiceTypeWithAction>()

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

const getData = async (storeid: string, from: string, to: string, status: string) => {
  const res = await getInvoiceClient(storeid, from, to, status)

  if (!res.ok) {
    throw new Error('Fail to fetch inventory data')
  }

  return res.json()
}

const InventoryListTable = ({ tableData, storeid }: { tableData: InvoiceType[], storeid: string }) => {

  // States
  const [data, setData] = useState(...[tableData])
  const [rowSelection, setRowSelection] = useState({})
  const [globalFilter, setGlobalFilter] = useState('')
  const [startDate, setStartDate] = useState<Dayjs | null>(null)
  const [endDate, setEndDate] = useState<Dayjs>(dayjs())
  const [status, setStatus] = useState<string>("")

  // Hooks
  const router = useRouter()

  // useEffect(() => {
  //   async () => {
  //     const newdata = await getData(storeid, "", endDate.format("DD/MM/YYYY").toString(), status)

  //     setData(prev => prev = newdata)
  //   }

  //   // return () => setData(...[tableData])
  // }, [status])

  const columns = useMemo<ColumnDef<InvoiceTypeWithAction, any>[]>(
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
      columnHelper.accessor('date', {
        header: 'Ngày đặt hàng',
        cell: ({ row }) => (
          <div className='flex items-center'>
            <Typography className='capitalize' color='text.primary'>
              {row.original.date}
            </Typography>
          </div>
        )
      }),
      columnHelper.accessor('status', {
        header: 'Trạng thái',
        cell: ({ row }) => (
          <div className='flex items-center'>
            <Typography className='capitalize' color='text.primary'>
              {row.original.status}
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
          </div>
        ),
        enableSorting: false
      })
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const table = useReactTable({
    data: data as InvoiceType[],
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
                  setStartDate(prev => prev = date)
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
                  setEndDate(prev => prev = date)
                }}
              />
            </DemoContainer>
          </LocalizationProvider>
          <CustomTextField
            select
            value={status}
            onChange={e => setStatus(prev => prev = e.target.value)}
            className='is-[200px]'
          >
            <MenuItem value="pending">
              Đang xử lý
            </MenuItem>
            <MenuItem value="approved">
              Được cấp phép
            </MenuItem>
            <MenuItem value="denied">
              Từ chối
            </MenuItem>
          </CustomTextField>
          <Button
            color='secondary'
            variant='tonal'
            startIcon={<i className='tabler-refresh' />}
            className='is-full sm:is-auto p-4'
            disabled={!startDate && endDate.format("DD/MM/YYYY") === dayjs().format("DD/MM/YYYY") && status === ""}
            onClick={async (e) => {
              e.preventDefault()

              setStartDate(prev => prev = null)
              setEndDate(prev => prev = dayjs())
              setStatus(prev => prev = "")

              const data = await getData(storeid, "", dayjs().format("DD/MM/YYYY").toString(), "")

              setData(prev => prev = data)
            }}
          >
            Đặt lại bộ lọc
          </Button>
          <Button
            variant='contained'
            startIcon={<i className='tabler-report-search' />}
            className='is-full sm:is-auto p-4'
            disabled={!startDate && endDate.format("DD/MM/YYYY") === dayjs().format("DD/MM/YYYY") && status === ""}
            onClick={async (e) => {
              e.preventDefault()

              const data = await getData(storeid, (!startDate ? "" : startDate.format("DD/MM/YYYY").toString()), endDate.format("DD/MM/YYYY").toString(), status)

              setData(prev => prev = data)
            }}>
            Xem kết quả
          </Button>
        </div>
        <div className='flex justify-between flex-col items-start md:flex-row md:items-center p-6 border-bs gap-4'>
          <CustomTextField
            select
            value={table.getState().pagination.pageSize}
            onChange={e => table.setPageSize(Number(e.target.value))}
            className='is-[70px]'
          >
            <MenuItem value='10'>10</MenuItem>
            <MenuItem value='25'>25</MenuItem>
            <MenuItem value='50'>50</MenuItem>
          </CustomTextField>
          <div className='flex flex-col sm:flex-row is-full sm:is-auto items-start sm:items-center gap-4'>
            <DebouncedInput
              value={globalFilter ?? ''}
              onChange={value => setGlobalFilter(String(value))}
              placeholder='Tìm'
              className='is-full sm:is-auto'
            />
            <Button
              variant='contained'
              startIcon={<i className='tabler-plus' />}
              onClick={() => router.push("/client/invoice/add")}
              className='is-full sm:is-auto'
            >
              Thêm đặt hàng
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
