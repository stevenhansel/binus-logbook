import { useFormik } from 'formik';

import { Box, Button } from 'components/atoms';
import { TextField } from 'components/molecules';
import { loginForm } from 'schemas';

export default function Login() {
  const { values, setFieldValue } = useFormik({
    ...loginForm,
    onSubmit: () => {
      // call tauri
    },
  });


  return (
    <Box className="flex flex-col w-full">
      <Box className="mb-4">
        <TextField
          value={values.email}
          onChange={(e) => setFieldValue('email', e.target.value)}
          type="email"
          label="Email"
        />
        <TextField
          value={values.password}
          onChange={(e) => setFieldValue('password', e.target.value)}
          type="password"
          label="Password"
        />
      </Box>

      <Button className="mx-auto">Login</Button>
    </Box>
  );
}
