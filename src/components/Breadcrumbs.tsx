import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const getBreadcrumbs = (): BreadcrumbItem[] => {
    const crumbs: BreadcrumbItem[] = [{ label: "Home", href: "/" }];

    if (location.pathname === "/how-to-apply") {
      crumbs.push({ label: "Funds", href: "/#funds" });
      crumbs.push({ label: "How to Apply" });
    } else if (location.pathname === "/funding-criteria") {
      crumbs.push({ label: "Funds", href: "/#funds" });
      crumbs.push({ label: "Funding Criteria" });
    } else if (location.pathname === "/non-financial-support") {
      crumbs.push({ label: "Funds", href: "/#funds" });
      crumbs.push({ label: "Non-Financial Support" });
    } else if (location.pathname === "/our-funds") {
      crumbs.push({ label: "Funds", href: "/#funds" });
      crumbs.push({ label: "Our Funds" });
    } else if (location.pathname === "/products/entrepreneurship-finance") {
      crumbs.push({ label: "Funds", href: "/#funds" });
      crumbs.push({ label: "iMbewu Fund", href: "/#funds" }); // Or specific fund if we had pages for them
      crumbs.push({ label: "Entrepreneurship Finance" });
    } else if (location.pathname === "/faq") {
      crumbs.push({ label: "Support", href: "/#contact" });
      crumbs.push({ label: "FAQ" });
    } else if (location.pathname === "/check-eligibility") {
      crumbs.push({ label: "Funding Solutions", href: "/#funds" });
      crumbs.push({ label: "Check Eligibility" });
    }

    return crumbs;
  };

  const crumbs = getBreadcrumbs();

  if (crumbs.length <= 1) return null;

  return (
    <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] mb-12 overflow-x-auto whitespace-nowrap no-scrollbar">
      {crumbs.map((crumb, index) => (
        <React.Fragment key={index}>
          {index > 0 && <ChevronRight size={10} className="opacity-20 shrink-0" />}
          {crumb.href ? (
            <Link
              to={crumb.href}
              className="opacity-40 hover:opacity-100 hover:text-gold-foil transition-all flex items-center gap-1 shrink-0"
            >
              {index === 0 && <Home size={10} />}
              {crumb.label}
            </Link>
          ) : (
            <span className="text-black shrink-0">{crumb.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
