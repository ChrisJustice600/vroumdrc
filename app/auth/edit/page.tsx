import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getUser } from "@/lib/auth-server";
import { unauthorized } from "next/navigation";
import { AccountForm } from "./account-form";

export default async function SignUp() {
  const user = await getUser();

  if (!user) {
    return unauthorized();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edith Account</CardTitle>
      </CardHeader>
      <CardContent>
        <AccountForm
          defaultValues={{
            name: user.name ?? null,
            image: user.image ?? null,
          }}
        />
      </CardContent>
    </Card>
  );
}
