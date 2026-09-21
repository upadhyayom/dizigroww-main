import { NavLink } from "react-router-dom";
import { FileText, FileSignature, GraduationCap, Briefcase, LogOut } from "lucide-react";

import { cloudEnabled, supabase } from "@/lib/supabaseClient";
import { ADMIN_PASS_STORAGE_KEY } from "@/components/admin/AdminAuthGate";

const TABS = [
  { to: "/invoices", label: "Invoices", icon: FileText },
  { to: "/offer-letters", label: "Offer Letters", icon: FileSignature },
  { to: "/internship-letters", label: "Internship Letters", icon: GraduationCap },
  { to: "/portfolio-admin", label: "Portfolio", icon: Briefcase },
];

// Sticky top strip shared by every admin page — keeps the same login and the
// same look no matter which section you're in, so it reads as one dashboard.
export function AdminNav() {
  const handleSignOut = () => {
    if (cloudEnabled()) {
      supabase?.auth.signOut();
      return;
    }
    localStorage.removeItem(ADMIN_PASS_STORAGE_KEY);
    window.location.reload();
  };

  return (
    <div className="bg-slate-900 text-slate-200">
      <div className="max-w-7xl mx-auto px-4 flex items-center gap-1 overflow-x-auto">
        <img src="/logo.png" alt="DiziGroww" className="h-6 w-auto mr-3 shrink-0" />
        {TABS.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            className={({ isActive }) =>
              `flex items-center gap-1.5 px-3 py-2.5 text-sm border-b-2 whitespace-nowrap transition-colors ${
                isActive
                  ? "border-white text-white font-medium"
                  : "border-transparent text-slate-400 hover:text-white"
              }`
            }
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </NavLink>
        ))}
        <button
          onClick={handleSignOut}
          className="ml-auto flex items-center gap-1.5 px-3 py-2.5 text-sm text-slate-400 hover:text-white whitespace-nowrap"
          title="Sign out"
        >
          <LogOut className="w-4 h-4" />
          Sign out
        </button>
      </div>
    </div>
  );
}
