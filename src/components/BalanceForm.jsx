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
import { AssetListSchema, predefinedAssetSchema } from "@/lib/schema";

import { ScrollArea } from "./ui/scroll-area";
import AssetList from "./AssetList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

const defaultValues = {
  asset: [],
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
        <CardDescription>List your asset and liabiliies.</CardDescription>
      </CardHeader>
      <CardContent className="hidden md:block h-full relative flex-grow overflow-auto">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel className="px-2 pl-2 pr-4" defaultSize={50}>
            <AssetList
              mainKey="asset"
              predefinedSchema={predefinedAssetSchema}
              control={formAsset.control}
              onSubmit={onSubmitAsset}
            />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel className="px-2 pl-4 pr-2" defaultSize={50}>
            <h4>Liabiliies ($)</h4>
            <ScrollArea className="h-full"></ScrollArea>
          </ResizablePanel>
        </ResizablePanelGroup>
      </CardContent>
      <CardContent className="md:hidden block h-full relative flex-grow overflow-auto">
        <Tabs
          defaultValue="asset"
          className="flex flex-col h-full overflow-hidden"
        >
          <TabsList>
            <TabsTrigger value="asset">Assets</TabsTrigger>
            <TabsTrigger value="liability">Liabilities</TabsTrigger>
          </TabsList>
          <TabsContent value="asset" className="flex-grow overflow-auto">
            <AssetList
              control={formAsset.control}
              register={formAsset.register}
              onSubmit={onSubmitAsset}
            />
          </TabsContent>
          <TabsContent
            value="liability"
            className="flex-grow overflow-auto"
          ></TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
