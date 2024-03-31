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
    </div>
  );
  return (
    <Modal
      isOpen
      body={bodyContent}
      title="Register"
      primaryText="Register"
      footer={footerContent}
    />
  );
};

export default RegisterModal;
