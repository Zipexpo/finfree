import { useFieldArray, useWatch } from "react-hook-form";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { MoreHorizontal, Plus } from "lucide-react";
import AssetSingle from "./AssetSingle";
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
import { BalancePieChart } from "./ui/BalancePieChart";
import { useMemo, useState } from "react";
import { sumBy } from "lodash";
import { colorScheme, formatMoney } from "@/lib/utils";

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
  generateHeader({
    key: "asset_interest",
    label: "Interest",
    isSotable: true,
    isPercent: true,
  }),
];
export default function AssetList({
  title,
  mainKey,
  control,
  predefinedSchema,
  onSubmit,
}) {
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: mainKey,
  });
  const [isDialogOpen, setIsDialogOpen] = useState({
    data: {},
    index: -1,
    open: false,
  });
  const [isDialogAddOpen, setIsDialogAddOpen] = useState(false);
  function onSubmitAsset(data) {
    append(data);
    setIsDialogAddOpen(false);
  }
  function onEditAsset(data) {
    if (isDialogOpen.index !== -1) {
      update(isDialogOpen.index, data);
      setIsDialogOpen({ ...isDialogOpen, open: false });
    }
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

  const vizData = useMemo(() => {
    const group = {};
    Object.values(predefinedSchema?.catLabel ?? {}).forEach(
      (d) => (group[d] = 0)
    );
    let total = 0;
    fields.forEach((d) => {
      const cat = predefinedSchema.getCatAsset(d.asset_category);
      group[cat] += d.asset_amount;
      total += d.asset_amount;
    });
    const byCat = Object.keys(group)
      .map((k, i) => {
        return {
          name: k,
          value: group[k],
          fill: colorScheme[i],
        };
      })
      .filter((d) => d.value);
    return { total, byCat };
  }, [fields]);
  return (
    <div className="flex flex-col h-full relative">
      <div className="flex-none flex justify-between">
        <h4>
          {title} ({formatMoney.format(vizData.total)})
        </h4>
        <Dialog
          open={isDialogAddOpen}
          onOpenChange={(state) => setIsDialogAddOpen(state)}
        >
          <DialogTrigger asChild>
            <Button className="px-2 py-1 text-sm">
              <Plus className="mr-2 h-4 w-4" /> Add
            </Button>
          </DialogTrigger>
          <DialogContent>
            <AssetSingle
              predefinedAsset={predefinedSchema?.list}
              title="Add new Asset"
              hint="Asset"
              formData={predefinedSchema?.default}
              onSubmit={onSubmitAsset}
            />
          </DialogContent>
        </Dialog>
      </div>
      <ScrollArea>
        <TableView
          className="flex-grow flex flex-col h-full"
          columnKeys={columnKeys}
          data={fields}
          searchKey="asset_name"
          actionComp={actionComp}
        />
        <BalancePieChart
          prefix="$"
          data={vizData.byCat}
          dataKey={"value"}
          nameKey={"key"}
        />
      </ScrollArea>
      <Dialog
        open={isDialogOpen.open}
        onOpenChange={(state) =>
          setIsDialogOpen({ ...isDialogOpen, open: state })
        }
      >
        <DialogContent>
          <AssetSingle
            predefinedAsset={predefinedSchema?.list}
            title={`Edit ${predefinedSchema?.key}`}
            hint={predefinedSchema?.key}
            onSubmit={onEditAsset}
            formData={isDialogOpen.data}
          />
        </DialogContent>
      </Dialog>
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
