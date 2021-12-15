import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface IForm {
  userId: string;
  password: string;
  rePassword: string;
  email: string;
  extraError?: string;
}

function ToDoList() {
  const { register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue
  } = useForm<IForm>({
    defaultValues: {
      email: "@naver.com"
    }
  });
  const onValid = (data: IForm) => {
    if (data.password !== data.rePassword) {
      setError("rePassword",
        { message: "Password are not the same" },
        { shouldFocus: true }
      );
    }
    setValue("userId", "");
    setValue("password", "");
    setValue("rePassword", "");
    setValue("email", "");
    // setError("extraError", { message: "Server Offline."})
  }
  return (
    <div>
      <h1>To Do</h1>
      <hr />
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit(onValid)}>
        <input
          {...register("userId",
            {
              required: "Input ID!!",
              validate: {
                noNico: async (value) => !value.includes("nico") ? "No noco allowed" : true,
                noNick: (value) => !value.includes("nick") ? "No nick allowed" : true,
              },
              minLength: {
                value: 5,
                message: "Your ID is too Short"
              },
            })}
          placeholder="Input ID" />
        <span>{errors?.userId?.message}</span>
        <input
          {...register("password",
            { required: true }
          )}
          placeholder="Input Password" />
        <span>{errors?.password?.message}</span>
        <input
          {...register("rePassword",
            { required: true })}
          placeholder="Input Password" />
        <span>{errors?.rePassword?.message}</span>
        <input
          {...register("email",
            {
              required: true,
              pattern: {
                value: /^[A-Za-z0-9._%+-]+@naver.com$/,
                message: "Input Naver Emails"
              }
            })}
          placeholder="Input Email" />
        <span>{errors?.email?.message}</span>
        <button>Add</button>
        <span>{errors?.extraError?.message}</span>
      </form>
      <ul></ul>
    </div>
  )
}

export default ToDoList;