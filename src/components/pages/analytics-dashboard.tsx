import React, { useState } from "react";
import TopNavigation from "../dashboard/layout/TopNavigation";
import Sidebar from "../dashboard/layout/Sidebar";
import MetricCards from "../dashboard/MetricCards";
import AnalyticsCharts from "../dashboard/AnalyticsCharts";
import DataVisualizations from "../dashboard/DataVisualizations";
import AdvancedFilters from "../dashboard/AdvancedFilters";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";
import { useAuth } from "../../../supabase/auth";
import { useNavigate } from "react-router-dom";

const AnalyticsDashboard = () => {
  const [isPremium, setIsPremium] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-950">
      <TopNavigation />

      <div className="flex pt-16">
        <Sidebar />

        <main className="flex-1 overflow-auto p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">
                Analytics Dashboard
              </h1>
              <p className="text-gray-400">
                Interactive data visualizations and insights
              </p>
            </div>

            {!isPremium && (
              <Button
                onClick={() => setIsPremium(true)}
                className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 flex items-center gap-2"
              >
                <Sparkles className="h-4 w-4" />
                Upgrade to Pro
                <Badge className="ml-1 bg-white/20 text-white text-xs">
                  SAVE 20%
                </Badge>
              </Button>
            )}
          </div>

          <div className="space-y-6">
            <MetricCards />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AnalyticsCharts isPremium={isPremium} />
              <DataVisualizations isPremium={isPremium} />
            </div>

            <AdvancedFilters isPremium={isPremium} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
