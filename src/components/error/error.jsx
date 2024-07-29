// Alert.js
import React from "react";

function Alert({ role, message }) {
  const roles = {
    success: {
      bg: "bg-green-100 dark:bg-green-900",
      border: "border-green-500 dark:border-green-700",
      text: "text-green-900 dark:text-green-100",
      hover: "hover:bg-green-200 dark:hover:bg-green-800",
      iconColor: "text-green-600",
      message,
    },
    info: {
      bg: "bg-blue-100 dark:bg-blue-900",
      border: "border-blue-500 dark:border-blue-700",
      text: "text-blue-900 dark:text-blue-100",
      hover: "hover:bg-blue-200 dark:hover:bg-blue-800",
      iconColor: "text-blue-600",
      message,
    },
    warning: {
      bg: "bg-yellow-100 dark:bg-yellow-900",
      border: "border-yellow-500 dark:border-yellow-700",
      text: "text-yellow-900 dark:text-yellow-100",
      hover: "hover:bg-yellow-200 dark:hover:bg-yellow-800",
      iconColor: "text-yellow-600",
      message,
    },
    error: {
      bg: "bg-red-100 dark:bg-red-900",
      border: "border-red-500 dark:border-red-700",
      text: "text-red-900 dark:text-red-100",
      hover: "hover:bg-red-200 dark:hover:bg-red-800",
      iconColor: "text-red-600",
      message,
    },
  };

  const currentRole = roles[role] || roles.info;

  return (
    <div className={`space-y-2 p-4`}>
      <div
        role="alert"
        className={`${currentRole.bg} ${currentRole.border} ${currentRole.text} p-2 rounded-lg flex items-center transition duration-300 ease-in-out ${currentRole.hover} transform hover:scale-105`}
      >
        <svg
          stroke="currentColor"
          viewBox="0 0 24 24"
          fill="none"
          className={`h-5 w-5 flex-shrink-0 mr-2 ${currentRole.iconColor}`}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13 16h-1v-4h1m0-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
          ></path>
        </svg>
        <p className="text-xs font-semibold">{message}</p>
      </div>
    </div>
  );
}

export default Alert;
