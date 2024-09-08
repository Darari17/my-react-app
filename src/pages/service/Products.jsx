import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React, { useEffect } from "react";
import DelProduct from "../../components/products/DelProduct";
import AddProduct from "../../components/products/AddProduct";
import EditProduct from "../../components/products/EditProduct";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../store/slice/productSlice";

const Products = () => {
  const products = useSelector((state) => state.product.products);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(getProduct());
    }, 500);
  }, [dispatch]);

  return (
    <>
      <Table
        aria-label="List Products"
        topContent={
          <div className="flex justify-between">
            <p className="text-xl font-bold relative top-3 left-3">Products</p>
            <div className="relative right-3">
              <AddProduct />
            </div>
          </div>
        }
        removeWrapper
      >
        <TableHeader>
          <TableColumn className="text-md bg-black text-gray-100" width={"25%"}>
            Products
          </TableColumn>
          <TableColumn className="text-md bg-black text-gray-100" width={"20%"}>
            Price
          </TableColumn>
          <TableColumn className="text-md bg-black text-gray-100" width={"10%"}>
            Type
          </TableColumn>
          <TableColumn
            className="text-md bg-black text-gray-100 pr-14"
            align="end"
          >
            Actions
          </TableColumn>
        </TableHeader>

        <TableBody>
          {products.map((product) => {
            return (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.type}</TableCell>
                <TableCell align="end" className="space-x-2">
                  <EditProduct id={product.id} />
                  <DelProduct id={product.id} name={product.name} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};

export default Products;
