const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:4000";

export type Link = {
  shortCode: string;
  shortUrl: string;
  longUrl: string;
  createdAt: string;
  expiresAt: string | null;
};

type CreateLinkInput = {
  longUrl: string;
  customAlias?: string;
  expiresAt: string | null;
};

export async function createLink(input: CreateLinkInput): Promise<Link> {
  let response: Response;
  try {
    response = await fetch(`${API_URL}/api/links`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
  } catch {
    throw new Error("Couldn't reach the SnapLink server. Check your connection and try again.");
  }

  const body = await response.json().catch(() => null);
  if (!response.ok) {
    // The API writes its error messages for people, so show them as they are.
    throw new Error(body?.error?.message ?? "Something went wrong. Please try again.");
  }
  return body as Link;
}
