import {
  Button,
  Divider,
  InputAdornment,
  IconButton,
  useTheme,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
// Third part Imports
import * as yup from "yup";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useContext } from "react";
import FormInput from "@/components/FormComponents/FormInput";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import Image from "next/image";
import { AuthModalLeftContentLines } from "@/utils/UtilsData";
import { FaCheck } from "react-icons/fa6";
import { ColorModeContext } from "@/store/context/ThemeContext";

function SignInOut({ setFormType }: { setFormType: (value: string) => void }) {
  const theme = useTheme();
  const { mode } = useContext(ColorModeContext);
  const LogoImageUrl =
    mode === "light" ? "/images/LogoImage.png" : "/images/LogoImageDark.png";

  const [type, setType] = useState("signin");
  const defaultValues: SignInOutProps = {
    email: "",
    password: "",
  };
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter valid email")
      .required("Email is required"),
    password: yup
      .string()
      .min(8, "Password must be of atleast 8 characters")
      .required("Password is required"),
  });

  const {
    control,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInOutProps>({
    defaultValues,
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const showPasswordHandler = (): void => {
    setShowPassword((prevPassword) => !prevPassword);
  };

  const submitForm: SubmitHandler<SignInOutProps> = async (data, e) => {
    e?.preventDefault();
    try {
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        id="modal-left-content"
        className="flex-col hidden md:flex w-[45%]"
        style={{
          backgroundColor:
            theme.palette.background[mode === "light" ? "paper" : "default"],
        }}
      >
        <Image
          src="/images/FormLeftImage.png"
          width={0}
          height={0}
          unoptimized
          className="w-full h-auto"
          alt="Join Us"
        />
        <div
          className="flex flex-col pb-10"
          style={{
            backgroundColor:
              theme.palette.background[mode === "light" ? "paper" : "default"],
          }}
        >
          <p
            className="py-6 px-10 font-semibold"
            style={{
              color: theme.palette.text.primary,
            }}
          >
            Join for Free Today and Gain Access to Essential Features:
          </p>
          <div className="flex flex-col">
            {AuthModalLeftContentLines.map((text, i) => {
              return (
                <div key={i} className="flex items-start px-2 ">
                  <FaCheck
                    className={` mt-1 w-1/12`}
                    style={{
                      color: theme.palette.primary.main,
                    }}
                  />
                  <p
                    className="pb-2 px-2 text-sm w-11/12"
                    style={{
                      color: theme.palette.text.primary,
                    }}
                  >
                    {text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div
        id="modal-right-content"
        className=" flex flex-col w-full md:w-[55%] p-6 items-center justify-center"
        style={{
          backgroundColor:
            theme.palette.background[mode === "light" ? "default" : "paper"],
        }}
      >
        <Image
          src={LogoImageUrl}
          width={0}
          height={0}
          priority
          unoptimized
          className="w-[100px] h-auto"
          alt="Query Docs"
        />
        <p
          className="font-bold text-lg my-3"
          style={{
            color: theme.palette.text.primary,
          }}
        >
          {type === "signin" ? "Sign In" : "Sign Up"}
        </p>
        <Divider className="w-[80%]" />
        <button className="flex items-center justify-center py-2 px-4 w-full rounded-lg my-4 text-[#756F86] bg-white shadow-md">
          <Image
            className="mx-3"
            src="/images/GoogleLogoIcon.png"
            unoptimized
            height={20}
            width={20}
            alt="google"
          />
          Sign in with Google
        </button>
        <form
          className="space-y-6 my-6 w-full"
          method="POST"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(submitForm)}
        >
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

          <Controller
            name="password"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <FormInput
                label="Password"
                id="password"
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                {...field}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={showPasswordHandler}
                        edge="end"
                      >
                        {showPassword ? (
                          <MdOutlineVisibility />
                        ) : (
                          <MdOutlineVisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                error={errors.password?.message}
              />
            )}
          />
          {type === "signin" ? (
            <>
              <div className="flex justify-between items-center">
                <FormControlLabel
                  className="[&_span]:!text-[0.9rem]"
                  style={{
                    color: theme.palette.text.primary,
                  }}
                  control={<Checkbox defaultChecked className="" />}
                  label="Remember Me"
                />
                <p
                  className={` italic text-[0.9rem] cursor-pointer`}
                  style={{
                    color: theme.palette.primary.main,
                  }}
                  onClick={() => setFormType("reset")}
                >
                  Forgot Password ?
                </p>
              </div>
              <Button
                className="w-full capitalize"
                variant="contained"
                type="submit"
              >
                Sign In
              </Button>
              <div className="flex justify-between items-center">
                <p
                  className={`text-[0.9rem]`}
                  style={{
                    color: theme.palette.text.primary,
                  }}
                >{`Don't have an acccount?`}</p>

                <p
                  className={`text-[0.9rem] italic`}
                  style={{
                    color: theme.palette.primary.main,
                  }}
                  onClick={() => setType("signup")}
                >
                  Sign Up
                </p>
              </div>
            </>
          ) : (
            <>
              <Button
                className="w-full capitalize"
                variant="contained"
                type="submit"
              >
                Sign Up
              </Button>
              <div className="flex justify-between items-center">
                <p
                  className={`text-[0.9rem]`}
                  style={{
                    color: theme.palette.text.primary,
                  }}
                >{`Already a member?`}</p>

                <p
                  className={`text-[0.9rem] italic`}
                  style={{
                    color: theme.palette.primary.main,
                  }}
                  onClick={() => setType("signin")}
                >
                  Sign In
                </p>
              </div>
            </>
          )}
        </form>
      </div>
    </>
  );
}

export default SignInOut;
