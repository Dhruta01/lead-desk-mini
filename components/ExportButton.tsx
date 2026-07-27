"use client";

import { Lead } from "@/types/lead";

interface Props {
  leads: Lead[];
}

export default function ExportButton({ leads }: Props) {
  function exportCSV() {
    const headers = [
      "Name",
      "Email",
      "Phone",
      "Company",
      "Budget",
      "Status",
      "Message",
    ];

    const rows = leads.map((lead) => [
      lead.name,
      lead.email,
      lead.phone,
      lead.company,
      lead.budget,
      lead.status,
      lead.message,
    ]);

    const csv = [
      headers,
      ...rows,
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = "leads.csv";

    link.click();

    URL.revokeObjectURL(url);
  }

  return (
    <button
      onClick={exportCSV}
      className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl"
    >
      Export CSV
    </button>
  );
}