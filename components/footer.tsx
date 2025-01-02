import { Github } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/snippets/new"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Create Snippet
                </Link>
              </li>
              <li>
                <Link
                  href="/profile"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Profile
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/docs"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="/api-docs"
                  className="text-muted-foreground hover:text-foreground"
                >
                  API
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <Link
              href="https://github.com"
              className="inline-flex items-center space-x-2 text-muted-foreground hover:text-foreground"
            >
              <Github className="h-5 w-5" />
              <span>GitHub</span>
            </Link>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Code Snippets. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
