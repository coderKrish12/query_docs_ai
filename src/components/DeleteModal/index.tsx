import { Button, Dialog, useTheme } from "@mui/material";
import React from "react";

const DeleteModal = ({
  open,
  handleToggle,
}: {
  open: boolean;
  handleToggle: () => void;
}) => {
  const theme = useTheme();
  return (
    <Dialog open={open} onClose={handleToggle}>
      <div
        className=" flex flex-col p-8"
        style={{
          backgroundColor: theme.palette.background.default,
        }}
      >
        <p className="text-3xl font-bold mb-4">Delete files</p>
        <p className="font-semibold">
          Are you sure you want to delete the selected file ?
        </p>
        <div className="w-full flex items-center justify-between mt-8">
          <Button
            className="px-10 py-2 capitalize text-sm"
            variant="outlined"
            onClick={handleToggle}
          >
            Cancel
          </Button>
          <Button
            className="px-10 py-2 capitalize text-sm"
            variant="contained"
            onClick={handleToggle}
          >
            Delete
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default DeleteModal;
