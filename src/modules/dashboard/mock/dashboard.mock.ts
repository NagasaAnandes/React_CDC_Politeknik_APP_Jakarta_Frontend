export const adminMock = {
  totalUsers: 1248,
  totalCompanies: 86,
  totalJobs: 412,
  totalApplications: 2783,
  recentActivity: [
    { id: "a1", text: "New user registered: maria@example.com", time: "2h" },
    { id: "a2", text: "Job posted: Frontend Engineer", time: "8h" },
    { id: "a3", text: "Company profile updated: Acme Co", time: "1d" },
  ],
  quickActions: [
    { id: "q1", title: "Create company" },
    { id: "q2", title: "Invite user" },
    { id: "q3", title: "Create job" },
  ],
};

export const companyMock = {
  activeJobs: 12,
  totalApplicants: 243,
  pendingApplications: 18,
  recentApplications: [
    {
      id: "c1",
      name: "Rina Saputra",
      position: "Backend Engineer",
      time: "3h",
    },
    {
      id: "c2",
      name: "Budi Hartono",
      position: "Frontend Engineer",
      time: "1d",
    },
  ],
  quickActions: [
    { id: "cq1", title: "Create job" },
    { id: "cq2", title: "View applicants" },
  ],
};

export const studentMock = {
  recommendedJobs: [
    {
      id: "s1",
      title: "Frontend Intern",
      company: "Acme",
      location: "Jakarta",
    },
    { id: "s2", title: "Junior QA", company: "Beta Corp", location: "Remote" },
  ],
  bookmarkedCount: 6,
  applicationCount: 4,
  profileCompletion: 72,
  onboardingCTA: { title: "Complete profile", href: "/app/profile" },
  recentActivity: [],
};

export default { adminMock, companyMock, studentMock };
