"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Lead } from "@/types/lead";
import LeadModal from "./LeadModal";
import toast from "react-hot-toast";

interface Props {
  leads: Lead[];
}

export default function LeadTable({ leads }: Props) {
  const router = useRouter();

  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  async function updateStatus(id: string, status: string) {
    try {
      await updateDoc(doc(db, "leads", id), {
        status,
      });

      toast.success("Status Updated");

      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update status");
    }
  }

  async function deleteLead(id: string) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this lead?"
    );

    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "leads", id));

      toast.success("Lead Deleted");

      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Delete Failed");
    }
  }

  if (leads.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-10 text-center">
        <h2 className="text-2xl font-bold">
          No Leads Found
        </h2>

        <p className="text-gray-500 mt-2">
          Submit your first lead from the homepage.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-xl shadow overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-blue-600 text-white">

            <tr>

              <th className="p-4 text-left">Name</th>

              <th className="p-4 text-left">Email</th>

              <th className="p-4 text-left">Phone</th>

              <th className="p-4 text-left">Company</th>

              <th className="p-4 text-left">Budget</th>

              <th className="p-4 text-left">Created</th>

              <th className="p-4 text-center">Actions</th>

            </tr>

          </thead>

          <tbody>

            {leads.map((lead) => (

              <tr
                key={lead.id}
                className="border-b hover:bg-gray-50"
              >

                <td className="p-4 font-medium">
                  {lead.name}
                </td>

                <td className="p-4">
                  {lead.email}
                </td>

                <td className="p-4">
                  {lead.phone}
                </td>

                <td className="p-4">
                  {lead.company}
                </td>

                <td className="p-4">
                  {lead.budget}
                </td>
                
                <td className="p-4">
                {lead.createdAt
                  ? lead.createdAt.toDate().toLocaleDateString()
                  : "-"}
                </td>


                <td className="p-4">
                {/* 
                  <select
                    value={lead.status}
                    onChange={(e) =>
                      updateStatus(
                        lead.id,
                        e.target.value
                      )
                    }
                    className="border rounded-lg px-3 py-2"
                  > */}

                    <select
                    value={lead.status}
                    onChange={(e) =>
                      updateStatus(lead.id, e.target.value)
                    }
                    className={`px-3 py-2 rounded-lg font-semibold border

                    ${
                      lead.status === "New"
                        ? "bg-blue-100 text-blue-700"
                        : lead.status === "Contacted"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }
                   `}
                    >
                    <option value="New">
                      New
                    </option>

                    <option value="Contacted">
                      Contacted
                    </option>

                    <option value="Closed">
                      Closed
                    </option>

                  </select>

                </td>

                <td className="p-4">

                  <div className="flex gap-2 justify-center">

                    <button
                      onClick={() =>
                        setSelectedLead(lead)
                      }
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                    >
                      View
                    </button>

                    <button
                      onClick={() =>
                        deleteLead(lead.id)
                      }
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                    >
                      Delete
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      <LeadModal
        lead={selectedLead}
        onClose={() => setSelectedLead(null)}
      />
    </>
  );
}