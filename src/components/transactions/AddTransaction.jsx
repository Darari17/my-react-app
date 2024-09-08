import {
  Modal,
  Button,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  SelectItem,
  useDisclosure,
  Select,
  Input,
} from "@nextui-org/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTranscation,
  postTransaction,
} from "../../store/slice/transactionSlice";
import { getProduct } from "../../store/slice/productSlice";
import { getCustomer } from "../../store/slice/customerSlice";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addTransactionSchema } from "../../schema";
import { toast } from "react-toastify";

const AddTransaction = () => {
  const products = useSelector((state) => state.product.products);
  const customers = useSelector((state) => state.customer.customers);
  const dispatch = useDispatch();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { control, handleSubmit, getValues, setValue, watch } = useForm({
    defaultValues: {
      customer: "",
      product: "",
      qty: "",
      total: 0,
    },
    resolver: zodResolver(addTransactionSchema),
  });

  useEffect(() => {
    dispatch(getTranscation());
    dispatch(getProduct());
    dispatch(getCustomer());
  }, [dispatch]);

  const handleAddTransaction = async (data) => {
    const payload = {
      customerId: data.customers,
      billDetails: [
        {
          product: {
            id: data.products,
          },
          qty: data.qty,
        },
      ],
    };

    try {
      await dispatch(postTransaction(payload));
      console.log(payload);
      toast.success("Transaks dibuat");
    } catch (error) {
      console.log(error);
    }
  };

  const calculate = (qty, price) => qty * price;

  return (
    <>
      <Button onPress={onOpen} color="primary" radius="sm">
        Create Transaction
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => {
            return (
              <form onSubmit={handleSubmit(handleAddTransaction)}>
                <ModalHeader>Create Transaction</ModalHeader>
                <ModalBody>
                  <Controller
                    name="customers"
                    control={control}
                    render={({ field, fieldState }) => {
                      return (
                        <Select
                          {...field}
                          aria-label="Select Customers"
                          label="Select Customers"
                          size="sm"
                          disabledKeys={customers
                            ?.filter(
                              (c) =>
                                c.name !== "Yanto Subidi" &&
                                c.name !== "Ana Maryani"
                            )
                            .map((c) => c.name)}
                          isInvalid={Boolean(fieldState.error)}
                          errorMessage={fieldState.error?.message}
                          is
                        >
                          {customers.map((customer) => {
                            return (
                              <SelectItem key={customer.id} value={customer.id}>
                                {customer.name}
                              </SelectItem>
                            );
                          })}
                        </Select>
                      );
                    }}
                  />

                  <Controller
                    name="products"
                    control={control}
                    render={({ field, fieldState }) => {
                      return (
                        <Select
                          {...field}
                          aria-label="Select Products"
                          label="Select Prooduct"
                          size="sm"
                          disabledKeys={products
                            ?.filter(
                              (p) =>
                                p.name !== "Cuci + Setrika" && p.name !== "Cuci"
                            )
                            .map((p) => p.name)}
                          onChange={(e) => {
                            field.onChange(e);
                            const selectedProduct = products.find(
                              (product) => product.id === e
                            );
                            if (selectedProduct) {
                              setValue(
                                "total",
                                calculate(
                                  getValues("qty"),
                                  selectedProduct.price
                                )
                              );
                            } else {
                              setValue("total", 0);
                            }
                          }}
                          isInvalid={Boolean(fieldState.error)}
                          errorMessage={fieldState.error?.message}
                        >
                          {products.map((product) => {
                            return (
                              <SelectItem key={product.id} value={product.id}>
                                {product.name}
                              </SelectItem>
                            );
                          })}
                        </Select>
                      );
                    }}
                  />

                  <Controller
                    name="qty"
                    control={control}
                    render={({ field, fieldState }) => {
                      return (
                        <Input
                          {...field}
                          label={"Qty"}
                          type="number"
                          size="sm"
                          onChange={(e) => {
                            const qty = parseFloat(e.target.value);
                            field.onChange(qty);
                            const selectedProduct = products.find(
                              (product) => product.id === getValues("products")
                            );
                            setValue(
                              "total",
                              calculate(qty, selectedProduct?.price || 0)
                            );
                          }}
                          isInvalid={Boolean(fieldState.error)}
                          errorMessage={fieldState.error?.message}
                        />
                      );
                    }}
                  />

                  <Controller
                    name="total"
                    control={control}
                    render={({ field }) => {
                      return (
                        <Input
                          {...field}
                          label={"Total"}
                          type="number"
                          isDisabled
                          size="sm"
                          value={watch("total")}
                        />
                      );
                    }}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button onPress={onClose}>Close</Button>
                  <Button type="submit">Submit</Button>
                </ModalFooter>
              </form>
            );
          }}
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddTransaction;
