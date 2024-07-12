'use client'

// React Imports
import { useState } from 'react'
import type { SyntheticEvent } from 'react';

// Next Imports
import Link from 'next/link'

import { getSession } from 'next-auth/react'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'

// Component Imports
import SendInvoiceDrawer from '@views/client/inventory/shared/SendInventoryDrawer'
import { useAddContext } from '@/@core/contexts/AddContext'
import { newInventory } from '@/stores/inventory'

// Third-party Imports
import dayjs from 'dayjs'

const AddActions = () => {
    // States
    const [sendDrawerOpen, setSendDrawerOpen] = useState(false)

    // Hooks
    const { selectData, setSelectData } = useAddContext()

    const handleSendRequest = async (e: SyntheticEvent) => {
        e.preventDefault()

        const session = await getSession()

        const inventory: any[] = []

        selectData.forEach(element => {
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

            setSelectData([])

            return res.json()

        } catch (e: any) {
            throw new Error(e.massage)
        }

    }

    // Hooks
    // const { lang: locale } = useParams()

    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <Card>
                    <CardContent className='flex flex-col gap-4'>
                        <Button
                            fullWidth
                            variant='contained'
                            className='capitalize'
                            startIcon={<i className='tabler-send' />}
                            onClick={handleSendRequest}
                            disabled={selectData.length === 0}
                        >
                            Send Inventory
                        </Button>
                        <Button
                            fullWidth
                            component={Link}
                            color='secondary'
                            variant='tonal'
                            className='capitalize'
                            href={'/'}
                            disabled
                        >
                            Preview
                        </Button>
                        <Button fullWidth color='secondary' variant='tonal' className='capitalize' disabled>
                            Save
                        </Button>
                    </CardContent>
                </Card>
                <SendInvoiceDrawer open={sendDrawerOpen} handleClose={() => setSendDrawerOpen(false)} />
            </Grid>

            {/* <Grid item xs={12}>
                <CustomTextField select fullWidth defaultValue='Internet Banking' label='Accept payments via'>
                    <MenuItem value='Internet Banking'>Internet Banking</MenuItem>
                    <MenuItem value='Debit Card'>Debit Card</MenuItem>
                    <MenuItem value='Credit Card'>Credit Card</MenuItem>
                    <MenuItem value='Paypal'>Paypal</MenuItem>
                    <MenuItem value='UPI Transfer'>UPI Transfer</MenuItem>
                </CustomTextField>
                <div className='flex items-center justify-between mbs-3'>
                    <InputLabel htmlFor='invoice-edit-payment-terms' className='cursor-pointer'>
                        Payment Terms
                    </InputLabel>
                    <Switch defaultChecked id='invoice-edit-payment-terms' />
                </div>
                <div className='flex items-center justify-between'>
                    <InputLabel htmlFor='invoice-edit-client-notes' className='cursor-pointer'>
                        Client Notes
                    </InputLabel>
                    <Switch id='invoice-edit-client-notes' />
                </div>
                <div className='flex items-center justify-between'>
                    <InputLabel htmlFor='invoice-edit-payment-stub' className='cursor-pointer'>
                        Payment Stub
                    </InputLabel>
                    <Switch id='invoice-edit-payment-stub' />
                </div>
            </Grid> */}
        </Grid>
    )
}

export default AddActions
