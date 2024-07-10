import React from "react";
import EmailField from "../molecules/Login/EmailField.js";
import PasswordField from "../molecules/Login/PasswordField.js";

const LoginTemplate = ({ email, setEmail, password, setPassword, handleLogin }) => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="container">
        <div className="Login">
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-full flex justify-center">
              {/* <img className="h-25 w-40" src={logo} alt="Your Company" /> */}
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"></h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form
                onSubmit={handleLogin}
                className="space-y-6"
                action="#"
                method="POST"
              >
                <div>
                  <EmailField value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div>
                  <PasswordField value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    로그인
                  </button>
                </div>
              </form>

              <p className="mt-10 text-center text-sm text-gray-500">
                회원이 아니신가요?{" "}
                <a
                  href="/signup"
                  className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                >
                  회원가입 하러가기
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginTemplate;