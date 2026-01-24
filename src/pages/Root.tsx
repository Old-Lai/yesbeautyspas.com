import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <div className="flex min-h-screen w-screen flex-col">
      <header className="h-25 w-full bg-red-600 opacity-25"></header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="h-25 w-full bg-amber-600 opacity-25"></footer>
    </div>
  );
}
