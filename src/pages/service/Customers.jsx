import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCustomer } from "../../store/slice/customerSlice";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import AddCustomer from "../../components/customers/AddCustomer";
import EditCustomer from "../../components/customers/EditCustomer";
import DelCustomer from "../../components/customers/DelCustomer";

const Customers = () => {
  const customers = useSelector((state) => state.customer.customers);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(getCustomer());
    }, 500);
  }, [dispatch]);

  return (
    <>
      <Table
        aria-label="Customer Lists"
        topContent={
          <div className="flex justify-between">
            <p className="text-xl font-bold relative top-3 left-3">Customers</p>
            <div className="relative right-3">
              <AddCustomer />
            </div>
          </div>
        }
        removeWrapper
      >
        <TableHeader>
          <TableColumn className="text-md bg-black text-gray-100" width={"25%"}>
            Name
          </TableColumn>
          <TableColumn className="text-md bg-black text-gray-100" width={"25%"}>
            Phone Number
          </TableColumn>
          <TableColumn className="text-md bg-black text-gray-100" width={"25%"}>
            Address
          </TableColumn>
          <TableColumn
            className="text-md bg-black text-gray-100 pr-14"
            align="end"
          >
            Actions
          </TableColumn>
        </TableHeader>

        <TableBody>
          {customers.map((customer) => {
            return (
              <TableRow key={customer.id}>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.phoneNumber}</TableCell>
                <TableCell>{customer.address}</TableCell>
                <TableCell align="end" className="space-x-2">
                  <EditCustomer id={customer.id} />
                  <DelCustomer id={customer.id} name={customer.name} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};

export default Customers;
