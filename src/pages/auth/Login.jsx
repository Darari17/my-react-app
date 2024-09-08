import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Spinner,
} from "@nextui-org/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { login } from "../../store/slice/authSlice";
import HandleController from "../../components/controller/HandleController";
import { useNavigate } from "react-router-dom";
import HomeIcon from "../../assets/icon/HomeIcon";
import { zodResolver } from "@hookform/resolvers/zod";
import { authLoginSchema } from "../../schema";
import { toast } from "react-toastify";

function Login() {
  const [isLoading, setLoading] = useState(false);
  const { control, handleSubmit } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: zodResolver(authLoginSchema),
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    try {
      const action = await dispatch(login(data));
      setLoading(true);

      setTimeout(() => {
        if (login.fulfilled.match(action)) {
          setLoading(false);
          toast.success("Login Berhasil");
          navigate("/dashboard");
        } else {
          setLoading(false);
          toast.error("Login Gagal");
          console.log("Login failed");
        }
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="absolute left-5 top-5">
        <HomeIcon />
      </div>
      <Card className="w-full max-w-sm p-4 shadow-lg">
        <form onSubmit={handleSubmit(handleLogin)}>
          <CardHeader className="flex justify-center text-2xl font-semibold text-gray-800">
            Login
          </CardHeader>
          <CardBody className="space-y-4">
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
          <CardFooter className="flex-col pt-4">
            <Button
              fullWidth
              type="submit"
              className="bg-black text-white text-lg hover:bg-gray-800 transition-colors"
            >
              {isLoading ? <Spinner size="sm" color="white" /> : "Login"}
            </Button>
            <p className="pt-2">
              Don't have an account?{" "}
              <span
                onClick={() => navigate("/auth/register")}
                className="text-blue-600 hover:text-primary-300 transition-colors cursor-pointer"
              >
                Register
              </span>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default Login;
