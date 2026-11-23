import { useId, type ComponentProps, type ReactNode } from "react";
import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import type { PickupFormValues } from "@/lib/pickupRequest";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { usePickupRevalidate, type PickupTextFieldName } from "./usePickupRevalidate";

export type FieldOption = { value: string; label: string };

const LabelText = ({ label, required }: { label: string; required?: boolean }) => (
  <>
    {label}
    {required && (
      <span aria-hidden="true" className="ml-0.5 text-destructive">
        *
      </span>
    )}
  </>
);

export const FormSection = ({ step, title, children }: { step: number; title: string; children: ReactNode }) => (
  <fieldset className="min-w-0 rounded-xl border border-border bg-card p-5 sm:p-8">
    <legend className="float-left mb-6 flex w-full items-center gap-3 font-heading text-lg font-bold text-foreground sm:text-xl">
      <span
        aria-hidden="true"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary/10 text-base text-secondary"
      >
        {step}
      </span>
      <span>{title}</span>
    </legend>
    <div className="clear-left grid gap-5 md:grid-cols-2">{children}</div>
  </fieldset>
);

type TextFieldProps = Omit<ComponentProps<"input">, "name" | "value" | "defaultValue" | "onChange" | "onBlur"> & {
  name: PickupTextFieldName;
  label: string;
  required?: boolean;
  labelClassName?: string;
};

export const TextField = ({ name, label, required = false, labelClassName, className, ...inputProps }: TextFieldProps) => {
  const { control } = useFormContext<PickupFormValues>();
  const revalidate = usePickupRevalidate();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("min-w-0", className)}>
          <FormLabel className={labelClassName}>
            <LabelText label={label} required={required} />
          </FormLabel>
          <FormControl>
            <Input
              {...inputProps}
              name={field.name}
              ref={field.ref}
              value={field.value}
              onChange={field.onChange}
              onBlur={() => {
                field.onBlur();
                revalidate(name, label);
              }}
              aria-required={required || undefined}
              className="h-11 placeholder:text-foreground/65"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

type TextAreaFieldProps = {
  name: PickupTextFieldName;
  label: string;
  maxLength: number;
  required?: boolean;
  placeholder?: string;
  className?: string;
};

export const TextAreaField = ({
  name,
  label,
  maxLength,
  required = false,
  placeholder,
  className,
}: TextAreaFieldProps) => {
  const { control } = useFormContext<PickupFormValues>();
  const revalidate = usePickupRevalidate();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("min-w-0", className)}>
          <FormLabel>
            <LabelText label={label} required={required} />
          </FormLabel>
          <FormControl>
            <Textarea
              name={field.name}
              ref={field.ref}
              value={field.value}
              onChange={field.onChange}
              onBlur={() => {
                field.onBlur();
                revalidate(name, label);
              }}
              maxLength={maxLength}
              placeholder={placeholder}
              rows={4}
              aria-required={required || undefined}
              className="min-h-[112px] resize-y text-base placeholder:text-foreground/65 md:text-sm"
            />
          </FormControl>
          <FormDescription className="flex justify-end text-xs">
            <span className="tabular-nums">
              {field.value.length} / {maxLength}
              <span className="sr-only"> characters used</span>
            </span>
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

type SelectFieldProps = {
  name: PickupTextFieldName;
  label: string;
  options: readonly FieldOption[];
  placeholder: string;
  required?: boolean;
  className?: string;
};

export const SelectField = ({ name, label, options, placeholder, required = false, className }: SelectFieldProps) => {
  const { control } = useFormContext<PickupFormValues>();
  const revalidate = usePickupRevalidate();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("min-w-0", className)}>
          <FormLabel>
            <LabelText label={label} required={required} />
          </FormLabel>
          <Select
            value={field.value}
            onValueChange={(value) => {
              field.onChange(value);
              revalidate(name, label);
            }}
          >
            <FormControl>
              <SelectTrigger
                ref={field.ref}
                onBlur={field.onBlur}
                aria-required={required || undefined}
                className="h-11 text-base data-[placeholder]:text-foreground/65 md:text-sm"
              >
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value} className="min-h-11">
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

type RadioFieldProps = {
  name: PickupTextFieldName;
  label: string;
  options: readonly FieldOption[];
  required?: boolean;
  className?: string;
  optionsClassName?: string;
};

export const RadioField = ({
  name,
  label,
  options,
  required = false,
  className,
  optionsClassName,
}: RadioFieldProps) => {
  const { control } = useFormContext<PickupFormValues>();
  const revalidate = usePickupRevalidate();
  const labelId = useId();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className={cn("min-w-0", className)}>
          <p id={labelId} className={cn("text-sm font-medium leading-none", fieldState.error && "text-destructive")}>
            <LabelText label={label} required={required} />
          </p>
          <FormControl>
            <RadioGroup
              ref={field.ref}
              value={field.value}
              onValueChange={(value) => {
                field.onChange(value);
                revalidate(name, label);
              }}
              aria-labelledby={labelId}
              aria-required={required || undefined}
              className={cn("grid gap-3", optionsClassName)}
            >
              {options.map((option) => (
                <label
                  key={option.value}
                  className="flex min-h-11 cursor-pointer items-center gap-3 rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground transition-colors hover:border-secondary/60 has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5"
                >
                  <RadioGroupItem value={option.value} className="h-5 w-5 shrink-0" />
                  <span>{option.label}</span>
                </label>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export const ConsentField = ({ label, className }: { label: string; className?: string }) => {
  const { control } = useFormContext<PickupFormValues>();
  const revalidate = usePickupRevalidate();

  return (
    <FormField
      control={control}
      name="consent"
      render={({ field }) => (
        <FormItem className={cn("min-w-0", className)}>
          <div className="flex items-start gap-3 rounded-lg border border-input bg-background px-4 py-3">
            <FormControl>
              <Checkbox
                ref={field.ref}
                checked={field.value}
                onCheckedChange={(checked) => {
                  field.onChange(checked === true);
                  revalidate("consent", "Confirmation");
                }}
                onBlur={field.onBlur}
                aria-required="true"
                className="mt-0.5 h-5 w-5"
              />
            </FormControl>
            <FormLabel className="flex-1 cursor-pointer py-0.5 text-sm font-normal leading-relaxed">
              <LabelText label={label} required />
            </FormLabel>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
