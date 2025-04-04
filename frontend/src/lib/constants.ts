// Base api url
//export const BASE_URL = "http://localhost:8080/api";

const BASE = process.env.NEXT_PUBLIC_API_URL;
export const BASE_URL = `${BASE}/api`;

// Token
export const TOKEN_KEY = "gametrack_token";
