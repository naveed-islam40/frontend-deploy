import React, { useState } from "react";
import { CircleUser, Menu, Package2, Search } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import InfosSection from "./InfosSection";
import PlansSection from "./PlansSection";
import LegalSection from "./LegalSection";
import UsersSection from "./UsersSection";

const settingsSections = [
  { id: "general", label: "Informations", component: InfosSection },
  // { id: "users", label: "Users", component: UsersSection },
  { id: "plan", label: "Abonnement", component: PlansSection },
  { id: "legal", label: "Informations légales", component: LegalSection },
];

function SettingsDashboard() {
  const [activeSection, setActiveSection] = useState(settingsSections[0].id);

  return (
    <div className="flex min-h-screen w-full flex-col border rounded-lg border-bsrate mx-0">
      <main className="flex min-h-screen min-h-screen">
         <nav className="w-1/5  flex flex-col gap-4 transition bg-white rounded-lg shadow-sm p-6 text-slate-800 text-sm font-medium"> 
                  {settingsSections.map((section) => (
      <a key={section.id} href={`#${section.id}`} onClick={() => setActiveSection(section.id)}>
        <a className={activeSection === section.id ? "text-indigo-700 bg-bsrate px-3 py-1.5 rounded-lg text-white" : "text-black px-3 py-1.5 rounded-lg hover:text-white hover:bg-bsrate"}>
          {section.label}
        </a>
      </a>
    ))}
        </nav>

        <div className="w-4/5  min-h-screen">
          {settingsSections.map((section) => {
            const SectionComponent = section.component;
            return section.id === activeSection && <SectionComponent key={section.id} />;
          })}
        </div>
      </main>
    </div>
  );
}



export default SettingsDashboard;
