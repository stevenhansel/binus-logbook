import { ChangeEvent, useCallback, useEffect, useState, ReactNode } from 'react'
import { Box, Button, Container, Center, Input, Text, Loader } from '@mantine/core'
import { showNotification } from '@mantine/notifications';
import { ZodError } from 'zod'

import useLoginMutation from '../../hooks/useLoginMutation'
import useStore from '../../stores'

import { loginSchema } from '../../schemas'

import parseError from '../../utils/parseError'

import { LoginParams } from '../../types/domain'
import { ErrorCodeToMessageMap } from '../../types/errors'

const emailKey = 'email'
const passwordKey = 'password'
const errKeys = [emailKey, passwordKey]

const initialLoginParams: LoginParams = {
  [emailKey]: '',
  [passwordKey]: ''
}

const Login = (): ReactNode => {
  const [loginParams, setLoginParams] = useState<LoginParams>(initialLoginParams)
  const [login, { isLoading, error: loginError, isFired }] = useLoginMutation()

  const [error, setError] = useState<ErrorCodeToMessageMap>({})

  const setIsAuth = useStore((state) => state.setIsAuth)

  const handleLogin = useCallback(async () => {
    setError({})

    try {
      loginSchema.parse(loginParams)
      await login(loginParams)
    } catch (err: unknown) {
      if (err instanceof ZodError) {
        setError(parseError(errKeys, err.issues))
      }
      console.error(err)
    }
  }, [loginParams])

  useEffect(() => {
    if (!isLoading && !loginError && isFired) {
      setIsAuth(true)
    }

    if (!isLoading && loginError && isFired) {
      showNotification({
        message: loginError,
        autoClose: 5000,
      })
    }
  }, [isLoading, loginError, isFired]);

  return (
    <Container size="xs" px="xs" py="xl">
      <Center py="xl">
        <Text size="xl" weight="bold">Logbook Jammer</Text>
      </Center>
      <Box py="xl">
        <Text>Email</Text>
        <Box pt="xs" />
        <Input
          value={loginParams.email}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setLoginParams({ ...loginParams, email: e.target.value })}
        />
        {!!error[emailKey] && (
          <Text color="red">{error[emailKey]}</Text>
        )}
      </Box>
      <Box py="sm">
        <Text>Password</Text>
        <Box pt="xs" />
        <Input
          type="password"
          value={loginParams.password}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setLoginParams({ ...loginParams, password: e.target.value })}
        />
        {!!error[passwordKey] && (
          <Text color="red">{error[passwordKey]}</Text>
        )}
      </Box>
      <Box py="xl">
        <Button
          variant="light"
          color="blue"
          fullWidth
          mt="md"
          radius="md"
          disabled={isLoading}
          onClick={handleLogin}
          leftIcon={(
            isLoading && <Loader size="sm" />
          )}
        >
          Login
        </Button>
      </Box>
    </Container>
  )
}

export default Login
