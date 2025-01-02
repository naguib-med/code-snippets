"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

export function SignInForm() {
  return (
    <div className="grid gap-6">
      <Button
        variant="outline"
        onClick={() => signIn("github", { callbackUrl: "/" })}
      >
        <Github className="mr-2 h-4 w-4" />
        Continue with GitHub
      </Button>
      <Button
        variant="outline"
        onClick={() => signIn("google", { callbackUrl: "/" })}
      >
        Continue with Google
      </Button>
    </div>
  );
}
