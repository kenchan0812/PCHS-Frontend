import { ReactNode } from "react";

export default function AdminMarginWidthWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col md:ml-80 sm:border-r sm:border-zinc-700 min-h-screen">
      {children}
    </div>
  );
}
