import { useState, type FormEvent } from "react";
import { createLink, type Link } from "./api.ts";
import ForwardingLabel from "./ForwardingLabel.tsx";

const HOUR = 60 * 60 * 1000;
const DAY = 24 * HOUR;

const EXPIRY_PRESETS: Record<string, number> = {
  "1h": HOUR,
  "1d": DAY,
  "7d": 7 * DAY,
  "30d": 30 * DAY,
};

// The free API host sleeps when idle; after this long, explain the wait.
const SLOW_REQUEST_MS = 4000;

function toExpiresAt(expiry: string, customDate: string): string | null {
  if (expiry === "never") {
    return null;
  }
  if (expiry === "custom") {
    return new Date(`${customDate}T23:59:59`).toISOString();
  }
  return new Date(Date.now() + EXPIRY_PRESETS[expiry]).toISOString();
}

function toDateInputValue(date: Date): string {
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000);
  return local.toISOString().slice(0, 10);
}

export default function ShortenForm() {
  const [longUrl, setLongUrl] = useState("");
  const [expiry, setExpiry] = useState("never");
  const [customDate, setCustomDate] = useState("");
  const [alias, setAlias] = useState("");

  const [loading, setLoading] = useState(false);
  const [slow, setSlow] = useState(false);
  const [error, setError] = useState("");
  const [link, setLink] = useState<Link | null>(null);

  const [today] = useState(() => new Date());
  // 364 days, not 365, so "end of that day" stays inside the API's one-year limit.
  const latestDate = new Date(today.getTime() + 364 * DAY);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLink(null);
    setLoading(true);
    const slowTimer = setTimeout(() => setSlow(true), SLOW_REQUEST_MS);

    try {
      const created = await createLink({
        longUrl: longUrl.trim(),
        customAlias: alias.trim() || undefined,
        expiresAt: toExpiresAt(expiry, customDate),
      });
      setLink(created);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      clearTimeout(slowTimer);
      setLoading(false);
      setSlow(false);
    }
  }

  return (
    <>
      <h1 className="font-condensed text-5xl leading-none font-bold text-balance uppercase sm:text-6xl">
        Make a long link short.
      </h1>
      <p className="mt-4 text-lg text-muted">
        Paste a URL, get a short programicle.com link. Expiry and alias are optional.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 border-2 border-postal bg-white p-5 sm:p-7">
        <label htmlFor="long-url" className="field-label">
          Long URL
        </label>
        <input
          id="long-url"
          type="url"
          required
          autoFocus
          placeholder="https://example.com/a/very/long/link"
          value={longUrl}
          onChange={(event) => setLongUrl(event.target.value)}
          className="field mt-2 w-full"
        />

        <div className="mt-6 grid grid-cols-[minmax(0,1fr)] gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="expiry" className="field-label">
              Expires
            </label>
            <select
              id="expiry"
              value={expiry}
              onChange={(event) => setExpiry(event.target.value)}
              className="field mt-2 w-full"
            >
              <option value="never">Never</option>
              <option value="1h">In 1 hour</option>
              <option value="1d">In 1 day</option>
              <option value="7d">In 7 days</option>
              <option value="30d">In 30 days</option>
              <option value="custom">On a date…</option>
            </select>
            {expiry === "custom" && (
              <input
                type="date"
                required
                aria-label="Expiry date"
                min={toDateInputValue(today)}
                max={toDateInputValue(latestDate)}
                value={customDate}
                onChange={(event) => setCustomDate(event.target.value)}
                className="field mt-3 w-full"
              />
            )}
          </div>

          <div>
            <label htmlFor="alias" className="field-label">
              Custom alias <span className="font-sans font-normal tracking-normal text-muted normal-case">(optional)</span>
            </label>
            <div className="field mt-2 flex items-center px-0 focus-within:border-airmail focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-airmail">
              <span className="pl-3 text-muted select-none">programicle.com/</span>
              <input
                id="alias"
                type="text"
                placeholder="my-link"
                pattern="[A-Za-z0-9_\-]{3,30}"
                title="3–30 letters, numbers, - or _"
                autoCapitalize="none"
                spellCheck={false}
                value={alias}
                onChange={(event) => setAlias(event.target.value)}
                className="h-full min-w-0 flex-1 bg-transparent pr-3 outline-none"
              />
            </div>
            <p className="mt-2 text-sm text-muted">Letters, numbers, - and _. Not case-sensitive.</p>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-8 h-12 w-full bg-postal px-8 font-condensed text-xl font-semibold tracking-wider text-white uppercase transition-colors hover:bg-postal-dark disabled:cursor-wait disabled:opacity-70 sm:w-auto"
        >
          {loading ? "Creating…" : "Create short link"}
        </button>

        <div aria-live="polite">
          {slow && (
            <p className="mt-4 text-muted">
              Waking up the server. Free hosting sleeps when nobody has used it for a while, so the
              first link can take up to a minute.
            </p>
          )}
          {error && (
            <p role="alert" className="mt-4 border border-postal px-4 py-3 font-medium text-postal-dark">
              {error}
            </p>
          )}
        </div>
      </form>

      <p className="mt-4 max-w-[70ch] text-sm text-muted">
        <strong className="font-semibold text-ink">Please note:</strong> SnapLink is a hobby project
        provided for demonstration and personal experimentation. Short URLs may be deleted, disabled, or
        expire at any time. Do not use SnapLink for critical, permanent, or commercial links.
      </p>

      {link && <ForwardingLabel key={link.shortCode} link={link} />}
    </>
  );
}
