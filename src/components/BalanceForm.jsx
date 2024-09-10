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
import {
  AssetListSchema,
  predefinedAssetSchema,
  predefinedLiabilitySchema,
} from "@/lib/schema";

import { ScrollArea } from "./ui/scroll-area";
import AssetList from "./AssetList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Form } from "./ui/form";

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
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(AssetListSchema),
    defaultValues: formData,
  });

  function onSubmitAsset(data) {
    debugger;
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

      <form
        onSubmit={handleSubmit(onSubmitAsset)}
        className="h-full w-full overflow-auto flex flex-col"
      >
        <CardContent className="hidden md:block h-full relative flex-grow overflow-auto">
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel className="px-2 pl-2 pr-4" defaultSize={50}>
              <AssetList
                title="Assets"
                mainKey="asset"
                predefinedSchema={predefinedAssetSchema}
                control={control}
                onSubmit={onSubmitAsset}
              />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel className="px-2 pl-4 pr-2" defaultSize={50}>
              <AssetList
                title="Liabiliies"
                mainKey="liability"
                predefinedSchema={predefinedLiabilitySchema}
                control={control}
                onSubmit={onSubmitAsset}
              />
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
                title="Assets"
                mainKey="asset"
                predefinedSchema={predefinedAssetSchema}
                control={control}
                onSubmit={onSubmitAsset}
              />
            </TabsContent>
            <TabsContent value="liability" className="flex-grow overflow-auto">
              <AssetList
                title="Liabiliies"
                mainKey="liability"
                predefinedSchema={predefinedLiabilitySchema}
                control={control}
                onSubmit={onSubmitAsset}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="grid gap-x-2 gap-y-1 grid-cols-4">
          <div className="col-span-2 grid grid-cols-subgrid">
            <Button>Back</Button>
          </div>
          <div className="col-span-2 grid grid-cols-subgrid">
            <Button type="submit" className="col-start-2">
              Next
            </Button>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}
