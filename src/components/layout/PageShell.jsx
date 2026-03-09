import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function PageShell() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-24 left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-amber-400/10 blur-3xl" />
        <div className="absolute top-56 left-10 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />
      </div>

      <Header />

      <main className="mx-auto w-full max-w-6xl px-5 py-10">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}