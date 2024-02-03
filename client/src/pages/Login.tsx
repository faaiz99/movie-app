import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { authenticationUser } from "../services/auth";
import { useState } from "react";
import { useAuthStore } from "../store/store";
import { Button } from "../components";
import { loginSchema } from "../schemas/user";
import { zodResolver } from "@hookform/resolvers/zod";
type AuthenticationInputs = {
  email: string;
  password: string;
  remember: boolean;
};

export const Login = () => {
  const [loading, setLoading] = useState(false);
  const setSession = useAuthStore((state) => state.setSession);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthenticationInputs>({
    resolver: zodResolver(loginSchema),
  });
  const onSubmit: SubmitHandler<AuthenticationInputs> = async (data) => {
    setLoading(true);
    const { email, password, remember } = data;
    try {
      const response = await authenticationUser({ email, password });
      if (response) setLoading(false);
      localStorage.setItem("movie-night-token", response.token);
      remember
        ? setSession({ ...response.user, token: response.token })
        : setSession({ ...response.user, token: "" });

      console.log("res", response);
      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
        <div className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
          <div className="space-y-4 rounded-md border-2 border-gray-300 p-6 shadow-xl dark:border-gray-700 sm:p-8 md:space-y-6">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
              Sign in to your account
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
                  Your email
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
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex h-5 items-center">
                    <input
                      {...register("remember", { required: false })}
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 h-4 w-4 rounded-md border border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-800 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
              </div>
              <Button
                type="submit"
                className="w-full rounded-md"
                isProcessing={loading}
                color="blue"
                title={"Sign in"}
              ></Button>
              <div className="flex gap-1">
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don't have an account yet?
                </p>
                <p
                  className="cursor-pointer text-sm font-medium text-zinc-600 hover:underline dark:text-zinc-500"
                  onClick={() => navigate("/sign-up")}
                >
                  {" "}
                  Sign up
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
