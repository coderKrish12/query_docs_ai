// React Imports
import { forwardRef } from "react";

// UI Imports
import { OutlinedInput, MenuItem, Select, ListItemText } from "@mui/material";

// Icon Imports
import { FaCheck } from "react-icons/fa6";

const ITEM_HEIGHT = 32;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const SelectDropdown = forwardRef(
  ({ label, children, options, error, ...props }: SelectDropdownProps, ref) => {
    // funtion handle multiple or single value
    const renderSelectedValue = (selected: string[] | string) => {
      if (!selected) {
        return <em>{props?.placeholder}</em>;
      }
      let selectedValue: any = "";
      if (props.multiple && Array.isArray(selected)) {
        selectedValue =
          selected.length > 0
            ? options
                .map((option: any) =>
                  selected.includes(option.value) ? option.label : ""
                )
                .filter((value: string) => value !== "")
                .join(", ")
            : selected.join(",");
      } else {
        selectedValue =
          selected !== ""
            ? options.filter(
                (option: SelectItemProps) => option.value == selected
              )[0]?.label
            : "";
      }
      return selectedValue;
    };
    return (
      <Select
        ref={ref}
        labelId="demo-multiple-checkbox-label"
        renderValue={renderSelectedValue}
        input={<OutlinedInput />}
        {...props}
        MenuProps={MenuProps}
        displayEmpty
      >
        {options?.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            <ListItemText className="capitalize" primary={option.label} />
            {(props.multiple
              ? props.value.indexOf(option.value) > -1
              : option.value === props.value) && <FaCheck className="mx-2" />}
          </MenuItem>
        ))}
      </Select>
    );
  }
);

SelectDropdown.displayName = "SelectDropdown";

export default SelectDropdown;
