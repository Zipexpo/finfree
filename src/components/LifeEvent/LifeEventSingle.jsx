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
import { Switch } from "@/components/ui/switch";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Description } from "@radix-ui/react-dialog";
import Comboboxfree from "@/components/ui/combofree";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  LifeSchema,
  predefinedIssues,
  predefinedIssuesMap,
  predefinedRevenue,
  predefinedRevenueMap,
} from "@/lib/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useMemo, useState } from "react";
import { Label } from "../ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Banknote, CalendarCheck, CalendarRange, Store } from "lucide-react";

export default function LifeEventSingle({
  title,
  description,
  hint,
  onSubmit,
  formData,
  limit = [],
}) {
  const form = useForm({
    resolver: zodResolver(
      LifeSchema.refine(
        (data) => {
          const { from } = data;
          return from >= limit[0] && from <= limit[1];
        },
        {
          message: `From must be between ${limit[0]} and ${limit[1]}`,
          path: ["from"], // This is where the error will be placed
        }
      ).refine(
        (data) => {
          const { to } = data;
          return to >= limit[0] && to <= limit[1];
        },
        {
          message: `To must be bbetween ${limit[0]} and ${limit[1]}`,
          path: ["to"], // This is where the error will be placed
        }
      )
    ),
    defaultValues: formData || {},
  });

  const [isRange, setIsRange] = useState(
    form.getValues("from") === form.getValues("to") ? "one" : "long"
  );
  const [isNegative, setIsNegative] = useState(
    form.getValues("isNegative") ? "true" : "false"
  );

  useEffect(() => {
    const schema =
      isNegative == "true" ? predefinedIssuesMap : predefinedRevenueMap;
    Object.keys(schema.default).forEach((k) => {
      form.setValue(k, schema.default[k]);
    });
    form.setValue("isNegative", isNegative === "true");
  }, [form, isNegative]);
  const fromVal = form.watch("from"); // Watch startYear field
  useEffect(() => {
    if (isRange === "one") {
      form.setValue("to", fromVal);
    }
  }, [form, isRange, fromVal]);

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
      </DialogHeader>
      <Description hidden>{description}</Description>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-4 gap-4"
        >
          <div className="col-span-4">
            <FormField
              control={form.control}
              name="name"
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
          </div>
          <Tabs
            value={isRange}
            onValueChange={setIsRange}
            className="col-span-4"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="one" className="gap-2">
                <CalendarCheck />
                One Time
              </TabsTrigger>
              <TabsTrigger value="long" className="gap-2">
                <CalendarRange /> Long Term
              </TabsTrigger>
            </TabsList>
            <TabsContent value="one" className="grid grid-cols-1 space-x-4">
              <div className="">
                <FormField
                  control={form.control}
                  name="from"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Event Year (age)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </TabsContent>
            <TabsContent value="long" className="grid grid-cols-2 space-x-4">
              <div className="">
                <FormField
                  control={form.control}
                  name="from"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>From</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder={`${hint} name...`}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="">
                <FormField
                  control={form.control}
                  name="to"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>To</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder={`${hint} name...`}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </TabsContent>
          </Tabs>
          <Tabs
            value={isNegative}
            onValueChange={setIsNegative}
            className="col-span-4"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="false" className="gap-2">
                <Banknote /> InCome
              </TabsTrigger>
              <TabsTrigger value="true" className="gap-2">
                <Store /> Expenses
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="col-span-2">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Comboboxfree
                    predefined={
                      isNegative === "true"
                        ? predefinedIssues
                        : predefinedRevenue
                    }
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-2">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input prefix="$" type="number" min="0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
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
