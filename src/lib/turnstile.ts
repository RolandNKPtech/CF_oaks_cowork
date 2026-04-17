/**
 * Cloudflare Turnstile server-side verification.
 *
 * Validates the `cf-turnstile-response` token from form submissions.
 * Returns true if valid, false if failed or error.
 *
 * In dev mode (no secret key), always returns true.
 */

const TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export async function verifyTurnstile(
  token: string | null | undefined,
  secretKey: string | null | undefined,
  ip?: string
): Promise<{ success: boolean; error?: string }> {
  // Dev mode — skip verification if no secret key
  if (!secretKey || secretKey === "dev") {
    return { success: true };
  }

  if (!token) {
    return { success: false, error: "Missing Turnstile token" };
  }

  try {
    const formData = new URLSearchParams();
    formData.append("secret", secretKey);
    formData.append("response", token);
    if (ip) formData.append("remoteip", ip);

    const res = await fetch(TURNSTILE_VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData.toString(),
    });

    const data = await res.json() as { success: boolean; "error-codes"?: string[] };

    if (data.success) {
      return { success: true };
    }

    return {
      success: false,
      error: data["error-codes"]?.join(", ") || "Turnstile verification failed",
    };
  } catch (err) {
    return { success: false, error: "Turnstile verification error" };
  }
}
