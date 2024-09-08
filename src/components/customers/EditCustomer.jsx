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
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { getCustomer, putCustomer } from "../../store/slice/customerSlice";
import HandleController from "../controller/HandleController";
import { zodResolver } from "@hookform/resolvers/zod";
import { editCustomerSchema } from "../../schema";
import { toast } from "react-toastify";

const EditCustomer = ({ id }) => {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      id: id,
      name: "",
      phoneNumber: "",
      address: "",
    },
    resolver: zodResolver(editCustomerSchema),
  });

  const handleEditCustomer = (data) => {
    dispatch(putCustomer(data));
    dispatch(getCustomer());
    toast.success("Edit berhasil");
  };

  return (
    <>
      <Button onPress={onOpen} color="warning" size="sm">
        Edit
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} hideCloseButton>
        <ModalContent>
          {(onClose) => {
            return (
              <form onSubmit={handleSubmit(handleEditCustomer)}>
                <ModalHeader>Edit Customer</ModalHeader>
                <ModalBody>
                  <HandleController
                    name={"name"}
                    control={control}
                    label={"Name"}
                    type={"text"}
                  />
                  <HandleController
                    name={"phoneNumber"}
                    control={control}
                    label={"Phone Number"}
                    type={"number"}
                  />
                  <HandleController
                    name={"address"}
                    control={control}
                    label={"Address"}
                    type={"text"}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button onPress={onClose} color="danger" variant="flat">
                    Close
                  </Button>
                  <Button type="submit" color="warning">
                    Edit
                  </Button>
                </ModalFooter>
              </form>
            );
          }}
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditCustomer;
