"use client"
import { useEffect } from "react";
import { getSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Home() {

  useEffect(() => {
    const sessionverify = async () => {
      const session = await getSession();
      if (!session) {
        redirect("/login")
      }
      else {
        redirect(`/dashboard/${session?.user?.name}`)
      }
    }
    sessionverify();
  }, [])
  return (
    <div className="text-white h-screen text-xl">Validating......</div>
  );
}