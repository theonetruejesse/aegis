import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { notifyAuthorities } from "../utils/NotifyAuthorities";
import { storage } from "../firebase";

export const NoThreat = (props) => {
  const history = useHistory();
  const pathname = window.location.pathname;
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>No Threat Detected Confirmation</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          No threat has been detected, please confirm to delete this footage.
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={() => {
              props.onClose();
              // removes '/vid/' from /vid/:id
              const vidId = pathname.substring(5);
              const storageRef = storage.ref();
              const desertRef = storageRef.child(vidId);

              desertRef.delete().then(() => {
                history.push("/");
              });
            }}
          >
            Confirm
          </Button>
          <Button
            variant="ghost"
            onClick={() => {
              props.onClose();
              history.push("/");
            }}
          >
            Save Footage
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export const NotifyAuthorities = (props) => {
  const history = useHistory();
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Notify Authorities Confirmation</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Threat has been detected. Confirm to notify the authorities. Please
          seek shelter in the meantime.
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={async () => {
              props.onClose();
              await notifyAuthorities();
              history.push("/");
            }}
          >
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
