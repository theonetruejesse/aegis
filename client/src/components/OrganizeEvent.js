import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { InputField } from "./InputField";
import { TextField } from "./TextField";
import { DateAndTimePicker } from "./DateAndTimePicker";
// import { useGun } from "use-gun/lib";
import { useEffect } from "react";
import { v4 } from "uuid";
import { useAuth } from "../contexts/AuthContext";
import UploadButton from "./UploadButton";
import { db } from "../firebase";

export const OrganizeEvent = (props) => {
  const { currentUser } = useAuth();
  // const { gun, connect, disconnect } = useGun();
  // useEffect(() => {
  //   connect();
  // }, []);
  return (
    <Box flex="15">
      <Formik
        initialValues={{ event: "", hashtag: "", about: "" }}
        onSubmit={async (values, { setErrors }) => {
          // const token = v4();
          // const user = gun.get(props.user);
          // const posts = gun.get("posts")
          // const post = gun.get(token).put({ ...values, user: currentUser.email });
          // posts.set(post);
          // user.set(post);
          db.collection("events")
            .add({
              event: values.event,
              hashtag: values.hashtag,
              about: values.about,
            })
            .then((docRef) => {
              console.log("Document written with ID: ", docRef.id);
            })
            .catch((error) => {
              console.error("Error adding document: ", error);
            });
          props.handleSubmit();
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box
              m={3}
              p={5}
              shadow="md"
              borderWidth="1px"
              borderRadius="md"
              w="100%"
            >
              <Heading>Organize the Future.</Heading>
              <Box mt={3}>
                <InputField
                  name="event"
                  placeholder="event name"
                  label="Event"
                />
              </Box>

              {/* <Box mt={3}>
                <Text>Date and Time</Text>
                <Box
                  border="1px"
                  borderColor="gray.200"
                  p={2}
                  borderRadius="md"
                >
                  <DateAndTimePicker />
                </Box>
              </Box> */}
              <Box mt={3}>
                <InputField
                  name="hashtag"
                  placeholder="#hashtag"
                  label="Hash Tag"
                />
              </Box>
              <Box mt={3}>
                <TextField
                  name="about"
                  placeholder="why are you fighting?"
                  label="About"
                  h="30vh"
                />
              </Box>
              {/* <Box mt={9} alignItems="center" display="flex" flexDir="column">
                <Text>Upload Image</Text>
                <UploadButton />
              </Box> */}
              <Button
                type="submit"
                colorScheme="teal"
                isLoading={isSubmitting}
                mt={4}
                size="lg"
              >
                Share With the World!
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
