import { toast } from "react-toastify";

export const errorMsg = (payload) => {
  if (payload.message) {
    toast.error(payload.message);
  } else {
    for (const key in payload) {
      toast.error(payload[key]);
    }
  }
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
