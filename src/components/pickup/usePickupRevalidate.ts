import { createContext, useCallback, useContext } from "react";
import { useFormContext } from "react-hook-form";
import type { PickupFormValues } from "@/lib/pickupRequest";

export type PickupFieldName = keyof PickupFormValues;

export type PickupTextFieldName = {
  [K in PickupFieldName]: PickupFormValues[K] extends string ? K : never;
}[PickupFieldName];

export const PickupAnnounceContext = createContext<(message: string) => void>(() => undefined);

export const usePickupRevalidate = () => {
  const { trigger, getFieldState, formState } = useFormContext<PickupFormValues>();
  const announce = useContext(PickupAnnounceContext);
  const { isSubmitted } = formState;

  return useCallback(
    (name: PickupFieldName, label: string) => {
      if (!isSubmitted) return;
      void trigger(name).then((valid) => {
        if (valid) return;
        const message = getFieldState(name).error?.message;
        if (message) announce(`${label}: ${message}`);
      });
    },
    [isSubmitted, trigger, getFieldState, announce],
  );
};
