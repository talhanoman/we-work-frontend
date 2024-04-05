import React, { useState, useEffect } from "react";
import Image from "next/image";
import CandidateSignupFooter from "@/components/candidate-signup-footer";
import Logo from "@/components/logo";
import { useRouter } from "next/router";
import Cookies from "universal-cookie";
import { login } from "./api/post";
import PasswordInput from "@/components/password-input";
import Link from "next/link";

const avatars = [
  {
    img: "/images/avatar1.png",
    alt: "avatar 1",
  },
  {
    img: "/images/avatar2.png",
    alt: "avatar 2",
  },
  {
    img: "/images/avatar3.png",
    alt: "avatar 3",
  },
  {
    img: "/images/avatar4.png",
    alt: "avatar 4",
  },
  {
    img: "/images/avatar5.png",
    alt: "avatar 5",
  },
];

const initial_credentials = {
  email: "",
  password: "",
  savePassword: false,
  emailValid: false,
  passwordValid: false,
};

export default function LogIn() {
  const [userCredentials, setUserCredentials] = useState(initial_credentials);

  const router = useRouter();
  const cookies = new Cookies();

  const handleLogin = () => {
    login(userCredentials.email, userCredentials.password).then((res) => {
      const { valid, message, data } = res;
      if (valid) {
        cookies.set("token", data);
        alert("Auth Successful");
      } else {
        alert("Wrong Credentials");
      }
    });
  };

  const redirectToLogin = () => {
    router.push("/login");
  };

  useEffect(() => {
    redirectToLogin();
  }, []);

  const handleInputChange = (event) => {
    const { name, value, checked } = event.target;

    switch (name) {
      case "email":
        setUserCredentials({
          ...userCredentials,
          email: value,
          emailValid: /\S+@\S+\.\S+/.test(value),
        });
        break;
      case "password":
        setUserCredentials({
          ...userCredentials,
          password: value,
          passwordValid: value.length >= 8,
        });
        break;
      case "savePassword":
        setUserCredentials({
          ...userCredentials,
          savePassword: checked,
        });
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setUserCredentials(initial_credentials);
  };

  console.log(userCredentials);

  return (
    <div className="flex flex-row">
      {/* Left Section */}
      <div className="w-[54%] bg-gray-700 flex justify-center text-white h-screen bg-[url('../public/images/signin-bg-img.png')] bg-no-repeat bg-cover">
        <div className="relative w-full mr-[7.2%]">
          {/* Logo */}
          <Logo
            src={"crowd-work-vertical-white-logo"}
            alt={"Company Logo"}
            className={"absolute left-0 top-16 custom-height-mq:top-8 custom-height-mq:h-[60px] sm:h-[94px]"}
          />
          <div className="w-full max-w-[485px] mx-auto flex h-full flex-col justify-center">
            <h1 className="text-display-sm-regular xl:text-display-md-regular 2xl:text-display-lg-regular text-center sm:text-left">
              <span className="font-bold tracking-[-2%]">
                Streamline Your Event Planning with CROWD
              </span>
              WRK
            </h1>

            <h3 className="text-lg-medium 2xl:text-display-xs-medium mt-6 text-center sm:text-left">
              Say goodbye to inefficient planning and execution -{" "}
              <span className="font-bold">CROWD</span>WRK is designed to
              simplify every step of your event planning process.
            </h3>

            <div className="flex flex-col items-center sm:justify-start sm:flex-row gap-3 mt-10">
              {/* Avatars */}
              <div className="flex -space-x-3">
                {avatars.map((avatar, index) => (
                  <Image
                    key={`avatar${index + 1}`}
                    src={avatar.img}
                    alt={avatar.alt}
                    className="w-10 h-10 rounded-full bg-gray-100"
                    width={40}
                    height={40}
                  />
                ))}
              </div>

              <div>
                <div className="flex gap-2 items-center">
                  {/* Stars */}
                  <div className="flex gap-1 items-center">
                    {[...Array(5)].map((_, index) => (
                      <Image
                        key={`star-icon${index + 1}`}
                        src="/images/star-icon.svg"
                        alt={`Rating Star Icon ${index + 1}`}
                        className="w-5 h-5"
                        width={20}
                        height={20}
                      />
                    ))}
                  </div>
                  <h3 className="text-md-semibold 2xl:text-lg-semibold">5.0</h3>
                </div>
                <h3 className="text-sm-medium 2xl:text-md-medium">From 200+ reviews</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-1/2 flex flex-col bg-white rounded-l-[40px] absolute right-0 top-0 z-[1]">
        {/* Sign in Form */}
        <form
          action=""
          // onSubmit={handleSubmit}
          className="w-full max-w-[360px] mx-auto h-screen flex flex-col justify-center"
        >
          <div className="space-y-3 mb-8">
            <h3 className="text-display-xs-semibold 2xl:text-display-sm-semibold text-gray-900">
              Log in
            </h3>
            <p className="text-sm-regular 2xl:text-md-regular text-gray-500">
              Welcome back! Please enter your details.
            </p>
          </div>

          <div className="space-y-5">
            {/* Email Row */}
            <div>
              <label htmlFor="email" className="text-xs-medium 2xl:text-sm-medium text-gray-700">
                Email<span className="text-primary-600">*</span>
                <div className="relative">
                  <input
                    id="email"
                    name="email"
                    value={userCredentials.email}
                    onChange={handleInputChange}
                    type="email"
                    placeholder="Enter your email"
                    required
                    className="block w-full h-11 text-sm-regular 2xl:text-md-regular text-gray-900 rounded-lg border border-gray-300 px-3.5 py-2.5 mt-1.5 focus:ring-1 focus:ring-primary-600 placeholder:text-gray-500 shadow-xs"
                  />
                  {userCredentials.emailValid && (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute ml-2 top-3.5 right-3.5"
                    >
                      <rect
                        x="0.5"
                        y="0.5"
                        width="15"
                        height="15"
                        rx="7.5"
                        fill="#2F68D6"
                      />
                      <path
                        d="M11.3332 5.5L6.74984 10.0833L4.6665 8"
                        stroke="white"
                        strokeWidth="1.66667"
                        strokeLinecap="round"
                        stroke-linejoin="round"
                      />
                      <rect
                        x="0.5"
                        y="0.5"
                        width="15"
                        height="15"
                        rx="7.5"
                        stroke="#2F68D6"
                      />
                    </svg>
                  )}
                </div>
              </label>
            </div>

            {/* Password Row */}
            <div>
              <label
                htmlFor="password"
                className="text-xs-medium 2xl:text-sm-medium text-gray-700"
              >
                Password<span className="text-primary-600">*</span>
                <div className="relative">
                  <PasswordInput
                    id={"password"}
                    name={"password"}
                    password={userCredentials.password}
                    onVisibilityChange={handleInputChange}
                  />
                  {userCredentials.passwordValid && (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute ml-2 top-3.5 right-3.5"
                    >
                      <rect
                        x="0.5"
                        y="0.5"
                        width="15"
                        height="15"
                        rx="7.5"
                        fill="#2F68D6"
                      />
                      <path
                        d="M11.3332 5.5L6.74984 10.0833L4.6665 8"
                        stroke="white"
                        strokeWidth="1.66667"
                        strokeLinecap="round"
                        stroke-linejoin="round"
                      />
                      <rect
                        x="0.5"
                        y="0.5"
                        width="15"
                        height="15"
                        rx="7.5"
                        stroke="#2F68D6"
                      />
                    </svg>
                  )}
                </div>
              </label>
            </div>

            {/* Third Row */}
            <div className="flex justify-between items-center gap-2">
              <div>
                <label
                  htmlFor="savePassword"
                  className="flex items-center gap-2"
                >
                  <input
                    name="savePassword"
                    type="checkbox"
                    checked={userCredentials.savePassword}
                    onChange={handleInputChange}
                    className="h-4 w-4 block border border-gray-300 checked:border-primary-600 text-primary-600 rounded-[4px] checked:border-0 focus:ring-1 focus:ring-primary-600 outline-none"
                  />
                  <p className="text-xs-medium 2xl:text-sm-medium text-gray-700">
                    Remember for 30 days
                  </p>
                </label>
              </div>
              <Link href="login/forgot-password" className="block text-xs-semibold 2xl:text-sm-semibold text-primary-700">
                Forgot password
              </Link>
            </div>
          </div>

          {/* Buttons */}
          <div className="space-y-4 mt-6">
            <button
              // onClick={handleLogin}
              className="w-full h-11 flex justify-center items-center text-sm-bold 2xl:text-md-bold text-white bg-primary-600 border border-primary-600 rounded-lg p-2.5 disabled:pointer-events-none disabled:opacity-75 shadow-xs"
              disabled={
                !(userCredentials.emailValid && userCredentials.passwordValid)
              }
              onClick={(e) => {
                e.preventDefault();
                router.push("/headcount/overview");
              }}
            >
              Log in
            </button>
            <button className="w-full h-11 flex justify-center items-center text-md-regular bg-white border border-gray-300 rounded-lg p-2.5 shadow-xs">
              <div className="flex gap-3 justify-center items-center">
                <Image
                  src="/images/google-icon.svg"
                  alt={`Google Icon`}
                  className="w-6 h-6"
                  width={24}
                  height={24}
                />
                <p className="text-sm-semibold 2xl:text-md-semibold text-gray-700">
                  Sign in with Google
                </p>
              </div>
            </button>
          </div>
        </form>

        {/* Footer */}
        <CandidateSignupFooter
          company={"© Weteck Events Ltd. 2024"}
          email_id={"support@WeWork.com"}
        />
      </div>
    </div>
  );
}
