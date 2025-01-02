import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ProfileHeader } from "@/components/profile/profile-header";
import { ActivityFeed } from "@/components/profile/activity-feed";
import { ProfileForm } from "@/components/profile/profile-form";
import { DeleteAccount } from "@/components/profile/delete-account";
import { UserSnippets } from "@/components/profile/user-snippets";
import {
  getUserStats,
  getUserActivity,
  getUserSnippets,
} from "@/lib/actions/profile";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user) redirect("/auth/signin");

  const [stats, activities, snippets] = await Promise.all([
    getUserStats(session.user.id),
    getUserActivity(session.user.id),
    getUserSnippets(session.user.id),
  ]);

  return (
    <div className="min-h-screen pb-10">
      <ProfileHeader user={session.user} stats={stats} />

      <div className="container mt-8">
        <Tabs defaultValue="snippets">
          <TabsList>
            <TabsTrigger value="snippets">My Snippets</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="snippets" className="mt-6">
            <UserSnippets snippets={snippets} />
          </TabsContent>

          <TabsContent value="activity" className="mt-6">
            <ActivityFeed activities={activities} />
          </TabsContent>

          <TabsContent value="settings" className="mt-6">
            <div className="max-w-2xl">
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-semibold mb-4">
                    Profile Settings
                  </h2>
                  <ProfileForm user={session.user} />
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-4">Danger Zone</h2>
                  <DeleteAccount />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
