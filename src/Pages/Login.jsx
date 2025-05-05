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
    <div className="w-[30%] mx-auto p-4  rounded-2xl">
      <h1 className="text-white text-2xl pb-2 pt-5">Create your Account credentials </h1>
      <form action="" onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-2 py-2 pl-4 bg-slate-700 text-white"  >
        <label htmlFor="">First Name</label>
        <input type="text" {...register("fname")} className="w-50 bg-slate-50 outline-none" />
        {errors.fname && <p className="text-red-400">{errors.fname.message}</p>}
        <label htmlFor=""> Last Name</label>
        <input type="text" {...register("lname")}  className="w-50 bg-slate-50 outline-none" />
        {errors.lname && <p className="text-red-400">{errors.lname.message}</p>}
        <label htmlFor=""> Email</label>
        <input type="text" {...register("email")}  className= "w-50 bg-slate-50 outline-none" />
        {errors.email && <p className="text-red-400">{errors.email.message}</p>}
        <label htmlFor=""> Passoword</label>
        <input type="text" {...register("password")}  className=" w-50 bg-slate-50 outline-none" />
        {errors.password && <p className="text-red-400">{errors.password.message}</p>}
        <button type="submit" className="bg-slate-600 text-white w-36 mr-75 rounded hover:bg-blue-700 transition duration-300">Create</button>
      </form>
    </div>
  );
}

export default Login;






