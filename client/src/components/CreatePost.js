import { Box, Button, Heading, Text } from "@chakra-ui/react";
import UploadButton from "./UploadButton";
import { Formik, Form } from "formik";
import { InputField } from "./InputField";
import { TextField } from "./TextField";
// import { useGun } from "use-gun/lib";
// import { useEffect } from "react";
import { v4 } from "uuid";
import { useAuth } from "../contexts/AuthContext";
// import { getNodeProperty, getNodePut } from "../utils/gunDB";
import { db } from "../firebase";

export const CreatePost = (props) => {

  // const { currentUser } = useAuth();
  // const { gun, connect, disconnect } = useGun();
  // useEffect(() => {
  //   connect();
  // }, []);
  return (
    <Box flex="15">
      <Formik
        initialValues={{ title: "", hashtag: "", post: "" }}
        onSubmit={async (values, { setErrors }) => {
          // const token = v4();
          // const posts = gun.get("posts");
          // const user = gun.get(currentUser);
          // const post = gun.get(token).put({
          //   data: {
          //     title: values.title,
          //     image: values.image,
          //     hashtag: values.hashtag,
          //     post: values.post,
          //   },
          // });
          // posts.set(post);
          // user.set(post);

          // console.log("before");
          // let a = getNodePut(post);

          // console.log(a)

          // console.log("start");
          // logGetAllNodeProperties(posts, "title");
          // console.log("mid");
          // logGetAllNodeProperties(user, "title");

          db.collection("posts")
            .add({
              title: values.title,
              hashtag: values.hashtag,
              post: values.post,
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
              <Heading>Tell Your Story.</Heading>
              <Box mt={3}>
                <InputField name="title" placeholder="title" label="Title" />
              </Box>
              <Box mt={3}>
                <InputField
                  name="hashtag"
                  placeholder="#hashtag"
                  label="Hash Tag"
                />
              </Box>
              <Box mt={3}>
                <TextField
                  name="post"
                  placeholder="what is your truth?"
                  label="Content"
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
