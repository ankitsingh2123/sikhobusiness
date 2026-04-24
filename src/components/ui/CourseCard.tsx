import Link from "next/link";
import Image from "next/image";

interface CourseCardProps {
  title: string;
  subtitle: string;
  slug: string;
  thumbnail: string;
  progress?: number;
  totalVideos?: number;
  completedVideos?: number;
  price?: number;
  isFree?: boolean;
  isLocked?: boolean;
  category?: string;
}

export function CourseCard({
  title,
  subtitle,
  slug,
  thumbnail,
  progress,
  totalVideos,
  completedVideos,
  price,
  isFree,
  isLocked,
  category,
}: CourseCardProps) {
  const progressColor =
    progress === 100
      ? "#3CE36A"
      : progress && progress > 0
        ? "#FF7A00"
        : "transparent";

  const progressLabel =
    progress === 100
      ? "Completed"
      : progress && progress > 0
        ? `${completedVideos || 0} of ${totalVideos || 0} videos`
        : isLocked
          ? "Locked"
          : "Not started";

  return (
    <Link
      href={`/courses/${slug}`}
      className="group flex gap-4 transition-all duration-300"
      style={{ opacity: isLocked ? 0.5 : 1 }}
    >
      {/* Thumbnail */}
      <div
        className="w-24 h-36 rounded-lg overflow-hidden shrink-0 relative bg-[#E8E4DD] shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
      >
        {isLocked ? (
          <div className="w-full h-full flex items-center justify-center">
            <span
              className="material-symbols-outlined text-3xl text-[#999]"
            >
              lock
            </span>
          </div>
        ) : (
          <Image
            src={thumbnail}
            alt={title}
            fill
            sizes="96px"
            className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
          />
        )}
        {category && !isLocked && (
          <div
            className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#FF7A00]/90 text-white"
          >
            {category}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 flex flex-col justify-between py-1">
        <div>
          <h3
            className="font-semibold text-base mb-1 transition-colors duration-200 line-clamp-2 text-[#222]"
          >
            <span className="group-hover:text-[#FF7A00]">{title}</span>
          </h3>
          <p className="text-sm text-[#888]">
            {subtitle}
          </p>
        </div>

        {/* Price or Progress */}
        <div className="mt-3">
          {price !== undefined && !progress && (
            <div className="flex items-center gap-2">
              {isFree ? (
                <span
                  className="text-sm font-semibold text-[#3CE36A]"
                >
                  Free Preview
                </span>
              ) : (
                <span
                  className="text-sm font-bold text-[#FF7A00]"
                >
                  ₹{price}
                </span>
              )}
            </div>
          )}

          {progress !== undefined && (
            <>
              <div className="flex items-center gap-2 mb-1.5">
                <span
                  className="text-xs font-medium text-[#222]"
                >
                  {progress}%
                </span>
                <span className="text-xs text-[#999]">
                  • {progressLabel}
                </span>
              </div>
              <div className="h-1 w-full bg-black/[0.08] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-[width] duration-500"
                  style={{
                    width: `${progress}%`,
                    backgroundColor: progressColor,
                  }}
                />
              </div>
            </>
          )}

          {isLocked && (
            <span className="text-xs text-[#999]">
              Locked — Unlock for ₹99
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
