import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function RateLimitedDialog({
  open,
  close,
}: {
  open: boolean;
  close: () => void;
}) {
  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>You&apos;ve been rate limited!</DialogTitle>
          <DialogDescription>
            Please refrain from spamming messages, or you may be removed from
            the chatroom.
          </DialogDescription>
        </DialogHeader>
        <Button onClick={close}>OK</Button>
      </DialogContent>
    </Dialog>
  );
}
