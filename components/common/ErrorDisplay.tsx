
import React from 'react';

interface ErrorDisplayProps {
  title: string;
  message: string;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ title, message }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-red-50 text-red-800 p-8">
      <div className="bg-white p-10 rounded-lg shadow-2xl text-center border-2 border-red-200">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h2 className="text-3xl font-bold mt-4">{title}</h2>
        <p className="text-lg mt-2 text-red-600 max-w-md">{message}</p>
        <p className="text-sm mt-6 text-gray-500">Please check your configuration or network connection and try again.</p>
      </div>
    </div>
  );
};

export default ErrorDisplay;
