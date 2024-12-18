import {z} from "zod";

export const userSignupSchema = z.object({
    fullname:z.string().min(5,"FullName is Required"),
    email:z.string().email("Invalid email adress"),
    password:z.string().min(6,"Must Be Atleast 6 Charachters."),
    contact:z.string().min(10,"Contact Must Be 10 Digit."),

});
export const userLoginSchema = z.object({
    email:z.string().email("Invalid email adress"),
    password:z.string().min(6,"Must Be Atleast 6 Charachters."),

});
export type SignupInputState=z.infer<typeof userSignupSchema>;
export type LoginInputState=z.infer<typeof userLoginSchema>;