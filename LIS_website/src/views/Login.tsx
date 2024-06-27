'use client'

// React Imports
import { useState } from 'react'

// Next Imports
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'

// Component Imports

// Config Imports

// Styled Component Imports

// Third-party Imports
import { signIn } from 'next-auth/react'
import { Controller, useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { object, minLength, string, email } from 'valibot'
import type { SubmitHandler } from 'react-hook-form'
import type { Input } from 'valibot'

import AuthIllustrationWrapper from './AuthIllustrationWrapper'
import CustomTextField from '@core/components/mui/TextField'
import Logo from '@components/layout/shared/Logo'

type ErrorType = {
  message: string[]
}

type FormData = Input<typeof schema>

const schema = object({
  username: string([minLength(1, 'This field is required')]),
  password: string([
    minLength(1, 'This field is required'),
    //minLength(5, 'Password must be at least 5 characters long')
  ])
})



const Login = () => {

  // States
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [errorState, setErrorState] = useState<ErrorType | null>(null)

  // Hooks
  const router = useRouter()
  const searchParams = useSearchParams()

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: valibotResolver(schema),
    defaultValues: {
      username: '1',
      password: '1'
    }
  })

  const handleClickShowPassword = () => setIsPasswordShown(show => !show)

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    const res = await signIn('credentials', {
      username: data.username,
      password: data.password,
      redirect: false
    })

    if (res && res.ok && res.error === null) {
      // Save user abilities in cookie so we can retrieve it back on refresh

      // Vars
      const redirectURL = searchParams.get('redirectTo') ?? '/'

      router.push(redirectURL)
    } else {
      if (res?.error) {
        const error = JSON.parse(res.error)

        setErrorState(error)
      }
    }
  }

  return (
    <AuthIllustrationWrapper>
      <Card className='flex flex-col sm:is-[450px]'>
        <CardContent className='sm:!p-12'>
          <div className='flex justify-center mbe-6'>
            <Logo />
          </div>

          <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6'>
            <Controller
              name='username'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  autoFocus
                  fullWidth
                  type='username'
                  label='User name'
                  placeholder='Enter your user name'
                  onChange={e => {
                    field.onChange(e.target.value)
                    errorState !== null && setErrorState(null)
                  }}
                  {...((errors.username || errorState !== null) && {
                    error: true,
                    helperText: errors?.username?.message || errorState?.message[0]
                  })}
                />
              )}
            />
            <Controller
              name='password'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  label='Password'
                  placeholder='············'
                  id='login-password'
                  type={isPasswordShown ? 'text' : 'password'}
                  onChange={e => {
                    field.onChange(e.target.value)
                    errorState !== null && setErrorState(null)
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton edge='end' onClick={handleClickShowPassword} onMouseDown={e => e.preventDefault()}>
                          <i className={isPasswordShown ? 'tabler-eye' : 'tabler-eye-off'} />
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                  {...(errors.password && { error: true, x : errors.password.message })}
                />
              )}
            />
            <div className='flex justify-between items-center gap-x-3 gap-y-1 flex-wrap'>
              <FormControlLabel control={<Checkbox />} label='Remember me' />
              <Typography
                className='text-end'
                color='primary'
                component={Link}
                href='pages/auth/forgot-password-v1'
              >
                Forgot password?
              </Typography>
            </div>
            <Button fullWidth variant='contained' type='submit'>
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </AuthIllustrationWrapper>
  )
}

export default Login
