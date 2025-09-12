// // app/auth/login/page.tsx
// "use client";

// import React from "react";
// import { Button } from "@/app/components/ui/button";
// import { Input } from "@/app/components/ui/input";
// import Link from "next/link";

// export default function LoginPage() {
//   return (
//     <div className="space-y-6">
//       <h2 className="text-3xl font-bold text-purple-700">Login</h2>
//       <form className="space-y-4">
//         <Input placeholder="Email" type="email" required />
//         <Input placeholder="Password" type="password" required />

//         <Button className="w-full bg-purple-700 hover:bg-purple-800 text-white">
//           Sign In
//         </Button>
//       </form>
//       <div className="flex justify-between text-sm">
//         <Link href="/auth/forgot" className="text-purple-600 hover:underline">
//           Forgot password?
//         </Link>
//         <Link href="/auth/register" className="text-purple-600 hover:underline">
//           Create account
//         </Link>
//       </div>
//     </div>
//   );
// }
