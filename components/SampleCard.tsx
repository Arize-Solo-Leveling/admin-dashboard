// components/SampleCard.tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const SampleCard = ({
  title = "Sample Card",
  description = "This is a sample description.",
  content = "This is the content of the card.",
  footer = "Footer info",
}: {
  title?: string;
  description?: string;
  content?: string;
  footer?: string;
}) => {
  return (
    <div className="transition-transform duration-300 hover:scale-105">
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{content}</p>
        </CardContent>
        <CardFooter>
          <p>{footer}</p>
        </CardFooter>
      </Card>
    </div>
  );
};
