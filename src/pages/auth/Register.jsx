import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  CardBody,
  Card,
  CardHeader,
  CardFooter,
  Button,
} from "@nextui-org/react";
import HandleController from "../../components/controller/HandleController";
import { register } from "../../store/slice/authSlice";
import { Link, useNavigate } from "react-router-dom";
import HomeIcon from "../../assets/icon/HomeIcon";
import { zodResolver } from "@hookform/resolvers/zod";
import { authRegisterSchema } from "../../schema";
import { toast } from "react-toastify";

const Register = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      email: "",
      username: "",
      password: "",
      role: "employee",
    },
    resolver: zodResolver(authRegisterSchema),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = (data) => {
    dispatch(register(data));
    console.log(data);
    toast.success("Register berhasil");
    navigate("/auth/login");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="absolute left-5 top-5">
        <HomeIcon />
      </div>
      <Card className="w-full max-w-sm p-4 shadow-lg">
        <form onSubmit={handleSubmit(handleRegister)} className="space-y-4">
          <CardHeader className="flex flex-col justify-center ">
            <div className="font-semibold text-gray-800 text-3xl pb-2">
              Register
            </div>
            <p>
              Already have an account?{" "}
              <span
                onClick={() => navigate("/auth/login")}
                className="text-blue-600 hover:text-primary-300 transition-colors cursor-pointer"
              >
                Login
              </span>
            </p>
          </CardHeader>
          <CardBody className="space-y-4">
            <HandleController
              name={"name"}
              control={control}
              label={"Name"}
              type={"text"}
            />
            <HandleController
              name={"email"}
              control={control}
              label={"Email"}
              type={"email"}
            />
            <HandleController
              name={"username"}
              control={control}
              label={"Username"}
              type={"text"}
            />
            <HandleController
              name={"password"}
              control={control}
              label={"Password"}
              type={"password"}
            />
          </CardBody>
          <CardFooter className="pt-4">
            <Button
              fullWidth
              color="primary"
              type="submit"
              className="bg-black text-white text-lg hover:bg-gray-800 transition-colors items-center"
            >
              Register
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};
export default Register;
