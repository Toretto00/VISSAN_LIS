'use client'

// React Imports
import { useState, useMemo, useEffect } from 'react'

// Type Imports
import { InventoryType } from '@/types/inventoryTypes'

// Componet Imports
import CustomTextField from '@/@core/components/mui/TextField'
import { fetchesClient } from '@/stores/inventory'

// MUI Imports
import { Card, MenuItem, Checkbox, Typography, IconButton, Button, TablePagination } from '@mui/material'
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
  ColumnDef,
  FilterFn,
  createColumnHelper,
  flexRender
} from '@tanstack/react-table'
import { rankItem } from '@tanstack/match-sorter-utils'
import classnames from 'classnames'
import dayjs from 'dayjs'

// Style Imports
import tableStyles from '@core/styles/table.module.css'
import TablePaginationComponent from '@/components/TablePaginationComponent'
import Link from 'next/link'

type CategoryTypeWithAction = InventoryType & {
  action?: string
}

const columnHelper = createColumnHelper<CategoryTypeWithAction>()

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

const getData = async (date: string | undefined) => {
  const res = await fetchesClient(date !== undefined ? date : '')

  if (!res.ok) {
    throw new Error('Fail to fetch inventory data')
  }

  return res.json()
}

const InventoryListTable = ({ tableData }: { tableData: InventoryType[] }) => {
  const [isSideBarOpen, setOpen] = useState(false)
  const [data, setData] = useState(...[tableData])
  const [rowSelection, setRowSelection] = useState({})
  const [globalFilter, setGlobalFilter] = useState('')

  const columns = useMemo<ColumnDef<CategoryTypeWithAction, any>[]>(
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
            <IconButton>
              <i className='tabler-edit text-[22px] text-textSecondary' />
            </IconButton>
            <IconButton
            //  onClick={() => destroyEvent(row.original.id)}
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
        <div className='flex justify-between flex-col items-start md:flex-row md:items-center p-6 border-bs gap-4'>
          <CustomTextField select value={table.getState().pagination.pageSize}>
            <MenuItem value='10'>10</MenuItem>
            <MenuItem value='25'>25</MenuItem>
            <MenuItem value='50'>50</MenuItem>
          </CustomTextField>
          <div className='flex flex-col sm:flex-row is-full sm:is-auto items-start sm:items-center gap-4'>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker
                  label='Ngày báo tồn'
                  onChange={async (value) => {
                    let date = value?.format('DD/MM/YYYY').toString()
                    var data = await getData(date)
                    console.log(JSON.stringify(data))
                    setData(data)
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
            <DebouncedInput
              value={globalFilter ?? ''}
              onChange={value => setGlobalFilter(String(value))}
              placeholder='Search Inventory'
              className='is-full sm:is-auto'
            />
            <Button
              color='secondary'
              variant='tonal'
              startIcon={<i className='tabler-upload' />}
              className='is-full sm:is-auto'
            >
              Import
            </Button>
            <Button
              color='secondary'
              variant='tonal'
              startIcon={<i className='tabler-download' />}
              className='is-full sm:is-auto'
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
        <div className='over-flox-x-auto'>
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
      </Card>
    </>
  )
}

export default InventoryListTable
