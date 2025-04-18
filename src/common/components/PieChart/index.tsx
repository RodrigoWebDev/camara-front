'use client';

import { LabelList, Pie, PieChart } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

type ChartData = {
  name: string;
  label: string;
  value: number;
  fill: string;
};

type PieChartCardProps = {
  title: string;
  description: string;
  data: ChartData[];
  height?: number;
};

type ChartConfig = {
  label: string;
  color: string;
};

const PieChartCard = ({
  title,
  description,
  data,
  height,
}: PieChartCardProps) => {
  const chartConfig = data.reduce<Record<string, ChartConfig>>((acc, item) => {
    acc[item.name] = { label: item.label, color: item.fill };
    return acc;
  }, {});

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0 px-0 flex items-center">
        <ChartContainer
          config={chartConfig}
          style={{ height: `${height}rem` }}
          className={`mx-auto aspect-square pb-0 [&_.recharts-pie-label-text]:fill-foreground`}
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={data}
              dataKey="value"
              label
              nameKey="name"
              stroke="#ffffff"
            >
              <LabelList
                dataKey="name"
                className="fill-background"
                stroke="none"
                fontSize={12}
                formatter={(value: keyof typeof chartConfig) =>
                  chartConfig[value]?.label
                }
              />
            </Pie>
            <ChartLegend content={<ChartLegendContent />} />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default PieChartCard;
