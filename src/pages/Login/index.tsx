import { ChangeEvent, useState } from "react";
import { Box, Button, Container, Center, Input, Text } from "@mantine/core"

import useLoginMutation from "../../hooks/useLoginMutation";

import { LoginParams } from "../../types/domain";

const initialLoginParams: LoginParams = {
  username: "",
  password: "",
};

const Login = () => {
  const [loginParams, setLoginParams] = useState<LoginParams>(initialLoginParams);
  const [login, { isLoading }] = useLoginMutation();

  const handleLogin = async () => {
    await login(loginParams);
  };

  return (
    <Container size="xs" px="xs" py="xl">
      <Center py="xl">
        <Text size="xl" weight="bold">Logbook Jammer</Text>
      </Center>
      <Box py="xl">
        <Text>Username</Text>
        <Box pt="xs" />
        <Input
          value={loginParams.username}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setLoginParams({ ...loginParams, username: e.target.value })}
        />
      </Box>
      <Box py="sm">
        <Text>Password</Text>
        <Box pt="xs" />
        <Input
          type="password"
          value={loginParams.username}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setLoginParams({ ...loginParams, password: e.target.value })}
        />
      </Box>
      <Box py="xl">
        <Button variant="light" color="blue" fullWidth mt="md" radius="md" disabled={isLoading} onClick={handleLogin}>
          Login
        </Button>
      </Box>
    </Container>
  );
}

export default Login;
