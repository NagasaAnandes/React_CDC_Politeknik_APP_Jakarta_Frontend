# Smoke Test Checklist — Auth & Routing

Manual test steps to validate stabilization:

- [ ] SUPER_ADMIN can login and is redirected to `/admin`
- [ ] COMPANY_ADMIN can login and is redirected to `/company`
- [ ] COMPANY_STAFF can login and is redirected to `/company`
- [ ] ALUMNI can login and is redirected to `/app`
- [ ] STUDENT can login and is redirected to `/app`
- [ ] Refresh browser after login: auth persists and user stays on protected route
- [ ] Clear persisted auth (logout) and try direct URL to protected route → redirected to `/login`
- [ ] Simulate invalid token (backend returns 401) → app clears auth and redirects to `/login`
- [ ] Try forbidden route for role → user redirected to their default route
- [ ] Direct URL access to nested protected routes works (no flicker)
- [ ] API interceptor injects token (check network requests)
- [ ] Query retry does NOT retry on 401/403 but retries on transient errors
- [ ] Toasts show safe error messages from `extractApiErrorMessage()`

Dev notes:

- Use browser devtools console to observe `[api]` and `[ProtectedRoute]` logs when running in dev.
