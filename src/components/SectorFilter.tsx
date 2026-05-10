import React from "react";
import { motion } from "motion/react";
import { NEF_FUNDS } from "../data/funds";

interface SectorFilterProps {
  selectedSector: string;
  onSelectSector: (sector: string) => void;
}

export default function SectorFilter({ selectedSector, onSelectSector }: SectorFilterProps) {
  const allSectors = ["All", ...Array.from(new Set(NEF_FUNDS.flatMap(fund => fund.details.sectors)))];

  return (
    <div className="flex flex-wrap gap-2 md:gap-4">
      {allSectors.map((sector) => (
        <button
          key={sector}
          onClick={() => onSelectSector(sector)}
          className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${
            selectedSector === sector 
              ? "bg-black text-white" 
              : "bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-black"
          }`}
        >
          {sector}
        </button>
      ))}
    </div>
  );
}
