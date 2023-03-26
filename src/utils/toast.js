import { notification } from "antd";

export const showToastAction = ({ type, message, description, placement }) => {
  notification[type || "success"]({
    message: message,
    description: description,
    placement: placement || "topRight",
  });
};

export const showErrorToastAction = ({
  message,
  description,
  placement,
  style,
}) => {
  notification["error"]({
    message: message,
    description: description,
    placement: placement || "topRight",
    style: style,
  });
};
