"use client";
// import { Button } from "@/components/ui/button";
import { SubmitButton } from "@/components/SubmitButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function SignIn() {
  const router = useRouter();

  async function onSubmit(formData: FormData) {
    const email = formData.get("email");
    try {
      await authClient.forgetPassword(
        {
          email: String(email),
          redirectTo: "/auth/reset-password",
        },
        {
          onSuccess: () => {
            toast.success("Un email de réinitialisation a été envoyé");
            router.push("/auth/signin");
            router.refresh();
          },
          onError: (ctx: { error: { message: string } }) => {
            toast.error(ctx.error.message);
          },
        }
      );
    } catch {
      toast.error("Une erreur est survenue lors de l'envoi de l'email");
    }
  }
  return (
    <Card className="w-full max-w-md mx-auto mt-10">
      <CardHeader>
        <CardTitle>Mot de passe oublié</CardTitle>
        <CardDescription>
          Entrez votre email pour recevoir un lien de réinitialisation
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form action={onSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" name="email" />
          </div>
          <SubmitButton>Envoyer le lien</SubmitButton>
        </form>
      </CardContent>
    </Card>
  );
}
