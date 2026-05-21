import React from "react";
import { DashboardHeader } from "../shared/DashboardHeader";
import { DashboardGrid } from "../shared/DashboardGrid";
import StatCard from "../shared/StatCard";
import QuickActionCard from "../shared/QuickActionCard";
import ActivityList from "../shared/ActivityList";
import EmptyDashboardState from "../shared/EmptyDashboardState";
import { adminMock } from "../mock/dashboard.mock";

export const AdminDashboard: React.FC = () => {
  const {
    totalUsers,
    totalCompanies,
    totalJobs,
    totalApplications,
    recentActivity,
    quickActions,
  } = adminMock;

  return (
    <div>
      <DashboardHeader title="Admin Dashboard" subtitle="System overview" />

      <DashboardGrid>
        <StatCard title="Total users" value={totalUsers} />
        <StatCard title="Total companies" value={totalCompanies} />
        <StatCard title="Total jobs" value={totalJobs} />
        <StatCard title="Total applications" value={totalApplications} />
      </DashboardGrid>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: 16,
          marginTop: 20,
        }}
      >
        <div>
          <section style={{ marginBottom: 16 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 8,
              }}
            >
              <div style={{ fontWeight: 600 }}>Recent activity</div>
            </div>
            <ActivityList items={recentActivity} />
          </section>

          <section>
            <div style={{ fontWeight: 600, marginBottom: 8 }}>
              System overview
            </div>
            <div style={{ padding: 12, borderRadius: 8, background: "#fff" }}>
              All systems nominal (mock)
            </div>
          </section>
        </div>

        <aside>
          <div style={{ display: "grid", gap: 8 }}>
            {quickActions.map((q) => (
              <QuickActionCard
                key={q.id}
                title={q.title}
                onClick={() => alert(q.title)}
              />
            ))}
          </div>
        </aside>
      </div>

      <div style={{ marginTop: 24 }}>
        <EmptyDashboardState
          title="No incidents"
          description="No critical incidents in the last 7 days."
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
