"use client";

// components/VerticalMenu.jsx
import React from "react";
import Link from "next/link"; // For Next.js client-side navigation
import { usePathname } from "next/navigation";

const VerticalMenu = () => {
  const router = usePathname();

  const menuItems = [
    { name: "Dashboard", href: "/", icon: "fas fa-home" },
    { name: "Meus Agentes", href: "/agents", icon: "fas fa-robot" },
    { name: "Histórico", href: "/history", icon: "fas fa-history" },
    // Add more items as needed
  ];

  const bottomMenuItems = [
    { name: "Configurações", href: "/settings", icon: "fas fa-cog" },
    { name: "Ajuda", href: "/help", icon: "fas fa-info-circle" },
  ];

  return (
    <div className="w-60 bg-chat-white border-r border-chat-gray-light shadow-lg py-4 rounded-chat-radius font-sans flex flex-col h-full">
      <div className="px-6 pb-4 mb-2 text-lg font-bold text-chat-primary-dark border-b border-chat-gray-light">
        Menu Principal
      </div>
      <ul className="list-none p-0 m-0 flex-grow">
        {menuItems.map((item) => (
          <li key={item.name} className="mb-0.5">
            <Link href={item.href} legacyBehavior>
              <a
                className={`flex items-center px-6 py-3 text-base text-chat-black transition-chat
                  hover:bg-chat-gray-light hover:text-chat-primary
                  ${
                    router === item.href
                      ? 'bg-chat-primary text-chat-white font-bold relative before:content-[""] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1.5 before:bg-chat-gold before:rounded-tr-sm before:rounded-br-sm'
                      : ""
                  }
                `}
              >
                <i className={`${item.icon} mr-3 text-lg`}></i>
                {item.name}
              </a>
            </Link>
          </li>
        ))}
      </ul>

      {/* Optional Separator */}
      <div className="border-t border-chat-gray-light mx-6 my-4"></div>

      <ul className="list-none p-0 m-0">
        {bottomMenuItems.map((item) => (
          <li key={item.name} className="mb-0.5">
            <Link href={item.href} legacyBehavior>
              <a
                className={`flex items-center px-6 py-3 text-base text-chat-black transition-chat
                  hover:bg-chat-gray-light hover:text-chat-primary
                  ${
                    router === item.href
                      ? 'bg-chat-primary text-chat-white font-bold relative before:content-[""] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1.5 before:bg-chat-gold before:rounded-tr-sm before:rounded-br-sm'
                      : ""
                  }
                `}
              >
                <i className={`${item.icon} mr-3 text-lg`}></i>
                {item.name}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VerticalMenu;
