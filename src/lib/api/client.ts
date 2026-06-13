import { config } from "@/lib/config";
import { ApiClientError, type ApiErrorEnvelope } from "@/types/api";

function getDevUserId(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("ns_dev_user_id");
}

function buildHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (config.devAuthEnabled) {
    const uid = getDevUserId() ?? config.defaultDevUserId;
    if (uid) headers["X-Dev-User-Id"] = uid;
  }

  return headers;
}

async function parseResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let envelope: ApiErrorEnvelope | null = null;
    try {
      envelope = (await response.json()) as ApiErrorEnvelope;
    } catch {
      // ignore JSON parse failure
    }
    const err = envelope?.error;
    throw new ApiClientError(
      err?.code ?? "UNKNOWN_ERROR",
      err?.message ?? `HTTP ${response.status}`,
      err?.details,
      response.status,
    );
  }

  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}

export async function apiGet<T>(
  path: string,
  params?: Record<string, string | number | boolean>,
): Promise<T> {
  const url = new URL(`${config.apiBaseUrl}${path}`);
  if (params) {
    Object.entries(params).forEach(([k, v]) =>
      url.searchParams.set(k, String(v)),
    );
  }
  const res = await fetch(url.toString(), {
    method: "GET",
    headers: buildHeaders(),
  });
  return parseResponse<T>(res);
}

export async function apiPost<T>(path: string, body?: unknown): Promise<T> {
  const res = await fetch(`${config.apiBaseUrl}${path}`, {
    method: "POST",
    headers: buildHeaders(),
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
  return parseResponse<T>(res);
}

export async function apiPatch<T>(path: string, body?: unknown): Promise<T> {
  const res = await fetch(`${config.apiBaseUrl}${path}`, {
    method: "PATCH",
    headers: buildHeaders(),
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
  return parseResponse<T>(res);
}

export async function apiDelete<T>(path: string): Promise<T> {
  const res = await fetch(`${config.apiBaseUrl}${path}`, {
    method: "DELETE",
    headers: buildHeaders(),
  });
  return parseResponse<T>(res);
}
