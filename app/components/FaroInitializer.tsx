"use client";

import { useEffect } from "react";
import { initializeFaro, getWebInstrumentations } from "@grafana/faro-web-sdk";
import { TracingInstrumentation } from "@grafana/faro-web-tracing";

export default function FaroInitializer() {
  useEffect(() => {
    if (typeof window !== "undefined" && process.env.NEXT_PUBLIC_FARO_URL && !(window as any).faro) {
      initializeFaro({
        url: process.env.NEXT_PUBLIC_FARO_URL,
        app: {
          name: "portfolio-thais-frontend",
          version: "1.0.0",
          environment: process.env.NODE_ENV,
        },
        instrumentations: [
          ...getWebInstrumentations(),
          new TracingInstrumentation(),
        ],
      });
    }
  }, []);

  return null;
}
