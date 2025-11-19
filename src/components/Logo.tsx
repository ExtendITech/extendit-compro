import { useState } from "react";

export const Logo = ({ className = "h-6 w-auto" }: { className?: string }) => {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <span className={`font-mono ${className} inline-flex items-center`}>
        {"<"}
        <span className="text-primary font-bold">Extend IT</span>
        {" />"}
      </span>
    );
  }

  return (
    <img
      src="/logo.png"
      alt="Extend IT"
      className={className}
      onError={() => setErrored(true)}
    />
  );
};
