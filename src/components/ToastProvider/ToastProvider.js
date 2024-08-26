import React from "react";

import useEscapeKey from "../../hooks/use-keydown";

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const VARIANT_OPTIONS = ["notice", "warning", "success", "error"];
  const [message, setMessage] = React.useState("");
  const [variant, setVariant] = React.useState(VARIANT_OPTIONS[0]);
  const [toasts, setToasts] = React.useState([]);

  useEscapeKey(
    "Escape",
    React.useCallback(() => {
      setToasts([]);
    }, [])
  );

  function dismissToast(id) {
    const nextToasts = toasts.filter((toast) => {
      return toast.id !== id;
    });
    setToasts(nextToasts);
  }

  function createToast() {
    const nextToasts = [...toasts];
    nextToasts.push({
      id: crypto.randomUUID(),
      variant: variant,
      message: message,
    });
    setToasts(nextToasts);
    setMessage("");
    setVariant(VARIANT_OPTIONS[0]);
  }

  return (
    <ToastContext.Provider
      value={{
        VARIANT_OPTIONS,
        message,
        setMessage,
        variant,
        setVariant,
        toasts,
        setToasts,
        dismissToast,
        createToast,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
