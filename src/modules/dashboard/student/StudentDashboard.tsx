import React from "react";
import { DashboardHeader } from "../shared/DashboardHeader";
import { DashboardGrid } from "../shared/DashboardGrid";
import StatCard from "../shared/StatCard";
import QuickActionCard from "../shared/QuickActionCard";
import ActivityList from "../shared/ActivityList";
import EmptyDashboardState from "../shared/EmptyDashboardState";
import { studentMock } from "../mock/dashboard.mock";

export const StudentDashboard: React.FC = () => {
  const {
    recommendedJobs,
    bookmarkedCount,
    applicationCount,
    profileCompletion,
    onboardingCTA,
    recentActivity,
  } = studentMock;

  return (
    <div>
      <DashboardHeader
        title="Your Dashboard"
        subtitle="Opportunities & profile"
      />

      <DashboardGrid>
        <StatCard title="Bookmarked" value={bookmarkedCount} />
        <StatCard title="Applications" value={applicationCount} />
        <StatCard title="Profile completion" value={`${profileCompletion}%`} />
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
              Recommended for you
            </div>
            {recommendedJobs.length ? (
              <ul style={{ padding: 0, listStyle: "none" }}>
                {recommendedJobs.map((r: any) => (
                  <li
                    key={r.id}
                    style={{ padding: 10, borderBottom: "1px solid #f3f4f6" }}
                  >
                    <div style={{ fontWeight: 600 }}>{r.title}</div>
                    <div style={{ color: "#6b7280" }}>
                      {r.company} • {r.location}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <EmptyDashboardState
                title="No recommendations"
                description="We don't have any recommended jobs yet."
                actionLabel={onboardingCTA?.title}
                onAction={() =>
                  window.location.assign(onboardingCTA?.href || "/app/profile")
                }
              />
            )}
          </section>
        </div>

        <aside>
          <div style={{ display: "grid", gap: 8 }}>
            <QuickActionCard
              title="Browse jobs"
              onClick={() => alert("Browse jobs")}
            />
            <QuickActionCard
              title="Complete profile"
              onClick={() =>
                window.location.assign(onboardingCTA?.href || "/app/profile")
              }
            />
          </div>
        </aside>
      </div>

      <div style={{ marginTop: 24 }}>
        <ActivityList items={recentActivity} />
      </div>
    </div>
  );
};

export default StudentDashboard;
