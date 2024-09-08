import React from "react";
import {
  Button,
  Modal,
  ModalContent,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";

const DetailTransaction = ({ details }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Tooltip content={"Tabel Bill"}>
        <Button onPress={onOpen} color="secondary" variant="solid" size="sm">
          Detail
        </Button>
      </Tooltip>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        radius="sm"
        size="3xl"
        hideCloseButton
      >
        <ModalContent>
          {(onClose) => {
            return (
              <>
                <div className="flex flex-col items-center justify-center px-4 pt-4 pb-4">
                  <Table
                    aria-label="Transactions"
                    bottomContent={
                      <div className="flex justify-end">
                        <Button onPress={onClose} color="danger" variant="flat">
                          Close
                        </Button>
                      </div>
                    }
                    removeWrapper
                  >
                    <TableHeader>
                      <TableColumn className="text-md bg-black text-gray-100">
                        CODE BILLS
                      </TableColumn>
                      <TableColumn className="text-md bg-black text-gray-100">
                        DATES
                      </TableColumn>
                      <TableColumn className="text-md bg-black text-gray-100">
                        PRODUCT
                      </TableColumn>
                      <TableColumn className="text-md bg-black text-gray-100">
                        QTY
                      </TableColumn>
                      <TableColumn className="text-md bg-black text-gray-100">
                        TOTAL
                      </TableColumn>
                    </TableHeader>

                    <TableBody>
                      {details.map((detail) => {
                        return (
                          <TableRow key={`${detail.id}`}>
                            <TableCell>{detail.id?.slice(0, 8)}</TableCell>
                            <TableCell>
                              {new Date(detail.createdAt).toLocaleString()}
                            </TableCell>
                            <TableCell>{detail.product.name}</TableCell>
                            <TableCell>{detail.qty}</TableCell>
                            <TableCell>
                              {detail.qty * detail.product.price}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </>
            );
          }}
        </ModalContent>
      </Modal>
    </>
  );
};

export default DetailTransaction;
