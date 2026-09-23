"use client";

import { motion } from "motion/react";
import { useEffect } from "react";

const INTRO_KEY = "ej-intro";

function dismissIntro() {
  try {
    sessionStorage.setItem(INTRO_KEY, "1");
  } catch {
    // Storage can be unavailable. The intro still closes.
  }
  document.documentElement.dataset.skipIntro = "true";
  document.querySelectorAll("[data-inert-with-intro]").forEach((node) => {
    node.removeAttribute("inert");
  });
}

export function WorkspaceIntro() {
  useEffect(() => {
    if (document.documentElement.dataset.skipIntro === "true") return;

    const nodes = document.querySelectorAll("[data-inert-with-intro]");
    nodes.forEach((node) => node.setAttribute("inert", ""));
    const timer = window.setTimeout(dismissIntro, 900);

    return () => {
      window.clearTimeout(timer);
      nodes.forEach((node) => node.removeAttribute("inert"));
    };
  }, []);

  return (
    <div className="workspace-intro fixed inset-0 z-50 flex items-center justify-center bg-navy text-white">
      <div className="mx-auto w-full max-w-md px-6">
        <p className="font-mono text-xs tracking-[0.2em] text-cyan-bright uppercase">
          Workspace
        </p>
        <motion.p
          className="mt-3 text-2xl font-semibold tracking-tight"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          Loading systems…
        </motion.p>
        <p className="mt-3 text-sm text-blue-100">
          Frontend, API, payments, webhooks.
        </p>
        <button
          type="button"
          className="mt-8 rounded-full border border-white/20 px-4 py-2 text-sm hover:border-white/50"
          onClick={dismissIntro}
        >
          Skip
        </button>
      </div>
    </div>
  );
}
