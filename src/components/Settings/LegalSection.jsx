import React from "react";

function LegalSection() {
    return (
        <div className="p-6 px-8">
            <h3 className="text-lg font-semibold text-slate-900">Informations légales</h3>
            <p className="text-slate-500">À propos de BackstageRate</p>
            <div className="w-3/6">

                <h3 className="mt-8 mb-4 font-medium text-slate-900">Notre logiciel a été créé par BackstageRate SAS, entreprise fondée à Marseille en 2023.</h3>
                <p>Pour toute question ou doute sur utilisation de la plateforme, n'hésitez pas à <span><u>nous contacter.</u></span></p>

                <ul className="mt-8">
                    <li>
                       <a className="hover:text-indigo-700 transition text-slate-600" href="https://backstagerate.com" target="_blank"> Mentions légales</a>
                    </li>
                    <li>
                      <a className="hover:text-indigo-700 transition text-slate-600" href="https://backstagerate.com" target="_blank">   Politique de confidentialité </a>
                    </li>
                </ul>
               
            </div>
        </div>
    );
}

export default LegalSection;
