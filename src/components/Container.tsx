import { cn } from "@/lib/utils";
import type { ElementType, ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  size?: "sm" | "md" | "lg" | "xl";
}

export default function Container({
  children,
  className,
  as: Tag = "div",
  size = "xl",
}: ContainerProps) {
  const sizes = {
    sm: "max-w-3xl",
    md: "max-w-5xl",
    lg: "max-w-6xl",
    xl: "max-w-7xl",
  };
  return (
    <Tag className={cn("mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-10", sizes[size], className)}>
      {children}
    </Tag>
  );
}