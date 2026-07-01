import React from "react";
import * as Lucide from "lucide-react";

export type PremiumIconVariant = 'minimal' | 'boxed' | 'glowing' | 'outlined' | 'accent' | 'glass';

interface PremiumIconProps {
  /** Lucide icon name, e.g. "ShieldCheck", "Users", "Zap" */
  name: keyof typeof Lucide;
  /** Custom size of the icon inside the container (default: 20) */
  size?: number;
  /** Additional wrapper classes */
  className?: string;
  /** Style preset for high-end feel */
  variant?: PremiumIconVariant;
  /** Custom color overriding preset values */
  color?: string;
  /** Stroke width for precise visual weight control (default: 1.5) */
  strokeWidth?: number;
  /** Interactive state (animates on hover) */
  interactive?: boolean;
}

/**
 * PremiumIcon component delivers bespoke, digital-agency quality iconography
 * with uniform stroke weights, elegant backdrops, and precise geometry.
 */
export const PremiumIcon: React.FC<PremiumIconProps> = ({
  name,
  size = 20,
  className = "",
  variant = "minimal",
  color,
  strokeWidth = 1.5,
  interactive = true,
}) => {
  // Safe icon lookup with fallback to HelpCircle
  const IconComponent = (Lucide[name] as React.ComponentType<any>) || Lucide.HelpCircle;

  // Visual variants mapping
  const variantStyles = {
    minimal: "inline-flex items-center justify-center text-current",
    
    boxed: "inline-flex items-center justify-center rounded-[12px] bg-[#1E1B18]/5 text-[#1E1B18] p-2.5 transition-all duration-300 border border-neutral-100",
    
    glowing: "inline-flex items-center justify-center rounded-xl bg-white text-[#F2901C] p-2.5 shadow-[0_8px_30px_rgb(242,144,28,0.08)] border border-[#F2901C]/15 transition-all duration-300",
    
    outlined: "inline-flex items-center justify-center rounded-[14px] border border-[#EFE6DA]/45 bg-white/40 text-neutral-700 p-2.5 transition-all duration-300 shadow-sm",
    
    accent: "inline-flex items-center justify-center rounded-[16px] bg-[#F2901C]/10 text-[#F2901C] p-3 shadow-inner transition-all duration-300 border border-[#F2901C]/5",
    
    glass: "inline-flex items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md text-white border border-white/15 p-3 transition-all duration-300 shadow-sm"
  };

  const hoverEffects = interactive 
    ? "hover:scale-[1.06] hover:rotate-1 active:scale-[0.97] duration-300 ease-out cursor-pointer" 
    : "";

  return (
    <span 
      className={`premium-icon-wrapper shrink-0 ${variantStyles[variant]} ${hoverEffects} ${className}`}
      style={{ display: "inline-flex" }}
    >
      <IconComponent 
        size={size} 
        strokeWidth={strokeWidth} 
        className="transition-colors duration-300"
        style={{ color: color || undefined }}
      />
    </span>
  );
};

export default PremiumIcon;
