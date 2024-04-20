// React Imports
import React, { RefObject } from "react";

// Next Imports
import Image from "next/image";
import dynamic from "next/dynamic";

// UI Imports
import { Button, Chip, Dialog, useTheme } from "@mui/material";

// UI Compomnents Imports
import FormInput from "@/components/FormComponents/FormInput";
import SelectDropdownAutocomplete from "@/components/FormComponents/SelectDropdown";
const Modal = dynamic(() => import("@/components/Modal"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

// Third part Imports
import * as yup from "yup";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FaXmark } from "react-icons/fa6";

const TAGS = [
  { label: "some tag", value: "1" },
  { label: "some tag 2", value: "2" },
];

const CATEGORIES = [
  { label: "some category", value: "11" },
  { label: "some category2", value: "22" },
];

const DocumentUploadModal = ({
  open,
  handleToggle,
}: {
  open: boolean;
  handleToggle: () => void;
}) => {
  const theme = useTheme();
  const defaultValues: DocumentUploadProps = {
    name: "",
    tags: [],
    category: "",
  };

  const schema = yup.object().shape({
    name: yup
      .string()
      .min(3, "File name must be of atleast 3 Characters")
      .required("File name is required"),
    tags: yup.array().optional(),
    category: yup.string().optional(),
  });

  const {
    control,
    reset,
    watch,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm<DocumentUploadProps>({
    defaultValues,
    mode: "all",
    resolver: yupResolver(schema),
  });

  const submitForm: SubmitHandler<DocumentUploadProps> = async (data, e) => {
    try {
      console.log(data);
      reset();
      handleToggle;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onClose={handleToggle}>
      <div
        className="flex flex-col items-center justify-center p-10 rounded-sm min-w-[250px] md:w-[500px] max-w-4xl"
        style={{
          backgroundColor: theme.palette.background.default,
        }}
      >
        <p className="text-start font-semibold text-2xl w-full mb-4">
          Upload Documents
        </p>
        <div className="flex flex-col mt-2 p-6 items-center justify-center border-2 border-gray-400 border-dashed">
          <Image
            src="/images/FileUploadDocument.png"
            className="mb-2"
            width={20}
            height={20}
            alt=""
          />
          <span
            className="underline text-sm"
            style={{
              color: theme.palette.primary.main,
            }}
          >
            Central consumer protection authority guidelines.pdf
          </span>
        </div>
        <form
          method="POST"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(submitForm)}
          className="w-full mt-4"
        >
          <Controller
            name="name"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <FormInput
                label="Name"
                placeholder="File name"
                id="file-name"
                optional
                type="text"
                autoComplete="name"
                {...field}
                error={errors.name?.message}
              />
            )}
          />
          <Controller
            name="tags"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <div className="mt-4">
                <SelectDropdownAutocomplete
                  options={TAGS}
                  label="Tags"
                  optional
                  multiple
                  placeholder="Select tags"
                  {...field}
                  error={errors.tags?.message}
                  renderTags={(value: readonly string[]) => {
                    return (
                      <>
                        {value.map((option: any, index: number) => (
                          <Chip
                            key={index}
                            variant="outlined"
                            sx={{
                              borderRadius: "4px",
                              margin: "5px!important",
                              backgroundColor: "lightgray",
                              "& span": {
                                height: "100%",
                                textAlign: "center",
                                display: "flex",
                                alignItems: "center",
                              },
                            }}
                            label={
                              <p className="relative text-xs pr-1">
                                {option.label}
                                <FaXmark className="absolute -top-1 -right-2.5 text-gray-500" />
                              </p>
                            }
                          />
                        ))}
                      </>
                    );
                  }}
                />
              </div>
            )}
          />
          <Controller
            name="category"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, ...rest } }) => (
              <div className="mt-4">
                <SelectDropdownAutocomplete
                  options={CATEGORIES}
                  label="Category"
                  optional
                  placeholder="Select tags"
                  onChange={(e: SelectItemProps) => onChange(e ? e.value : "")}
                  {...rest}
                  error={errors.category?.message}
                />
              </div>
            )}
          />
          <div className="w-full gap-2 flex justify-evenly mt-6">
            <Button
              variant="outlined"
              type="button"
              className="w-1/2"
              onClick={() => {
                handleToggle;
              }}
            >
              Cancel
            </Button>
            <Button className="w-1/2" variant="contained" type="submit">
              Save
            </Button>
          </div>
        </form>
      </div>
    </Dialog>
  );
};

export default DocumentUploadModal;
