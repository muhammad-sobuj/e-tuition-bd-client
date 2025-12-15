import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";
import { useForm } from "react-hook-form";
import { useAuth } from "../../Context/AuthContext";
import { imageUpload, saveOrUpdateUser } from "../../utils";

const SignUp = () => {
  const { createUser, updateUserProfile, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || "/";

  const [loading, setLoading] = useState(false); // Local loading state

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const { name, email, password, image } = data;
    const imageFile = image?.[0];

    // Image validation (client side)
    if (!imageFile) {
      toast.error("Please upload a profile image");
      return;
    }

    setLoading(true);

    try {
      let imageURL = "";

      // Upload image first
      try {
        imageURL = await imageUpload(imageFile);
      } catch (uploadErr) {
        console.error(uploadErr);
        toast.error("Failed to upload image. Please try again.");
        setLoading(false);
        return;
      }

      // 1. Create user with email & password
      await createUser(email, password);
      
      // 2. Save/Update user in database
      await saveOrUpdateUser({
        name,
        email,
        image: imageURL,
      });

      // 3. Update Firebase profile (displayName & photoURL)
      await updateUserProfile(name, imageURL);

      toast.success("Signup Successful!");
      reset();
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      let errorMessage = err?.message || "Signup failed. Please try again.";

      // Specific Firebase errors
      if (err.code === "auth/email-already-in-use") {
        errorMessage = "This email is already registered. Please login.";
      } else if (err.code === "auth/weak-password") {
        errorMessage = "Password is too weak.";
      }

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Handle Google Sign In
  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const { user } = await signInWithGoogle();

      // Save or update user in database
      await saveOrUpdateUser({
        name: user?.displayName || "User",
        email: user?.email,
        image: user?.photoURL || "",
      });

      toast.success("Signup Successful with Google!");
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      let errorMessage = err?.message || "Google sign in failed.";

      if (err.code === "auth/popup-closed-by-user") {
        errorMessage = "Sign in cancelled.";
      }

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Sign Up</h1>
          <p className="text-sm text-gray-400">Welcome to eTuitionBD</p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="space-y-4">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block mb-2 text-sm">
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter Your Name Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-cyan-500 bg-gray-200 text-gray-900"
                {...register("name", {
                  required: "Name is required",
                  maxLength: {
                    value: 30,
                    message: "Name cannot exceed 30 characters",
                  },
                })}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Profile Image */}
            <div>
              <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-700">
                Profile Image <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                id="image"
                accept="image/*"
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-cyan-50 file:text-cyan-700
                  hover:file:bg-cyan-100
                  bg-gray-100 border border-dashed border-cyan-300 rounded-md cursor-pointer
                  focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400
                  py-2"
                {...register("image", {
                  required: "Profile image is required",
                })}
              />
              <p className="mt-1 text-xs text-gray-400">PNG, JPG or JPEG (max 2MB)</p>
              {errors.image && (
                <p className="text-red-500 text-xs mt-1">{errors.image.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Email address
              </label>
              <input
                type="email"
                id="email"
                autoComplete="email"
                placeholder="Enter Your Email Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-cyan-500 bg-gray-200 text-gray-900"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="text-sm mb-2 block">
                Password
              </label>
              <input
                type="password"
                id="password"
                autoComplete="new-password"
                placeholder="*******"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-cyan-500 bg-gray-200 text-gray-900"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="bg-cyan-500 w-full rounded-md py-3 text-white hover:bg-cyan-600 disabled:opacity-70 disabled:cursor-not-allowed transition"
            >
              {loading ? (
                <TbFidgetSpinner className="animate-spin m-auto text-xl" />
              ) : (
                "Continue"
              )}
            </button>
          </div>
        </form>

        {/* Social Login Divider */}
        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px bg-gray-400"></div>
          <p className="px-3 text-sm text-gray-600">Or signup with</p>
          <div className="flex-1 h-px bg-gray-400"></div>
        </div>

        {/* Google Sign In */}
        <div
          onClick={handleGoogleSignIn}
          className="flex justify-center items-center space-x-3 border m-3 p-3 border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 transition"
          disabled={loading}
        >
          <FcGoogle size={32} />
          <p className="font-medium">Continue with Google</p>
        </div>

        {/* Login Link */}
        <p className="px-6 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="hover:underline text-cyan-600 font-medium">
            Login
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default SignUp;