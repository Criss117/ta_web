"use client";

import { useEffect, useState } from "react";
import { format } from "@formkit/tempo";

const Clock = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, 1000 * 60);

    return () => clearInterval(interval);
  }, []);

  return (
    <p className="text-xl font-semibold text-end">
      {format(date, { time: "short" })}
    </p>
  );
};

export default Clock;
