import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import HandleController from "../controller/HandleController";
import { useDispatch } from "react-redux";
import { getProduct, postProduct } from "../../store/slice/productSlice";
import { toNumber } from "../../util/transformData";
import { zodResolver } from "@hookform/resolvers/zod";
import { addProductSchema } from "../../schema";
import { toast } from "react-toastify";

const AddProduct = () => {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "",
      price: "",
      type: "Kg",
    },
    resolver: zodResolver(addProductSchema),
  });

  const handleCreate = (data) => {
    const transformedData = toNumber({ data, value: "price" });
    dispatch(postProduct(transformedData));
    onOpenChange(false);
    toast.success("Produk ditambahkan");
    reset();
  };

  useEffect(() => {
    setTimeout(() => {
      dispatch(getProduct());
    }, 500);
  }, [dispatch]);

  return (
    <>
      <Button onPress={onOpen} radius="sm" color="primary">
        Add Product
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} hideCloseButton>
        <ModalContent>
          {(onClose) => {
            return (
              <form onSubmit={handleSubmit(handleCreate)}>
                <ModalHeader>Add a new product</ModalHeader>
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

export default AddProduct;
