"use client";

export default function GlobalError({ error, reset }) {
  return (
    <div className="p-10 text-center">
      <h2 className="text-xl font-semibold">Something went wrong</h2>
      <button onClick={reset} className="mt-4 underline">
        Try again
      </button>
    </div>
  );
}
