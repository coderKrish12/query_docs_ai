//UI Components types

interface ChildrenProps {
  children?: React.ReactNode;
}

interface SelectItemProps {
  label: string | undefined;
  value: string | number | undefined;
}
interface SelectDropdownProps extends InputProps {
  options: SelectItemProps[];
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
