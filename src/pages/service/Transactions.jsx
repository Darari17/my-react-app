import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTranscation } from "../../store/slice/transactionSlice";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import AddTransaction from "../../components/transactions/AddTransaction";
import DetailTransaction from "../../components/transactions/DetailTransaction";

const Transactions = () => {
  const transactions = useSelector((state) => state.transaction.bills);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTranscation());
  }, [dispatch]);

  return (
    <>
      <Table
        aria-label="Transactions"
        topContent={
          <div className="flex justify-between">
            <p className="text-xl font-bold relative top-3 left-3">
              Transactions
            </p>
            <div className="relative right-3">
              <AddTransaction />
            </div>
          </div>
        }
        removeWrapper
      >
        <TableHeader>
          <TableColumn className="text-md bg-black text-gray-100" width={"25%"}>
            Id
          </TableColumn>
          <TableColumn className="text-md bg-black text-gray-100" width={"25%"}>
            Name
          </TableColumn>
          <TableColumn
            className="text-md bg-black text-gray-100 pr-6"
            align="end"
          >
            Details
          </TableColumn>
        </TableHeader>

        <TableBody>
          {transactions.map((item) => {
            return (
              <TableRow key={item.id}>
                <TableCell>{item.customer.id.slice(0, 8)}</TableCell>
                <TableCell>{item.customer.name}</TableCell>
                <TableCell align="end" className="space-x-2">
                  <DetailTransaction details={item.billDetails} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};

export default Transactions;
