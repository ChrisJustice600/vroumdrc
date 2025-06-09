import { Loader2 } from "lucide-react";
import { ComponentProps } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

export const SubmitButton = (props: ComponentProps<typeof Button>) => {
  const { pending } = useFormStatus();

  return (
    <Button {...props} disabled={props.disabled || pending}>
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {props.children}
    </Button>
  );
};
