"use client";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
import { Button } from "../button";
import { cn, formatMoney } from "@/lib/utils";
export function generateHeader({
  key,
  label,
  headerClassName = "",
  cellClassName = "",
  isPercent,
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
        const isNegative = row.original["isNegative"] ?? false;
        // Format the amount as a dollar amount
        const formatted = formatMoney.format(amount);

        return (
          <div className={cn("text-right font-medium-right", headerClassName)}>
            {isNegative ? "-" : ""}
            {formatted}
          </div>
        );
      }
    : isPercent
    ? ({ row }) => {
        const amount = parseFloat(row.getValue(key) ?? 0);
        const isNegative = row.original["isNegative"] ?? false;

        return (
          <div className={cn("text-right font-medium-right", headerClassName)}>
            {isNegative ? "-" : ""}
            {amount}%
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
