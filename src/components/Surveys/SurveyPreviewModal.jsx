// components/SurveyPreviewModal.js
import React from 'react';

const SurveyPreviewModal = ({ survey, closeModal, isOpen }) => {
  const questionsByCategory = survey.Questions.reduce((acc, question) => {
    const category = question.Question_category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(question);
    return acc;
  }, {});

  return (
    <dialog id="survey_preview_modal" className="modal" open={isOpen}>
      <div className="modal-box shadow-md relative">
        <button className="btn btn-sm btn-circle absolute right-2 top-2" onClick={closeModal}>✕</button>
        <h2 className="font-bold text-lg">{survey.name}</h2>
        {Object.keys(questionsByCategory).map((category, index) => (
          <div key={index}>
            <h3>{category}</h3>
            {questionsByCategory[category].map((question, index) => (
              <div key={index}>
                <p>{question.Question_title}</p>
                {renderQuestionType(question)}
              </div>
            ))}
          </div>
        ))}
      </div>
    </dialog>
  );

  function renderQuestionType(question) {
    switch (question.Type) {
      case 'rating':
        return <RatingQuestion question={question} />;
      case 'input':
        return <InputQuestion question={question} />;
      case 'textarea':
        return <TextareaQuestion question={question} />;
      default:
        return null;
    }
  }
};

const RatingQuestion = ({ question }) => (
  <div>
    <label>{question.Lower_label}</label>
    {[...Array(5)].map((_, i) => <span key={i}>☆</span>)}
    <label>{question.Upper_label}</label>
  </div>
);

const InputQuestion = ({ question }) => (
  <input type="text" placeholder={question.Question_category} />
);

const TextareaQuestion = ({ question }) => (
  <textarea placeholder={question.Question_category} />
);

export default SurveyPreviewModal;