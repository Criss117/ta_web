"use client";

import { HTMLInputTypeAttribute } from "react";
import { FormControl, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

interface Props {
  label: string;
  placeholder?: string;
  type: HTMLInputTypeAttribute | undefined;
  field: any;
  hidden?: boolean;
}

const FormItemInput = ({
  label,
  placeholder,
  type,
  field,
  hidden = false,
}: Props) => {
  return (
    <FormItem hidden={hidden}>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <Input placeholder={placeholder} {...field} type={type} />
      </FormControl>
      <FormMessage className="bg-destructive/20 border-l-4 border-destructive" />
    </FormItem>
  );
};

export default FormItemInput;
