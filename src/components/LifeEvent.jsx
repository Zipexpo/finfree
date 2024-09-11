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
import { LifeListSchema } from "@/lib/schema";

import { ScrollArea } from "./ui/scroll-area";
import AssetList from "./AssetList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Form } from "./ui/form";
import { SaveIcon } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";

const defaultValues = {
  stages: [],
};

export default function LifeEvent({ prevStep, nextStep }) {
  const { setFormDatas, formData } = useStepStore((state) => ({
    setFormDatas: state.setFormDatas,
    formData: state.formData[2] || defaultValues,
  }));
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(LifeListSchema),
    defaultValues: formData,
  });
  function onSubmit(data, event) {
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
          Life Event
          <Button type="submit" name="save">
            <SaveIcon className="mr-2 h-4 w-4" /> Save
          </Button>
        </CardTitle>
        <CardDescription>List all stage of your life here.</CardDescription>
      </CardHeader>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="h-full w-full overflow-auto flex flex-col"
      >
        <CardContent className="hidden md:block h-full relative flex-grow overflow-auto">
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel className="px-2 pl-2 pr-4" defaultSize={50}>
              <ScrollArea>
                Life
                <div className="flex">
                  <Card>
                    <Collapsible>
                      <CollapsibleTrigger>
                        <CardHeader>Can I use this in my project?</CardHeader>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <CardContent>
                          Yes. Free to use for personal and commercial projects.
                          No attribution required.
                        </CardContent>
                      </CollapsibleContent>
                    </Collapsible>
                  </Card>
                </div>
              </ScrollArea>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel className="px-2 pl-4 pr-2" defaultSize={50}>
              Chart
            </ResizablePanel>
          </ResizablePanelGroup>
        </CardContent>
      </form>
    </Card>
  );
}
