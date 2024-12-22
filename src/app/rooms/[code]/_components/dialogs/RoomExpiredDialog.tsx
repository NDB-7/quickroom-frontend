import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";

export default function RoomExpiredDialog() {
  return (
    <Dialog open={true}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Room expired</DialogTitle>
          <DialogDescription>
            This room has now expired. Please close the tab or return to the
            homepage to create another chatroom.
          </DialogDescription>
        </DialogHeader>
        <Button asChild>
          <Link href="/">Return to Home</Link>
        </Button>
      </DialogContent>
    </Dialog>
  );
}
