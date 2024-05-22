import React from 'react';

const StatsCard = ({ title, Icon, mainText, subText }) => {
    return (
        <div
            className="flex flex-col w-full p-4 bg-card text-card-foreground shadow-sm rounded-lg border"
        >
            <div className="flex flex-row items-center justify-between">
                <h3 className="text-sm font-medium">{title}</h3>
                <Icon className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="mt-2">
                <div className="text-2xl font-bold">{mainText}</div>
                <p className="text-xs text-muted-foreground">{subText}</p>
            </div>
        </div>
    );
};


export default StatsCard;
