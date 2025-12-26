// src/App.jsx
import React from "react";

export default function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        margin: 0,
        padding: "2rem",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        background: "radial-gradient(circle at top, #1e293b, #020617)",
        color: "#e5e7eb",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          maxWidth: "960px",
          width: "100%",
          padding: "2rem",
          borderRadius: "1rem",
          background:
            "linear-gradient(145deg, rgba(15,23,42,0.95), rgba(15,23,42,0.8))",
          border: "1px solid rgba(56,189,248,0.4)",
          boxShadow: "0 24px 60px rgba(0,0,0,0.6)",
        }}
      >
        <h1
          style={{
            fontSize: "2.5rem",
            marginBottom: "0.5rem",
            color: "#38bdf8",
          }}
        >
          GameArena
        </h1>
        <p style={{ color: "#9ca3af", marginBottom: "1.25rem" }}>
          The Unified Esports Platform
        </p>
        <p style={{ marginBottom: "0.75rem" }}>
          This is a production-ready React + Vite build deployed on GitHub
          Pages. The app is running from the{" "}
          <span style={{ color: "#38bdf8" }}>gamearenafinall</span> project
          path.
        </p>
        <p style={{ marginBottom: "0.75rem" }}>
          Next step: replace this simple content with your full GameArena
          dashboard UI inside <code>src/App.jsx</code>. No need to touch{" "}
          <code>index.html</code> or <code>vite.config.js</code> again.
        </p>
        <p style={{ color: "#9ca3af", fontSize: "0.9rem" }}>
          If you see this screen at{" "}
          <code>
            https://ilkinhuseynli15522.github.io/gamearenafinall/
          </code>
          , your deployment is fixed.
        </p>
      </div>
    </div>
  );
}
