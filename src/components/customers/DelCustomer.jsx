import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import React from "react";
import { useDispatch } from "react-redux";
import { delCustomer, getCustomer } from "../../store/slice/customerSlice";
import { toast } from "react-toastify";

const DelCustomer = ({ id, name }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const dispatch = useDispatch();

  const handleDeleteCustomer = (data) => {
    dispatch(delCustomer(data));
    dispatch(getCustomer());
    toast.warning("Berhasil dihapus");
  };
  return (
    <>
      <Button onPress={onOpen} color="danger" size="sm">
        Delete
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => {
            return (
              <>
                <ModalHeader>Delete Confirmation</ModalHeader>
                <ModalBody>Are you sure you want to delete {name} ?</ModalBody>
                <ModalFooter>
                  <Button onPress={onClose} color="danger" variant="flat">
                    Close
                  </Button>
                  <Button
                    onPress={() => handleDeleteCustomer(id)}
                    color="danger"
                  >
                    Delete
                  </Button>
                </ModalFooter>
              </>
            );
          }}
        </ModalContent>
      </Modal>
    </>
  );
};

export default DelCustomer;
