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
import { SaveIcon } from "lucide-react";

const defaultValues = {
  asset: [],
  liability: [],
};

export default function BalanceForm({ prevStep, nextStep }) {
  const { setFormDatas, formData } = useStepStore((state) => ({
    setFormDatas: state.setFormDatas,
    formData: state.formData[1] || defaultValues,
  }));
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(AssetListSchema),
    defaultValues: formData,
  });

  function onSubmitAsset(data, event) {
    const clickedButton = event.nativeEvent.submitter.name; // Get the name of the button
    debugger;
    switch (clickedButton) {
      case "next":
        setFormDatas(1, data);
        nextStep();
        break;
      case "back":
        setFormDatas(1, data);
        prevStep();
      default:
        setFormDatas(1, data);
        break;
    }
  }
  return (
    <Card className="w-full flex flex-col h-full">
      <CardHeader>
        <CardTitle className="flex justify-between">
          Balance Sheet
          <Button type="submit" name="save">
            <SaveIcon className="mr-2 h-4 w-4" /> Save
          </Button>
        </CardTitle>
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
            <Button type="submit" name="back">
              Back
            </Button>
          </div>
          <div className="col-span-2 grid grid-cols-subgrid">
            <Button type="submit" className="col-start-2" name="next">
              Next
            </Button>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}
