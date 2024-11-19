"use client";
import { SquareDashedKanban } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useCommonArt from "@/core/tickets/application/hooks/use.common-art";
import { Form, FormField } from "@/components/ui/form";
import FormItemInput from "@/components/form/form-item-input";
import { useState } from "react";

const CommonArt = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { form: commonArtForm, onSubmit } = useCommonArt();

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="space-x-2">
          <SquareDashedKanban className="w-4 h-4" />
          <p>Art. Común</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl flex flex-col">
        <DialogHeader>
          <DialogTitle>Buscar Producto</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Form {...commonArtForm}>
          <form onSubmit={onSubmit}>
            <fieldset>
              <FormField
                control={commonArtForm.control}
                name="description"
                render={({ field }) => (
                  <FormItemInput
                    field={field}
                    label="Descripción"
                    placeholder="Descripción"
                    type="text"
                  />
                )}
              />
            </fieldset>
            <fieldset className="flex w-full justify-between">
              <FormField
                control={commonArtForm.control}
                name="quantity"
                render={({ field }) => (
                  <FormItemInput
                    field={field}
                    label="Cantidad"
                    placeholder="Cantidad"
                    type="number"
                    min={0}
                  />
                )}
              />
              <FormField
                control={commonArtForm.control}
                name="salePrice"
                render={({ field }) => (
                  <FormItemInput
                    field={field}
                    label="Precio"
                    placeholder="Precio"
                    type="number"
                    min={0}
                  />
                )}
              />
            </fieldset>
            <DialogFooter className="flex justify-between sm:justify-between mt-2">
              <Button type="submit">Aceptar</Button>
              <Button
                variant="destructive"
                type="button"
                onClick={() => setIsOpen(false)}
              >
                Cerrar
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CommonArt;
