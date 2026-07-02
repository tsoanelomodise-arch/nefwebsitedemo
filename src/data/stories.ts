export interface Story {
  id: string;
  title: string;
  category: string;
  date: string;
  author: string;
  summary: string;
  content: string[];
  image: string;
  quote: string;
  impact: string[];
  fullContent?: string[]; // For more detailed text if needed
  gallery?: string[];
  stats?: { label: string; value: string; icon?: string }[];
  videoUrl: string;
}

export const STORIES: Story[] = [
  {
    id: "the-orchards",
    title: "The Orchards Shopping Centre: A Beacon of Community Growth",
    category: "Property & Retail",
    date: "March 15, 2024",
    author: "NEF Editorial",
    summary: "How a strategic investment in Pretoria North transformed a local community into a thriving economic hub.",
    content: [
      "The Orchards Shopping Centre stands as a testament to the National Empowerment Fund's commitment to community-based economic development. Located in the heart of Pretoria North, this retail development has not only provided convenient shopping for local residents but has also created hundreds of sustainable jobs.",
      "The NEF's investment facilitated the construction and operational rollout of the centre, which features major national retailers alongside local black-owned businesses. This mix ensures that the economic benefits of the development remain within the community.",
      "Today, The Orchards is more than just a shopping destination; it is a hub of economic activity that continues to inspire local entrepreneurs to dream big and contribute to South Africa's growth story."
    ],
    fullContent: [
      "The Orchards Shopping Centre stands as a testament to the National Empowerment Fund's commitment to community-based economic development. Located in the heart of Pretoria North, this retail development has not only provided convenient shopping for local residents but has also created hundreds of sustainable jobs.",
      "The NEF's investment facilitated the construction and operational rollout of the centre, which features major national retailers alongside local black-owned businesses. This mix ensures that the economic benefits of the development remain within the community.",
      "The development of The Orchards was a complex undertaking that required careful planning and collaboration between the NEF, the developers, and the local community. From the initial feasibility studies to the final ribbon-cutting ceremony, every step was guided by the goal of creating a sustainable asset that would serve the people of Pretoria North for generations to come.",
      "One of the key successes of The Orchards is its ability to attract major national anchor tenants while still providing space and support for local SMEs. This synergy creates a vibrant retail environment that benefits both the businesses and the consumers. Local entrepreneurs have been given a platform to showcase their products and services, gaining access to a wider customer base and professional retail management expertise.",
      "Beyond the economic impact, The Orchards has also become a focal point for social interaction. The centre's design includes public spaces that encourage community gathering, making it more than just a place to shop. It is a place where neighbors meet, where families spend time together, and where the spirit of community is celebrated.",
      "Today, The Orchards is more than just a shopping destination; it is a hub of economic activity that continues to inspire local entrepreneurs to dream big and contribute to South Africa's growth story. It stands as a shining example of what can be achieved when vision, investment, and community commitment come together."
    ],
    image: "https://donotdelete.wonderlandstudio.co.za/nef/shopping.jpeg",
    quote: "The NEF didn't just provide funding; they provided a partnership that understood our vision for the community.",
    impact: [
      "Created 250+ permanent jobs",
      "Supported 15 local black-owned SMEs",
      "Transformed 12,000sqm of underutilized land"
    ],
    stats: [
      { label: "Total Investment", value: "R120M", icon: "TrendingUp" },
      { label: "Jobs Created", value: "250+", icon: "Users" },
      { label: "SMEs Supported", value: "15", icon: "Briefcase" },
      { label: "Retail Space", value: "12,000m²", icon: "Maximize" }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop"
    ],
    videoUrl: "https://www.youtube.com/watch?v=odpZYB85fjg"
  },
  {
    id: "busamed-healthcare",
    title: "Busamed: Redefining Private Healthcare through Empowerment",
    category: "Healthcare",
    date: "February 10, 2024",
    author: "NEF Editorial",
    summary: "The journey of South Africa's first black-owned private hospital group and its mission to provide world-class medical care.",
    content: [
      "Busamed is a pioneering force in the South African healthcare sector. As the first black-owned private hospital group in the country, it represents a significant milestone in the transformation of a critical industry.",
      "With the support of the NEF, Busamed has expanded its footprint across multiple provinces, offering state-of-the-art medical facilities and specialized care. The group's focus on clinical excellence and patient-centered service has earned it a reputation as a leader in the field.",
      "The success of Busamed demonstrates that with the right backing, black-owned enterprises can compete and excel in highly specialized and capital-intensive sectors, driving both economic value and social good."
    ],
    fullContent: [
      "Busamed is a pioneering force in the South African healthcare sector. As the first black-owned private hospital group in the country, it represents a significant milestone in the transformation of a critical industry.",
      "With the support of the NEF, Busamed has expanded its footprint across multiple provinces, offering state-of-the-art medical facilities and specialized care. The group's focus on clinical excellence and patient-centered service has earned it a reputation as a leader in the field.",
      "The inception of Busamed was driven by a vision to provide high-quality healthcare that is accessible and reflects the diversity of South Africa. The founders recognized a gap in the market for a black-owned hospital group that could offer specialized services and compete with established players on both quality and cost.",
      "The NEF's involvement was crucial in providing the necessary capital and strategic guidance to bring this vision to life. The funding supported the acquisition and development of several key facilities, including the flagship Busamed Modderfontein Private Hospital, which has become a center of excellence for orthopedic and cardiac care.",
      "One of Busamed's core values is its commitment to transformation and skills development. The group actively recruits and trains black medical professionals, providing them with opportunities to excel in specialized fields. This focus on empowerment extends beyond the clinical staff to all levels of the organization, creating a culture of excellence and inclusivity.",
      "The success of Busamed demonstrates that with the right backing, black-owned enterprises can compete and excel in highly specialized and capital-intensive sectors, driving both economic value and social good. It is a story of vision, perseverance, and the power of strategic empowerment."
    ],
    image: "https://donotdelete.wonderlandstudio.co.za/nef/medical.jpg",
    quote: "Our goal was to create a healthcare legacy that reflects the diversity and excellence of South Africa.",
    impact: [
      "7 World-class hospitals established",
      "Over 1,500 medical professionals employed",
      "Pioneering specialized robotic surgery in SA"
    ],
    stats: [
      { label: "Hospitals", value: "7", icon: "Hospital" },
      { label: "Employees", value: "1,500+", icon: "Users" },
      { label: "Beds", value: "800+", icon: "Bed" },
      { label: "Specialties", value: "25+", icon: "Stethoscope" }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=1000&auto=format&fit=crop"
    ],
    videoUrl: "https://www.facebook.com/watch/?v=701058885772089"
  }
];

export function getYouTubeEmbedUrl(url: string, autoplay = true): string {
  if (!url) return "";
  if (url.includes("facebook.com") || url.includes("fb.watch") || url.includes("fb.com")) {
    return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=0&width=560`;
  }
  let videoId = "";
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  if (match && match[2].length === 11) {
    videoId = match[2];
  } else {
    videoId = url;
  }
  return `https://www.youtube.com/embed/${videoId}${autoplay ? "?autoplay=1&mute=1&rel=0&modestbranding=1" : "?rel=0&modestbranding=1"}`;
}

export function getVideoThumbnailFrameUrl(url: string): string {
  if (!url) return "";
  if (url.includes("facebook.com") || url.includes("fb.watch") || url.includes("fb.com")) {
    return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=0&width=560&t=16`;
  }
  let videoId = "";
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  if (match && match[2].length === 11) {
    videoId = match[2];
  } else {
    videoId = url;
  }
  return `https://www.youtube.com/embed/${videoId}?start=16&autoplay=0&mute=1&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1`;
}

