"use client";

import { Lead } from "@/types/lead";

interface Props {
  lead: Lead | null;
  onClose: () => void;
}

export default function LeadModal({
  lead,
  onClose,
}: Props) {
  if (!lead) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

      <div className="bg-white rounded-xl shadow-xl w-full max-w-xl p-8 relative">

        <button
          onClick={onClose}
          className="absolute right-5 top-5 text-2xl font-bold"
        >
          ✕
        </button>

        <h2 className="text-3xl font-bold mb-8">
          Lead Details
        </h2>

        <div className="space-y-4">

          <div>
            <span className="font-semibold">Name :</span>
            <p>{lead.name}</p>
          </div>

          <div>
            <span className="font-semibold">Email :</span>
            <p>{lead.email}</p>
          </div>

          <div>
            <span className="font-semibold">Phone :</span>
            <p>{lead.phone}</p>
          </div>

          <div>
            <span className="font-semibold">Company :</span>
            <p>{lead.company}</p>
          </div>

          <div>
            <span className="font-semibold">Budget :</span>
            <p>{lead.budget}</p>
          </div>

          <div>
            <span className="font-semibold">Status :</span>
            <p>{lead.status}</p>
          </div>

          <div>
            <span className="font-semibold">Message :</span>

            <div className="mt-2 bg-gray-100 rounded-lg p-4">
              {lead.message}
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}