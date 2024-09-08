import React from "react";
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
import HandleController from "../controller/HandleController";
import { useDispatch } from "react-redux";
import { getProduct, putProduct } from "../../store/slice/productSlice";
import { toNumber } from "../../util/transformData";
import { zodResolver } from "@hookform/resolvers/zod";
import { editProductSchema } from "../../schema";
import { toast } from "react-toastify";

const EditProduct = ({ id }) => {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      id: id,
      name: "",
      price: "",
      type: "Kg",
    },
    resolver: zodResolver(editProductSchema),
  });

  const handleEdit = (data) => {
    const transformedData = toNumber({ data, value: "price" });
    dispatch(putProduct(transformedData));
    dispatch(getProduct());
    onOpenChange(false);
    reset();
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
              <form onSubmit={handleSubmit(handleEdit)}>
                <ModalHeader>Edit Product</ModalHeader>
                <ModalBody>
                  <HandleController
                    name={"name"}
                    control={control}
                    label={"Product Name"}
                    type={"text"}
                  />
                  <HandleController
                    name={"price"}
                    control={control}
                    label={"Price"}
                    type={"number"}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button onPress={onClose} color="danger" variant="flat">
                    Cancel
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

export default EditProduct;
