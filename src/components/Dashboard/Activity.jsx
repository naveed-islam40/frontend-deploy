import React from 'react';


// Survey data included directly inside the same file
const surveysData = [
    {
        surveyName: 'Customer Satisfaction 2021',
        date: '2021-09-01',
        buttonLabel: 'View Results'
    },
    {
        surveyName: 'Product Feedback 2022',
        date: '2022-03-15',
        buttonLabel: 'View Results'
    },
    {
        surveyName: 'Market Research Q2',
        date: '2022-06-10',
        buttonLabel: 'View Results'
    },
    {
        surveyName: 'Employee Engagement 2022',
        date: '2022-11-20',
        buttonLabel: 'View Results'
    },
    {
        surveyName: 'Customer Service Evaluation',
        date: '2023-01-05',
        buttonLabel: 'View Results'
    }
];

// SurveyList component that takes surveys data as a prop
const Activity = () => {
    return (
        <div className="flex flex-col p-6 space-y-8 border rounded-lg shadow-sm ">
            <h3 className="whitespace-nowrap text-xl font-semibold leading-none tracking-tight">Dernières réponses</h3>
            <div className="grid gap-8">
                {surveysData.map((survey, index) => (
                    <div key={index} className="flex items-center gap-4">
                        <div className="grid gap-1">
                            <p className="text-sm font-medium leading-none">{survey.surveyName}</p>
                            <p className="text-sm text-muted-foreground">{survey.date}</p>
                        </div>
                        <button className="ml-auto btn text-slate-700 text-sm font-medium py-2 px-4 rounded">
                            {survey.buttonLabel}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Activity;
