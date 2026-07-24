"use client";

import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const phoneNumber = "9711752388"; // Replace with your number
  const message = "Hi! I would like to chat with you.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center justify-center group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Pulsing Animation */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75" />
          <div
            className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-50"
            style={{ animationDelay: "0.5s" }}
          />
        </div>

        {/* Button */}
        <div
          className={`relative w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
            isHovered
              ? "bg-gradient-to-br from-green-400 to-green-600 scale-110 shadow-green-500/50"
              : "bg-gradient-to-br from-green-500 to-green-600 shadow-green-500/30"
          }`}
        >
          <FaWhatsapp className="text-white text-3xl" />
        </div>

        {/* Tooltip */}
        <div
          className={`absolute right-full mr-4 transition-all duration-300 ${
            isHovered
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-4 pointer-events-none"
          }`}
        >
          <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 whitespace-nowrap">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
              Chat with us on WhatsApp
            </span>
            <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-white dark:bg-gray-800 border-r border-t border-gray-200 dark:border-gray-700 transform rotate-45" />
          </div>
        </div>
      </a>
    </div>
  );
};

export default WhatsAppButton;