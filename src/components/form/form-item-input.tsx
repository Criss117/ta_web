"use client";

import { HTMLInputTypeAttribute } from "react";
import { FormControl, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

interface Props {
  label: string;
  placeholder?: string;
  type: HTMLInputTypeAttribute | undefined;
  field: any;
  hidden?: boolean;
  className?: string;
  min?: number;
  max?: number;
}

const FormItemInput = ({
  label,
  placeholder,
  type,
  field,
  hidden = false,
  className,
  min,
  max,
}: Props) => {
  return (
    <FormItem hidden={hidden} className={cn(className)}>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <Input
          placeholder={placeholder}
          {...field}
          type={type}
          min={min}
          max={max}
        />
      </FormControl>
      <FormMessage className="bg-destructive/20 border-l-4 border-destructive" />
    </FormItem>
  );
};

export default FormItemInput;
