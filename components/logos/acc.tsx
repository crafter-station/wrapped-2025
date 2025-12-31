import Image from "next/image";

import accLogo from "./acc.png";

export function ACCLogo({ className }: { className?: string }) {
  return (
    <Image
      src={accLogo}
      alt="ACC Logo"
      className={className}
    />
  );
}
