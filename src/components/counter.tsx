"use client";

import { useCallback } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface CounterProps {
  title: string;
  subtitle: string;
  value: number;
  valueIncrement?: number;
  onChange: (value: number) => void;
}

const Counter = ({
  title,
  subtitle,
  value,
  valueIncrement = 1,
  onChange,
}: CounterProps) => {
  const onAdd = useCallback(() => {
    onChange(value + valueIncrement);
  }, [onChange, value]);

  const onReduce = useCallback(() => {
    if (value == valueIncrement) {
      return;
    }
    onChange(value - valueIncrement);
  }, [value, onChange]);

  const onValueChange = useCallback(
    (event) => {
      const newValue = parseInt(event.target.value, 10);
      if (!isNaN(newValue)) {
        onChange(newValue);
      }
    },
    [onChange],
  );

  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-col">
        <div className="font-medium">{title}</div>
        <div className="font-light text-gray-600">{subtitle}</div>
      </div>
      <div className="flex flex-row items-center gap-4">
        <div
          onClick={onReduce}
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-[1px] border-neutral-400 text-neutral-600 transition hover:opacity-80"
        >
          <AiOutlineMinus />
        </div>
        <input
          type="number"
          value={value}
          onChange={onValueChange}
          className="w-10 text-center text-xl font-light text-neutral-600"
          style={{
            WebkitAppearance: "none",
            MozAppearance: "textfield",
            appearance: "textfield",
          }}
        />
        <div
          onClick={onAdd}
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-[1px] border-neutral-400 text-neutral-600 transition hover:opacity-80"
        >
          <AiOutlinePlus />
        </div>
      </div>
    </div>
  );
};

export default Counter;
