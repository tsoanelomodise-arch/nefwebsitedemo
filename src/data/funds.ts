import { Zap, Briefcase, Users, ShieldCheck } from "lucide-react";

export const NEF_FUNDS = [
  {
    id: "01",
    title: "iMbewu Fund",
    description: "Supports black entrepreneurs to start new businesses, as well as providing expansion capital to existing black-owned enterprises. We believe in the power of new ideas and the strength of established ones.",
    products: [
      {
        name: "Entrepreneurship Finance",
        description: "For starting a new business, supporting black entrepreneurs with viable business ideas.",
        href: "/products/entrepreneurship-finance"
      },
      {
        name: "Procurement Finance",
        description: "For black-owned SMEs that have won tenders or contracts from the public or private sector."
      },
      {
        name: "Franchise Finance",
        description: "For black entrepreneurs to acquire a franchise, either as a new start-up or an existing business."
      }
    ],
    details: {
      objective: "To promote and support entrepreneurship and business growth among black people.",
      criteria: [
        "Black-owned and managed businesses",
        "Viable business plan",
        "Operational involvement by black entrepreneurs",
        "Compliance with BEE requirements"
      ],
      sectors: ["Franchising", "Procurement", "Start-ups", "Expansion Capital"]
    },
    icon: Zap,
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1000&auto=format&fit=crop",
    color: "bg-gold-foil"
  },
  {
    id: "02",
    title: "uMnotho Fund",
    description: "Designed to improve access to BEE capital for black-owned businesses and individuals. Our goal is to create sustainable wealth and economic participation for all South Africans.",
    products: [],
    details: {
      objective: "To facilitate black economic participation through various investment instruments.",
      criteria: [
        "Majority black ownership",
        "Strong management team",
        "Clear exit strategy",
        "Significant social impact"
      ],
      sectors: ["Acquisition Finance", "Project Finance", "Expansion Capital", "Capital Markets"]
    },
    icon: Briefcase,
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop",
    color: "bg-white"
  },
  {
    id: "03",
    title: "Rural & Community",
    description: "Focuses on the empowerment of rural and community-based enterprises. We bring growth to the heart of our communities, ensuring no one is left behind in the journey of empowerment.",
    products: [],
    details: {
      objective: "To support sustainable economic development in rural areas and for community groups.",
      criteria: [
        "Community-based ownership",
        "Rural location or impact",
        "Job creation potential",
        "Sustainable business model"
      ],
      sectors: ["Agro-processing", "Tourism", "Manufacturing", "Services"]
    },
    icon: Users,
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1000&auto=format&fit=crop",
    color: "bg-gray-200"
  },
  {
    id: "04",
    title: "Strategic Projects",
    description: "Invests in projects that have a high impact on the South African economy. We target key sectors that drive industrialization and long-term economic stability.",
    products: [],
    details: {
      objective: "To invest in high-impact projects that drive industrialization and economic growth.",
      criteria: [
        "Large-scale industrial projects",
        "Strategic sector alignment",
        "Export potential",
        "Technological innovation"
      ],
      sectors: ["Energy", "Mining", "Infrastructure", "Manufacturing"]
    },
    icon: ShieldCheck,
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop",
    color: "bg-gold-foil"
  }
];
