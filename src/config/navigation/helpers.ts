import type { Role } from "@/modules/auth/types/user";
import { dashboardNavigationGroups, routeMetadata } from "./metadata";
import type { BreadcrumbItem, NavigationGroup, NavigationItem } from "./types";

const normalizePath = (path: string): string => {
  if (path === "/") return "/";
  return path.replace(/\/+$/, "");
};

const isVisible = (roles: Role[], role?: Role | null): boolean => {
  if (!role) return false;
  return roles.includes(role);
};

const filterItem = (
  item: NavigationItem,
  role?: Role | null,
): NavigationItem | null => {
  if (!isVisible(item.roles, role)) return null;

  const children = item.children
    ?.map((child) => filterItem(child, role))
    .filter((child): child is NavigationItem => Boolean(child));

  return {
    ...item,
    children: children?.length ? children : undefined,
  };
};

export const getDashboardNavigationGroups = (
  role?: Role | null,
): NavigationGroup[] => {
  return dashboardNavigationGroups
    .map((group) => {
      if (!isVisible(group.roles, role)) return null;

      const items = group.items
        .map((item) => filterItem(item, role))
        .filter((item): item is NavigationItem => Boolean(item));

      if (!items.length) return null;

      return {
        ...group,
        items,
      };
    })
    .filter((group): group is NavigationGroup => Boolean(group));
};

const scoreRoute = (
  path: string,
  pathname: string,
  exact?: boolean,
): number => {
  const routePath = normalizePath(path);
  const currentPath = normalizePath(pathname);

  if (exact) return routePath === currentPath ? routePath.length : -1;
  if (routePath === "/") return currentPath === "/" ? 1 : -1;
  if (currentPath === routePath) return routePath.length;
  if (currentPath.startsWith(`${routePath}/`)) return routePath.length;
  return -1;
};

export const getBreadcrumbsForPath = (pathname: string): BreadcrumbItem[] => {
  const bestMatch = routeMetadata
    .map((route) => ({
      route,
      score: scoreRoute(route.path, pathname, route.exact),
    }))
    .sort((left, right) => right.score - left.score)[0];

  if (bestMatch && bestMatch.score >= 0) {
    return bestMatch.route.breadcrumb;
  }

  const segments = normalizePath(pathname).split("/").filter(Boolean);

  if (!segments.length) {
    return [{ label: "Dashboard" }];
  }

  return [
    { label: "Dashboard", path: "/" },
    ...segments.map((segment, index) => ({
      label: segment.replace(/-/g, " "),
      path: `/${segments.slice(0, index + 1).join("/")}`,
    })),
  ];
};
