// Third party Imports
import toast from "react-hot-toast";

export const preventDefaultHandler = (e: React.DragEvent<HTMLElement>) => {
  e.preventDefault();
  e.stopPropagation();
};

export const errorHandler = (error: any) => {
  toast.error(
    error.response.status === 500
      ? error.response.statusText
      : error.response.data.error
  );
};
