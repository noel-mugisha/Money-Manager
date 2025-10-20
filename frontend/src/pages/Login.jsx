import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import Input from "../components/Input";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  return (
    <div className="h-screen w-full flex items-center justify-center overflow-hidden">
      <img
        src={assets.login_bg}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover filter blur-sm"
      />
      <div className="relative z-10 w-full max-w-lg px-6">
        <div className="bg-white bg-opacity-95 backdrop-blur-sm shadow-2xl p-8 max-h-[90vh] overflow-y-auto rounded-lg">
          <h3 className="text-2xl font-semibold txt-black text-center mb-2">
            Welcome Back!
          </h3>
          <p className="text-sm text-slate-700 text-center mb-8">
            Please enter your details to login to your account.
          </p>

          <form className="space-y-4">
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email Address"
              placeholder="john@example.com"
              type="email"
            />

            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
              placeholder="*********"
              type="password"
            />

            {error && (
              <p className="text-red-800 text-sm text-center bg-red-50 p-2 rounded ">
                {error}
              </p>
            )}

            <div className="flex justify-center">
              {" "}
              {/* New wrapper for centering */}
              <button
                className="btn-primary py-3 text-lg font-medium max-w-sm w-full"
                type="submit"
              >
                LOG IN
              </button>
            </div>
            <p className="text-sm text-slate-800 text-center mt-6">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-medium text-primary underline hover:text-primary-dark transition-colors ml-1"
              >
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
