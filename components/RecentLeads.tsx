"use client";

import { Lead } from "@/types/lead";

interface Props {
  leads: Lead[];
}

export default function RecentLeads({ leads }: Props) {
  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-2xl font-bold mb-6">
        Recent Leads
      </h2>

      {leads.length === 0 ? (
        <p className="text-gray-500">
          No Recent Leads
        </p>
      ) : (
        <div className="space-y-4">

          {leads.slice(0,5).map((lead) => (

            <div
              key={lead.id}
              className="flex justify-between items-center border-b pb-3"
            >

              <div>

                <h3 className="font-semibold">
                  {lead.name}
                </h3>

                <p className="text-sm text-gray-500">
                  {lead.company}
                </p>

              </div>

              <span
                className={`px-3 py-1 rounded-full text-sm

                ${
                  lead.status==="New"
                  ?"bg-blue-100 text-blue-700"
                  :lead.status==="Contacted"
                  ?"bg-yellow-100 text-yellow-700"
                  :"bg-green-100 text-green-700"
                }`}
              >
                {lead.status}
              </span>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}