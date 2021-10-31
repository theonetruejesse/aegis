import { Wrapper } from "../components/Wrapper";
import { Box, Button, Link, Heading } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { InputField } from "../components/InputField";
import { useHistory, Link as ReactLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
// import { useGun } from "use-gun";
import {useEffect} from "react";


function Login() {
  const { login } = useAuth();
  const history = useHistory();

  // const { gun, connect, disconnect } = useGun();

    // useEffect(() => {
    //     connect();
    // }, []);


  return (
    <Wrapper variant="small">
        
 <Heading p={3}>Sign into Account</Heading>
      <Box shadow="md" borderWidth="1px" borderRadius="md" p={5}>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={async (values, { setErrors }) => {
            try {
              await login(values.email, values.password);
              // const users = gun.get('users');
              // const user = gun.get(`${values.email}`)
              // users.set(user);
              history.push("/");
            } catch {
              setErrors("Failed to log in");
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <InputField name="email" placeholder="email" label="Email" />
              <Box mt={3}>
                <InputField
                  name="password"
                  placeholder="password"
                  label="Password"
                  type="password"
                />
              </Box>
              <Button
                type="submit"
                colorScheme="teal"
                isLoading={isSubmitting}
                mt={4}
              >
                Login
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
      <Box mt={3} ml={5}>
        Don't have an account yet?{" "}
        <Link as={ReactLink} to="/register" color="teal">
          Register here.
        </Link>
      </Box>
    </Wrapper>
  );
}

export default Login;
