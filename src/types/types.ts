//UI Components types

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}
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

interface DocumentUploadProps {
  name: string;
  tags?: SelectItemProps[];
  category?: string;
}

interface UserProps {
  id: number;
  first_name: string;
  last_name: string;
  mobile_number: string;
  email?: string;
  photo?: string;
  aadhar_card: string;
  aadhar_id: string;
  staff_type: string;
  last_login: string;
}
