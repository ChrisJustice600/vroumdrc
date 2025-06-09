import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { SignInForm } from "./signin-form";

export default function SignIn() {
  return (
    <Card className="w-full max-w-md mx-auto mt-10">
      <CardHeader>
        <CardTitle>SignIn</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <SignInForm />
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-gray-600">
          Pas encore de compte ?{" "}
          <Link href="/auth/signup" className="text-blue-600 hover:underline">
            S'inscrire
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
