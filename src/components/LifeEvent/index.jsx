"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useFieldArray, useWatch } from "react-hook-form";
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



import { Plus, SaveIcon } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { ScrollArea } from "../ui/scroll-area";
import { useMemo, useState } from "react";
import { generateHeader } from "../ui/TableView/ulti";
import { TableView } from "../ui/TableView";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import LifeEventSingle from "./LifeEventSingle";

const defaultValues = {
  stages: [],
};

const columnKeys = [
  generateHeader({
    key: "name",
    label: "Name",
    isSotable: true,
  }),
  generateHeader({
    key: "from",
    label: "Fom",
    isSotable: true,
  }),
  generateHeader({
    key: "to",
    label: "To",
    isSotable: true,
  }),
  generateHeader({
    key: "category",
    label: "Category",
    isSotable: true,
  }),
  generateHeader({
    key: "amount",
    label: "Amount",
    isSotable: true,
    isMoney: true,
  }),
];

export default function LifeEvent({ prevStep, nextStep }) {
  const { setFormDatas, formData, personal } = useStepStore((state) => ({
    setFormDatas: state.setFormDatas,
    formData: state.formData[2] || defaultValues,
    personal: state.formData[0]
  }));
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(LifeListSchema),
    defaultValues: formData,
  });
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'stages',
  });
  const [isDialogAddOpen, setIsDialogAddOpen] = useState(false);
  function onAddEvent(data) {
    append(data);
    setIsDialogAddOpen(false);
  }
  function actionComp({ row }) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() =>
              setIsDialogOpen({
                data: row.original,
                index: row.index,
                open: true,
              })
            }
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              remove(row.index);
            }}
          >
            Remove
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
 
  function onSubmit(data, event) {
    const clickedButton = event.nativeEvent.submitter.name; // Get the name of the button
    debugger;
    switch (clickedButton) {
      case "next":
        setFormDatas(2, data);
        nextStep();
        break;
      case "back":
        setFormDatas(2, data);
        prevStep();
      default:
        setFormDatas(2, data);
        break;
    }
  }
  return (
    <Card className="w-full flex flex-col h-full">
      <CardHeader>
        <CardTitle className="flex justify-between">
          Income and Expenses
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
              <div className="flex justify-between">
                Life <Dialog
                  open={isDialogAddOpen}
                  onOpenChange={(state) => setIsDialogAddOpen(state)}
                >
                  <DialogTrigger asChild>
                    <Button className="px-2 py-1 text-sm">
                      <Plus className="mr-2 h-4 w-4" /> Add
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <LifeEventSingle
                      title="Add new Event"
                      hint="Event"
                      onSubmit={onAddEvent}
                    />
                  </DialogContent>
                </Dialog>
              </div>
              <ScrollArea>
                <TableView
                  className="flex-grow flex flex-col h-full"
                  columnKeys={columnKeys}
                  data={fields}
                  searchKey="name"
                  actionComp={actionComp}
                />
                
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
