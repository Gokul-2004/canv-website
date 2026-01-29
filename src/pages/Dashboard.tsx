import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Users, Mail, Clock, Download, RefreshCw, Save, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Registration {
  id: string;
  name: string;
  email: string;
  company: string | null;
  title: string | null;
  phone: string | null;
  token_number: string | null;
  book_collected: boolean | null;
  correct_email_id: string | null;
  created_at: string;
}

const Dashboard = () => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Partial<Registration>>({});

  const fetchRegistrations = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("thit_registrations")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching registrations:", error);
    } else {
      setRegistrations(data || []);
    }
    setLastRefresh(new Date());
    setLoading(false);
  };

  useEffect(() => {
    fetchRegistrations();

    // Set up real-time subscription
    const channel = supabase
      .channel("registrations-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "thit_registrations",
        },
        () => {
          fetchRegistrations();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const exportToCSV = () => {
    const headers = ["Token", "Name", "Email", "Company", "Title", "Phone", "Book Collected", "Correct Email ID", "Registered At"];
    const csvContent = [
      headers.join(","),
      ...registrations.map((r) =>
        [
          r.token_number || "",
          `"${r.name}"`,
          r.email,
          `"${r.company || ""}"`,
          r.title || "",
          r.phone || "",
          r.book_collected ? "Yes" : "No",
          r.correct_email_id || "",
          new Date(r.created_at).toLocaleString(),
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `thit-registrations-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const startEditing = (reg: Registration) => {
    setEditingId(reg.id);
    setEditValues({
      title: reg.title || "",
      company: reg.company || "",
      book_collected: reg.book_collected || false,
      correct_email_id: reg.correct_email_id || "",
    });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditValues({});
  };

  const saveChanges = async (id: string) => {
    const { error } = await supabase
      .from("thit_registrations")
      .update({
        title: editValues.title,
        company: editValues.company,
        book_collected: editValues.book_collected,
        correct_email_id: editValues.correct_email_id,
      })
      .eq("id", id);

    if (error) {
      console.error("Error updating registration:", error);
      alert("Failed to update. Please try again.");
    } else {
      fetchRegistrations();
      setEditingId(null);
      setEditValues({});
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Stats
  const totalRegistrations = registrations.length;
  const todayRegistrations = registrations.filter((r) => {
    const today = new Date();
    const regDate = new Date(r.created_at);
    return regDate.toDateString() === today.toDateString();
  }).length;

  const titleCounts = registrations.reduce((acc, r) => {
    const title = r.title || "Not specified";
    acc[title] = (acc[title] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                THIT 2026 Registrations
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Book collection registrations dashboard
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={fetchRegistrations}
                disabled={loading}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
                Refresh
              </Button>
              <Button size="sm" onClick={exportToCSV}>
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Registrations</p>
                <p className="text-3xl font-bold text-gray-900">{totalRegistrations}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Today's Registrations</p>
                <p className="text-3xl font-bold text-gray-900">{todayRegistrations}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Last Refresh</p>
                <p className="text-lg font-semibold text-gray-900">
                  {lastRefresh.toLocaleTimeString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Title Distribution */}
        {Object.keys(titleCounts).length > 0 && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">By Title</h2>
            <div className="flex flex-wrap gap-2">
              {Object.entries(titleCounts)
                .sort((a, b) => b[1] - a[1])
                .map(([title, count]) => (
                  <span
                    key={title}
                    className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                  >
                    {title}: <strong>{count}</strong>
                  </span>
                ))}
            </div>
          </div>
        )}

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Token
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Book Collected
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Correct Email ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Registered
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan={10} className="px-6 py-12 text-center text-gray-500">
                      Loading...
                    </td>
                  </tr>
                ) : registrations.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="px-6 py-12 text-center text-gray-500">
                      No registrations yet
                    </td>
                  </tr>
                ) : (
                  registrations.map((reg) => {
                    const isEditing = editingId === reg.id;
                    return (
                      <tr key={reg.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <span className="font-mono font-bold text-primary">
                            {reg.token_number || "-"}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-medium text-gray-900">
                          {reg.name}
                        </td>
                        <td className="px-6 py-4 text-gray-600">{reg.email}</td>
                        <td className="px-6 py-4">
                          {isEditing ? (
                            <Input
                              type="text"
                              value={editValues.title || ""}
                              onChange={(e) =>
                                setEditValues({ ...editValues, title: e.target.value })
                              }
                              className="w-full"
                              placeholder="Job title"
                            />
                          ) : (
                            <span className="text-gray-600">{reg.title || "-"}</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-gray-600">{reg.phone || "-"}</td>
                        <td className="px-6 py-4">
                          {isEditing ? (
                            <Input
                              type="text"
                              value={editValues.company || ""}
                              onChange={(e) =>
                                setEditValues({ ...editValues, company: e.target.value })
                              }
                              className="w-full"
                              placeholder="Company name"
                            />
                          ) : (
                            <span className="text-gray-600">{reg.company || "-"}</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          {isEditing ? (
                            <select
                              value={editValues.book_collected ? "true" : "false"}
                              onChange={(e) =>
                                setEditValues({
                                  ...editValues,
                                  book_collected: e.target.value === "true",
                                })
                              }
                              className="w-full px-3 py-2 rounded-md border border-input bg-background"
                            >
                              <option value="false">No</option>
                              <option value="true">Yes</option>
                            </select>
                          ) : (
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              reg.book_collected
                                ? "bg-green-100 text-green-700"
                                : "bg-gray-100 text-gray-700"
                            }`}>
                              {reg.book_collected ? "Yes" : "No"}
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          {isEditing ? (
                            <Input
                              type="email"
                              value={editValues.correct_email_id || ""}
                              onChange={(e) =>
                                setEditValues({
                                  ...editValues,
                                  correct_email_id: e.target.value,
                                })
                              }
                              className="w-full"
                              placeholder="Correct email"
                            />
                          ) : (
                            <span className="text-gray-600">
                              {reg.correct_email_id || "-"}
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-gray-500 text-sm">
                          {formatDate(reg.created_at)}
                        </td>
                        <td className="px-6 py-4">
                          {isEditing ? (
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                onClick={() => saveChanges(reg.id)}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <Save className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={cancelEditing}
                              >
                                Cancel
                              </Button>
                            </div>
                          ) : (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => startEditing(reg)}
                            >
                              <Edit2 className="w-4 h-4" />
                            </Button>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
