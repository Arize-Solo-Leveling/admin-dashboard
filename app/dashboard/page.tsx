"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const DashboardPage = () => {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");

    if (!token) {
      router.replace("/login");
    }
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">Welcome Admin 👋</h1>
      <p>You are successfully logged in!</p>
    </div>
  );
};

export default DashboardPage;
