"use client"

import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface LightCurveChartProps {
  data: Array<{ time: number; brightness: number; isTransit?: boolean }>
}

export function LightCurveChart({ data }: LightCurveChartProps) {
  const chartConfig = {
    brightness: {
      label: "Relative Brightness",
      color: "hsl(var(--primary))",
    },
  }

  return (
    <ChartContainer config={chartConfig} className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
          <XAxis
            dataKey="time"
            label={{ value: "Time (days)", position: "insideBottom", offset: -10 }}
            stroke="hsl(var(--muted-foreground))"
          />
          <YAxis
            label={{ value: "Relative Brightness", angle: -90, position: "insideLeft" }}
            stroke="hsl(var(--muted-foreground))"
            domain={[0.97, 1.01]}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line
            type="monotone"
            dataKey="brightness"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
