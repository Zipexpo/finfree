"use client";
import useStepStore from "@/store/useStepStore";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { SaveIcon } from "lucide-react";
import { useEffect, useMemo } from "react";
import { ReportFF } from "./ui/Report/ReportFF";
import { getIntersection, segmentsIntersect } from "@/lib/utils";
import { InflationSchema } from "@/lib/schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function SummaryReport() {
  const { setFormDatas, formData, allData } = useStepStore((state) => ({
    setFormDatas: state.setFormDatas,
    formData: state.formData[3] || {},
    allData: state.formData,
  }));
  const limit = useMemo(
    () => [allData[0]?.startOfPlan, allData[0]?.endOfPlan],
    [allData[0]]
  );
  const form = useForm({
    resolver: zodResolver(InflationSchema),
    defaultValues: formData || {},
  });
  const inflation = form.watch("inflation") ?? 0;
  const vizData = useMemo(() => {
    const viz = [];
    for (let i = limit[0]; i <= limit[1]; i++) {
      viz.push({ year: i, free: 0, issue: 0, income: 0 });
    }
    // if (allData[2]) debugger;

    (allData[2]?.stages ?? []).forEach((d) => {
      const key = d.isNegative ? "issue" : "income";
      for (let i = d.from; i <= d.to; i++) {
        viz[i - limit[0]][key] += d.amount;
      }
    });

    let starta = ali(allData[1], 0);
    let pre = starta;
    for (let i = 0; i < viz.length; i++) {
      viz[i].free = viz[i].income - viz[i].issue;
      viz[i].r = pre + viz[i].free;
      viz[i]._w = (viz[i - 1]?.issue ?? 0) * Math.pow(1 + inflation / 100, i);
      pre = viz[i].r - starta + ali(allData[1], i + 1);
    }
    for (let i = viz.length - 2; i >= 0; i--) {
      viz[i].w = (viz[i + 1]?._w ?? 0) + (viz[i + 1]?.w ?? 0);
    }
    let cutpoint = [];
    for (let i = 0; i < viz.length - 1; i++) {
      const ins = getIntersection(
        [viz[i].year, viz[i].w],
        [viz[i + 1].year, viz[i + 1].w],
        [viz[i].year, viz[i].r],
        [viz[i + 1].year, viz[i + 1].r]
      );
      if (ins) cutpoint.push({ year: ins.x, intersect: ins.y });
    }
    const sum = [...viz, ...cutpoint];
    sum.cutpoint = cutpoint;
    return sum;
  }, [allData, inflation]);
  function onSubmit(data) {
    setFormDatas(3, data);
  }
  return (
    <Card className="w-full flex flex-col h-full">
      <CardHeader>
        <CardTitle className="flex justify-between">
          Inflation
          <Button type="submit" name="save">
            <SaveIcon className="mr-2 h-4 w-4" /> Save
          </Button>
        </CardTitle>
        <CardDescription>List all stage of your life here.</CardDescription>
        <CardContent className="hidden md:block h-full relative flex-grow overflow-auto">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid grid-cols-4 gap-4 mb-5"
            >
              <FormField
                control={form.control}
                name="inflation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Inflation</FormLabel>
                    <FormControl>
                      <Input subfix="%" type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* <FormField
                control={form.control}
                name="inflation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Inflation</FormLabel>
                    <FormControl>
                      <Input subfix="%" type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
            </form>
          </Form>
          <div className="h-[300px]">
            <ReportFF
              title="Savings capital and FF points"
              data={vizData}
              cutpoint={vizData.cutpoint}
            />
          </div>
        </CardContent>
      </CardHeader>
    </Card>
  );
}

function sumBycat(data, i) {
  let assertTotal = 0;
  (data ?? []).forEach((d) => {
    assertTotal += d.asset_amount * (1 + i * (d.asset_interest ?? 0));
  });
  return assertTotal;
}

function ali(allData, i) {
  let assertTotal = sumBycat(allData?.asset, i);
  let liabilityTotal = sumBycat(allData?.liability, i);
  return assertTotal - liabilityTotal;
}
