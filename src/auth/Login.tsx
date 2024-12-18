import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoginInputState, userLoginSchema, userSignupSchema } from "@/schema/userSchema";
import { Separator } from "@radix-ui/react-separator";
import { Link2, Loader2, LockKeyhole, Mail } from "lucide-react";
import { ChangeEvent, ChangeEventHandler, FormEvent, useState } from "react";
import { Link } from "react-router-dom";

/*type LoginInputState2 ={
    email:string;
    password:string;
}*/
const Login = () => {
  const [input, setInput] = useState<LoginInputState>({
    email: "",
    password: "",
  });
  const[Errors,setErrors]= useState<Partial<LoginInputState>>({});
  const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };
  const loginSubmitHandler =  (e:FormEvent) => {
    e.preventDefault();
    const result=userLoginSchema.safeParse(input);
    if(!result.success){
      const fieldErrors=result.error.formErrors.fieldErrors;
      setErrors(fieldErrors as Partial<LoginInputState>);
      return;
    }
    console.log(input);
  };

  const loading = false;
  return (
    <>
      <div className="flex items-center justify-center h-screen w-screen">
        <form onSubmit={loginSubmitHandler} className="md:p-8 w-full max-w-md rounded-lg md:border border-gray-200 mx-4">
          <div className="mb-4">
          <h1 className="font-bold text-4xl text-green-700 tracking-wide">
  Eco<span className="text-blue-500">Move</span>
</h1>
          </div>
          <div className="mb-4">
            <div className="relative ">
              <Input
                type="email"
                name="email"
                placeholder="Enter Your Email"
                value={input.email}
                onChange={changeEventHandler}
                className="pl-10 focus-visible:ring-1"
              />
              <Mail className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
              {
              Errors && <span className="text-sm text-red-500">{Errors.email}</span>
            }
            </div>
          </div>
          <div className="mb-4">
            <div className="relative ">
              <Input
                type="password"
                name="password"
                placeholder="Enter Your Password"
                value={input.password}
                onChange={changeEventHandler}
                className="pl-10 focus-visible:ring-1"
              />
              <LockKeyhole className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
              {
              Errors && <span className="text-sm text-red-500">{Errors.password}</span>
            }
            </div>
          </div>
          <div className="mb-10">
            {loading ? (
              <Button disabled type="submit" className="w-full bg-orange hover:bg-hoverOrange">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please Wait
              </Button>
            ) : (
              <Button className="w-full bg-orange hover:bg-hoverOrange">
                Login
              </Button>
            )}
            <div className="mt-4">
            <Link to="/forgot-password" className="text-blue-500">Forgot Password</Link>
            </div>
            <Separator />
          </div>
          <p>
            Don't Have An Account?{" "}
            <Link to="/signup" className="text-blue-500">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};
export default Login;
