import React from "react";
import { DashboardHeader } from "../shared/DashboardHeader";
import { DashboardGrid } from "../shared/DashboardGrid";
import StatCard from "../shared/StatCard";
import QuickActionCard from "../shared/QuickActionCard";
import ActivityList from "../shared/ActivityList";
import EmptyDashboardState from "../shared/EmptyDashboardState";
import { companyMock } from "../mock/dashboard.mock";

export const CompanyDashboard: React.FC = () => {
  const {
    activeJobs,
    totalApplicants,
    pendingApplications,
    recentApplications,
    quickActions,
  } = companyMock;

  return (
    <div>
      <DashboardHeader
        title="Company Dashboard"
        subtitle="Overview of your company"
      />

      <DashboardGrid>
        <StatCard title="Active jobs" value={activeJobs} />
        <StatCard title="Total applicants" value={totalApplicants} />
        <StatCard title="Pending applications" value={pendingApplications} />
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
            <div style={{ fontWeight: 600, marginBottom: 8 }}>
              Recent applications
            </div>
            <ActivityList
              items={recentApplications.map((r: any) => ({
                id: r.id,
                text: `${r.name} — ${r.position}`,
                time: r.time,
              }))}
            />
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
          title="No hiring alerts"
          description="You're all caught up."
        />
      </div>
    </div>
  );
};

export default CompanyDashboard;
