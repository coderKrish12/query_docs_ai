function ErrorMessage({ children }: ChildrenProps) {
  return <p className="!mt-1 text-red-500 text-sm font-normal">{children}</p>;
}

export default ErrorMessage;
