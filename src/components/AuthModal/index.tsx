// React Imports
import React, { useState } from "react";

// UI Imports
import { Dialog, IconButton } from "@mui/material";

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

function AuthModal({
  open,
  handleModalToggle,
}: {
  open: boolean;
  handleModalToggle: () => void;
}) {
  const [formType, setFormType] = useState<string>("auth");
  return (
    <Dialog open={open} onClose={handleModalToggle} maxWidth="md">
      <div className="w-full md:max-w-3xl flex md:min-w-[40vw] relative">
        <IconButton
          className="absolute right-2 top-2 bg-[#F9FAFB]"
          onClick={() => {
            handleModalToggle();
            setFormType("auth");
          }}
        >
          <FaXmark className="text-[#FF0000] text-sm" />
        </IconButton>
        {formType === "auth" && <SignInOut setFormType={setFormType} />}
        {formType === "reset" && <ForgotPassword setFormType={setFormType} />}
      </div>
    </Dialog>
  );
}

export default AuthModal;
