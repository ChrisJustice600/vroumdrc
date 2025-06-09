import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { SignUpForm } from "./signup-form";

export default function SignUp() {
  return (
    <Card className="w-full max-w-md mx-auto mt-10">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
      </CardHeader>
      <CardContent>
        <SignUpForm />
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-gray-600">
          Déjà un compte ?{" "}
          <Link href="/auth/signin" className="text-blue-600 hover:underline">
            Se connecté
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
