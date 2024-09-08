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
import { AssetListSchema } from "@/lib/schema";

import { ScrollArea } from "./ui/scroll-area";
import AssertList from "./AssertList";

const defaultValues = {
  assert: [],
  liability: [],
};

export default function BalanceForm({
  prevStep,
  nextStep,
  backable,
  nextable,
}) {
  const { setFormDatas, formData } = useStepStore((state) => ({
    setFormDatas: state.setFormDatas,
    formData: state.formData[1] || defaultValues,
  }));
  const formAsset = useForm({
    resolver: zodResolver(AssetListSchema),
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
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel className="px-2 py-2" defaultSize={50}>
            <AssertList
              control={formAsset.control}
              register={formAsset.register}
              onSubmit={onSubmitAsset}
            />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel className="px-2 py-2" defaultSize={50}>
            <h4>Liabiliies ($)</h4>
            <ScrollArea className="h-full"></ScrollArea>
          </ResizablePanel>
        </ResizablePanelGroup>
      </CardContent>
    </Card>
  );
}
