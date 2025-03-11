import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface DataVisualizationsProps {
  isPremium?: boolean;
}

const DataVisualizations = ({ isPremium = false }: DataVisualizationsProps) => {
  const [activeTab, setActiveTab] = useState("pie");

  // Mock data for visualizations
  const pieData = [
    { label: "Desktop", value: 45, color: "#8B5CF6" },
    { label: "Mobile", value: 35, color: "#EC4899" },
    { label: "Tablet", value: 20, color: "#3B82F6" },
  ];

  const heatmapData = Array(7)
    .fill(0)
    .map(() =>
      Array(24)
        .fill(0)
        .map(() => Math.floor(Math.random() * 100)),
    );

  const maxHeatmapValue = Math.max(...heatmapData.flat());

  // Calculate pie chart segments
  const total = pieData.reduce((sum, item) => sum + item.value, 0);
  let currentAngle = 0;

  const pieSegments = pieData.map((item) => {
    const angle = (item.value / total) * 360;
    const segment = {
      startAngle: currentAngle,
      endAngle: currentAngle + angle,
      color: item.color,
      label: item.label,
      value: item.value,
    };
    currentAngle += angle;
    return segment;
  });

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const hours = Array.from({ length: 24 }, (_, i) => i);

  return (
    <Card className="border-gray-800 bg-gray-900 shadow-xl">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold text-white">
            Data Visualizations
          </CardTitle>
          <Tabs
            defaultValue="pie"
            className="w-[300px]"
            onValueChange={setActiveTab}
          >
            <TabsList className="grid w-full grid-cols-3 bg-gray-800">
              <TabsTrigger
                value="pie"
                className="data-[state=active]:bg-gray-700 text-gray-300 data-[state=active]:text-white"
              >
                Pie Chart
              </TabsTrigger>
              <TabsTrigger
                value="heatmap"
                className="data-[state=active]:bg-gray-700 text-gray-300 data-[state=active]:text-white"
              >
                Heatmap
              </TabsTrigger>
              <TabsTrigger
                value="advanced"
                className="data-[state=active]:bg-gray-700 text-gray-300 data-[state=active]:text-white"
                disabled={!isPremium}
              >
                Advanced
                <Badge className="ml-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs">
                  PRO
                </Badge>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <TabsContent value="pie" className="mt-0">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="relative h-[200px] w-[200px]">
              <svg width="200" height="200" viewBox="0 0 100 100">
                {pieSegments.map((segment, i) => {
                  const startAngleRad = (segment.startAngle * Math.PI) / 180;
                  const endAngleRad = (segment.endAngle * Math.PI) / 180;

                  const x1 = 50 + 50 * Math.cos(startAngleRad);
                  const y1 = 50 + 50 * Math.sin(startAngleRad);
                  const x2 = 50 + 50 * Math.cos(endAngleRad);
                  const y2 = 50 + 50 * Math.sin(endAngleRad);

                  const largeArcFlag =
                    segment.endAngle - segment.startAngle <= 180 ? "0" : "1";

                  const pathData = [
                    `M 50 50`,
                    `L ${x1} ${y1}`,
                    `A 50 50 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                    `Z`,
                  ].join(" ");

                  return (
                    <motion.path
                      key={i}
                      d={pathData}
                      fill={segment.color}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                    />
                  );
                })}
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <span className="text-2xl font-bold text-white">{total}</span>
                  <span className="block text-xs text-gray-400">Total</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {pieData.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-gray-300">{item.label}</span>
                  <span className="text-sm font-medium text-white">
                    {item.value} ({((item.value / total) * 100).toFixed(1)}%)
                  </span>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="heatmap" className="mt-0">
          <div className="overflow-x-auto">
            <div className="min-w-[600px]">
              <div className="flex">
                <div className="w-10"></div>
                {hours.map((hour) => (
                  <div
                    key={hour}
                    className="w-6 text-center text-xs text-gray-400"
                  >
                    {hour}
                  </div>
                ))}
              </div>
              {days.map((day, dayIndex) => (
                <div key={day} className="flex items-center">
                  <div className="w-10 text-xs text-gray-400">{day}</div>
                  {hours.map((hour) => {
                    const value = heatmapData[dayIndex][hour];
                    const intensity = (value / maxHeatmapValue) * 100;
                    return (
                      <motion.div
                        key={hour}
                        className="w-6 h-6 m-px rounded-sm"
                        style={{
                          backgroundColor: `rgba(139, 92, 246, ${intensity / 100})`,
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                          duration: 0.5,
                          delay: (dayIndex * 24 + hour) * 0.001,
                        }}
                        whileHover={{
                          scale: 1.2,
                          backgroundColor: "#8B5CF6",
                        }}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-sm bg-purple-900/20" />
              <span className="text-xs text-gray-400">Low</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-sm bg-purple-900/50" />
              <span className="text-xs text-gray-400">Medium</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-sm bg-purple-600" />
              <span className="text-xs text-gray-400">High</span>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="advanced" className="mt-0">
          {isPremium ? (
            <div className="h-[300px] flex items-center justify-center">
              <div className="text-center">
                <h3 className="text-lg font-medium text-white mb-2">
                  Advanced Visualizations
                </h3>
                <p className="text-gray-400">
                  AI-powered predictive analytics and custom visualization tools
                </p>
              </div>
            </div>
          ) : (
            <div className="h-[300px] flex items-center justify-center">
              <div className="text-center">
                <h3 className="text-lg font-medium text-white mb-2">
                  Upgrade to Pro
                </h3>
                <p className="text-gray-400">
                  Get access to advanced visualizations and predictive analytics
                </p>
              </div>
            </div>
          )}
        </TabsContent>
      </CardContent>
    </Card>
  );
};

export default DataVisualizations;
