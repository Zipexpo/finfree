"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useStepStore from "@/store/useStepStore";
import { Input } from "@/components/ui/input";
import { _AssetSchema, AssetSchema, PersonalSchema } from "@/lib/schema";
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
import { ScrollArea } from "./ui/scroll-area";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Description } from "@radix-ui/react-dialog";
import Comboboxfree from "./ui/combofree";
import { Plus, PlusCircle, PlusCircleIcon } from "lucide-react";
export default function BalanceForm({
  prevStep,
  nextStep,
  backable,
  nextable,
}) {
  const { setFormDatas, formData } = useStepStore((state) => ({
    setFormDatas: state.setFormDatas,
    formData: state.formData[1] || {},
  }));
  const form = useForm({
    resolver: zodResolver(AssetSchema),
    defaultValues: formData,
  });

  function onSubmitAsset(data) {
    console.log(data);
    // setFormDatas(1, data);
    // nextStep();
  }
  return (
    <Card className="w-full flex flex-col h-full">
      <CardHeader>
        <CardTitle>Balance Sheet</CardTitle>
        <CardDescription>List your assert and liabiliies.</CardDescription>
      </CardHeader>
      <CardContent className="h-full relative flex-1">
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={75}>
            <ResizablePanelGroup direction="horizontal">
              <ResizablePanel className="px-2 py-2" defaultSize={50}>
                <h4>Assets ($)</h4>
                <Dialog>
                  <DialogTrigger>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" /> Add
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <AssertSingle
                      title="Add new Asset"
                      hint="Asset"
                      onSubmit={onSubmitAsset}
                    />
                  </DialogContent>
                </Dialog>
                <ScrollArea className="h-full"></ScrollArea>
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel className="px-2 py-2" defaultSize={50}>
                <h4>Liabiliies ($)</h4>
                <ScrollArea className="h-full"></ScrollArea>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={75}></ResizablePanel>
        </ResizablePanelGroup>
      </CardContent>
    </Card>
  );
}

function AssertSingle({ title, description, hint, onSubmit, formData }) {
  const form = useForm({
    resolver: zodResolver(AssetSchema),
    defaultValues: formData || { isLiquid: false },
  });

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
      </DialogHeader>
      <Description>{description}</Description>
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
                <Comboboxfree
                  predefined={[
                    { label: "Housing", value: "Housing" },
                    { label: "Food", value: "Food" },
                    { label: "Clothe", value: "Clothe" },
                  ]}
                  {...field}
                />
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
