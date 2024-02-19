//UI Components types

interface ChildrenProps {
  children?: React.ReactNode;
}

interface InputProps extends ChildrenProps {
  label: string;
  error?: string;
  optional?: boolean;
  [key: string]: any;
}

interface SignInOutProps {
  email: string;
  password: string;
}

type ForgotPasswordProps = {
  email: string;
  new_password: string;
  confirm_password: string;
};
