export const appPaths = {
  public: {
    home: "/",
    login: "/login",
  },
  admin: {
    root: "/admin",
    users: "/admin/users",
    jobs: "/admin/jobs",
    companies: "/admin/companies",
  },
  company: {
    root: "/company",
    jobs: "/company/jobs",
    applications: "/company/applications",
  },
  app: {
    root: "/app",
    jobs: "/app/jobs",
    bookmarks: "/app/bookmarks",
    profile: "/app/profile",
  },
} as const;
