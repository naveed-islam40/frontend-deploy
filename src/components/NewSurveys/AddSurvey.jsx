import React from 'react';
import { HomeIcon, ChatBubbleLeftEllipsisIcon, PlusIcon, DocumentPlusIcon, DocumentDuplicateIcon, LifebuoyIcon, UsersIcon, Cog6ToothIcon } from '@heroicons/react/24/outline'



const AddSurvey = () => {
    return (
        <div className=" border-t border-b border-bsrate pt-4 overflow-hidden mt-20 m-0 pl-6 pr-2">
            <div className="p-1 pt-1 pb-4">
                {/* <ChatBubbleLeftEllipsisIcon className="w-5 h-5 mb-4" /> Icon */}
                <h2 className="font-bold text-sm mb-0  text-slate-900 leading-tight mb-2 ">Comment créer une enquête efficace ?</h2> {/* Title */}
                {/* <p className="text-slate-600 text-sm mb-2">Créez votre propre enquête, avec vos questions personnalisées.</p> Paragraph */}
                <a className='text-bsrate text-xs pt-8 font-semibold ' href='https://backstagerate.com' target='_blank'>Lire l'article →</a> {/* Link */}
            </div>
        </div>
    );
};

export default AddSurvey;