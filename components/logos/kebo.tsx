import Image from "next/image";

import keboLogo from "./kebo.png";

export function KeboLogo({ className }: { className?: string }) {
  return (
    <Image
      src={keboLogo}
      alt="Kebo Logo"
      className={className}
    />
  );
}
