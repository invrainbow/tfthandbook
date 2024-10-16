import { LoaderCircleIcon } from "lucide-react";

export function Loading() {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <LoaderCircleIcon className="w-8 h-8 text-white/30 animate-spin" />
    </div>
  );
}
