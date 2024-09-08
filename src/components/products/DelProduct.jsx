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
import { delProduct, getProduct } from "../../store/slice/productSlice";
import { toast } from "react-toastify";

const DelProduct = ({ id, name }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const dispatch = useDispatch();

  const handleDelete = (data) => {
    dispatch(delProduct(data));
    dispatch(getProduct());
    toast.warning("Berhasil dihapus");
  };

  return (
    <>
      <Button onPress={onOpen} color="danger" size="sm">
        Delete
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} hideCloseButton>
        <ModalContent>
          {(onClose) => {
            return (
              <div>
                <ModalHeader>Delete Confirmation</ModalHeader>
                <ModalBody>Are you sure you want to delete {name} ?</ModalBody>
                <ModalFooter>
                  <Button onPress={onClose} color="danger" variant="flat">
                    Cancel
                  </Button>
                  <Button color="danger" onPress={() => handleDelete(id)}>
                    Delete
                  </Button>
                </ModalFooter>
              </div>
            );
          }}
        </ModalContent>
      </Modal>
    </>
  );
};

export default DelProduct;
