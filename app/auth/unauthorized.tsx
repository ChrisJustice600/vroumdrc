import { Alert, AlertTitle } from "@/components/ui/alert";

export default async function unauthorized() {
  return (
    <Alert>
      <AlertTitle>Tu as besoin de te connecté pour voir cette page</AlertTitle>
    </Alert>
  );
}
