'use client'

// React Imports
import { useState, useEffect } from 'react'
import type { SyntheticEvent } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import InputAdornment from '@mui/material/InputAdornment'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import Divider from '@mui/material/Divider'
import InputLabel from '@mui/material/InputLabel'
import useMediaQuery from '@mui/material/useMediaQuery'
import type { Theme } from '@mui/material/styles'

// Third-party Imports
import classnames from 'classnames'

// Type Imports
import type { InventoryDetailType } from '@/types/inventoryTypes'

// Component Imports
import Logo from '@components/layout/shared/Logo'
import CustomTextField from '@core/components/mui/TextField'

// Styled Component Imports

// import AppReactDatepicker from '@/libs/styles/AppReactDatepicker'

const EditCard = ({ inventoryData, id, data }: { inventoryData: InventoryDetailType; id: string; data: InventoryDetailType[] }) => {
    // States
    const [selectData, setSelectData] = useState<InventoryDetailType>(data[0])
    const [count, setCount] = useState(1)
    const [issueDate, setIssueDate] = useState(new Date(inventoryData.created))
    const [dueDate, setDueDate] = useState(new Date(inventoryData.created))

    const [total, setTotal] = useState(0);

    useEffect(() => {
        let sum = 0;

        inventoryData.products.forEach(item => {
            sum += item.quantity
        })
        setTotal(sum)
    }, [inventoryData])

    // Hooks
    const isBelowMdScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))

    const deleteForm = (e: SyntheticEvent) => {
        e.preventDefault()

        // @ts-ignore
        e.target.closest('.repeater-item').remove()
    }

    return (
        <>
            <Card>
                <CardContent className='sm:!p-12'>
                    <Grid container spacing={6}>
                        <Grid item xs={12}>
                            <div className='p-6 rounded bg-actionHover'>
                                <div className='flex justify-between gap-4 flex-col sm:flex-row'>
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
                                    <div className='flex flex-col gap-2'>
                                        <div className='flex flex-col gap-6'>
                                            <Typography variant='h5'>{`Inventory #${id}`}</Typography>
                                            <div className='flex flex-col gap-1'>
                                                <Typography color='text.primary'>{`Date: ${inventoryData.created}`}</Typography>
                                                {/* <Typography color='text.primary'>{`Date Due: ${inventoryData.dueDate}`}</Typography> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <div className='flex justify-between flex-col gap-4 flex-wrap sm:flex-row'>
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
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider className='border-dashed' />
                        </Grid>
                        <Grid item xs={12}>
                            {inventoryData.products.map((item, index) => (
                                <div
                                    key={index}
                                    className={classnames('repeater-item flex relative mbe-4 border rounded', {
                                        'mbs-8': !isBelowMdScreen,
                                        '!mbs-14': index !== 0 && !isBelowMdScreen,
                                        'gap-5': isBelowMdScreen
                                    })}
                                >
                                    <Grid container spacing={5} className='m-0 pbe-5'>
                                        <Grid item lg={1} md={1} sm={1} xs={12}>
                                            <Typography className='font-medium md:absolute md:-top-8' color='text.primary'>
                                                ID
                                            </Typography>
                                            <Typography className='mbe-5'>
                                                {index + 1}
                                            </Typography>
                                        </Grid>
                                        <Grid item lg={2} md={2} sm={2} xs={12}>
                                            <Typography className='font-medium md:absolute md:-top-8' color='text.primary'>
                                                Code
                                            </Typography>
                                            <Typography className='mbe-5'>
                                                {item.product.code}
                                            </Typography>
                                        </Grid>
                                        <Grid item lg={5} md={5} sm={5} xs={12}>
                                            <Typography className='font-medium md:absolute md:-top-8' color='text.primary'>
                                                Item
                                            </Typography>
                                            <Typography className='mbe-5'>
                                                {item.product.name}
                                            </Typography>
                                            {/* <CustomTextField select fullWidth defaultValue={item.product.name} className='mbe-5'>
                                                <MenuItem value='App Design'>App Design</MenuItem>
                                                <MenuItem value='App Customization'>App Customization</MenuItem>
                                                <MenuItem value='ABC Template'>ABC Template</MenuItem>
                                                <MenuItem value='App Development'>App Development</MenuItem>
                                            </CustomTextField> */}
                                            {/* <CustomTextField rows={2} fullWidth multiline defaultValue='Customization & Bug Fixes' /> */}
                                        </Grid>
                                        <Grid item lg={2} md={2} sm={2} xs={12}>
                                            <Typography className='font-medium md:absolute md:-top-8' color='text.primary'>
                                                Quantity
                                            </Typography>
                                            <CustomTextField
                                                {...(isBelowMdScreen && { fullWidth: true })}
                                                type='number'
                                                placeholder={item.quantity.toString()}
                                                defaultValue={item.quantity}
                                                className='mbe-5'
                                                InputProps={{ inputProps: { min: 0 } }}
                                            />
                                            {/* <div className='flex flex-col'>
                                                <Typography component='span' color='text.primary'>
                                                    Discount:
                                                </Typography>
                                                <div className='flex gap-2'>
                                                    <Typography component='span' color='text.primary'>
                                                        0%
                                                    </Typography>
                                                    <Tooltip title='Tax 1' placement='top'>
                                                        <Typography component='span' color='text.primary'>
                                                            0%
                                                        </Typography>
                                                    </Tooltip>
                                                    <Tooltip title='Tax 2' placement='top'>
                                                        <Typography component='span' color='text.primary'>
                                                            0%
                                                        </Typography>
                                                    </Tooltip>
                                                </div>
                                            </div> */}
                                        </Grid>
                                        {/* <Grid item md={2} xs={12}>
                                            <Typography className='font-medium md:absolute md:-top-8' color='text.primary'>
                                                Hours
                                            </Typography>
                                            <CustomTextField
                                                {...(isBelowMdScreen && { fullWidth: true })}
                                                type='number'
                                                placeholder='1'
                                                defaultValue='1'
                                                InputProps={{ inputProps: { min: 0 } }}
                                            />
                                        </Grid> */}
                                        <Grid item md={2} sm={2} xs={12}>
                                            <Typography className='font-medium md:absolute md:-top-8' color='text.primary'>
                                                Price
                                            </Typography>
                                            <Typography></Typography>
                                        </Grid>
                                    </Grid>
                                    <div className='flex flex-col justify-start border-is'>
                                        <IconButton size='small' onClick={deleteForm}>
                                            <i className='tabler-x text-actionActive' />
                                        </IconButton>
                                    </div>
                                </div>
                            ))}
                            {/* <Grid item xs={12}>
                                <Button
                                    size='small'
                                    variant='contained'
                                    onClick={() => setCount(count + 1)}
                                    startIcon={<i className='tabler-plus' />}
                                >
                                    Add Item
                                </Button>
                            </Grid> */}
                        </Grid>
                        <Grid item xs={12}>
                            <Divider className='border-dashed' />
                        </Grid>
                        <Grid item xs={12}>
                            <div className='flex justify-between flex-col gap-4 sm:flex-row'>
                                <div className='flex flex-col gap-4 order-2 sm:order-[unset]'>
                                    {/* <div className='flex items-center gap-2'>
                                        <Typography className='font-medium' color='text.primary'>
                                            Salesperson:
                                        </Typography>
                                        <CustomTextField defaultValue='Tommy Shelby' />
                                    </div>
                                    <CustomTextField defaultValue='Thanks for your business' /> */}
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

                                        </Typography>
                                    </div>
                                    <div className='flex items-center justify-between'>
                                        <Typography>Tax:</Typography>
                                        <Typography className='font-medium' color='text.primary'>

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
                        {/* <Grid item xs={12}>
                            <Divider className='border-dashed' />
                        </Grid>
                        <Grid item xs={12}>
                            <InputLabel htmlFor='invoice-note' className='inline-flex mbe-1 text-textPrimary'>
                                Note:
                            </InputLabel>
                            <CustomTextField
                                id='invoice-note'
                                rows={2}
                                fullWidth
                                multiline
                                className='border rounded'
                                defaultValue='It was a pleasure working with you and your team. We hope you will keep us in mind for future freelance
              projects. Thank You!'
                            />
                        </Grid> */}
                    </Grid>
                </CardContent>
            </Card >
        </>
    )
}

export default EditCard
