// React imports
import React, { useContext, useEffect, useRef, useState } from "react";

// Third party imports
import {
  useForm,
  Controller,
  FormProvider,
  FieldName,
  SubmitHandler,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// UI Imports
import {
  Stack,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  useTheme,
  Divider,
} from "@mui/material";
import FormInput from "@/components/FormComponents/FormInput";
import Image from "next/image";
import { ColorModeContext } from "@/store/context/ThemeContext";

const steps = [
  {
    id: 0,
    fields: ["email"],
  },
  { id: 1, fields: ["new_password", "confirm_password"] },
];

function ForgotPassword({
  setFormType,
}: {
  setFormType: (value: string) => void;
}) {
  const theme = useTheme();
  const { mode } = useContext(ColorModeContext);
  const [activeStep, setActiveStep] = useState(0);
  const defaultValues: ForgotPasswordProps = {
    email: "",
    new_password: "",
    confirm_password: "",
  };

  const schema = yup.object().shape({
    email: yup.string().required("Email is required"),
    new_password: yup
      .string()
      .min(8, "Password must of atleast 8 characters")
      .required("Password is required"),
    confirm_password: yup
      .string()
      .required("Confirm password is required")
      .oneOf([yup.ref("new_password")], "Passwords must match"),
  });
  const formMethods = useForm<ForgotPasswordProps>({
    defaultValues,
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch,
    reset,
    trigger,
  } = formMethods;
  const handleNext = async () => {
    const fields = steps[activeStep].fields;
    const isStepValid = await trigger(
      fields as FieldName<ForgotPasswordProps>[],
      {
        shouldFocus: true,
      }
    );
    if (isStepValid) setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    reset();
  };

  const onSubmit: SubmitHandler<ForgotPasswordProps> = async (data, e) => {
    e?.preventDefault();
    try {
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const ForgotPasswordStep = () => {
    return (
      <>
        <p
          className="font-bold text-2xl my-3"
          style={{
            color: theme.palette.text.primary,
          }}
        >
          Forgot Password
        </p>
        <p
          className="text-sm font-medium mb-4"
          style={{
            color: theme.palette.text.primary,
          }}
        >
          Enter your E-mail address to receive a link to reset Password.
        </p>
        <Divider className="w-full mb-6" />
        <Controller
          name="email"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <FormInput
              label="Email Address"
              placeholder="E-mail Address"
              id="email"
              type="email"
              {...field}
              error={errors.email?.message}
            />
          )}
        />
        <Button
          className="w-full mt-4 font-medium capitalize"
          variant="contained"
          type="button"
          onClick={handleNext}
        >
          Submit
        </Button>
      </>
    );
  };

  const ResetPasswordStep = () => {
    return (
      <>
        <p
          className="font-bold text-2xl my-3"
          style={{
            color: theme.palette.text.primary,
          }}
        >
          Reset Password
        </p>

        <Divider className="w-full mb-6" />
        <div className="mb-6 w-full">
          <Controller
            name="new_password"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <FormInput
                label="New Password"
                placeholder="Password"
                id="new_password"
                type="new_password"
                {...field}
                error={errors.new_password?.message}
              />
            )}
          />
        </div>
        <div className="mb-6 w-full">
          <Controller
            name="confirm_password"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <FormInput
                label="Confirm Password"
                placeholder="Password"
                id="confirm_password"
                type="confirm_password"
                {...field}
                error={errors.confirm_password?.message}
              />
            )}
          />
        </div>
        <Button
          className="w-full font-medium capitalize"
          variant="contained"
          type="button"
          onClick={handleNext}
        >
          Reset Password
        </Button>
      </>
    );
  };

  const PasswordResetSuccessful = () => {
    return (
      <>
        <Image src="/images/CheckIcon.png" width={46} height={46} alt="Check" />
        <p
          className="font-bold text-2xl my-3"
          style={{
            color: theme.palette.text.primary,
          }}
        >
          Password Reset Successful
        </p>
        <p
          className="text-sm font-medium mb-6 w-full md:w-[70%] text-center"
          style={{
            color: theme.palette.text.primary,
          }}
        >
          Your password has been updated successfully. Use new password to
          login.
        </p>
        <Button
          variant="contained"
          className="w-full"
          onClick={() => {
            handleReset();
            setFormType("auth");
          }}
        >
          Sign In
        </Button>
      </>
    );
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <ForgotPasswordStep />;
      case 1:
        return <ResetPasswordStep />;
      case 2:
        return <PasswordResetSuccessful />;

      default:
        break;
    }
  };

  return (
    <div
      className="py-6 px-10 w-full"
      style={{
        backgroundColor:
          theme.palette.background[mode === "light" ? "default" : "paper"],
      }}
    >
      <FormProvider {...formMethods}>
        <form
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col items-center justify-center"
        >
          {getStepContent(activeStep)}
        </form>
      </FormProvider>
    </div>
  );
}

export default ForgotPassword;
