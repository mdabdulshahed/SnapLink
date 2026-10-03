import type { ReactNode } from "react";

export default function HowItWorksPage() {
  return (
    <article className="max-w-[65ch]">
      <h1 className="font-condensed text-5xl leading-none font-bold uppercase sm:text-6xl">How it works</h1>
      <p className="mt-4 text-lg text-muted">
        SnapLink is small on purpose. It has one table, two queries, and a handful of decisions worth
        explaining. Here's the whole system, from the browser to the database.
      </p>

      <Section heading="The pieces">
        <ul className="mt-3 space-y-2 text-lg leading-relaxed">
          <li>
            <strong className="font-semibold">This page</strong>: React and TypeScript on Vercel at{" "}
            <Code>snaplink.programicle.com</Code>.
          </li>
          <li>
            <strong className="font-semibold">The API</strong>: Node and Express on Render, backed by
            PostgreSQL on Supabase.
          </li>
          <li>
            <strong className="font-semibold">The short links</strong>: <Code>programicle.com/&lt;code&gt;</Code>,
            routed by a Cloudflare Worker. The existing programicle.com website keeps working
            untouched.
          </li>
        </ul>
      </Section>

      <Section heading="Making a link">
        <Steps
          steps={[
            <>This form sends the URL, expiry, and alias to the API.</>,
            <>
              The API checks the URL: <Code>http</Code> or <Code>https</Code> only, at most 2,048
              characters. It also checks the alias and the expiry (at most a year away).
            </>,
            <>It picks a random 8-character code, or uses your alias.</>,
            <>
              It inserts the row with <Code>INSERT … ON CONFLICT DO NOTHING</Code>. If the code is
              already taken, it tries a new random code. For an alias, it tells you it's taken.
            </>,
            <>
              You get back <Code>programicle.com/&lt;code&gt;</Code>.
            </>,
          ]}
        />
      </Section>

      <Section heading="Opening a link">
        <Steps
          steps={[
            <>
              Someone clicks <Code>programicle.com/k7x2m9qa</Code>. Cloudflare already sits in front
              of programicle.com.
            </>,
            <>
              A Cloudflare Worker checks the path. If it looks like a short code (one segment, not a
              page of the main website), it asks the API. Anything else goes to the website exactly
              as before.
            </>,
            <>
              The API looks the code up: <Code>SELECT … WHERE short_code = $1</Code>, a single
              index lookup.
            </>,
            <>
              Found and active: <strong className="font-semibold">302</strong> redirect to the long
              URL. Never existed: <strong className="font-semibold">404</strong>. Expired:{" "}
              <strong className="font-semibold">410 Gone</strong>.
            </>,
          ]}
        />
      </Section>

      <Section heading="Short codes">
        <P>
          Codes are 8 random characters from <Code>0–9</Code> and <Code>a–z</Code> (Base36), which
          gives about 2.8 trillion possibilities. They come from a cryptographic random generator,
          so they can't be guessed from earlier codes.
        </P>
        <P>
          Why not number the links 1, 2, 3? Sequential codes let anyone walk through every link
          ever made. Why not hash the URL? A hash cut down to 8 characters can still collide, so
          you'd need the same retry logic anyway.
        </P>
        <P>
          Codes are case-insensitive (<Code>GitHub</Code> and <Code>github</Code> are the same link),
          because people retype links and nobody remembers the capitals. Once case doesn't matter,
          uppercase letters add nothing, which is why the alphabet is Base36 rather than Base62.
        </P>
      </Section>

      <Section heading="Two requests, one alias">
        <P>
          If two people ask for <Code>github</Code> at the same moment, checking "is it free?" and
          then inserting would let both through. Each check passes before either insert lands.
        </P>
        <P>
          Instead, the database has a <Code>UNIQUE</Code> constraint on the code, and the insert
          itself is the check. Exactly one insert wins and the other gets "already taken". The
          same constraint is also the index that makes lookups fast.
        </P>
      </Section>

      <Section heading="Expiry, and why codes are never reused">
        <P>
          Expired links aren't deleted. The row stays, so the code can never be handed to someone
          else. Otherwise an old bookmark or a printed flyer could quietly send people somewhere
          new. Keeping the row is also how SnapLink can answer "expired" (410) instead of "never
          existed" (404).
        </P>
        <P>
          Redirects are 302 rather than 301. Browsers cache a 301 indefinitely, so an expired link
          would keep working for anyone who had clicked it before.
        </P>
      </Section>

      <Section heading="Keeping it from being abused">
        <P>
          Creating links is rate limited to 10 at once, then one every 6 seconds per IP address
          (a token bucket). Only <Code>http</Code> and <Code>https</Code> destinations are
          accepted, so <Code>javascript:</Code> and <Code>data:</Code> links are refused. SnapLink
          never fetches the destination itself; it only redirects to it.
        </P>
      </Section>

      <Section heading="If it got busy">
        <P>
          Right now it's one small server and one database on free tiers, which is why the first
          request after a quiet spell can take up to a minute. With real traffic, the next steps,
          in order, would be:
        </P>
        <ol className="mt-3 list-decimal space-y-1 pl-6 text-lg leading-relaxed">
          <li>cache redirects at the edge</li>
          <li>add Redis in front of the database</li>
          <li>run several API servers behind a load balancer</li>
          <li>add read replicas for lookups</li>
          <li>shard by code, only if writes ever need it</li>
        </ol>
        <P>
          Random codes help here: separate servers can make them without coordinating, and the
          database's unique constraint still settles any clash.
        </P>
      </Section>

      <p className="mt-10">
        <a href="/">Back to SnapLink</a>
      </p>
    </article>
  );
}

function Section({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="font-condensed text-2xl font-semibold uppercase">{heading}</h2>
      {children}
    </section>
  );
}

function P({ children }: { children: ReactNode }) {
  return <p className="mt-3 text-lg leading-relaxed">{children}</p>;
}

function Steps({ steps }: { steps: ReactNode[] }) {
  return (
    <ol className="mt-4 border-2 border-postal bg-white">
      {steps.map((step, index) => (
        <li key={index} className="grid grid-cols-[2.5rem_1fr] gap-3 border-t border-rule px-4 py-3 first:border-t-0 sm:px-5">
          <span className="font-condensed text-xl font-bold text-postal tabular-nums">{index + 1}</span>
          <span className="leading-relaxed">{step}</span>
        </li>
      ))}
    </ol>
  );
}

function Code({ children }: { children: ReactNode }) {
  return <code className="bg-white px-1 font-mono text-[0.9em] text-airmail">{children}</code>;
}
