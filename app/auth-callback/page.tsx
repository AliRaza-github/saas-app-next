// "use client";
// import { useRouter, useSearchParams } from "next/navigation";
// import { trpc } from "../_trpc/client";
// import { Loader2 } from "lucide-react";


// const Page = () => {


//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const origin = searchParams.get("origin")

//   trpc.authCallback.useQuery(undefined, {
//     onSuccess: ({ success }) => {
//       if (success) {
//         // user is synced to db
//         router.push(origin ? `/${origin}` : "/dashboard");
   
//       }
//     },
//     onError: (err) => {
//       if (err.data?.code === "UNAUTHORIZED") {
//         router.push("/sign-in");
//       }
//     },
//     retry: true,
//     retryDelay: 500,
//   });

//   return (
//     <div className="w-full mt-24 flex justify-center">
//       <div className="flex flex-col items-center gap-2">
//         <Loader2 className="h-8 w-8 animate-spin text-zinc-800" />
//         <h3 className="font-semibold text-xl">Setting up your account...</h3>
//         <p>You will be redirected automatically.</p>
//       </div>
//     </div>
//   );
// };

// export default Page;

"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { trpc } from "../_trpc/client";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const origin = searchParams.get("origin");

  // Make the TRPC query to handle auth callback
  const { data, isLoading, isError, isSuccess } = trpc.authCallback.useQuery(undefined, {
    onSuccess: ({ success }) => {
      if (success) {
        // Perform the redirection to the origin or dashboard
        router.push(origin ? `/${origin}` : "/dashboard");
      }
    },
    onError: (err) => {
      if (err.data?.code === "UNAUTHORIZED") {
        // If unauthorized, redirect to sign-in
        router.push("/sign-in");
      }
    },
    retry: true,
    retryDelay: 500,
  });

  // Add useEffect to log redirection
  useEffect(() => {
    if (isSuccess && data?.success) {
      console.log("Redirection to: ", origin ? `/${origin}` : "/dashboard");
    }

    if (isError && data?.code !== "UNAUTHORIZED") {
      console.error("Error occurred:", data);
      alert("An error occurred while setting up your account. Please try again.");
    }
  }, [isSuccess, isError, data, origin]);

  return (
    <div className="w-full mt-24 flex justify-center">
      <div className="flex flex-col items-center gap-2">
        {isLoading ? (
          <>
            <Loader2 className="h-8 w-8 animate-spin text-zinc-800" />
            <h3 className="font-semibold text-xl">Setting up your account...</h3>
            <p>You will be redirected automatically.</p>
          </>
        ) : (
          <h3 className="font-semibold text-xl">Redirecting...</h3>
        )}
      </div>
    </div>
  );
};

export default Page;

