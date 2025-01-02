import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ProfileForm } from "@/components/profile/profile-form";
import { DeleteAccount } from "@/components/profile/delete-account";
import { getUserSnippets } from "@/lib/actions";
import { UserSnippetCard } from "@/components/profile/user-snippet-card";

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user) redirect("/auth/signin");

  const snippets = await getUserSnippets(session.user.id);

  return (
    <div className="container py-10">
      <h1 className="text-4xl font-bold mb-8">Profile</h1>
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Account Settings</h2>
          <ProfileForm user={session.user} />
          <div className="mt-8">
            <DeleteAccount />
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Your Snippets</h2>
          <div className="space-y-4">
            {snippets.length === 0 ? (
              <p className="text-muted-foreground">
                You haven't created any snippets yet.
              </p>
            ) : (
              snippets.map((snippet) => (
                <UserSnippetCard key={snippet.id} snippet={snippet} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
