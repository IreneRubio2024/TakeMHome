import React from "react";
import { useToast, Toast, ToastTitle } from "../components/ui/toast";

// Thin wrapper around Gluestack's toast so every screen keeps the same
// simple call it already had with the old AppToast component:
//   const showToast = useAppToast();
//   showToast("Gift created successfully.", "success");
export function useAppToast() {
  const toast = useToast();

  return (message, type = "success") => {
    if (!message) return;

    toast.show({
      placement: "bottom",
      duration: 2200,
      render: ({ id }) => (
        <Toast nativeID={`toast-${id}`} action={type} variant="solid">
          <ToastTitle>{message}</ToastTitle>
        </Toast>
      ),
    });
  };
}
