import type { FC } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

type EmptyStateProps = {
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  className?: string;
};

export const EmptyState: FC<EmptyStateProps> = ({
  title,
  description,
  actionLabel,
  actionHref,
  className,
}) => {
  return (
    <section
      className={cn(
        "flex min-h-[320px] flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-background/70 px-6 py-12 text-center shadow-sm",
        className,
      )}
    >
      <div className="max-w-md space-y-4">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          <p className="text-sm leading-6 text-muted-foreground">
            {description}
          </p>
        </div>
        {actionLabel && actionHref ? (
          <Button asChild className="mt-2">
            <a href={actionHref}>{actionLabel}</a>
          </Button>
        ) : null}
      </div>
    </section>
  );
};

export default EmptyState;
