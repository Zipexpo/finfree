"use client";

import * as React from "react";

import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { FormControl } from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Comboboxfree = React.forwardRef(
  ({ predefined = [], value, onChange, className, ...props }, ref) => {
    const [inputValue, setInputValue] = React.useState(value);
    const [options, setOptions] = React.useState([...predefined]);
    React.useEffect(() => {
      const value = (inputValue ?? "").trim();
      if (
        value !== "" &&
        !predefined.find((option) => option.value === value)
      ) {
        setOptions((prevOptions) => [
          ...predefined,
          { value: value, label: value, temp: true },
        ]); // Add the custom value to the list if not present
      }
    }, [inputValue, predefined]);
    const handleSelect = (value) => {
      setInputValue(value);
      if (onChange) onChange(value);
    };

    const handleInputChange = (input) => {
      setInputValue(input);
    };

    return (
      <Popover>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant="outline"
              role="combobox"
              className={cn(
                "w-[200px] justify-between",
                !inputValue && "text-muted-foreground",
                "w-full",
                className
              )}
            >
              {inputValue
                ? options.find((option) => option.value === inputValue)?.label
                : "Select option"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput
              placeholder="Search or type option..."
              value={inputValue}
              onInput={(e) => handleInputChange(e.target.value)} // Allow typing free text
            />
            <CommandList>
              <CommandEmpty>No option found.</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    value={option.label}
                    key={option.value}
                    onSelect={() => {
                      handleSelect(option.value);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        option.value === inputValue
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  }
);
Comboboxfree.displayName = "Comboboxfree";
export default Comboboxfree;
