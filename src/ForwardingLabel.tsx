import { useEffect, useRef, useState, type ReactNode } from "react";
import type { Link } from "./api.ts";

const dateTimeFormat = new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" });

export default function ForwardingLabel({ link }: { link: Link }) {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">("idle");
  const sectionRef = useRef<HTMLElement>(null);

  // Move focus to the new link so it scrolls into view and screen readers announce it.
  useEffect(() => {
    sectionRef.current?.focus();
  }, []);

  async function copyShortUrl() {
    try {
      await navigator.clipboard.writeText(link.shortUrl);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("failed");
    }
  }

  const createdAt = new Date(link.createdAt);
  const shortHost = link.shortUrl.replace(/^https?:\/\//, "").replace(`/${link.shortCode}`, "/");

  return (
    <section
      ref={sectionRef}
      tabIndex={-1}
      aria-labelledby="result-heading"
      className="relative mt-10 scroll-mt-6 border-2 border-postal bg-white outline-none"
    >
      <div className="relative p-5 sm:p-7 sm:pr-40">
        <h2 id="result-heading" className="sr-only">
          Your short link
        </h2>
        <a
          href={link.shortUrl}
          target="_blank"
          rel="noreferrer"
          className="block font-condensed text-3xl leading-tight font-bold text-ink no-underline hover:underline sm:text-5xl"
        >
          {/* Let long links wrap after the slash, never inside the code. */}
          {shortHost}
          <wbr />
          <span className="wrap-anywhere">{link.shortCode}</span>
        </a>

        {/* On phones the stamp sits beside this row, so the link above gets the full width. */}
        <div className="mt-5 flex min-h-20 flex-wrap items-center gap-x-4 gap-y-2 pr-24 sm:min-h-0 sm:pr-0">
          <button
            type="button"
            onClick={copyShortUrl}
            className="h-12 bg-airmail px-8 font-condensed text-xl font-semibold tracking-wider text-white uppercase transition-colors hover:bg-ink"
          >
            {copyStatus === "copied" ? "Copied" : "Copy link"}
          </button>
          <p aria-live="polite" className="text-muted">
            {copyStatus === "copied" && "Copied to your clipboard."}
            {copyStatus === "failed" && "Couldn't copy automatically. Select the link above and copy it."}
          </p>
        </div>

        <Postmark date={createdAt} />
      </div>

      <dl className="border-t border-postal text-base">
        <LabelRow term="Forwards to">
          <span className="block truncate" title={link.longUrl}>
            {link.longUrl}
          </span>
        </LabelRow>
        <LabelRow term="Created">{dateTimeFormat.format(createdAt)}</LabelRow>
        <LabelRow term="Expires">
          {link.expiresAt ? dateTimeFormat.format(new Date(link.expiresAt)) : "Never"}
        </LabelRow>
      </dl>
    </section>
  );
}

function LabelRow({ term, children }: { term: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-[7.5rem_1fr] gap-4 border-t border-rule px-5 py-3 first:border-t-0 sm:px-7">
      <dt className="font-condensed font-semibold tracking-wider text-muted uppercase">{term}</dt>
      <dd className="min-w-0 tabular-nums">{children}</dd>
    </div>
  );
}

// A circular date stamp, like the one a post office puts on a forwarded letter.
function Postmark({ date }: { date: Date }) {
  const day = date.getDate().toString().padStart(2, "0");
  const month = date.toLocaleString("en", { month: "short" }).toUpperCase();

  return (
    <svg
      viewBox="0 0 120 120"
      aria-hidden="true"
      className="stamp-in absolute right-5 bottom-5 size-20 text-airmail sm:top-6 sm:right-6 sm:bottom-auto sm:size-32"
    >
      <defs>
        <path id="postmark-ring" d="M60,60 m-42,0 a42,42 0 1,1 84,0 a42,42 0 1,1 -84,0" />
      </defs>
      <circle cx="60" cy="60" r="56" fill="none" stroke="currentColor" strokeWidth="3" />
      <circle cx="60" cy="60" r="34" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <text fill="currentColor" fontFamily="Barlow Condensed" fontWeight="700" fontSize="11" letterSpacing="1.4">
        <textPath href="#postmark-ring">FORWARDED BY SNAPLINK · PROGRAMICLE.COM ·</textPath>
      </text>
      <text x="60" y="56" textAnchor="middle" fill="currentColor" fontFamily="Barlow Condensed" fontWeight="700" fontSize="22">
        {day} {month}
      </text>
      <text x="60" y="76" textAnchor="middle" fill="currentColor" fontFamily="Barlow Condensed" fontWeight="600" fontSize="16">
        {date.getFullYear()}
      </text>
    </svg>
  );
}
