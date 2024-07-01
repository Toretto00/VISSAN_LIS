'use client'

// React Imports
import { useState, useEffect } from 'react'

// Next Imports
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

// MUI Imports
import { TextField, Button, Container, createTheme, ThemeProvider, Autocomplete, Grid } from '@mui/material'

import AddIcon from '@mui/icons-material/Add'
import SendIcon from '@mui/icons-material/Send'

import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

// Styled Component Imports
import styles from './requestForm.module.scss'

// Third-arty Imports
import { useSession } from 'next-auth/react'

// Hook Imports
import { useSettings } from '@core/hooks/useSettings'

import FullFeaturedCrudGrid from '@components/layout/shared/DataGrid'

interface category {
  id: number
  name: string
  code: string
}

interface product {
  id: number
  category: category
  name: string
  code: string
  description: string
  created: string
  updated: string
}

interface row {
  id: number
  name: product | undefined
  quantity: number
  unit: string
  rowManufactureDate: any
}

export default function Page() {
  const [productList, setProductList] = useState<product[]>([])
  const [productSelected, setProductSelected] = useState<product | undefined>()
  const [unit, setUnit] = useState('Kg')
  // const [manufactureDate, setManufactureDate] = useState<Dayjs | null>()
  const [quantity, setQuantity] = useState('')
  const [inventory, setInventory] = useState<row[]>([])
  const [invoice, setInvoice] = useState<row[]>([])

  // Hooks
  const router = useRouter()
  const { data: session } = useSession()
  const { settings } = useSettings()

  useEffect(() => {
    handleLoadProductList()
  }, [session])

  const handleLoadProductList = async () => {
    if (!session) return
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Products`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ` + session?.user.token
        }
      })

      const data = await res.json()

      if (res.status === 401) {
        throw new Error(JSON.stringify(data))
      }

      if (res.status === 200) {
        setProductList(data)
        return data
      }

      return null
    } catch (e: any) {
      throw new Error(e)
    }
  }

  const handleAddSample = () => {
    // if (productSelected === null) {
    //   setDisplay('flex')
    //   return
    // }
    // if (manufactureDate === null) {
    //   setDisplay('flex')
    //   return
    // }
    // if (quantity === '') {
    //   setDisplay('flex')
    //   return
    // }
    let count = 0
    let newRows = [...inventory]
    newRows.forEach(element => {
      if (element.name?.code == productSelected?.code) {
        element.quantity += parseInt(quantity)
        count++
      }
    })
    if (count === 0) {
      let newRow = {
        id: inventory.length + 1,
        name: productSelected,
        unit: unit,
        quantity: parseInt(quantity),
        // rowManufactureDate: manufactureDate?.format('DD/MM/YYYY').toString()
        rowManufactureDate: ''
      }
      newRows.push(newRow)
    }
    setInventory(newRows)
    resetValue()
    return
  }

  const handleSendRequest = async () => {
    let newInvoice: any[] = []

    if (typeof window !== 'undefined') {
      invoice.forEach(element => {
        newInvoice.push({
          product: {
            code: element?.name?.code
          },
          quantity: element?.quantity,
          // created: manufactureDate?.format('DD/MM/YYYY').toString(),
          // updated: manufactureDate?.format('DD/MM/YYYY').toString()
          created: '',
          updated: ''
        })
      })
    }

    try {
      const res = await fetch(`${process.env.API_URL}/api/Invoices?user=${session?.user.name}`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${session?.user.token}`
        },
        body: JSON.stringify(newInvoice)
      })

      const data = await res.json()

      if (res.status === 401) {
        throw new Error(JSON.stringify(data))
      }

      if (res.status === 200) {
        return data
      }

      return null
    } catch (e: any) {
      throw new Error(e.massage)
    }

    // api
    //   .post(`Invoices?user=${sessionStorage.getItem('userID')}`, newInvoice, {
    //     headers: {
    //       Authorization: `Bearer ${typeof window !== 'undefined' ? sessionStorage.getItem('token') : ''}`
    //     }
    //   })
    //   .catch(e => {
    //     console.log(e)
    //     sessionStorage.clear()
    //     router.push('/login')
    //   })
    setInvoice([])
  }

  const handleCreateInventory = () => {
    let newInventory: any[] = []
    if (typeof window !== 'undefined') {
      inventory.forEach(element => {
        newInventory.push({
          product: {
            code: element?.name?.code
          },
          quantity: element?.quantity,
          // created: manufactureDate?.format('DD/MM/YYYY').toString(),
          // updated: manufactureDate?.format('DD/MM/YYYY').toString()
          created: '',
          updated: ''
        })
      })
      // api
      //   .post(`Inventories?location=${sessionStorage.getItem('store')}`, newInventory, {
      //     headers: {
      //       Authorization: `Bearer ${typeof window !== 'undefined' ? sessionStorage.getItem('token') : ''}`
      //     }
      //   })
      //   .catch(e => {
      //     console.log(e)
      //     sessionStorage.clear()
      //     router.push('/login')
      //   })
      setInventory([])
    }
  }

  const resetValue = () => {
    // setProductSelected(undefined)
    // setManufactureDate(dayjs())
    setQuantity('')
  }

  const handleDeleteItem = (id: any, requestType: string) => {
    if (typeof id == 'number') {
      const temp = [...inventory]
      const newRows = temp.filter(item => item.id !== id)
      newRows.map((row, index) => {
        row['id'] = index + 1
      })
      console.log(temp)
      setInventory(newRows)
    } else {
      setInventory([])
    }
  }

  return (
    <div className={styles.container}>
      {/* <Header /> */}
      <Container maxWidth='lg'>
        <Grid container spacing={2} sx={{ mb: '16px' }}>
          <Grid item lg={3} md={4} xs={12}>
            {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker
                  timezone='Asia/Ho_Chi_Minh'
                  format='DD/MM/YYYY'
                  label='Ngày sản xuất'
                  // value={manufactureDate}
                  // onChange={setManufactureDate}
                  sx={{ width: '100%' }}
                />
              </DemoContainer>
            </LocalizationProvider> */}
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item lg={3} md={4} xs={6}>
            <Autocomplete
              options={productList}
              onChange={(event, value: any) => setProductSelected(value)}
              autoHighlight
              getOptionLabel={option => option.name}
              renderOption={(props, option) => {
                return (
                  <li {...props} key={option.id}>
                    {option.name}
                  </li>
                )
              }}
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
              className={styles.formChild}
            />
          </Grid>
          <Grid item lg={3} md={4} xs={3}>
            <TextField
              disabled
              fullWidth
              label='Đơn vị'
              value={unit}
              onChange={e => setUnit(e.target.value)}
              className={styles.formChild}
            />
          </Grid>
          <Grid item lg={3} md={6} xs={12}>
            <Button variant='contained' fullWidth onClick={() => handleAddSample()} sx={{ height: '100%' }}>
              <AddIcon sx={{ mr: '6px' }} />
              Thêm
            </Button>
          </Grid>
        </Grid>

        <FullFeaturedCrudGrid Row={inventory} requestType='1' handleDeleteItem={handleDeleteItem} />

        <Button fullWidth variant='contained' type='submit' onClick={handleCreateInventory}>
          <SendIcon sx={{ mr: '6px' }} />
          {'Gửi báo cáo tồn kho'}
        </Button>
      </Container>
    </div>
  )
}
