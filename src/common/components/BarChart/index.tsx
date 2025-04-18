'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

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
  value1: number;
  value2: number;
};

type BarChartCardProps = {
  title: string;
  description: string;
  labels: string[];
  data: ChartData[];
  className?: string;
  height?: number;
};

const BarChartCard = ({
  title,
  description,
  labels,
  data,
  height,
  className = '',
}: BarChartCardProps) => {
  const chartConfig = {
    value1: {
      label: labels[0],
      color: 'var(--chart-1)',
    },
    value2: {
      label: labels[1],
      color: 'var(--chart-2)',
    },
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="pl-0">
        <ChartContainer
          config={chartConfig}
          className="w-full"
          style={{ height: `${height}rem` }}
        >
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <YAxis tickLine={false} axisLine={false} tickMargin={10} />
            <XAxis
              dataKey="name"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar dataKey="value1" fill="var(--chart-1)" radius={4} />
            <Bar dataKey="value2" fill="var(--chart-2)" radius={4} />
            <ChartLegend content={<ChartLegendContent />} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default BarChartCard;
