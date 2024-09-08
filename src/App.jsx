import { Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
// import Test from "./Test";
import HomePage from "./pages/home/HomePage";
import Dashboard from "./pages/home/Dashboard";

function App() {
  return (
    <Routes>
      {/* <Route element={<Test />} path="/test" /> */}
      <Route element={<HomePage />} path="/" />
      <Route element={<Dashboard />} path="/dashboard" />
      <Route element={<Login />} path="/auth/login" />
      <Route element={<Register />} path="/auth/register" />
    </Routes>
  );
}

export default App;
