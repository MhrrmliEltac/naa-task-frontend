import type { ReactNode } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return <div className="container p-6 font-lato">{children}</div>;
};

export default DashboardLayout;
