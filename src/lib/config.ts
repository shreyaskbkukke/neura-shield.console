export const config = {
  apiBaseUrl:
    process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000/api/v1",
  wsBaseUrl:
    process.env.NEXT_PUBLIC_WS_BASE_URL ?? "ws://localhost:8000",
  devAuthEnabled:
    process.env.NEXT_PUBLIC_DEV_AUTH_ENABLED === "true",
  defaultDevUserId:
    process.env.NEXT_PUBLIC_DEFAULT_DEV_USER_ID ?? "",
} as const;
