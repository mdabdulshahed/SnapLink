import ShortenForm from "./ShortenForm.tsx";
import TermsPage from "./TermsPage.tsx";

const BACKEND_REPO = "https://github.com/mdabdulshahed/SnapLink-backend";

export default function App() {
  // Two pages don't need a router.
  const isTermsPage = window.location.pathname === "/terms";

  return (
    <div className="flex min-h-screen flex-col">
      <div className="airmail-stripe" aria-hidden="true" />

      <header className="mx-auto flex w-full max-w-3xl items-center justify-between gap-4 px-4 py-5 sm:px-6">
        <a
          href="/"
          className="font-condensed text-3xl font-bold tracking-wide text-postal uppercase no-underline"
        >
          SnapLink
        </a>
        <nav aria-label="Project" className="flex gap-5 text-sm font-medium sm:text-base">
          <a href={`${BACKEND_REPO}/blob/main/docs/ARCHITECTURE.md`}>How it works</a>
          <a href={BACKEND_REPO}>Source</a>
        </nav>
      </header>

      <main className="mx-auto w-full max-w-3xl flex-1 px-4 pt-6 pb-16 sm:px-6 sm:pt-10">
        {isTermsPage ? <TermsPage /> : <ShortenForm />}
      </main>

      <footer className="border-t border-rule">
        <div className="mx-auto flex w-full max-w-3xl flex-wrap justify-between gap-2 px-4 py-6 text-sm text-muted sm:px-6">
          <p>SnapLink is a hobby project.</p>
          <a href="/terms">Terms of Use</a>
        </div>
      </footer>
    </div>
  );
}
