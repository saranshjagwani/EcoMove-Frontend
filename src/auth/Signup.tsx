import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {SignupInputState, userSignupSchema} from "@/schema/userSchema";
import { Separator } from "@radix-ui/react-separator";
import { Contact, Link2, Loader2, LockKeyhole, Mail, PhoneOutgoing, User } from "lucide-react";
import { ChangeEvent, ChangeEventHandler, FormEvent, useState } from "react";
import { Link } from "react-router-dom";

/*type LoginInputState2 ={
    email:string;
    password:string;
}*/
const Signup = () => {
  const [input, setInput] = useState<SignupInputState>({
    fullname:"",
    email: "",
    password: "",
    contact:""
  });
  const[Errors,setErrors]= useState<Partial<SignupInputState>>({});
  const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };
  const loginSubmitHandler = (e:FormEvent) => {
    e.preventDefault();
    const result=userSignupSchema.safeParse(input);
    if(!result.success){
      const fieldErrors=result.error.formErrors.fieldErrors;
      setErrors(fieldErrors as Partial<SignupInputState>);
      return;
    }
    //login api implementation
    console.log(input);
  };

  const loading = false;
  return (
    <>
      <div className="flex items-center justify-center h-screen w-screen">
        <form onSubmit={loginSubmitHandler} className="md:p-8 w-full max-w-md rounded-lg md:border border-gray-200 mx-4">
          <div className="mb-4">
            <h1 className="font-bold text-2xl">BJ Eats</h1>
          </div>
          <div className="mb-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Full Name"
              name="fullname"
              value={input.fullname}
              onChange={changeEventHandler}
              className="pl-10 focus-visible:ring-1"
            />
            <User className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
            {
              Errors && <span className="text-sm text-red-500">{Errors.fullname}</span>
            }
             </div>
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
          <div className="mb-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Contact"
              name="contact"
              value={input.contact}
              onChange={changeEventHandler}
              className="pl-10 focus-visible:ring-1"
            />
            <PhoneOutgoing className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
            {
              Errors && <span className="text-sm text-red-500">{Errors.contact}</span>
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
                SignUp
              </Button>
            )}
            <Separator />
          </div>
          <p>
            Have An Account?{" "}
            <Link to="/login" className="text-blue-500">
              Login
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};
export default Signup;
