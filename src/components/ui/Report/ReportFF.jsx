"use client";
import * as React from "react";
import {
  CartesianGrid,
  Line,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
  YAxis,
  LineChart,
  Scatter,
  ComposedChart,
  Legend,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Circle } from "lucide-react";
export const description = "A donut chart with text";

const CircleMarker = () => (
  <Circle color="red" strokeWidth="2" absoluteStrokeWidth />
);
const chartConfig = {
  w: {
    label: "Consumer capital W (t)",
    color: "blue",
  },
  s: {
    label: "Existing savings capital S (t)",
    color: "black",
  },
  r: {
    label: "Required savings capital R (t)",
    color: "green",
  },
  intersect: {
    label: "Intersect",
    color: "red",
    icon: CircleMarker,
  },
};

export function ReportFF({
  title,
  subtitle,
  footerMain,
  footerSub,
  data,
  cutpoint,
}) {
  // Custom label render function
  const renderCustomLabel = React.useCallback(({ name, value }) => {
    return `${name}: $${value}`; // Customize the label here
  }, []);
  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="items-center pb-0">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{subtitle}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0 mx-auto w-full h-full overflow-visible">
        <ResponsiveContainer width="100%" height="100%">
          <ChartContainer config={chartConfig}>
            <ComposedChart
              width={500}
              height={400}
              accessibilityLayer
              data={data}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="year"
                tickLine={false}
                axisLine={false}
                type="number"
                domain={["dataMin", "dataMax"]}
                tickFormatter={(value) => value}
              />
              <YAxis />
              <ReferenceLine
                y={0}
                stroke="gray"
                strokeWidth={1.5}
                strokeOpacity={0.65}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <ChartLegend className="mt-8" content={<ChartLegendContent />} />
              <defs>
                <linearGradient id="fillIncome" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="red" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="red" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="fillIssue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="green" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="green" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <Line
                dataKey="w"
                type="monotoneX"
                stroke="var(--color-w)"
                strokeWidth={2}
                dot={false}
              />
              <Line
                dataKey="s"
                type="monotoneX"
                stroke="var(--color-s)"
                strokeWidth={2}
                dot={false}
              />
              <Line
                dataKey="r"
                type="monotoneX"
                stroke="var(--color-r)"
                strokeWidth={2}
                dot={false}
              />
              <Scatter
                fill="none"
                stroke="red"
                dataKey="intersect"
                shape="circle"
                strokeWidth={2}
                line={false}
              />
              {cutpoint.map((d, i) => (
                <ReferenceLine
                  key={i}
                  x={d.year}
                  stroke="red"
                  label={`FF: ${Math.round(d.year)}`}
                  strokeDasharray="3 3"
                />
              ))}
            </ComposedChart>
          </ChartContainer>
        </ResponsiveContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          {footerMain}
        </div>
        <div className="leading-none text-muted-foreground">{footerSub}</div>
      </CardFooter>
    </Card>
  );
}
