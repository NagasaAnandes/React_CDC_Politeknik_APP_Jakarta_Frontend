import type { FC } from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import type { BreadcrumbItem } from "@/config/navigation";

type DashboardBreadcrumbsProps = {
  items: BreadcrumbItem[];
  className?: string;
};

export const DashboardBreadcrumbs: FC<DashboardBreadcrumbsProps> = ({
  items,
  className,
}) => {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("flex min-w-0 items-center gap-1", className)}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const content =
          item.path && !isLast ? (
            <Link
              to={item.path}
              className="truncate text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ) : (
            <span className="truncate text-sm font-medium text-foreground">
              {item.label}
            </span>
          );

        return (
          <div
            key={`${item.label}-${index}`}
            className="flex min-w-0 items-center gap-1"
          >
            {content}
            {!isLast ? (
              <ChevronRight className="size-3.5 shrink-0 text-muted-foreground" />
            ) : null}
          </div>
        );
      })}
    </nav>
  );
};

export default DashboardBreadcrumbs;
