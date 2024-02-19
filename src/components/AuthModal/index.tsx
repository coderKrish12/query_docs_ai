import React, { RefObject, useState } from "react";
import Modal from "../Modal";
import { IconButton } from "@mui/material";
import { FaXmark } from "react-icons/fa6";
import SignInOut from "./SignInOutForm";
import ForgotPassword from "./ForgotPassword";

function AuthModal({ dialogRef }: { dialogRef: RefObject<HTMLDialogElement> }) {
  const [formType, setFormType] = useState<string>("auth");
  return (
    <Modal ref={dialogRef}>
      <div className="w-full md:max-w-2xl flex md:min-w-[40vw] relative">
        <IconButton
          className="absolute right-2 top-2 bg-[#F9FAFB]"
          onClick={() => {
            dialogRef.current?.close();
            setFormType("auth");
          }}
        >
          <FaXmark className="text-[#FF0000] text-sm" />
        </IconButton>
        {formType === "auth" && <SignInOut setFormType={setFormType} />}
        {formType === "reset" && <ForgotPassword setFormType={setFormType} />}
      </div>
    </Modal>
  );
}

export default AuthModal;
