import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler} from "react-hook-form";
import { authenticationUser } from "../services/api";

type AuthenticationInputs = {
  email:string
  password:string
  remember:boolean
}

export const Login = () => {
const navigate = useNavigate()
const { register, handleSubmit, formState: { errors } } = useForm<AuthenticationInputs>();
const onSubmit: SubmitHandler<AuthenticationInputs> = data => {
  const { email, password, remember } = data
  authenticationUser(email, password).then((response)=>{
    if(response.status === 200){
      if(remember){
        localStorage.setItem("movie-night-token", response.data.token)
      }
      // update zustand store

      // navigate to movies
      navigate("/movies")
    }
    else if (response.status === 401){
      // show error message
      console.log("error")
    }

  })
};
return <section className="bg-gray-50 dark:bg-gray-900">
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8 border-2 shadow-xl border-gray-300 rounded-md dark:border-gray-700">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Sign in to your account
          </h1>
          <form className="space-y-4 md:space-y-6"  onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="email" className={`block mb-2 text-sm font-medium text-gray-900 dark:text-white`}>Your email</label>
              <input {...register("email", {required:true})} type="email" name="email" id="email" className={`${errors.email? "border-red-500 focus:border-red-500 focus:ring-red-500  dark:border-red-500 dark:focus:border-red-500 dark:focus:ring-red-500" : "border-gray-300"}  bg-gray-50 border text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} placeholder="john@movie.com"  />
              {errors.email && <span className="text-red-500 text-xs font-semibold">*Email is required</span>}
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
              <input {...register("password", {required:true})} type="password" name="password" id="password" placeholder="••••••••" className={`${errors.password? "border-red-500 focus:border-red-500 focus:ring-red-500 dark:border-red-500 dark:focus:border-red-500 dark:focus:ring-red-500" : "border-gray-300"} bg-gray-50 border text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}  />
              {errors.password && <span className="text-red-500 text-xs font-semibold">*Password is required</span>}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input {...register("remember", {required:false})} id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded-md bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="remember" className="text-gray-800 dark:text-gray-300">Remember me</label>
                </div>
              </div>
            </div>
            <Button type="submit" className="w-full rounded-md">Sign in</Button>
            <div className="flex gap-1" >
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Don't have an account yet? 
            </p>
            <p className="font-medium text-zinc-600 hover:underline dark:text-zinc-500 text-sm cursor-pointer" onClick={()=> navigate("/signup")}> Sign up</p>
            </div>

          </form>
        </div>
      </div>
    </div>
  </section>
};
