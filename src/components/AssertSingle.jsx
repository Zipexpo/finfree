import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "./ui/checkbox";
import { Description } from "@radix-ui/react-dialog";
import Comboboxfree from "./ui/combofree";
import { zodResolver } from "@hookform/resolvers/zod";
import { AssetSchema } from "@/lib/schema";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const predefinedAsset = [
  {
    heading: "Liquid Investments",
    member: [
      { label: "Cashier", value: "cashier" },
      { label: "Shares", value: "shares" },
      { label: "Equity Fund", value: "equity fund" },
      { label: "Pension Fund", value: "pension fund" },
      { label: "Derivatives", value: "derivatives" },
      { label: "Precious Metals", value: "precious metals" },
    ],
  },
  {
    heading: "Real Estate",
    member: [
      { label: "Owner-occupied property", value: "owner-occupied property" },
      {
        label: "Rented residential properties",
        value: "rented residential properties",
      },
      {
        label: "Rented commercial properties",
        value: "rented commercial properties",
      },
      { label: "Undeveloped lots", value: "undeveloped lots" },
      { label: "Closed real estate funds", value: "closed real estate funds" },
      { label: "Open real estate funds", value: "open real estate funds" },
    ],
  },
  {
    heading: "Corporate Holdings",
    member: [
      { label: "Active participations", value: "active participations" },
      {
        label: "Not active participations",
        value: "not active participations",
      },
    ],
  },
];
export default function AssertSingle({
  title,
  description,
  hint,
  onSubmit,
  formData,
}) {
  const form = useForm({
    resolver: zodResolver(AssetSchema),
    defaultValues: formData || { isLiquid: false },
  });

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
      </DialogHeader>
      <Description hidden>{description}</Description>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex-col space-y-2 h-full"
        >
          <FormField
            control={form.control}
            name="asset_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder={`${hint} name...`} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="asset_category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Comboboxfree predefined={predefinedAsset} {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="asset_amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input prefix="$" type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isLiquid"
            render={({ field }) => (
              <FormItem className="flex items-end gap-2">
                <FormLabel>Liquid Asset?</FormLabel>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter className="sm:justify-start pt-5">
            <DialogClose asChild>
              <Button type="submit" className="w-full">
                Add
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
