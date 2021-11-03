import { Wrapper } from "../components/Wrapper";
import { Box, Button, Link, Heading, Text } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { InputField } from "../components/InputField";
import { useHistory } from "react-router-dom";
import { useQuery } from "../utils/useQuery";
import { useAuth } from "../contexts/AuthContext";

function Login() {
  const { login } = useAuth();
  const history = useHistory();
  const query = useQuery();

  return (
    <Wrapper variant="small">
      <Heading p={3}>Sign into account</Heading>
      <Box shadow="md" borderWidth="1px" borderRadius="md" p={5}>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={async (values, { setErrors }) => {
            try {
              await login(values.email, values.password);
              const link = query.get("next") || "/";
              history.push(link);
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
        {/* Don't have an account yet?{" "}
        <Link as={ReactLink} to="/register" color="teal">
          Register here.
        </Link> */}
        Contact admin{" "}
        <Link color="teal" key="Email" href="mailto:the.jesse.jlee@gmail.com">
          here
        </Link>{" "}
        to register.
      </Box>
    </Wrapper>
  );
}

export default Login;
