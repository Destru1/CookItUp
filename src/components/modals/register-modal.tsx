"use client";

import axios from "axios";
import useRegisterModal from "~/app/hooks/useRegisterModal";
import {signIn} from "next-auth/react";
import Modal from "./modal";
import useLoginModal from "~/app/hooks/useLoginModal";
import { useState, useCallback, use } from "react";
import {
  FieldValues,
  useForm,
  SubmitHandler,
  FormProvider,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Heading from "../heading";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { RegisterSchema } from "~/schemas";
import { FormError } from "../form-error";

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);

  const toggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [registerModal, loginModal]);

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setIsLoading(true);
    console.log("values", values);
    axios
      .post("/api/register", values)
      .then(() => {
        setIsLoading(false);
        registerModal.onClose();
      })
      .catch((error) => {
        setIsLoading(false);
        console.error(error);
      });
  };

const socialOnClick = (provider: 'google' | 'github') => {
signIn(provider, { callbackUrl: '/' });
}

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome" subtitle="Create an account" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Email"
                      type="email"
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Name" type="text" required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pasword</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Password"
                      type="password"
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="repeatPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Repeat password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Repeat Password"
                      type="password"
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormError message="" />
          </div>
          <Button className="mt-6">Register</Button>
        </form>
      </Form>
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4">
      <hr />
      <Button variant="outline" onClick={() => socialOnClick('google')}> Continue with Google</Button>
      <Button variant="outline" onClick={() => socialOnClick('github')}> Continue with GitHub</Button>
      <div className=" mt-4 text-center font-light text-neutral-500">
        <div className="flex flex-row items-center justify-center gap-2">
          <div>Already have an account?</div>
          <div
            onClick={toggle}
            className="cursor-pointer text-neutral-800 hover:underline"
          >
            Log in
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      body={bodyContent}
      title="Register"
      onClose={registerModal.onClose}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
