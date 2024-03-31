"use client";

import useRegisterModal from "~/app/hooks/useRegisterModal";
import Modal from "./modal";
import useLoginModal from "~/app/hooks/useLoginModal";
import { useState, useCallback } from "react";
import Heading from "../heading";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);

  const toggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [registerModal, loginModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome" subtitle="Create an account" />
      <Input placeholder="Name" required />
      <Input placeholder="Email" type="email" required />
      <Input placeholder="Password" type="passwrod" required />
      <Input placeholder="Repeat password" type="passwrod" required />
    </div>
  );

  const footerContent = (
    <div className="mt-3 flex flex-col gap-4">
      <hr />
      <Button variant="outline"> Continue with Google</Button>
      <Button variant="outline"> Continue with GitHub</Button>
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
      primaryText="Register"
      footer={footerContent}
    />
  );
};

export default RegisterModal;
