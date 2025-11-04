"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export const description = "An interactive area chart"

const chartData = [
  { date: "2024-04-01", inscrit: 222, visit: 150 },
  { date: "2024-04-02", inscrit: 97, visit: 180 },
  { date: "2024-04-03", inscrit: 167, visit: 120 },
  { date: "2024-04-04", inscrit: 242, visit: 260 },
  { date: "2024-04-05", inscrit: 373, visit: 290 },
  { date: "2024-04-06", inscrit: 301, visit: 340 },
  { date: "2024-04-07", inscrit: 245, visit: 180 },
  { date: "2024-04-08", inscrit: 409, visit: 320 },
  { date: "2024-04-09", inscrit: 59, visit: 110 },
  { date: "2024-04-10", inscrit: 261, visit: 190 },
  { date: "2024-04-11", inscrit: 327, visit: 350 },
  { date: "2024-04-12", inscrit: 292, visit: 210 },
  { date: "2024-04-13", inscrit: 342, visit: 380 },
  { date: "2024-04-14", inscrit: 137, visit: 220 },
  { date: "2024-04-15", inscrit: 120, visit: 170 },
  { date: "2024-04-16", inscrit: 138, visit: 190 },
  { date: "2024-04-17", inscrit: 446, visit: 360 },
  { date: "2024-04-18", inscrit: 364, visit: 410 },
  { date: "2024-04-19", inscrit: 243, visit: 180 },
  { date: "2024-04-20", inscrit: 89, visit: 150 },
  { date: "2024-04-21", inscrit: 137, visit: 200 },
  { date: "2024-04-22", inscrit: 224, visit: 170 },
  { date: "2024-04-23", inscrit: 138, visit: 230 },
  { date: "2024-04-24", inscrit: 387, visit: 290 },
  { date: "2024-04-25", inscrit: 215, visit: 250 },
  { date: "2024-04-26", inscrit: 75, visit: 130 },
  { date: "2024-04-27", inscrit: 383, visit: 420 },
  { date: "2024-04-28", inscrit: 122, visit: 180 },
  { date: "2024-04-29", inscrit: 315, visit: 240 },
  { date: "2024-04-30", inscrit: 454, visit: 380 },
  { date: "2024-05-01", inscrit: 165, visit: 220 },
  { date: "2024-05-02", inscrit: 293, visit: 310 },
  { date: "2024-05-03", inscrit: 247, visit: 190 },
  { date: "2024-05-04", inscrit: 385, visit: 420 },
  { date: "2024-05-05", inscrit: 481, visit: 390 },
  { date: "2024-05-06", inscrit: 498, visit: 520 },
  { date: "2024-05-07", inscrit: 388, visit: 300 },
  { date: "2024-05-08", inscrit: 149, visit: 210 },
  { date: "2024-05-09", inscrit: 227, visit: 180 },
  { date: "2024-05-10", inscrit: 293, visit: 330 },
  { date: "2024-05-11", inscrit: 335, visit: 270 },
  { date: "2024-05-12", inscrit: 197, visit: 240 },
  { date: "2024-05-13", inscrit: 197, visit: 160 },
  { date: "2024-05-14", inscrit: 448, visit: 490 },
  { date: "2024-05-15", inscrit: 473, visit: 380 },
  { date: "2024-05-16", inscrit: 338, visit: 400 },
  { date: "2024-05-17", inscrit: 499, visit: 420 },
  { date: "2024-05-18", inscrit: 315, visit: 350 },
  { date: "2024-05-19", inscrit: 235, visit: 180 },
  { date: "2024-05-20", inscrit: 177, visit: 230 },
  { date: "2024-05-21", inscrit: 82, visit: 140 },
  { date: "2024-05-22", inscrit: 81, visit: 120 },
  { date: "2024-05-23", inscrit: 252, visit: 290 },
  { date: "2024-05-24", inscrit: 294, visit: 220 },
  { date: "2024-05-25", inscrit: 201, visit: 250 },
  { date: "2024-05-26", inscrit: 213, visit: 170 },
  { date: "2024-05-27", inscrit: 420, visit: 460 },
  { date: "2024-05-28", inscrit: 233, visit: 190 },
  { date: "2024-05-29", inscrit: 78, visit: 130 },
  { date: "2024-05-30", inscrit: 340, visit: 280 },
  { date: "2024-05-31", inscrit: 178, visit: 230 },
  { date: "2024-06-01", inscrit: 178, visit: 200 },
  { date: "2024-06-02", inscrit: 470, visit: 410 },
  { date: "2024-06-03", inscrit: 103, visit: 160 },
  { date: "2024-06-04", inscrit: 439, visit: 380 },
  { date: "2024-06-05", inscrit: 88, visit: 140 },
  { date: "2024-06-06", inscrit: 294, visit: 250 },
  { date: "2024-06-07", inscrit: 323, visit: 370 },
  { date: "2024-06-08", inscrit: 385, visit: 320 },
  { date: "2024-06-09", inscrit: 438, visit: 480 },
  { date: "2024-06-10", inscrit: 155, visit: 200 },
  { date: "2024-06-11", inscrit: 92, visit: 150 },
  { date: "2024-06-12", inscrit: 492, visit: 420 },
  { date: "2024-06-13", inscrit: 81, visit: 130 },
  { date: "2024-06-14", inscrit: 426, visit: 380 },
  { date: "2024-06-15", inscrit: 307, visit: 350 },
  { date: "2024-06-16", inscrit: 371, visit: 310 },
  { date: "2024-06-17", inscrit: 475, visit: 520 },
  { date: "2024-06-18", inscrit: 107, visit: 170 },
  { date: "2024-06-19", inscrit: 341, visit: 290 },
  { date: "2024-06-20", inscrit: 408, visit: 450 },
  { date: "2024-06-21", inscrit: 169, visit: 210 },
  { date: "2024-06-22", inscrit: 317, visit: 270 },
  { date: "2024-06-23", inscrit: 480, visit: 530 },
  { date: "2024-06-24", inscrit: 132, visit: 180 },
  { date: "2024-06-25", inscrit: 141, visit: 190 },
  { date: "2024-06-26", inscrit: 434, visit: 380 },
  { date: "2024-06-27", inscrit: 448, visit: 490 },
  { date: "2024-06-28", inscrit: 149, visit: 200 },
  { date: "2024-06-29", inscrit: 103, visit: 160 },
  { date: "2024-06-30", inscrit: 446, visit: 400 },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  inscrit: {
    label: "utilisateur ayant pris RDV :",
    color: "var(--chart-1)",
  },
  visit: {
    label: "utilisateur visiteur : ",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export function ChartAreaInteractive() {
  const [timeRange, setTimeRange] = React.useState("90d")

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date("2024-06-30")
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (
    <Card className="pt-0">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Statistique visiteur</CardTitle>
          <CardDescription>
            Voir les tendances des utilisateurs inscrits et des visiteurs
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
            aria-label="Select a value"
          >
            <SelectValue placeholder="3 dernier mois" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              3 dernier mois
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              30 dernier jours
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              7 dernier jours
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillinscrit" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--background)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--background)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillvisit" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-primary)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-primary)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="inscrit"
              type="natural"
              fill="url(#fillvisit)"
              stroke="var(--background)"
              stackId="a"
            />
            <Area
              dataKey="visit"
              type="natural"
              fill="url(#fillinscrit)"
              stroke="var(--color-primary)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
