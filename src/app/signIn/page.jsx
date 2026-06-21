// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { Eye, EyeOff } from "lucide-react";

// function cn(...classes) {
//   return classes.filter(Boolean).join(" ");
// }

// function GoogleIcon(props) {
//   return (
//     <svg viewBox="0 0 24 24" width="18" height="18" {...props}>
//       <path
//         fill="#4285F4"
//         d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.42 3.58v3h3.91c2.29-2.11 3.53-5.22 3.53-8.82z"
//       />
//       <path
//         fill="#34A853"
//         d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.91-3a7.13 7.13 0 0 1-10.59-3.74H1.4v3.09A12 12 0 0 0 12 24z"
//       />
//       <path
//         fill="#FBBC05"
//         d="M5.43 14.35a7.2 7.2 0 0 1 0-4.7V6.56H1.4a12 12 0 0 0 0 10.88z"
//       />
//       <path
//         fill="#EA4335"
//         d="M12 4.77c1.76 0 3.34.6 4.59 1.79l3.44-3.44C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.69 1.4 6.56l4.03 3.09A7.13 7.13 0 0 1 12 4.77z"
//       />
//     </svg>
//   );
// }

// export default function SignInPage() {
//   const [form, setForm] = useState({
//     email: "",
//     password: "",
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [remember, setRemember] = useState(false);
//   const [error, setError] = useState("");
//   const [submitting, setSubmitting] = useState(false);

//   const handleChange = (field) => (e) => {
//     setForm((prev) => ({ ...prev, [field]: e.target.value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setError("");

//     if (!form.email || !form.password) {
//       setError("Please enter your email and password.");
//       return;
//     }

//     setSubmitting(true);
//     // Replace with your real sign-in request
//     setTimeout(() => {
//       setSubmitting(false);
//       console.log("Sign in payload:", { ...form, remember });
//     }, 1200);
//   };

//   return (
//     <div className="min-h-screen w-full flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4 py-16">
//       <div className="w-full max-w-md">
//         {/* Card */}
//         <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm p-8 sm:p-10">
//           {/* Header */}
//           <div className="text-center mb-8">
//             <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
//               Welcome back
//             </h1>
//             <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
//               Sign in to continue to your account.
//             </p>
//           </div>

//           {/* Google sign in */}
//           <button
//             type="button"
//             className="w-full flex items-center justify-center gap-3 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-2.5 text-sm font-medium text-zinc-700 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
//           >
//             <GoogleIcon />
//             Continue with Google
//           </button>

//           {/* Divider */}
//           <div className="flex items-center gap-3 my-6">
//             <span className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
//             <span className="text-xs text-zinc-400 dark:text-zinc-500">
//               or sign in with email
//             </span>
//             <span className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
//           </div>

//           {/* Form */}
//           <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//             <div className="flex flex-col gap-1.5">
//               <label
//                 htmlFor="email"
//                 className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
//               >
//                 Email
//               </label>
//               <input
//                 id="email"
//                 type="email"
//                 autoComplete="email"
//                 placeholder="you@example.com"
//                 value={form.email}
//                 onChange={handleChange("email")}
//                 className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3.5 py-2.5 text-sm text-zinc-900 dark:text-zinc-50 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 focus:border-transparent transition-shadow"
//               />
//             </div>

//             <div className="flex flex-col gap-1.5">
//               <div className="flex items-center justify-between">
//                 <label
//                   htmlFor="password"
//                   className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
//                 >
//                   Password
//                 </label>
//                 <Link
//                   href="/forgetPassword"
//                   className="text-xs font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:underline"
//                 >
//                   Forgot password?
//                 </Link>
//               </div>
//               <div className="relative">
//                 <input
//                   id="password"
//                   type={showPassword ? "text" : "password"}
//                   autoComplete="current-password"
//                   placeholder="Enter your password"
//                   value={form.password}
//                   onChange={handleChange("password")}
//                   className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3.5 py-2.5 pr-11 text-sm text-zinc-900 dark:text-zinc-50 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 focus:border-transparent transition-shadow"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword((v) => !v)}
//                   aria-label={showPassword ? "Hide password" : "Show password"}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
//                 >
//                   {showPassword ? (
//                     <EyeOff className="h-4 w-4" />
//                   ) : (
//                     <Eye className="h-4 w-4" />
//                   )}
//                 </button>
//               </div>
//             </div>

//             <label className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 select-none cursor-pointer">
//               <input
//                 type="checkbox"
//                 checked={remember}
//                 onChange={(e) => setRemember(e.target.checked)}
//                 className="h-4 w-4 rounded border-zinc-300 dark:border-zinc-600 text-zinc-900 dark:text-zinc-50 focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100"
//               />
//               Remember me
//             </label>

//             {error && (
//               <p
//                 role="alert"
//                 className="text-sm text-red-600 dark:text-red-400 -mt-1"
//               >
//                 {error}
//               </p>
//             )}

//             <button
//               type="submit"
//               disabled={submitting}
//               className={cn(
//                 "mt-2 w-full rounded-lg bg-zinc-900 dark:bg-zinc-50 px-4 py-2.5 text-sm font-semibold text-white dark:text-zinc-900 transition-colors hover:bg-zinc-800 dark:hover:bg-zinc-200",
//                 submitting && "opacity-60 cursor-not-allowed"
//               )}
//             >
//               {submitting ? "Signing in..." : "Sign in"}
//             </button>
//           </form>

//           {/* Footer */}
//           <p className="mt-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
//             Don't have an account?{" "}
//             <Link
//               href="/signUp"
//               className="font-medium text-zinc-900 dark:text-zinc-50 hover:underline"
//             >
//               Sign up
//             </Link>
//           </p>
//         </div>

//         <p className="mt-6 text-center text-xs text-zinc-400 dark:text-zinc-500">
//           By signing in, you agree to our{" "}
//           <Link href="/terms" className="underline hover:text-zinc-600 dark:hover:text-zinc-300">
//             Terms
//           </Link>{" "}
//           and{" "}
//           <Link href="/privacy" className="underline hover:text-zinc-600 dark:hover:text-zinc-300">
//             Privacy Policy
//           </Link>
//           .
//         </p>
//       </div>
//     </div>
//   );
// }

















"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { saveUser } from "../lib/auth";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function GoogleIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" {...props}>
      <path
        fill="#4285F4"
        d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.42 3.58v3h3.91c2.29-2.11 3.53-5.22 3.53-8.82z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.91-3a7.13 7.13 0 0 1-10.59-3.74H1.4v3.09A12 12 0 0 0 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.43 14.35a7.2 7.2 0 0 1 0-4.7V6.56H1.4a12 12 0 0 0 0 10.88z"
      />
      <path
        fill="#EA4335"
        d="M12 4.77c1.76 0 3.34.6 4.59 1.79l3.44-3.44C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.69 1.4 6.56l4.03 3.09A7.13 7.13 0 0 1 12 4.77z"
      />
    </svg>
  );
}

export default function SignInPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password) {
      setError("Please enter your email and password.");
      return;
    }

    setSubmitting(true);

    // NOTE: This is a local-only demo flow (no backend). It doesn't verify
    // the password against anything real — it just marks this email as
    // "logged in" in localStorage so the navbar ProfileIcon picks it up.
    // Replace this block with a real sign-in API call when you have a
    // backend, and only call saveUser() after that request succeeds.
    setTimeout(() => {
      const name = form.email.split("@")[0];
      saveUser({ name, email: form.email });
      setSubmitting(false);
      router.push("/");
    }, 800);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4 py-16">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm p-8 sm:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
              Welcome back
            </h1>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              Sign in to continue to your account.
            </p>
          </div>

          {/* Google sign in */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-2.5 text-sm font-medium text-zinc-700 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
          >
            <GoogleIcon />
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <span className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
            <span className="text-xs text-zinc-400 dark:text-zinc-500">
              or sign in with email
            </span>
            <span className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="email"
                className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange("email")}
                className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3.5 py-2.5 text-sm text-zinc-900 dark:text-zinc-50 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 focus:border-transparent transition-shadow"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
                >
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange("password")}
                  className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3.5 py-2.5 pr-11 text-sm text-zinc-900 dark:text-zinc-50 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 focus:border-transparent transition-shadow"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <label className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 select-none cursor-pointer">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="h-4 w-4 rounded border-zinc-300 dark:border-zinc-600 text-zinc-900 dark:text-zinc-50 focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100"
              />
              Remember me
            </label>

            {error && (
              <p
                role="alert"
                className="text-sm text-red-600 dark:text-red-400 -mt-1"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className={cn(
                "mt-2 w-full rounded-lg bg-zinc-900 dark:bg-zinc-50 px-4 py-2.5 text-sm font-semibold text-white dark:text-zinc-900 transition-colors hover:bg-zinc-800 dark:hover:bg-zinc-200",
                submitting && "opacity-60 cursor-not-allowed"
              )}
            >
              {submitting ? "Signing in..." : "Sign in"}
            </button>
          </form>

          {/* Footer */}
          <p className="mt-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
            Don't have an account?{" "}
            <Link
              href="/signUp"
              className="font-medium text-zinc-900 dark:text-zinc-50 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>

        <p className="mt-6 text-center text-xs text-zinc-400 dark:text-zinc-500">
          By signing in, you agree to our{" "}
          <Link href="/terms" className="underline hover:text-zinc-600 dark:hover:text-zinc-300">
            Terms
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="underline hover:text-zinc-600 dark:hover:text-zinc-300">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
