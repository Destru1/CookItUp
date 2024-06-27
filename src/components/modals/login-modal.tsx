"use client";
import useRegisterModal from "~/app/hooks/useRegisterModal";
/* eslint-disable react/no-unescaped-entities */
import Heading from "../heading";
import { Input } from "../ui/input";
import Modal from "./modal";
import type * as z from "zod";
import useLoginModal from "~/app/hooks/useLoginModal";
import { useCallback, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { LoginSchema } from "~/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { login } from "~/app/actions/login";
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { useRouter } from "next/navigation";
import SocialLogin from "./social-login";
import {toast} from "react-hot-toast";

const LoginModal = () => {
  const [isPending, startTransition] = useTransition();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>("");

  const router = useRouter();
  const toggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [registerModal, loginModal]);

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    startTransition(() => {
      login(values).then((data) => {
        toast.success("Login successful");
        setError(data?.error);
        if(!data?.error){
          loginModal.onClose();
          router.refresh();
        }
      });
    });
  };
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome back" subtitle="Login to your account" />
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
                      disabled={isPending}
                    />
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
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormError message={error} />
          </div>
          <Button className="mt-6" disabled={isPending}>
            Login
          </Button>
        </form>
      </Form>
    </div>
  );
  const footerContent = (
    <div className="mt-3 flex flex-col gap-4">
      <hr />
      <SocialLogin/>
      <div className="flex flex-row items-center justify-center">
        <div className="flex  justify-center text-center font-light text-neutral-500">
          <p>Don't have an account?</p>
          <div
            onClick={toggle}
            className="ml-2 cursor-pointer text-neutral-800 hover:underline"
          >
           Register
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      onClose={loginModal.onClose}
      title="Login"
      primaryButtonText="Login"
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
