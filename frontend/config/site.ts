import { SiteConfig, ContactConfig } from "@/types"

/* ====================
[> WEBSITE CONFIG <]
-- Fill the details about your website
 ==================== */

const baseUrl = "https://tonecraft-prakhar.vercel.app"

export const siteConfig: SiteConfig = {
  name: "ToneCraft",
  author: "Prakhar Tandon",
  description:
    "ToneCraft Frontend built with Next.js and shadcn/ui.",
  keywords: [
  ],
  url: {
    base: baseUrl,
    author: "https://github.com/prakhart111",
  },
  ogImage: `${baseUrl}/og.jpg`,
}

export const contactConfig: ContactConfig = {
  email: "ptofficial29@gmail.com",
}
