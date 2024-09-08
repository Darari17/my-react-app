import { z } from "zod";

export const authLoginSchema = z.object({
  username: z.string().min(5, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const authRegisterSchema = z.object({
  name: z.string().min(1, "Name is required").max(30),
  email: z.string().email("Invalid email address"),
  username: z.string().min(5, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  employee: z.string().default("employee"),
});

export const addProductSchema = z.object({
  name: z.string().min(1, "Product Name is required"),
  price: z.string().min(1, "Price is required"),
  type: z.string().default("Kg"),
});

export const editProductSchema = z.object({
  id: z.string().default(),
  name: z.string().min(1, "Product Name is required"),
  price: z.string().min(1, "Price is required"),
  type: z.string().default("Kg"),
});

export const addCustomerSchema = z.object({
  name: z.string().min(1, "Customer Name is required"),
  phoneNumber: z.string().min(1, "Phone Number is required"),
  address: z.string().min(1, "Address is required"),
});

export const editCustomerSchema = z.object({
  id: z.string().default(),
  name: z.string().min(1, "Customer Name is required"),
  phoneNumber: z.string().min(1, "Phone Number is required"),
  address: z.string().min(1, "Address is required"),
});

export const addTransactionSchema = z.object({
  customers: z.string().nonempty(),
  products: z.string().nonempty(),
  qty: z
    .number({ invalid_type_error: "Qty must be a number" })
    .min(1, "Quantity must be at least 1")
    .max(1000, "Quantity must be less than or equal to 1000"),
  total: z
    .number({ invalid_type_error: "Total must be a number" })
    .min(0, "Total cannot be less than 0"),
});
