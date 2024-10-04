"use client";

import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { FormState, signIn } from "../app/sign-in/action";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300 ease-out disabled:cursor-not-allowed disabled:opacity-50"
    >
      {pending ? <LoaderCircle className="animate-spin h-4 w-4" /> : "ورود"}
    </button>
  );
}

export default function SignIn() {
  const initialState: FormState = { message: "" };
  const [state, formAction] = useFormState(signIn, initialState);
  const [showHidePass, setShowHidePass] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-sm w-full bg-white rounded-lg p-6 shadow-sm">
        <h2 className="mt-3 text-center text-3xl font-iran-yekan font-extrabold text-gray-900">
          ورود به بلاگیک
        </h2>
        <form className="mt-8 space-y-6" action={formAction}>
          <div className="rounded-md shadow-sm space-y-3">
            <div className="space-y-1">
              <label htmlFor="username" className="sr-only">
                نام کاربری
              </label>
              <label htmlFor="username">نام کاربری</label>
              <input
                id="username"
                name="username"
                type="text"
                className="appearance-none relative block w-full px-3 py-2 border bg-gray-50 border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {state.errors?.username && (
                <p className="mt-2 text-sm text-red-600">
                  {state.errors.username}
                </p>
              )}
            </div>
            <div className="relative space-y-2">
              <label htmlFor="password" className="sr-only">
                رمز عبور
              </label>
              <label htmlFor="password">رمز عبور</label>
              <input
                id="password"
                name="password"
                type={showHidePass ? "text" : "password"}
                className="appearance-none relative block w-full px-3 py-2 border bg-gray-50 border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <div className="absolute top-8 left-0 flex items-center pl-1 pr-2">
                <button
                  type="button"
                  onClick={() => setShowHidePass((prev) => !prev)}
                  className="relative ml-1 inline-flex cursor-pointer items-center justify-center rounded bg-white px-2.5 py-1 text-center text-xs shadow-sm outline-none outline-0 transition-all duration-200 ease-in-out"
                >
                  {showHidePass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {state?.errors?.password && (
                <p className="mt-2 text-sm text-red-600">
                  {state.errors.password}
                </p>
              )}
            </div>
          </div>

          {state?.errors?.form && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    {state.errors.form}
                  </h3>
                </div>
              </div>
            </div>
          )}

          <SubmitButton />
        </form>
      </div>
    </div>
  );
}
