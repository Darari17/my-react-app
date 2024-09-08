import React, { useEffect, useState } from "react";
import { Button, Spinner } from "@nextui-org/react";
import IconOut from "../../assets/icon/IconOut";
import Products from "../service/Products";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slice/authSlice";
import { useNavigate } from "react-router-dom";
import Customers from "../service/Customers";
import Transactions from "../service/Transactions";
import { toast } from "react-toastify";

const Dashboard = () => {
  const token = useSelector((state) => state.auth.token);
  const [active, setActive] = useState("Products");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth/login");
    toast.success("Logout berhasil");
  };

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [active]);

  const activeComponent = () => {
    if (loading) {
      return (
        <div className="relative flex flex-col items-center justify-center h-full bottom-32">
          <Spinner label="Loading..." color="default" size="lg" />
        </div>
      );
    }
    switch (active) {
      case "Products":
        return <Products />;
      case "Customers":
        return <Customers />;
      case "Transactions":
        return <Transactions />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex h-screen w-[20%] flex-col justify-between border-r bg-gray-100 shadow-lg">
        <div className="px-6 py-6 font-bold text-lg border-b ">
          ENIGMA LAUNDRY
        </div>

        <div className="px-6 py-4 text-gray-600 border-b  text-lg font-semibold">
          {token ? <p>Admin</p> : <>...</>}
        </div>

        <div className="flex-1 overflow-y-auto">
          <ul className="space-y-2 px-6 py-4">
            <li
              className="cursor-pointer py-2 px-6 hover:bg-black hover:text-white rounded"
              onClick={() => setActive("Products")}
            >
              Products
            </li>
            <li
              className="cursor-pointer py-2 px-6 hover:bg-black hover:text-white rounded"
              onClick={() => setActive("Customers")}
            >
              Customers
            </li>
            <li
              className="cursor-pointer py-2 px-6 hover:bg-black hover:text-white rounded"
              onClick={() => setActive("Transactions")}
            >
              Transactions
            </li>
          </ul>
        </div>

        <div className="px-6 py-2 cursor-pointer border-t  flex items-center justify-center gap-2">
          <Button
            className="text-lg font-semibold"
            size="lg"
            variant="light"
            endContent={<IconOut />}
            color="danger"
            fullWidth
            onPress={handleLogout}
          >
            Logout
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-6 w-screen justify-start m-10">
        {activeComponent()}
      </div>
    </div>
  );
};

export default Dashboard;
