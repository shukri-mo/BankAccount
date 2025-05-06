import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useUser } from "../Context/UserContext";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
const schema = z.object({
  fname: z.string().min(1, "firstName is required"),
  lname: z.string().min(1, "Lname is required"),
  email: z.string().email("Invalid Email"),
  password: z.string().min(8, "Passowrd must be atleast 8 digits"),
});

function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });
  const { setUser } = useUser();
  const onSubmit = (data) => {
    console.log(data);
    setUser(data);
    reset();
    navigate("/account");
  };
  return (
    <>
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
  <div className="w-full max-w-md p-6 bg-slate-700 text-white rounded-2xl">
    <h1 className="text-2xl pb-4">Create your Account credentials</h1>
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
      <div>
        <label>First Name</label>
        <input {...register("fname")} className="w-full bg-slate-50 text-black p-2 rounded outline-none" />
        {errors.fname && <p className="text-red-400">{errors.fname.message}</p>}
      </div>
      <div>
        <label>Last Name</label>
        <input {...register("lname")} className="w-full bg-slate-50 text-black p-2 rounded outline-none" />
        {errors.lname && <p className="text-red-400">{errors.lname.message}</p>}
      </div>
      <div>
        <label>Email</label>
        <input {...register("email")} className="w-full bg-slate-50 text-black p-2 rounded outline-none" />
        {errors.email && <p className="text-red-400">{errors.email.message}</p>}
      </div>
      <div>
        <label>Password</label>
        <input type="password" {...register("password")} className="w-full bg-slate-50 text-black p-2 rounded outline-none" />
        {errors.password && <p className="text-red-400">{errors.password.message}</p>}
      </div>
      <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-300 w-full">
        Create
      </button>
    </form>
  </div>
</div>

    </>
  );
}

export default Login;






