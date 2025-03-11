import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowDown,
  ArrowUp,
  Users,
  DollarSign,
  BarChart2,
  Clock,
} from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
}

const MetricCard = ({ title, value, change, icon }: MetricCardProps) => {
  const isPositive = change >= 0;

  return (
    <Card className="border-gray-800 bg-gray-900 shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-gray-400">
          {title}
        </CardTitle>
        <div className="h-8 w-8 rounded-full bg-gray-800 p-1.5 text-gray-300">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-white">{value}</div>
        <div className="mt-1 flex items-center text-xs">
          {isPositive ? (
            <ArrowUp className="mr-1 h-3 w-3 text-green-500" />
          ) : (
            <ArrowDown className="mr-1 h-3 w-3 text-red-500" />
          )}
          <span
            className={`font-medium ${isPositive ? "text-green-500" : "text-red-500"}`}
          >
            {Math.abs(change)}%
          </span>
          <span className="ml-1 text-gray-400">from last period</span>
        </div>
      </CardContent>
    </Card>
  );
};

const MetricCards = () => {
  const metrics = [
    {
      title: "Total Users",
      value: "2,543",
      change: 12.5,
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: "Revenue",
      value: "$45,231",
      change: 8.2,
      icon: <DollarSign className="h-5 w-5" />,
    },
    {
      title: "Conversion Rate",
      value: "3.6%",
      change: -2.3,
      icon: <BarChart2 className="h-5 w-5" />,
    },
    {
      title: "Avg. Session",
      value: "2m 56s",
      change: 14.6,
      icon: <Clock className="h-5 w-5" />,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, index) => (
        <MetricCard key={index} {...metric} />
      ))}
    </div>
  );
};

export default MetricCards;
