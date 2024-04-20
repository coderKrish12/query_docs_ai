// React Imports
import { SyntheticEvent, forwardRef } from "react";

// UI Imports
import {
  TextField,
  Autocomplete,
  MenuItem,
  FormControl,
  useTheme,
} from "@mui/material";

// UI Components Imports
import ErrorMessage from "@/components/FormComponents//ErrorMesssage";

// Icon Imports
import { FaCheck } from "react-icons/fa6";

const SelectDropdownAutocomplete = forwardRef(
  (
    {
      label,
      children,
      options,
      error,
      optional,
      ...props
    }: SelectDropdownProps,
    ref
  ) => {
    const theme = useTheme();

    const renderOption = (optionProps: any, option: SelectItemProps) => {
      const { key, ...restProps } = optionProps;
      return (
        <MenuItem key={key} {...restProps}>
          <p className="capitalize text-sm">{option.label}</p>
          {props.value && (
            <>
              {(props.multiple
                ? props.value.findIndex(
                    (val: SelectItemProps) => val.value === option.value
                  ) > -1
                : option.value === props.value) && <FaCheck className="mx-2" />}
            </>
          )}
        </MenuItem>
      );
    };

    return (
      <FormControl fullWidth variant="outlined" className="flex items-start">
        <p
          className="font-semibold text-[0.95rem] mb-1 min-w-[200px]"
          style={{
            color: theme.palette.text.primary,
          }}
        >
          {label}
          <span className="text-[#FF0000]">{!optional && `*`}</span>
        </p>
        <Autocomplete
          fullWidth
          ref={ref}
          className="p-0 capitalize"
          options={options || []}
          autoHighlight
          value={props.value}
          disablePortal
          {...props}
          onChange={(
            event: SyntheticEvent<Element, Event>,
            newValue: SelectItemProps | SelectItemProps[]
          ) => {
            props.onChange(newValue);
          }}
          getOptionLabel={(option: SelectItemProps | string) =>
            `${
              typeof option === "object"
                ? option.label
                : option.split("_").join(" ")
            }`
          }
          isOptionEqualToValue={(option: SelectItemProps, value: any) =>
            option.value ===
            `${typeof value === "object" ? value.value : value}`
          }
          renderOption={props.renderOption ?? renderOption}
          renderInput={(params) => {
            return (
              <TextField
                className="[&_input]:capitalize"
                placeholder={props.placeholder}
                {...params}
              />
            );
          }}
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </FormControl>
    );
  }
);

SelectDropdownAutocomplete.displayName = "SelectDropdownAutocomplete";

export default SelectDropdownAutocomplete;
