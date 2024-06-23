import { useState, useEffect, useCallback } from "react";
import { Button } from "../ui/button";
import { IoMdClose } from "react-icons/io";

interface ModalProps {
  isOpen?: boolean;
  isLarge?: boolean;
  onClose: () => void;
  primaryButtonAction?: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  primaryButtonText?: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryText?: string;
}

const Modal = ({
  isOpen,
  isLarge,
  onClose,
  primaryButtonAction,
  title,
  body,
  footer,
  primaryButtonText,
  disabled,
  secondaryAction,
  secondaryText,
}: ModalProps) => {
  const [showModal, setShowModal] = useState(isOpen);
  const [large, setLarge] = useState(isLarge);

  useEffect(() => {
    setShowModal(isOpen);
    setLarge(isLarge);

  }, [isOpen,isLarge]);

  const handleClose = useCallback(() => {
    if (disabled) return;
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled || !primaryButtonAction) return;
    //setShowModal(false);
    primaryButtonAction();
  }, [disabled, primaryButtonAction]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) return;
    secondaryAction();
  }, [disabled, secondaryAction]);

  if (!isOpen) {
    return null;
  }
  return (
    <>
      <div
        className="fixed
  inset-0
  z-50
  flex
  items-center
  justify-center
  overflow-y-auto
  overflow-x-auto
  bg-neutral-800/70
  outline-none
  focus:outline-none
  md:items-center md:overflow-x-hidden"
      >
        <div
          className={`relative mx-auto my-6 h-fit w-full px-3 md:h-auto md:w-4/6 lg:h-auto lg:w-3/6 xl:w-2/5 ${large ? "xl:w-[90%]" : "xl:w-2/5"}`}
        >
          <div
            className={`translate h-full duration-300 ${
              showModal ? "translate-y-0" : "translate-y-full"
            }
        ${showModal ? "opacity-100" : "opacity-0"}`}
          >
            <div className="translate relative flex h-full w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none md:h-auto lg:h-auto">
              <div className="relative flex items-center justify-center rounded-t border-b-[1px] p-6">
                <div className="text-lg font-semibold">{title}</div>
                <button
                  onClick={handleClose}
                  className="absolute right-9 border-0 p-1 transition hover:opacity-70"
                >
                  <IoMdClose size={18} />
                </button>
              </div>
              <div className="relative flex-auto p-6 py-4">{body}</div>
              <div className="flex flex-col gap-2 px-6 pb-4 pt-0">
                <div className="flex w-full flex-row items-center gap-4">
                  {secondaryAction && secondaryText && (
                    <Button
                      variant="outline"
                      className="h-12"
                      disabled={disabled}
                      onClick={handleSecondaryAction}
                    >
                      {secondaryText}
                    </Button>
                  )}
                  {primaryButtonAction && primaryButtonText && (
                    <Button onClick={handleSubmit} className="h-12" disabled={disabled}>
                      {primaryButtonText}
                    </Button>
                  )}
                </div>
                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
