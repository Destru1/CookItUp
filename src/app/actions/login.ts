"use server";

import * as z from "zod";
import { LoginSchema } from "~/schemas";
import { signIn } from "auth";
import { AuthError } from "next-auth";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validateFields = LoginSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: "Invalid email or password" };
  }
  const { email, password } = validateFields.data;

  try {
    await signIn("credentials", { email, password });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };

        default:
          return { error: "An error occurred" };
      }
    }
    throw error;
  }
};

// export const login = (values: any) => {
//   console.log(values);

// }
