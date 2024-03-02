// React Imports
import React, { ForwardedRef, forwardRef } from "react";
import { createPortal } from "react-dom";

const Modal = forwardRef(function Modal(
  { children }: ChildrenProps,
  ref: ForwardedRef<HTMLDialogElement>
) {
  const modalElement = document.body;
  return createPortal(
    <dialog ref={ref} className="w-full sm:w-fit sm:rounded-2xl">
      {children}
    </dialog>,
    modalElement
  );
});

export default Modal;
