"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; 
import axios from "axios";
import Cookies from "js-cookie";


const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const handleLogin = async (e : React.FormEvent) => {
        e.preventDefault();
        try{
            const response = await axios.post("http://localhost:8080/auth/login", {
                email, password
            }, {withCredentials : true});
            
            const {token, refreshToken} = response.data;
            // localStorage.setItem("token", token);
            // localStorage.setItem("refreshToken", refreshToken);
            // Cookies.set("token", token);
            // Cookies.set("refreshToken", refreshToken);
            // router.push("/dashboard");
            document.cookie = `token=${token};`;
            document.cookie = `refreshToken=${refreshToken};t`;
            router.push("/dashboard");
        }catch(error: any){
            alert("Login failed: " + (error.response?.data?.message || error.message));
        }
    }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Sign In</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-black"
              placeholder="your@email.com"
              required
            />
          </div>

          <div className="relative">
  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
  <input
    type={showPassword ? "text" : "password"}
    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-black"
    placeholder="••••••••"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    required
  />
            <button
                type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-[38px] text-sm text-gray-600 hover:text-gray-800"
                    >
                    {showPassword ? "Hide" : "Show"}
                </button>
            </div>


          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
            <a href="#" className="text-sm text-indigo-600 hover:text-indigo-500">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <a href="#" className="text-indigo-600 hover:text-indigo-500 font-medium">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
