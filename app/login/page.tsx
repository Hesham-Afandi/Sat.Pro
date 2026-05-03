"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password");
      setLoading(false);
    } else {
      router.push("/dashboard");
    }
  };

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/dashboard" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-4">
      <div className="backdrop-blur-lg bg-white/10 p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/20">
        
        <h2 className="text-3xl font-bold text-white text-center mb-2">Welcome Back!</h2>
        <p className="text-white/80 text-center mb-8">Join thousands of students achieving their dreams</p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          <div className="bg-blue-500/20 backdrop-blur p-3 rounded-xl text-center border border-white/10">
            <div className="text-2xl font-bold text-white">10K+</div>
            <div className="text-xs text-white/70">Students</div>
          </div>
          <div className="bg-purple-500/20 backdrop-blur p-3 rounded-xl text-center border border-white/10">
            <div className="text-2xl font-bold text-white">95%</div>
            <div className="text-xs text-white/70">Success</div>
          </div>
          <div className="bg-pink-500/20 backdrop-blur p-3 rounded-xl text-center border border-white/10">
            <div className="text-2xl font-bold text-white">50K+</div>
            <div className="text-xs text-white/70">Tests</div>
          </div>
        </div>

        {/* Features */}
        <div className="space-y-3 mb-8">
          <div className="flex items-center gap-3 text-white/90">
            <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs">✓</div>
            <span>Personalized Study Plan</span>
          </div>
          <div className="flex items-center gap-3 text-white/90">
            <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs">✓</div>
            <span>Real-time Progress Tracking</span>
          </div>
          <div className="flex items-center gap-3 text-white/90">
            <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs">✓</div>
            <span>Expert Instructors</span>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-100 px-4 py-3 rounded-lg mb-6 text-center">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/50 focus:bg-white/20 transition"
              required
            />
          </div>
          
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/50 focus:bg-white/20 transition"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className="flex justify-end">
            <Link href="/forgot-password" className="text-sm text-white/70 hover:text-white transition">
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-white text-purple-600 font-bold rounded-lg hover:bg-white/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/20"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-transparent text-white/50">Or continue with</span>
          </div>
        </div>

        {/* Google Button */}
        <button
          onClick={handleGoogleSignIn}
          className="w-full py-3 bg-white/10 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/20 transition flex items-center justify-center gap-3"
        >
          <FcGoogle className="text-xl" />
          <span>Google</span>
        </button>

        {/* Register Link */}
        <div className="mt-6 text-center text-white/70">
          Don't have an account?{" "}
          <Link href="/register" className="text-white font-semibold hover:underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}