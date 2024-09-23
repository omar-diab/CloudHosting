"use client";

import Link from "next/link";

interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

const error = ({ error, reset }: ErrorPageProps) => {
  return (
    <section className="flex items-center justify-center pt-28">
      <div className="fix-height">
        <div className="p-10 bg-gray-300 rounded-xl shadow-2xl text-center">
          <div className="text-6xl text-red-500 font-bold drop-shadow-lg">
            Something went wrong
          </div>
          <h2 className="my-4 text-3xl">
            Error Message:{" "}
            <span className="font-semibold text-purple-500">
              {error.message}
            </span>
          </h2>
          <Link
            className="text-2xl underline text-blue-600 hover:text-blue-900 transition-colors duration-300"
            href="/"
          >
            Go To Home Page
          </Link>
          <button
            className="mt-8 px-8 py-3 ml-5 bg-red-600 text-white text-lg font-semibold rounded-full hover:bg-red-700 transition-transform transform hover:scale-105"
            onClick={reset}
          >
            Try Again
          </button>
        </div>
      </div>
    </section>
  );
};

export default error;
