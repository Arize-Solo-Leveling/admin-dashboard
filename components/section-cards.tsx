import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function SectionCards() {
  return (
    // <div className="p-4 overflow-x-auto">
      <div className="p-4 flex gap-5 ">
      <div className="transition-transform duration-300 hover:scale-105">
      <Card>
        <CardHeader>
          <CardTitle>Sample Card</CardTitle>
          <CardDescription>This is a sample description.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This is the content of the card.</p>
        </CardContent>
        <CardFooter>
          <p>Footer info</p>
        </CardFooter>
      </Card>
      </div>
      <div className="transition-transform duration-300 hover:scale-105">
        <Card>
        <CardHeader>
          <CardTitle>Sample Card</CardTitle>
          <CardDescription>This is a sample description.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This is the content of the card.</p>
        </CardContent>
        <CardFooter>
          <p>Footer info</p>
        </CardFooter>
      </Card>
      </div>
      <div className="transition-transform duration-300 hover:scale-105">
        <Card>
        <CardHeader>
          <CardTitle>Sample Card</CardTitle>
          <CardDescription>This is a sample description.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This is the content of the card.</p>
        </CardContent>
        <CardFooter>
          <p>Footer info</p>
        </CardFooter>
      </Card>
      </div>
      <div className="transition-transform duration-300 hover:scale-105">
        <Card>
        <CardHeader>
          <CardTitle>Sample Card</CardTitle>
          <CardDescription>This is a sample description.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This is the content of the card.</p>
        </CardContent>
        <CardFooter>
          <p>Footer info</p>
        </CardFooter>
      </Card>
      </div>
       <div className="transition-transform duration-300 hover:scale-105">
      <Card>
        <CardHeader>
          <CardTitle>Sample Card</CardTitle>
          <CardDescription>This is a sample description.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This is the content of the card.</p>
        </CardContent>
        <CardFooter>
          <p>Footer info</p>
        </CardFooter>
      </Card>
      </div>  
      </div>
    // </div>
  )
}

