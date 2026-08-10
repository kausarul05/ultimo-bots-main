"use client";

import { useSyncExternalStore } from "react";

const AUTH_KEY = "isAuthenticated";
const EMAIL_KEY = "userEmail";

/**
 * Same-tab localStorage writes don't fire the native `storage` event, so
 * mutations made through this module broadcast their own.
 */
const AUTH_EVENT = "ub:auth-change";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(AUTH_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(AUTH_EVENT, callback);
  };
}

function readAuth() {
  return localStorage.getItem(AUTH_KEY) === "true";
}

function readEmail() {
  return localStorage.getItem(EMAIL_KEY) ?? "";
}

// During SSR and the hydrating render the value is genuinely unknown, so the
// server snapshot is null and callers render a skeleton until it resolves.
const authServerSnapshot = () => null;
const emailServerSnapshot = () => "";

/**
 * Reads the demo auth flag out of localStorage without a setState-in-effect,
 * and keeps every consumer in sync when it changes.
 *
 * Returns null while the value is still unknown (server render / hydration).
 */
export function useIsAuthenticated(): boolean | null {
  return useSyncExternalStore(subscribe, readAuth, authServerSnapshot);
}

export function useStoredEmail(): string {
  return useSyncExternalStore(subscribe, readEmail, emailServerSnapshot);
}

/** Clears the local auth flags and notifies every subscriber. */
export function clearLocalAuth() {
  localStorage.removeItem(AUTH_KEY);
  localStorage.removeItem(EMAIL_KEY);
  window.dispatchEvent(new Event(AUTH_EVENT));
}
