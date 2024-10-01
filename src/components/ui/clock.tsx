"use client";

import { format } from "@formkit/tempo";
import { useEffect, useRef, useState } from "react";

const Clock = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <p className="text-xl font-semibold text-end ">
      {format(date, { time: "medium" })}
    </p>
  );
};

export default Clock;
