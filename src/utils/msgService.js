import { toast } from "react-toastify";

export const errorMsg = (message) => {
  toast.error(message);
};
export const successMsg = (message) => {
  toast.success(message);
};
export const warningMsg = (message) => {
  toast.warning(message);
};
export const infoMsg = (message) => {
  toast.info(message);
};
