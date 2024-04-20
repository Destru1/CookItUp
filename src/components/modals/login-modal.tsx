"use client";
import useRegisterModal from "~/app/hooks/useRegisterModal";
/* eslint-disable react/no-unescaped-entities */
import Heading from "../heading";
import { Input } from "../ui/input";
import Modal from "./modal";
import useLoginModal from "~/app/hooks/useLoginModal";
import { useCallback, useState } from "react";

const LoginModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);

  const toggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [registerModal, loginModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome back" subtitle="Login to your account" />
      <Input placeholder="Email" type="email" required />
      <Input placeholder="Password" type="password" required />
    </div>
  );
  const footerContent = (
    <div className="mt-3 flex flex-col gap-4">
      <hr />
      <div className="flex flex-row items-center justify-center">
        <div className="flex  justify-center text-center font-light text-neutral-500">
          <p>Don't have an account?</p>
          <div
            onClick={toggle}
            className="ml-2 cursor-pointer text-neutral-800 hover:underline"
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
