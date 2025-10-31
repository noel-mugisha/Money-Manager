import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import Input from "../components/Input";
import { validateEmail, validatePassword } from "../utils/validation";
import axiosConfig from "../utils/axiosConfig";
import { API_ENDPOINTS } from "../utils/apiEndpoints";
import toast from "react-hot-toast";
import { LoaderCircle } from "lucide-react";
import ProfilePhotoSelector from "../components/ProfilePhotoSelector";
import uploadProfileImage from "../utils/uploadProfile.js";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [passwordValidation, setPasswordValidation] = useState(
    validatePassword("")
  );
  const [isLoading, setIsLoading] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);


  const navigate = useNavigate();
  useEffect(() => {
    if (password.length > 0) {
      setPasswordValidation(validatePassword(password));
    } else {
      setPasswordValidation(validatePassword(""));
    }
  }, [password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let profileImageUrl = "";
    setError(null);
    setIsLoading(true);

    if (!fullName.trim()) {
      setError("Please enter your full name");
      setIsLoading(false);
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      setIsLoading(false);
      return;
    }
    if (!passwordValidation.isValid) {
      setError("Your password does not meet all security requirements.");
      setIsLoading(false);
      return;
    }

    // signup API call
    try {
      // upload profile photo if exists
      if (profilePhoto) {
        const imageUrl = await uploadProfileImage(profilePhoto);
        profileImageUrl = imageUrl || "";
      }
      const response = await axiosConfig.post(API_ENDPOINTS.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl
      });
      if (response.status === 201) {
        toast.success("Verify your email to activate your account!");
        navigate("/login");
      }
    } catch (err) {
      console.log("Signup Error:", err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message); 
      } else {
        setError("An unexpected error occurred during signup.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center py-10 overflow-y-auto">
      <img
        src={assets.login_bg}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover filter blur-sm"
      />
      <div className="relative z-10 w-full max-w-lg px-6">
        <div className="bg-white bg-opacity-95 backdrop-blur-sm shadow-2xl p-8 rounded-lg">
          <h3 className="text-2xl font-semibold txt-black text-center mb-2">
            Create An Account
          </h3>
          <p className="text-sm text-slate-700 text-center mb-8">
            Start tracking your spendings by joining us today!
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex justify-center mb-6">
              <ProfilePhotoSelector image={profilePhoto} setImage={setProfilePhoto}/>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
              <Input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                label="Full Name"
                placeholder="John Doe"
                type="text"
              />

              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                label="Email Address"
                placeholder="john@example.com"
                type="email"
              />

              <div className="col-span-2">
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  label="Password"
                  placeholder="*********"
                  type="password"
                />

                {password.length > 0 && (
                  <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                    {[
                      {
                        check: passwordValidation.minLength,
                        label: "Min 8 characters",
                      },
                      {
                        check: passwordValidation.hasUpperCase,
                        label: "Contains Uppercase",
                      },
                      {
                        check: passwordValidation.hasLowerCase,
                        label: "Contains Lowercase",
                      },
                      {
                        check: passwordValidation.hasNumber,
                        label: "Contains a Number",
                      },
                      {
                        check: passwordValidation.hasSymbol,
                        label: "Contains a Symbol",
                      },
                    ].map(({ check, label }) => (
                      <div
                        key={label}
                        className={`flex items-center space-x-1 ${
                          check ? "text-green-600" : "text-red-500"
                        }`}
                      >
                        {check ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                        <span>{label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {error && (
              <p className="text-red-800 text-sm text-center bg-red-50 p-2 rounded ">
                {error}
              </p>
            )}

            <div className="flex justify-center">
              {" "}
              <button disabled={isLoading}
                className={`btn-primary py-3 text-lg font-medium max-w-sm w-full flex items-center justify-center gap-2 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                type="submit"
              >
                {isLoading ? (
                  <>
                  <LoaderCircle className="animate-spin w-5 h-5"/>
                  Signing Up...
                  </>
                ): (
                  "SIGN UP"
                )}
              </button>
            </div>
            <p className="text-sm text-slate-800 text-center mt-6">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-primary underline hover:text-primary-dark transition-colors ml-1"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;