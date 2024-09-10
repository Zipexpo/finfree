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

export default function AssetSingle({
  title,
  description,
  hint,
  onSubmit,
  formData,
  predefinedAsset,
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
            <Button type="submit" className="btn btn-primary">
              Submit
            </Button>
            <DialogClose asChild>
              <Button type="button" className="btn btn-secondary">
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
