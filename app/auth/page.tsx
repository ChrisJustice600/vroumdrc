import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getUser } from "@/lib/auth-server";
import { CheckCircle2, Edit } from "lucide-react";
import Link from "next/link";
import { unauthorized } from "next/navigation";

export default async function SignUp() {
  const user = await getUser();

  if (!user) {
    return unauthorized();
  }

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0">
        <CardTitle>User Profile</CardTitle>
        <div className="flex-1"></div>
        <Link className="flex items-center gap-2" href="/auth/edit">
          <Edit /> Edit
        </Link>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Name</span>
            <span>{user.name}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Email</span>
            <div className="flex items-center gap-2">
              <span>{user.email}</span>
              {user.emailVerified && (
                <CheckCircle2 className="h-4 w-4 text-green-500" />
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
