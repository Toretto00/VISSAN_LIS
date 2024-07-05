/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { getSession } from 'next-auth/react'

// React Imports
import { useState, useMemo, useEffect } from 'react'

// Componet Imports
import CustomTextField from '@/@core/components/mui/TextField'
import TablePaginationComponent from '@/components/TablePaginationComponent'

// MUI Imports
import {
    Grid,
    Autocomplete,
    TextField,
    Card,
    MenuItem,
    Checkbox,
    Typography,
    IconButton,
    Button,
    TablePagination
} from "@mui/material"

// Type Imports
import type { ProductType } from "@/types/productTypes"
import type {
    ColumnDef,
    FilterFn,
} from '@tanstack/react-table'
import type { TextFieldProps } from '@mui/material/TextField'
import type { InventoryProductType } from '@/types/inventoryTypes'

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

// Style Imports
import tableStyles from '@core/styles/table.module.css'
import dayjs from 'dayjs'
import { newInventory } from '@/stores/inventory'

type InventoryProductTypeWithAction = InventoryProductType & {
    action?: string
}

const columnHelper = createColumnHelper<InventoryProductTypeWithAction>()

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

const AddForm = ({ productData }: { productData: ProductType[] }) => {
    const [isSideBarOpen, setOpen] = useState(false)
    const [data, setData] = useState<InventoryProductType[]>([])
    const [rowSelection, setRowSelection] = useState({})
    const [globalFilter, setGlobalFilter] = useState('')
    const [productSelected, setProductSelected] = useState(productData[0])
    const [unit, setUnit] = useState('Kg')
    const [quantity, setQuantity] = useState('')
    const [code, setCode] = useState('')

    useEffect(() => {
        const newRows = data.filter(item => item.product.code !== code)

        setData(newRows)
    }, [code])

    const handleAddItem = () => {

        if (productSelected === null) {

            return
        }

        if (quantity === '') {

            return
        }

        let count = 0

        const newRows = [...data]

        newRows.forEach(element => {
            if (element.product?.code == productSelected?.code) {
                element.quantity += parseInt(quantity)
                count++
            }
        })

        if (count == 0) {
            const newRow = {
                product: productSelected,
                quantity: parseInt(quantity),
            }

            setData(data => [newRow, ...data])

            return
        }

        setData(newRows)
    }

    const destroyEvent = (id: string) => {
        setCode(prev => prev = id)
    }

    const handleSendRequest = async () => {

        const session = await getSession()

        const inventory: any[] = []

        data.forEach(element => {
            inventory.push({
                product: {
                    code: element?.product?.code
                },
                quantity: element?.quantity,
                created: dayjs().format("DD/MM/YYYY").toString(),
                updated: dayjs().format("DD/MM/YYYY").toString()
            })
        })

        try {
            if (inventory.length == 0) {
                console.log("empty data")

                return
            }

            const res = await newInventory(JSON.stringify(inventory), session?.user.store.storeid)

            if (!res.ok) {
                throw new Error("Fail to post new inventory!")
            }

            setData([])

            return res.json()

        } catch (e: any) {
            throw new Error(e.massage)
        }

    }

    const columns = useMemo<ColumnDef<InventoryProductTypeWithAction, any>[]>(
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
            columnHelper.accessor('product.id', {
                header: 'ID',
                cell: ({ row }) => (
                    <div className='flex items-center'>
                        <div className='flex flex-col'>
                            <Typography color='text.primary' className='font-medium'>
                                {row.original.product.id}
                            </Typography>
                        </div>
                    </div>
                )
            }),
            columnHelper.accessor('product.code', {
                header: 'Mã sản phẩm',
                cell: ({ row }) => (
                    <div className='flex items-center'>
                        <Typography className='capitalize' color='text.primary'>
                            {row.original.product.code}
                        </Typography>
                    </div>
                )
            }),
            columnHelper.accessor('product.name', {
                header: 'Tên sản phẩm',
                cell: ({ row }) => (
                    <div className='flex items-center'>
                        <Typography className='capitalize' color='text.primary'>
                            {row.original.product.name}
                        </Typography>
                    </div>
                )
            }),
            columnHelper.accessor('quantity', {
                header: 'Số lượng',
                cell: ({ row }) => (
                    <div className='flex items-center'>
                        <Typography className='capitalize' color='text.primary'>
                            {row.original.quantity}
                        </Typography>
                    </div>
                )
            }),

            // columnHelper.accessor('created', {
            //     header: 'Ngày báo tồn kho',
            //     cell: ({ row }) => (
            //         <div className='flex items-center'>
            //             <Typography className='capitalize' color='text.primary'>
            //                 {row.original.created}
            //             </Typography>
            //         </div>
            //     )
            // }),
            columnHelper.accessor('action', {
                header: 'Action',
                cell: ({ row }) => (
                    <div className='flex items-center'>
                        <IconButton
                            onClick={() => destroyEvent(row.original.product.code)}
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
        data: data as InventoryProductType[],
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
        <Card>
            <Grid container spacing={2} sx={{ mt: "6px" }}>
                <Grid item lg={3} md={4} xs={6}>
                    <Autocomplete
                        options={productData}
                        onChange={(event, value: any) => setProductSelected(value)}
                        value={productSelected}
                        autoHighlight
                        getOptionLabel={option => option.name}
                        renderOption={(props, option) => {
                            return (
                                <li {...props} key={option.id}>
                                    {option.name}
                                </li>
                            )
                        }
                        }
                        renderInput={params => (
                            <TextField
                                {...params}
                                label='Tên sản phẩm'
                                inputProps={{
                                    ...params.inputProps,
                                    autoComplete: 'new-password' // disable autocomplete and autofill
                                }}
                            />
                        )}
                    />
                </Grid>
                <Grid item lg={3} md={4} xs={3}>
                    <TextField
                        required
                        fullWidth
                        type='number'
                        label='Số lượng'
                        value={quantity}
                        onChange={e => {
                            setQuantity(e.target.value)
                        }}
                    />
                </Grid>
                <Grid item lg={3} md={4} xs={3}>
                    <TextField
                        disabled
                        fullWidth
                        label='Đơn vị'
                        value={unit}
                        onChange={e => setUnit(e.target.value)}
                    />
                </Grid>
                <Grid item lg={3} md={6} xs={12}>
                    <Button variant='contained' fullWidth

                        onClick={() => handleAddItem()}
                        sx={{ height: '100%' }}
                        startIcon={<i className='tabler-plus' />}
                    >
                        Thêm
                    </Button>
                </Grid>
            </Grid>

            <div className='flex justify-between flex-col items-start md:flex-row md:items-center p-6 border-bs gap-4'>
                <CustomTextField select value={table.getState().pagination.pageSize}>
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
                    {/* <DebouncedInput
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
                            disabled
                        >
                            Import
                        </Button>
                        <Button
                            color='secondary'
                            variant='tonal'
                            startIcon={<i className='tabler-download' />}
                            className='is-full sm:is-auto'
                            onClick={() => {
                                handleExcelExport(dateSelected, 0)
                            }}
                        >
                            Export
                        </Button> */}
                    <Button
                        disabled={data.length === 0}
                        variant='contained'
                        startIcon={<i className='tabler-trash' />}

                        onClick={() => setData([])}
                        className='is-full sm:is-auto'
                    >
                        Xóa tất cả
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
            <Button fullWidth variant='contained' type='submit'

                onClick={() => handleSendRequest()}

                startIcon={<i className='tabler-send' />}
                disabled={data.length === 0}
            >
                {'Gửi báo cáo tồn kho'}
            </Button>
        </Card>
    )
}

export default AddForm
