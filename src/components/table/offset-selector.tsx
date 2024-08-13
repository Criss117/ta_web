"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

interface Props {
  currentOffset: number;
}

const offsets = [10, 20, 30, 40, 50];

const OffSetSelector = ({ currentOffset }: Props) => {
  const { push } = useRouter();

  const offsetChange = (newOffset: number) => {
    push(`?page=1&offset=${newOffset}`);
  };

  return (
    <div className="flex gap-2 items-center">
      <p>Filas por pagina</p>
      <Select
        onValueChange={(value) => {
          offsetChange(Number(value));
        }}
      >
        <SelectTrigger className="w-fit">
          <SelectValue
            placeholder={currentOffset.toString()}
            defaultValue={currentOffset.toString()}
          />
        </SelectTrigger>
        <SelectContent className="w-fit">
          {offsets.map((offset) => (
            <SelectItem key={offset} value={offset.toString()}>
              {offset}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default OffSetSelector;
