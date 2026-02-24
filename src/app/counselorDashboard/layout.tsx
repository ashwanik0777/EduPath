import { ReactNode } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getUserFromToken } from "@/app/lib/auth";

type CounselorLayoutProps = {
  children: ReactNode;
};

export default async function CounselorLayout({ children }: CounselorLayoutProps) {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth-token")?.value;

  if (!token) {
    redirect("/login");
  }

  const user = await getUserFromToken(token);

  if (!user) {
    redirect("/login");
  }

  if (user.role === "admin") {
    redirect("/adminDashboard");
  }

  if (user.role !== "counselor") {
    redirect("/studentDashboard");
  }

  return <>{children}</>;
}
