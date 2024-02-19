// React Imports
import { forwardRef } from "react";

// UI Imports
import { TextField, useTheme } from "@mui/material";

// UI Components Imports
import ErrorMessage from "@/components/FormComponents/ErrorMesssage";

const FormInput = forwardRef(
  ({ label, error, optional, ...props }: InputProps, ref) => {
    const theme = useTheme();
    return (
      <div className="w-full">
        <p
          className="font-bold text-[0.95rem] mb-1"
          style={{
            color: theme.palette.text.primary,
          }}
        >
          {label}
          <span className="text-[#FF0000]">{!optional && `*`}</span>
        </p>
        <TextField
          className="shadow-sm"
          inputRef={ref}
          {...props}
          error={error ? true : false}
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";

export default FormInput;
