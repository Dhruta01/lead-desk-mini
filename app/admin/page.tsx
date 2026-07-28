"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";

import { db, auth } from "@/lib/firebase";
import LeadTable from "@/components/LeadTable";
import DashboardChart from "@/components/DashboardChart";
import ExportButton from "@/components/ExportButton";
import RecentLeads from "@/components/RecentLeads";
import { Lead } from "@/types/lead";

import {
  FaUsers,
  FaUserPlus,
  FaPhoneAlt,
  FaCheckCircle,
} from "react-icons/fa";

export default function AdminPage() {
  const router = useRouter();

  const [userLoading, setUserLoading] = useState(true);
  const [loading, setLoading] = useState(true);

  const [leads, setLeads] = useState<Lead[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.replace("/login");
        return;
      }

      setUserLoading(false);

      try {
        const q = query(
          collection(db, "leads"),
          orderBy("createdAt", "desc")
        );

        const snapshot = await getDocs(q);

        const data: Lead[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Lead, "id">),
        }));

        setLeads(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  async function handleLogout() {
    await signOut(auth);
    router.push("/login");
  }

  const total = leads.length;
  const newLeads = leads.filter((l) => l.status === "New").length;
  const contacted = leads.filter((l) => l.status === "Contacted").length;
  const closed = leads.filter((l) => l.status === "Closed").length;

  const filteredLeads = leads.filter((lead) => {
    const searchMatch =
      lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.email.toLowerCase().includes(search.toLowerCase());

    const statusMatch =
      statusFilter === "All"
        ? true
        : lead.status === statusFilter;

    return searchMatch && statusMatch;
  });

  if (userLoading) {
    return (
      <main className="min-h-screen flex justify-center items-center">
        <h2 className="text-3xl font-bold">
          Checking Login...
        </h2>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 p-8">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-5">

          <div>

            <h1 className="text-5xl font-extrabold">
              LeadDesk CRM
            </h1>

            <p className="text-gray-500 text-lg mt-2">
              Manage customer leads efficiently with Firebase & Next.js
            </p>

          </div>

          <div className="flex gap-3">

            <ExportButton
              leads={filteredLeads}
            />

            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-xl"
            >
              Logout
            </button>

          </div>

        </div>

        {/* DASHBOARD CARDS */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 flex justify-between items-center">

            <div>

              <h2 className="text-gray-500">
                Total Leads
              </h2>

              <p className="text-4xl font-bold mt-2">
                {total}
              </p>

            </div>

            <FaUsers className="text-5xl text-blue-600" />

          </div>

          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 flex justify-between items-center">

            <div>

              <h2 className="text-gray-500">
                New Leads
              </h2>

              <p className="text-4xl font-bold text-blue-600 mt-2">
                {newLeads}
              </p>

            </div>

            <FaUserPlus className="text-5xl text-blue-500" />

          </div>

          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 flex justify-between items-center">

            <div>

              <h2 className="text-gray-500">
                Contacted
              </h2>

              <p className="text-4xl font-bold text-yellow-600 mt-2">
                {contacted}
              </p>

            </div>

            <FaPhoneAlt className="text-5xl text-yellow-500" />

          </div>

          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 flex justify-between items-center">

            <div>

              <h2 className="text-gray-500">
                Closed
              </h2>

              <p className="text-4xl font-bold text-green-600 mt-2">
                {closed}
              </p>

            </div>

            <FaCheckCircle className="text-5xl text-green-500" />

          </div>

        </div>

        {/* CHART + RECENT LEADS */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

          <DashboardChart
            total={total}
            newLeads={newLeads}
            contacted={contacted}
            closed={closed}
          />

          <RecentLeads
            leads={filteredLeads}
          />

        </div>

        {/* SEARCH */}

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">

          <div className="flex flex-col md:flex-row gap-4">

            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setSearch(e.target.value)
              }
              className="flex-1 border-2 border-gray-200 rounded-xl p-4 focus:outline-none focus:border-blue-500"
            />

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
              className="border-2 border-gray-200 rounded-xl p-4"
            >
              <option>All</option>
              <option>New</option>
              <option>Contacted</option>
              <option>Closed</option>
            </select>

          </div>

        </div>

        {/* TABLE */}

        {loading ? (

          <div className="bg-white rounded-2xl shadow-lg p-10 text-center">

            <h2 className="text-2xl font-bold">
              Loading Leads...
            </h2>

          </div>

        ) : (

          <LeadTable
            leads={filteredLeads}
          />

        )}

      </div>

    </main>
  );
}