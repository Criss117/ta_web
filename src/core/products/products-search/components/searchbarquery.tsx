import { useEffect, useState } from "react";

import { useDebounce } from "@uidotdev/usehooks";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface Props {
  searchByQueryFn?: (query: string) => void;
}

const SearchBarQuery = ({ searchByQueryFn }: Props) => {
  const [query, setQuery] = useState("");
  const queryDebaunce = useDebounce(query, 500);

  useEffect(() => {
    if (!searchByQueryFn) return;
    if (queryDebaunce.length >= 3 || queryDebaunce.length === 0) {
      searchByQueryFn(queryDebaunce);
      return;
    }

    searchByQueryFn("");
  }, [queryDebaunce]);

  const clearQuery = () => {
    setQuery("");
  };

  return (
    <>
      <div className="grid w-full max-w-xl items-center gap-1.5 relative">
        <Label htmlFor="query">Codigo de barras o descripción</Label>
        <Input
          type="text"
          id="query"
          placeholder="Código de barras o descripción"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value.trim());
          }}
        />
        <Button
          variant="ghost"
          className="absolute right-0 bottom-0 bg-transparent hover:bg-transparent"
          onClick={clearQuery}
        >
          <X />
        </Button>
      </div>
    </>
  );
};

export default SearchBarQuery;
