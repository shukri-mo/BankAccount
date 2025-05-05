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
    <div>
      <h1>Create your Account credentials </h1>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="">First Name</label>
        <input type="text" {...register("fname")} />
        {errors.fname && <p>{errors.fname.message}</p>}
        <label htmlFor=""> Last Name</label>
        <input type="text" {...register("lname")} />
        {errors.lname && <p>{errors.lname.message}</p>}
        <label htmlFor=""> Email</label>
        <input type="text" {...register("email")} />
        {errors.email && <p>{errors.email.message}</p>}
        <label htmlFor=""> Passoword</label>
        <input type="text" {...register("password")} />
        {errors.password && <p>{errors.password.message}</p>}
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default Login;






