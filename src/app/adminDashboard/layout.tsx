import { ReactNode } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getUserFromToken } from "@/app/lib/auth";

type AdminLayoutProps = {
  children: ReactNode;
};

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth-token")?.value;

  if (!token) {
    redirect("/login");
  }

  const user = await getUserFromToken(token);

  if (!user || user.role !== "admin") {
    redirect("/studentDashboard");
  }

  return <>{children}</>;
}
