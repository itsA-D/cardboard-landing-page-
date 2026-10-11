import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardboardBrand } from "@/components/CardboardBrand";
import { useScrollDirection } from "@/hooks/use-scroll-direction";

// Fixed glass navigation pill. It slides away while scrolling down and returns
// on scroll up, staying put near the top of the page or while the pointer is
// over it (and, via CSS :focus-within, while its links hold keyboard focus).
export function SmartHeader() {
  const hidden = useScrollDirection();
  const [hovering, setHovering] = useState(false);
  const isHidden = hidden && !hovering;
  return (
    <header
      className="nav-pill glass"
      data-hidden={isHidden ? "true" : "false"}
      onPointerEnter={() => setHovering(true)}
      onPointerLeave={() => setHovering(false)}
    >
      <CardboardBrand />
      <nav className="nav-actions" aria-label="Main navigation">
        <Button variant="quiet" asChild>
          <a href="https://cardboard.ai/login">Login</a>
        </Button>
        <Button variant="solid" asChild>
          <a href="https://cardboard.ai/signup">
            Get started
            <ArrowUpRight />
          </a>
        </Button>
      </nav>
    </header>
  );
}
