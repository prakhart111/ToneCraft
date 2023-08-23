import HeadingText from "@/components/heading-text"
import Link from "next/link"

export const metadata = {
  title: "Contact",
}

export default function Contact() {
  return (
    <main className="container flex flex-col items-center py-8">
      <div className="flex flex-col items-center space-y-2 text-center">
        <HeadingText subtext="">
          Contact Me
        </HeadingText><br/>
        <Link href="mailto:ptofficial29@gmail.com" className="text-blue-500 hover:underline"> ptofficial29@gmail.com </Link>
        <Link href="https://twitter.com/PrakharTandon29" className="text-blue-500 hover:underline"> twitter/PrakharTandon29 </Link>
      </div>
      
    </main>
  )
}
