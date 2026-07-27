"use client";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Doughnut } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

interface Props {
  total: number;
  newLeads: number;
  contacted: number;
  closed: number;
}

export default function DashboardChart({
  total,
  newLeads,
  contacted,
  closed,
}: Props) {
  const data = {
    labels: [
      "New",
      "Contacted",
      "Closed",
    ],
    datasets: [
      {
        data: [
          newLeads,
          contacted,
          closed,
        ],
        backgroundColor: [
          "#3B82F6",
          "#F59E0B",
          "#22C55E",
        ],
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 mb-8">

      <div className="flex justify-between items-center mb-6">

        <div>
          <h2 className="text-2xl font-bold">
            Lead Analytics
          </h2>

          <p className="text-gray-500">
            Total Leads : {total}
          </p>
        </div>

      </div>

      <div className="max-w-sm mx-auto">

        <Doughnut
          data={data}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "bottom",
              },
            },
          }}
        />

      </div>

    </div>
  );
}