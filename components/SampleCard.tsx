// components/SampleCard.tsx
"use client";

import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface SampleCardProps {
  title: string;
  count: string | number;
  description?: string;
  href?: string; 
  onClick?: () => void; 
}

export const SampleCard = ({
  title,
  count,
  description = "",
  href,
  onClick,
}: SampleCardProps) => {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
      return;
    }
    if (!href) return;
    if (href.startsWith("/")) {
      router.push(href);
    } else {
      window.location.href = href;
    }
  };

  return (
    <div
      role={href || onClick ? "button" : undefined}
      tabIndex={href || onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if ((e.key === "Enter" || e.key === " ") && (href || onClick)) {
          e.preventDefault();
          handleClick();
        }
      }}
      onClick={handleClick}
      className="transition-transform duration-300 hover:scale-105 cursor-pointer w-full max-w-xs"
    >
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="flex flex-col">
            <span className="text-base font-medium">{title}</span>
            <span className="text-3xl font-bold mt-1">{count}</span>
          </CardTitle>
          {description && (
            <CardDescription>{description}</CardDescription>
          )}
        </CardHeader>
      </Card>
    </div>
  );
};
