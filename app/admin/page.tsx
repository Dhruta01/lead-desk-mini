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
import { Lead } from "@/types/lead";
import RecentLeads from "@/components/RecentLeads";

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
  const newLeads = leads.filter(
    (l) => l.status === "New"
  ).length;

  const contacted = leads.filter(
    (l) => l.status === "Contacted"
  ).length;

  const closed = leads.filter(
    (l) => l.status === "Closed"
  ).length;

  const filteredLeads = leads.filter((lead) => {
    const searchMatch =
      lead.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      lead.email
        .toLowerCase()
        .includes(search.toLowerCase());

    const statusMatch =
      statusFilter === "All"
        ? true
        : lead.status === statusFilter;

    return searchMatch && statusMatch;
  });

  if (userLoading) {
    return (
      <main className="min-h-screen flex justify-center items-center">
        <h2 className="text-2xl font-bold">
          Checking Login...
        </h2>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 p-8">

      <div className="max-w-7xl mx-auto">

        <div className="flex justify-between items-center mb-8">

          <div>

            <h1 className="text-4xl font-bold">
              Admin Dashboard
            </h1>

            <p className="text-gray-500 mt-2">
              Lead Management System
            </p>

          </div>

          <div className="flex gap-3">

            <ExportButton
              leads={filteredLeads}
            />

            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-5 py-3 rounded-xl"
            >
              Logout
            </button>

          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

          <div className="bg-white rounded-xl shadow p-6">
            <h2>Total Leads</h2>
            <p className="text-4xl font-bold">
              {total}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h2>New</h2>
            <p className="text-4xl text-blue-600 font-bold">
              {newLeads}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h2>Contacted</h2>
            <p className="text-4xl text-yellow-600 font-bold">
              {contacted}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h2>Closed</h2>
            <p className="text-4xl text-green-600 font-bold">
              {closed}
            </p>
          </div>

        </div>

        {/* <DashboardChart
          total={total}
          newLeads={newLeads}
          contacted={contacted}
          closed={closed}
        /> */}

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
      <div className="bg-white rounded-xl shadow p-6 mb-8">

          <div className="flex flex-col md:flex-row gap-4">

            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(
                e: ChangeEvent<HTMLInputElement>
              ) =>
                setSearch(
                  e.target.value
                )
              }
              className="flex-1 border rounded-lg p-3"
            />

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(
                  e.target.value
                )
              }
              className="border rounded-lg p-3"
            >
              <option>All</option>
              <option>New</option>
              <option>Contacted</option>
              <option>Closed</option>
            </select>

          </div>

        </div>

        {loading ? (
          <div className="bg-white rounded-xl shadow p-10 text-center">
            Loading...
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