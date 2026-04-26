import Link from "next/link";
import Image from "next/image";

interface FeaturedCourseProps {
  title: string;
  subtitle: string;
  slug: string;
  thumbnail: string;
  videosCount: number;
  price: number;
  rating: number;
  students: string;
  tags: string[];
}

export function FeaturedCourse({
  title,
  subtitle,
  slug,
  thumbnail,
  videosCount,
  price,
  rating,
  students,
  tags,
}: FeaturedCourseProps) {
  return (
    <Link
      href={`/courses/${slug}`}
      className="block group relative overflow-hidden bg-sb-bg-elevated rounded-3xl border border-sb-border"
    >
      {/* Gradient overlay */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 70% 30%, rgba(255,122,0,0.08) 0%, transparent 60%)",
        }}
      />

      <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 relative z-10">
        {/* Thumbnail */}
        <div
          className="w-full md:w-48 h-48 md:h-64 rounded-xl overflow-hidden shrink-0 relative shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
        >
          <Image
            src={thumbnail}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 192px"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            priority
          />
          {/* Play overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center bg-sb-brand/90 shadow-[0_4px_20px_rgba(255,122,0,0.4)]"
            >
              <span className="material-symbols-outlined text-white text-2xl ml-0.5">
                play_arrow
              </span>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap gap-2 mb-3">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="py-1 px-2.5 rounded-full text-[11px] font-medium bg-white/[0.06] text-sb-text-secondary"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h2
              className="text-[32px] font-semibold leading-[1.3] max-md:text-xl mb-2 group-hover:text-orange-400 transition-colors text-sb-text-primary"
            >
              {title}
            </h2>
            <p
              className="text-base leading-relaxed mb-4 line-clamp-2 text-sb-text-dim"
            >
              {subtitle}
            </p>

            {/* Stats */}
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-1">
                <span
                  className="material-symbols-outlined text-[16px] text-sb-brand-light"
                >
                  star
                </span>
                <span className="text-sm font-semibold text-sb-text-primary">
                  {rating}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span
                  className="material-symbols-outlined text-[16px] text-sb-text-dim"
                >
                  people
                </span>
                <span className="text-sm text-sb-text-dim">
                  {students} students
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span
                  className="material-symbols-outlined text-[16px] text-sb-text-dim"
                >
                  play_circle
                </span>
                <span className="text-sm text-sb-text-dim">
                  {videosCount} videos
                </span>
              </div>
            </div>
          </div>

          {/* Price + CTA */}
          <div className="flex items-center justify-between mt-6">
            <div className="flex items-baseline gap-2">
              <span
                className="text-2xl font-bold text-sb-brand-light"
              >
                Γé╣{price}
              </span>
              <span
                className="text-sm line-through text-sb-text-dim"
              >
                Γé╣999
              </span>
            </div>
            <span
              className="bg-sb-brand text-[#5C2800] font-semibold text-sm py-2.5 px-5 rounded-xl border-none cursor-pointer transition-all duration-200 inline-flex items-center justify-center gap-2 hover:bg-[#ff8f1f] hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(255,122,0,0.3)] active:translate-y-0"
            >
              Explore Course
              <span className="material-symbols-outlined text-[16px]">
                arrow_forward
              </span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
