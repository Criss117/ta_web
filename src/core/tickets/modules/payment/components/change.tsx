import { useEffect, useMemo, useState } from "react";
import { Label } from "@radix-ui/react-context-menu";

import { Input } from "@/components/ui/input";
import { cn, formatCurrency } from "@/lib/utils";

interface Props {
  total: number;
}

const Change = ({ total }: Props) => {
  const [payWith, setPayWith] = useState(total);

  const chage = useMemo(() => {
    return total - payWith;
  }, [total, payWith]);

  useEffect(() => {
    setPayWith(total);
  }, [total]);
  return (
    <div className="flex items-center justify-center gap-x-20 mt-10 flex-col gap-y-5">
      <fieldset className="flex items-center gap-x-2">
        <Label className="text-xl" id="pay-with">
          Pagó con:
        </Label>
        <Input
          className="w-32"
          placeholder={payWith.toString()}
          type="number"
          id="pay-with"
          value={payWith.toString()}
          onChange={(e) => setPayWith(e.target.valueAsNumber)}
        />
      </fieldset>
      <p className="text-xl">
        Su cambio:{" "}
        <span className={cn(chage < 0 ? "text-red-500" : "text-green-500")}>
          {formatCurrency(chage)}
        </span>
      </p>
    </div>
  );
};

export default Change;
