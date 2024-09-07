"use client";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
import { Button } from "../button";
import { cn } from "@/lib/utils";
export function generateHeader({
  key,
  label,
  headerClassName = "",
  cellClassName = "",
  isMoney,
  isSotable,
}) {
  const header = isSotable ? (
    ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className={headerClassName}
      >
        {label}
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    )
  ) : (
    <div className={cn("text-right", headerClassName)}>{label}</div>
  );
  const cell = isMoney
    ? ({ row }) => {
        const amount = parseFloat(row.getValue(key));

        // Format the amount as a dollar amount
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount);

        return (
          <div className={cn("text-right font-medium-right", headerClassName)}>
            {formatted}
          </div>
        );
      }
    : ({ row }) => <div className={cellClassName}>{row.getValue(key)}</div>;
  return {
    accessorKey: key,
    header,
    cell,
  };
}
