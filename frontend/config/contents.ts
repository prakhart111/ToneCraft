import { HeroHeader, ContentSection } from "@/types/contents"

/* ====================
[> CUSTOMIZING CONTENT <]
-- Setup image by typing `/image-name.file` (Example: `/header-image.jpg`)
-- Add images by adding files to /public folder
-- Leave blank `` if you don't want to put texts or images
 ==================== */

export const heroHeader: HeroHeader = {
  header: `ToneCraft`,
  subheader: `Style & Tone Preserving Content Generation`,
  image: `/hero.svg`,
}

export const featureCards: ContentSection = {
  header: `Powered by`,
  subheader: `What makes ToneCraft possible`,
  content: [
    {
      text: `Praat`,
      subtext: `The Sound Framework`,
      image: `/praat.jpg`,
    },
    {
      text: `OpenAI APIs`,
      subtext: `We're using Davinci Text Model`,
      image: `/openai.svg`,
    },
    {
      text: `NextJS & Flask`,
      subtext: `Frontend & Backend Frameworks`,
      image: `/next.svg`,
    },
  ],
}

export const features: ContentSection = {
  header: `Features`,
  subheader: `What makes ToneCraft special`,
  image: `/temp.webp`,
  content: [
    {
      text: `Personalized Relevant Content`,
      subtext: `Every piece of content is unique`,
      image: `/seo.svg`,
    },
    {
      text: `Analyses your voice, tone, and style`,
      subtext: `We use your voice to generate content that matches your style`,
      image: `/performant.svg`,
    },
    {
      text: `Customizable Content using tags`,
      subtext: `You can customize the content by adding tags`,
      image: `/customize.svg`,
    },
  ],
}
