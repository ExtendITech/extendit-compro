import React from "react";

export const Logo = ({ className = "text-lg font-extrabold" }: { className?: string }) => {
  return (
    <span
      className={`inline-flex items-center ${className}`}
      style={{ fontFamily: "Agrandir, 'Agrandir Variable', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial" }}
    >
      <span className="text-primary" style={{ letterSpacing: "0.03rem" }}>Extend IT</span>
    </span>
  );
};
