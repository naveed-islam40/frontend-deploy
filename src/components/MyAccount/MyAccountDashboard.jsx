import React, { useState } from "react";
import { CircleUser, Menu, Package2, Search } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import AccountSettings from "./AccountSettings";
import PasswordSettings from "./PasswordSettings";

const accountSections = [
  { id: "informations", label: "Mon compte", component: AccountSettings },
  { id: "password", label: "Mot de passe", component: PasswordSettings },
];

function MyAccountDashboard() {
  const [activeSection, setActiveSection] = useState(accountSections[0].id);

  return (
    <div className="flex min-h-screen w-full flex-col border border-bsrate rounded-lg mx-0 my-2">
      <main className="flex min-h-screen min-h-screen">
         <nav className="w-1/5 flex flex-col gap-4 bg-white rounded-lg shadow-sm p-6 text-slate-800 text-sm font-medium"> {/* Add the flex-col class here */}
                  {accountSections.map((section) => (
      <a key={section.id} href={`#${section.id}`} onClick={() => setActiveSection(section.id)}>
        <a className={activeSection === section.id ? "text-indigo-700 bg-bsrate px-3 py-1.5 rounded-lg text-white" : "text-black px-3 py-1.5 rounded-lg hover:text-white hover:bg-bsrate"}>
          {section.label}
        </a>
      </a>
    ))}
        </nav>

        <div className="w-4/5  min-h-screen">
          {accountSections.map((section) => {
            const SectionComponent = section.component;
            return section.id === activeSection && <SectionComponent key={section.id} />;
          })}
        </div>
      </main>
    </div>
  );
}

export default MyAccountDashboard;
