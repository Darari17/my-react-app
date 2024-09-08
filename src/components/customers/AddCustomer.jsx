import React, { useEffect } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { getCustomer, postCustomer } from "../../store/slice/customerSlice";
import HandleController from "../controller/HandleController";
import { zodResolver } from "@hookform/resolvers/zod";
import { addCustomerSchema } from "../../schema";
import { toast } from "react-toastify";

const AddCustomer = () => {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      phoneNumber: "",
      address: "",
    },
    resolver: zodResolver(addCustomerSchema),
  });

  const handleCreate = (data) => {
    dispatch(postCustomer(data));
    toast.success("Customer ditambahkan");
  };

  useEffect(() => {
    setTimeout(() => {
      dispatch(getCustomer());
    }, 500);
  }, [dispatch]);

  return (
    <>
      <Button onPress={onOpen} color="primary">
        Add Customer
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => {
            return (
              <form onSubmit={handleSubmit(handleCreate)}>
                <ModalHeader>Add a new Customer</ModalHeader>
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
                  <Button type="submit" color="primary">
                    Add
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

export default AddCustomer;
