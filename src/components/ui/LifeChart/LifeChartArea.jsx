"use client";
import * as React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
  YAxis,
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
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
export const description = "A donut chart with text";

const chartConfig = {
  income: {
    label: "Income",
    color: "green",
  },
  issue: {
    label: "Issue",
    color: "red",
  },
};

export function LifeChartArea({
  title,
  subtitle,
  footerMain,
  footerSub,
  data,
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
            <AreaChart width={500} height={400} accessibilityLayer data={data}>
              <CartesianGrid vertical={false} />
              <XAxis
                interval={0}
                dataKey="year"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                //   tickFormatter={(value) => value?.slice(0, 3)}
              />
              <YAxis />
              <ReferenceLine
                y={0}
                stroke="gray"
                strokeWidth={1.5}
                strokeOpacity={0.65}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
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
              <Area
                dataKey="income"
                type="monotoneX"
                fill="url(#fillIssue)"
                fillOpacity={0.4}
                stroke="var(--color-income)"
                stackId="a"
              />
              <Area
                dataKey="issue"
                type="monotoneX"
                fill="url(#fillIncome)"
                fillOpacity={0.4}
                stroke="var(--color-issue)"
                stackId="a"
              />
            </AreaChart>
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
