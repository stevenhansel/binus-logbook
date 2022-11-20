import { useFormik } from 'formik';

import { Box, Button } from 'components/atoms';
import { TextField } from 'components/molecules';
import { loginForm } from 'schemas';
import { useLoginMutation } from 'api/mutations';
import { ClientLayout } from 'components/organisms';

export default function Login() {
  return (
    <ClientLayout>
      <Template />
    </ClientLayout>
  );
}

function Template() {
  const { mutateAsync: loginAsync } = useLoginMutation();

  const { values, setFieldValue } = useFormik({
    ...loginForm,
    onSubmit: async (values) => {
      try {
        const response = await loginAsync(values);
        console.log('response: ', response);
      } catch (err) {
        console.error('error: ', err);
      }
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
