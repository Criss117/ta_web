import { format } from "@formkit/tempo";
import { useEffect, useRef, useState } from "react";

const Clock = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, 1000 * 60);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <p className="text-xl font-semibold">{format(date, { time: "short" })}</p>
    </div>
  );
};

export default Clock;
