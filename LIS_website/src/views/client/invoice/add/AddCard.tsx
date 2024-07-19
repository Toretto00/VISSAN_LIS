'use client'

// React Imports
import { useContext, useEffect, useState } from 'react'
import type { SyntheticEvent } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import InputAdornment from '@mui/material/InputAdornment'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Tooltip from '@mui/material/Tooltip'
import InputLabel from '@mui/material/InputLabel'
import useMediaQuery from '@mui/material/useMediaQuery'
import type { Theme } from '@mui/material/styles'

// Third-party Imports
import classnames from 'classnames'

// Type Imports
// import type { InvoiceType } from '@/types/apps/invoiceTypes'
import type { ProductType } from '@/types/productTypes'
import type { InventoryProductType } from '@/types/inventoryTypes'

// import type { FormDataType } from './AddCustomerDrawer'

// Component Imports
// import AddCustomerDrawer, { initialFormData } from './AddCustomerDrawer'
import Logo from '@components/layout/shared/Logo'
import CustomTextField from '@core/components/mui/TextField'
import { useAddContext } from '@/@core/contexts/AddContext'

// Styled Component Imports
// import AppReactDatepicker from '@/libs/styles/AppReactDatepicker'

const AddAction = ({ productData, storeid }: { productData: ProductType[], storeid: string }) => {
    // States
    // const [open, setOpen] = useState(false)
    // const [count, setCount] = useState(1)

    // const [selectData, setSelectData] = useState<InventoryProductType[]>([])

    const { selectDataInvoice, setSelectDataInvoice } = useAddContext();

    // const [issuedDate, setIssuedDate] = useState<Date | null | undefined>(null)
    // const [dueDate, setDueDate] = useState<Date | null | undefined>(null)

    // const [formData, setFormData] = useState<FormDataType>(initialFormData)

    // Hooks
    const isBelowMdScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))
    const isBelowSmScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))

    // const onFormSubmit = (data: FormDataType) => {
    //     setFormData(data)
    // }

    // useEffect(() => {
    //     console.log(selectData)
    // }, [selectData])

    const deleteForm = (e: SyntheticEvent, index: number) => {
        e.preventDefault()

        setSelectDataInvoice(prev => prev.filter((_, i) => i !== index))

        // @ts-ignore
        // e.target.closest('.repeater-item').remove()
    }

    return (
        <>
            <Card>
                <CardContent className='sm:!p-12'>
                    <Grid container spacing={6}>
                        <Grid item xs={12}>
                            <div className='p-6 bg-actionHover rounded'>
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
                                        <div className='flex flex-col gap-4'>
                                            <Typography className='font-medium' color='text.primary'>
                                                Inventory To:
                                            </Typography>
                                            <Typography variant='h5' className='min-is-[95px]' color='text.primary'>
                                                {storeid}
                                            </Typography>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Grid>

                        <Grid item xs={12}>
                            <Divider className='border-dashed' />
                        </Grid>

                        <Grid item xs={12}>
                            {selectDataInvoice.map((item, index) => (
                                <div
                                    key={index}
                                    className={classnames('repeater-item flex relative mbe-4 border rounded', {
                                        'mbs-8': !isBelowMdScreen,
                                        '!mbs-14': index !== 0 && !isBelowMdScreen,
                                        'gap-5': isBelowMdScreen
                                    })}
                                >
                                    <Grid container spacing={5} className='m-0 pbe-5'>
                                        <Grid item lg={6} md={5} xs={12}>
                                            <Typography className='font-medium md:absolute md:-top-8' color='text.primary'>
                                                Item
                                            </Typography>
                                            <CustomTextField select fullWidth value={item.product.code} className='mbe-5'
                                                onChange={(e) => {
                                                    e.preventDefault()

                                                    const code = e.target.value

                                                    const product = productData.find(item => item.code === code)!

                                                    const temp = [...selectDataInvoice]

                                                    temp[index].product = product

                                                    setSelectDataInvoice(temp)

                                                }}>
                                                {productData.map((item, index) => (
                                                    <MenuItem key={item.id} value={item.code}>{item.name}</MenuItem>
                                                ))}
                                            </CustomTextField>
                                        </Grid>
                                        <Grid item lg={2} md={3} xs={12}>
                                            <Typography className='font-medium md:absolute md:-top-8'>Cost</Typography>
                                            <CustomTextField
                                                {...(isBelowMdScreen && { fullWidth: true })}
                                                type='number'
                                                placeholder='0'
                                                defaultValue='0'
                                                className='mbe-5'
                                                InputProps={{ inputProps: { min: 0 } }}
                                                disabled
                                            />
                                            {/* <div className='flex flex-col'>
                                                <Typography component='span' color='text.primary'>
                                                    Discount:
                                                </Typography>
                                                <div className='flex gap-2'>
                                                    s<Typography component='span' color='text.primary'>
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
                                        <Grid item md={2} xs={12}>
                                            <Typography className='font-medium md:absolute md:-top-8'>Quantity</Typography>
                                            <CustomTextField
                                                {...(isBelowMdScreen && { fullWidth: true })}
                                                type='number'

                                                onChange={(e) => {
                                                    e.preventDefault()

                                                    const temp = [...selectDataInvoice]

                                                    temp[index].quantity = Number(e.target.value)
                                                    setSelectDataInvoice(temp)
                                                }}
                                                value={item.quantity}
                                                InputProps={{ inputProps: { min: 0 } }}
                                            />
                                        </Grid>
                                        <Grid item md={2} xs={12}>
                                            <Typography className='font-medium md:absolute md:-top-8'>Price</Typography>
                                            <Typography>$24.00</Typography>
                                        </Grid>
                                    </Grid>
                                    <div className='flex flex-col justify-start border-is'>
                                        <IconButton size='small' onClick={(e) => deleteForm(e, index)}>
                                            <i className='tabler-x text-actionActive' />
                                        </IconButton>
                                    </div>
                                </div>
                            ))}
                            <Grid item xs={12}>
                                <Button
                                    size='small'
                                    variant='contained'
                                    onClick={(e) => {
                                        e.preventDefault()
                                        setSelectDataInvoice(prev => [
                                            ...prev,
                                            {
                                                product: productData[0],
                                                quantity: 1
                                            }]
                                        )
                                    }}
                                    startIcon={<i className='tabler-plus' />}
                                >
                                    Add Item
                                </Button>
                            </Grid>
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
                                    <CustomTextField placeholder='Thanks for your business' /> */}
                                </div>
                                <div className='min-is-[200px]'>
                                    <div className='flex items-center justify-between'>
                                        <Typography>Subtotal:</Typography>
                                        <Typography className='font-medium' color='text.primary'>
                                            {selectDataInvoice.reduce((accumulator, currentValue) => {
                                                return accumulator + currentValue.quantity
                                            }, 0)}
                                        </Typography>
                                    </div>
                                    {/* <div className='flex items-center justify-between'>
                                        <Typography>Discount:</Typography>
                                        <Typography className='font-medium' color='text.primary'>
                                            $28
                                        </Typography>
                                    </div>
                                    <div className='flex items-center justify-between'>
                                        <Typography>Tax:</Typography>
                                        <Typography className='font-medium' color='text.primary'>
                                            21%
                                        </Typography>
                                    </div> */}
                                    <Divider className='mlb-2' />
                                    <div className='flex items-center justify-between'>
                                        <Typography>Total:</Typography>
                                        <Typography className='font-medium' color='text.primary'>
                                            {selectDataInvoice.reduce((accumulator, currentValue) => {
                                                return accumulator + currentValue.quantity
                                            }, 0)}
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

            {/* <AddCustomerDrawer open={open} setOpen={setOpen} onFormSubmit={onFormSubmit} /> */}
        </>
    )
}

export default AddAction
