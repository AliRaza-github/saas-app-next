import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { db } from "../db";
import Dashboard from "@/components/Dashboard";

const Page = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || !user.id) {
    redirect("/auth-callback?origin=dashboard");
  }
  

  const dbUser = await db.user.findFirst({
    where: {
      id: user.id,
    },
  });

  if (!dbUser) {
    redirect("/auth-callback?origin=dashboard");
  }

  return (
    <div className="w-full max-w-7xl mx-auto sm:p-6 lg:p-8">
      <h1 className="text-xl font-bold">Welcome to Dashboard</h1>
      <div className="mt-4">
        <p>User Email: {user.email}</p>
        <Dashboard/>
      </div>
    </div>
  );
};

export default Page;