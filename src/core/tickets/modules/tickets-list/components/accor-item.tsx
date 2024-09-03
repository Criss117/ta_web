"use client";
import { PropsWithChildren } from "react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

interface Props extends PropsWithChildren {
  trigger: string;
  value: string;
  className?: string;
}

export const AccorItem = ({ value, children, trigger, className }: Props) => {
  return (
    <AccordionItem value={value}>
      <AccordionTrigger
        className={cn("w-full flex items-center justify-around h-8", className)}
      >
        <p>{trigger}</p>
      </AccordionTrigger>
      <AccordionContent>{children}</AccordionContent>
    </AccordionItem>
  );
};
