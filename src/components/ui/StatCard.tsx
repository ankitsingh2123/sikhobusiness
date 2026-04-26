interface StatCardProps {
  icon: string;
  label: string;
  value: string;
  change?: string;
  trend?: "up" | "down" | "neutral";
  color?: string;
}

export function StatCard({
  icon,
  label,
  value,
  change,
  trend = "neutral",
  color = "#FF7A00",
}: StatCardProps) {
  const trendColor =
    trend === "up" ? "#3CE36A" : trend === "down" ? "#FFB4AB" : "#6b6b6b";
  const trendIcon =
    trend === "up"
      ? "trending_up"
      : trend === "down"
        ? "trending_down"
        : "trending_flat";

  return (
    <div
      className="bg-sb-surface border border-sb-border rounded-2xl transition-all duration-300 hover:border-sb-border-strong hover:bg-sb-surface-high p-5 flex flex-col gap-3 group cursor-default"
    >
      {/* Icon */}
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
        style={{ backgroundColor: `${color}15` }}
      >
        <span
          className="material-symbols-outlined text-[20px]"
          style={{ color }}
        >
          {icon}
        </span>
      </div>

      {/* Value */}
      <div>
        <p className="text-sm mb-1 text-sb-text-dim">
          {label}
        </p>
        <div className="flex items-end gap-2">
          <span
            className="text-2xl font-bold tracking-tight text-sb-text-primary"
          >
            {value}
          </span>
          {change && (
            <span
              className="text-xs font-medium flex items-center gap-0.5 mb-1"
              style={{ color: trendColor }}
            >
              <span className="material-symbols-outlined text-[14px]">
                {trendIcon}
              </span>
              {change}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
