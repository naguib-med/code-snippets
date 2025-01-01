"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Home, User } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";

export default function Navbar() {
  const pathname = usePathname();

  const routes = [
    {
      href: "/",
      label: "Home",
      icon: Home,
      active: pathname === "/",
    },
  ];

  return (
    <nav className="border-b">
      <div className="flex h-16 items-center px-4 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center font-bold text-xl mr-6">
          Snippets
        </Link>

        <div className="flex items-center space-x-4 flex-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors
                ${
                  route.active
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                }`}
            >
              <route.icon className="h-4 w-4 mr-2" />
              {route.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          <ModeToggle />
          <Button variant="outline" size="sm" asChild>
            <Link href="/login">
              <User className="h-4 w-4 mr-2" />
              Login
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
