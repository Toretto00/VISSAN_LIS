'use client'

// React Imports
import { useState, useEffect, MutableRefObject, RefObject } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'

// Type Imports
import type { InventoryDetailType } from '@/types/inventoryTypes'

// Component Imports
import Logo from '@components/layout/shared/Logo'

// Style Imports
import tableStyles from '@core/styles/table.module.css'

const PreviewCard = ({ inventoryData, id }: { inventoryData: InventoryDetailType; id: string }) => {
    const [total, setTotal] = useState(0);

    useEffect(() => {
        let sum = 0;

        inventoryData.products.forEach(item => {
            sum += item.quantity
        })
        setTotal(sum)
    }, [inventoryData])

    return (
        <div id='InventoryCard'>
            <Card>
                <CardContent className='sm:!p-12'>
                    <Grid container spacing={6}>
                        <Grid item xs={12}>
                            <div className='p-6 bg-actionHover rounded'>
                                <div className='flex justify-between gap-y-4 flex-col sm:flex-row'>
                                    <div className='flex flex-col gap-6'>
                                        <div className='flex items-center gap-2.5'>
                                            <Logo />
                                        </div>
                                        <div>
                                            <Typography color='text.primary'>420 Nơ Trang Long, P. 13</Typography>
                                            <Typography color='text.primary'>Quận Bình Thạnh, TP.HCM, Việt Nam</Typography>
                                            <Typography color='text.primary'>(84 28) 3553 3999 - 3553 3888</Typography>
                                            <Typography color='text.primary'>19001960</Typography>
                                        </div>
                                    </div>
                                    <div className='flex flex-col gap-6'>
                                        <Typography variant='h5'>{`Inventory #${id}`}</Typography>
                                        <div className='flex flex-col gap-1'>
                                            <Typography color='text.primary'>{`Date: ${inventoryData.created}`}</Typography>
                                            {/* <Typography color='text.primary'>{`Date Due: ${inventoryData.dueDate}`}</Typography> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={6}>
                                <Grid item xs={12} sm={6}>
                                    <div className='flex flex-col gap-4'>
                                        <Typography className='font-medium' color='text.primary'>
                                            Inventory To:
                                        </Typography>
                                        <div>
                                            <Typography>{inventoryData.store.storeid}</Typography>
                                            <Typography>{inventoryData.store.retailname}</Typography>
                                            <Typography>{inventoryData.store.retailsystem}</Typography>
                                        </div>
                                    </div>
                                </Grid>
                                {/* <Grid item xs={12} sm={6}>
                                <div className='flex flex-col gap-4'>
                                    <Typography className='font-medium' color='text.primary'>
                                        Bill To:
                                    </Typography>
                                    <div>
                                        <div className='flex items-center gap-4'>
                                            <Typography className='min-is-[100px]'>Total Due:</Typography>
                                            <Typography>$12,110.55</Typography>
                                        </div>
                                        <div className='flex items-center gap-4'>
                                            <Typography className='min-is-[100px]'>Bank name:</Typography>
                                            <Typography>American Bank</Typography>
                                        </div>
                                        <div className='flex items-center gap-4'>
                                            <Typography className='min-is-[100px]'>Country:</Typography>
                                            <Typography>United States</Typography>
                                        </div>
                                        <div className='flex items-center gap-4'>
                                            <Typography className='min-is-[100px]'>IBAN:</Typography>
                                            <Typography>ETD95476213874685</Typography>
                                        </div>
                                        <div className='flex items-center gap-4'>
                                            <Typography className='min-is-[100px]'>SWIFT code:</Typography>
                                            <Typography>BR91905</Typography>
                                        </div>
                                    </div>
                                </div>
                            </Grid> */}
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <div className='overflow-x-auto border rounded'>
                                <table className={tableStyles.table}>
                                    <thead className='border-bs-0'>
                                        <tr>
                                            <th className='!bg-transparent'>ID</th>
                                            <th className='!bg-transparent'>Category</th>
                                            <th className='!bg-transparent'>Code</th>
                                            <th className='!bg-transparent'>Name</th>
                                            <th className='!bg-transparent'>Quantity</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {inventoryData.products.map((item, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <Typography color='text.primary'>{index + 1}</Typography>
                                                </td>
                                                <td>
                                                    <Typography color='text.primary'>{item.product.category}</Typography>
                                                </td>
                                                <td>
                                                    <Typography color='text.primary'>{item.product.code}</Typography>
                                                </td>
                                                <td>
                                                    <Typography color='text.primary'>{item.product.name}</Typography>
                                                </td>
                                                <td>
                                                    <Typography color='text.primary'>{item.quantity}</Typography>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <div className='flex justify-between flex-col gap-y-4 sm:flex-row'>
                                <div className='flex flex-col gap-1 order-2 sm:order-[unset]'>
                                    {/* <div className='flex items-center gap-2'>
                                    <Typography className='font-medium' color='text.primary'>
                                        Salesperson:
                                    </Typography>
                                    <Typography>Tommy Shelby</Typography>
                                </div> */}
                                    <Typography>Thanks for your business</Typography>
                                </div>
                                <div className='min-is-[200px]'>
                                    <div className='flex items-center justify-between'>
                                        <Typography>Subtotal:</Typography>
                                        <Typography className='font-medium' color='text.primary'>
                                            {total}
                                        </Typography>
                                    </div>
                                    <div className='flex items-center justify-between'>
                                        <Typography>Discount:</Typography>
                                        <Typography className='font-medium' color='text.primary'>
                                            0
                                        </Typography>
                                    </div>
                                    <div className='flex items-center justify-between'>
                                        <Typography>Tax:</Typography>
                                        <Typography className='font-medium' color='text.primary'>
                                            0
                                        </Typography>
                                    </div>
                                    <Divider className='mlb-2' />
                                    <div className='flex items-center justify-between'>
                                        <Typography>Total:</Typography>
                                        <Typography className='font-medium' color='text.primary'>
                                            {total}
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider className='border-dashed' />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>
                                <Typography component='span' className='font-medium' color='text.primary'>
                                    Note:
                                </Typography>{' '}
                                It was a pleasure working with you and your team. We hope you will keep us in mind for future freelance
                                projects. Thank You!
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </div>
    )
}

export default PreviewCard
