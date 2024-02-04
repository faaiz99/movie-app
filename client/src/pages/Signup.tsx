import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { registerUser } from "../services/auth";
import { useState } from "react";
import { Button } from "../components";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "../schemas/user";
type RegisterationInputs = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
};

export const Signup = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterationInputs>({
    resolver: zodResolver(userSchema),
  });
  const onSubmit: SubmitHandler<RegisterationInputs> = async (data) => {
    setLoading(true);
    const { email, password, firstName, lastName } = data;
    try {
      const response = await registerUser({
        email,
        password,
        firstName,
        lastName,
      });
      if (response) {
        setLoading(false);
        alert("Registered Successfully");
        navigate("/login");
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
        <div className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
          <div className=" space-y-4 rounded-md border-2 border-gray-300 p-6 shadow-xl dark:border-gray-700 sm:p-8 md:space-y-6">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
              Registeration
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <label
                  htmlFor="email"
                  className={`mb-2 block text-sm font-medium text-gray-900 dark:text-white`}
                >
                  Email
                </label>
                <input
                  {...register("email", { required: true })}
                  type="email"
                  name="email"
                  id="email"
                  className={`${
                    errors.email
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500  dark:border-red-500 dark:focus:border-red-500 dark:focus:ring-red-500"
                      : "border-gray-300"
                  }  focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm`}
                  placeholder="john@movie.com"
                />
                {errors.email && (
                  <span className="text-xs font-semibold text-red-500">
                    {errors.email?.message}
                  </span>
                )}
              </div>
              <div>
                <label
                  htmlFor="firstName"
                  className={`mb-2 block text-sm font-medium text-gray-900 dark:text-white`}
                >
                  First Name
                </label>
                <input
                  {...register("firstName", { required: true })}
                  type="text"
                  name="firstName"
                  id="firstName"
                  className={`${
                    errors.email
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500  dark:border-red-500 dark:focus:border-red-500 dark:focus:ring-red-500"
                      : "border-gray-300"
                  }  focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm`}
                  placeholder="john"
                />
                {errors.firstName && (
                  <div>
                    <span className="text-xs font-semibold text-red-500">
                      {errors.firstName?.message}
                    </span>
                  </div>
                )}
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className={`mb-2 block text-sm font-medium text-gray-900 dark:text-white`}
                >
                  Last Name
                </label>
                <input
                  {...register("lastName", { required: true })}
                  type="text"
                  name="lastName"
                  id="lastName"
                  className={`${
                    errors.lastName
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500  dark:border-red-500 dark:focus:border-red-500 dark:focus:ring-red-500"
                      : "border-gray-300"
                  }  focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm`}
                  placeholder="john@movie.com"
                />
                {errors.lastName && (
                  <span className="text-xs font-semibold text-red-500">
                    {errors.lastName?.message}
                  </span>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  {...register("password", { required: true })}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className={`${
                    errors.password
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500 dark:border-red-500 dark:focus:border-red-500 dark:focus:ring-red-500"
                      : "border-gray-300"
                  } focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm`}
                />
                {errors.password && (
                  <span className="text-xs font-semibold text-red-500">
                    {errors.password?.message}
                  </span>
                )}
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm Password
                </label>
                <input
                  {...register("confirmPassword", { required: true })}
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="••••••••"
                  className={`${
                    errors.confirmPassword
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500 dark:border-red-500 dark:focus:border-red-500 dark:focus:ring-red-500"
                      : "border-gray-300"
                  } focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm`}
                />
                {errors.confirmPassword && (
                  <span className="text-xs font-semibold text-red-500">
                    {errors.confirmPassword?.message}
                  </span>
                )}
              </div>
              <Button
                color="blue"
                type="submit"
                className="w-full rounded-md"
                isProcessing={loading}
                title={"Sign Up"}
              ></Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
