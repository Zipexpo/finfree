import { useFieldArray } from "react-hook-form";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { MoreHorizontal, Plus } from "lucide-react";
import AssertSingle from "./AssertSingle";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";
import { TableView } from "./ui/TableView";
import { generateHeader } from "./ui/TableView/ulti";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";

const columnKeys = [
  generateHeader({
    key: "asset_name",
    label: "Name",
    isSotable: true,
  }),
  generateHeader({
    key: "asset_category",
    label: "Category",
    isSotable: true,
  }),
  generateHeader({
    key: "asset_amount",
    label: "Amount",
    isSotable: true,
    isMoney: true,
  }),
];
export default function AssertList({ control, onSubmit }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "assert",
  });
  function onSubmitAsset(data) {
    append(data);
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
          <DropdownMenuItem>Edit</DropdownMenuItem>
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
  return (
    <div className="flex flex-col max-h-full relative">
      <div className="flex-none">
        <h4>Assets ($)</h4>
        <Dialog>
          <DialogTrigger asChild>
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
      </div>
      <TableView
        className="flex-1 flex flex-col max-h-full"
        columnKeys={columnKeys}
        data={fields}
        searchKey="asset_name"
        actionComp={actionComp}
      />
      {/* {fields.map((item, index) => (
          <div key={item.id}>
            <label>Name</label>
            <input
              {...register(`items.${index}.name`)}
              placeholder="Enter name"
            />
            {errors.items?.[index]?.name && (
              <p>{errors.items?.[index]?.name.message}</p>
            )}

            <label>Age</label>
            <input
              type="number"
              {...register(`items.${index}.age`, { valueAsNumber: true })}
              placeholder="Enter age"
            />
            {errors.items?.[index]?.age && (
              <p>{errors.items?.[index]?.age.message}</p>
            )}

            <button type="button" onClick={() => remove(index)}>
              Remove
            </button>
          </div>
        ))} */}
    </div>
  );
}
