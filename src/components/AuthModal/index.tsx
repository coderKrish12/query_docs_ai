// React Imports
import React, { RefObject, useState } from "react";

// UI Imports
import { IconButton } from "@mui/material";

// Icon Imports
import { FaXmark } from "react-icons/fa6";

// UI Component Imports
import SignInOut from "@/components/AuthModal/SignInOutForm";
import ForgotPassword from "@/components/AuthModal/ForgotPassword";
import dynamic from "next/dynamic";
const Modal = dynamic(() => import("@/components/Modal"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

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
