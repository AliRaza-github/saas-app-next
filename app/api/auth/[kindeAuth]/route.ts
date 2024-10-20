// import {handleAuth} from "@kinde-oss/kinde-auth-nextjs/server";
// import { NextRequest } from "next/server";

// export async function GET (request:NextRequest,{params}:any){
//     const endpoint = params.kindeAuth;
//     return handleAuth(request,endpoint)
// };
// app/api/auth/[kindeAuth]/route.ts


// import { handleAuth } from "@kinde-oss/kinde-auth-nextjs/server";
// import { NextRequest } from "next/server";

// export async function GET(request: NextRequest, { params }: { params: { kindeAuth: string } }) {
//   const endpoint = params.kindeAuth;
//   return handleAuth(request, endpoint);
// }

import { handleAuth } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { kindeAuth: string } }) {
  const endpoint = params.kindeAuth;

  const response = await handleAuth(request, endpoint);

  if (response instanceof Response) {
    return response; 
  }

  return NextResponse.json({ message: 'Authentication failed' }, { status: 401 });
}