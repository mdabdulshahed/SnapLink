const SECTIONS = [
  {
    heading: "A hobby project",
    body: "SnapLink is a personal project, built for demonstration and experimentation. It is not a commercial service and comes with no warranty of any kind.",
  },
  {
    heading: "No availability guarantee",
    body: "The service may be slow, unavailable, or offline at any time, for any length of time. Free hosting also means the first request after a quiet period can take up to a minute.",
  },
  {
    heading: "Links can be removed",
    body: "Any short link may be disabled, removed, or expire at any time, with or without notice. There is no guarantee that a link will keep working.",
  },
  {
    heading: "Don't use it for anything important",
    body: "Do not use SnapLink for critical, permanent, or commercial links. If a broken link would cause you a problem, use a different service.",
  },
  {
    heading: "No accounts",
    body: "SnapLink has no user accounts. Once created, a link can't be edited or deleted by the person who made it.",
  },
  {
    heading: "You're responsible for your links",
    body: "You are responsible for the destinations you submit. Don't use SnapLink for anything illegal, harmful, or deceptive: malware, phishing, spam, harassment, or links to content you don't have the right to share. Links like these will be disabled.",
  },
  {
    heading: "Changes",
    body: "These terms, and the service itself, may change or be discontinued at any time.",
  },
];

export default function TermsPage() {
  return (
    <article className="max-w-[65ch]">
      <h1 className="font-condensed text-5xl leading-none font-bold uppercase sm:text-6xl">Terms of Use</h1>
      <p className="mt-4 text-muted">Last updated 3 October 2026. Short version: it's a hobby project, so don't depend on it.</p>

      {SECTIONS.map((section) => (
        <section key={section.heading} className="mt-8">
          <h2 className="font-condensed text-2xl font-semibold uppercase">{section.heading}</h2>
          <p className="mt-2 text-lg leading-relaxed">{section.body}</p>
        </section>
      ))}

      <p className="mt-10">
        <a href="/">Back to SnapLink</a>
      </p>
    </article>
  );
}
