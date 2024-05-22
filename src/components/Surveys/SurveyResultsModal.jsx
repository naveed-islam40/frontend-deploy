// components/SurveyResultsModal.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import GenericModal from "../Base/GenericModal";

const SurveyResultsModal = ({ isOpen, onClose, survey }) => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (isOpen) {
      const fetchResults = async () => {
        try {
          const response = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/api/v2/survey/answerdetails/${survey._id}`
          );
          setResults(response.data.averageRatings);
        } catch (error) {
          console.error("Error fetching survey results:", error);
        }
      };
      fetchResults();
    }
  }, [isOpen, survey._id]);

  const renderStars = (averageRating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
      );
    }
    return stars;
  };

  return (
    <GenericModal isOpen={isOpen} title={survey.name} closeModal={onClose}>
      <div className="px-4 py-2">
        {results.length > 0 ? (
          results.map((item, index) => (
            <div key={index} className="mb-4">
              <h3 className="font-semibold">{item.questionOrder}. {item.questionTitle}</h3>
              <div className="rating flex">{renderStars(item.averageRating)}</div>
              <p>Note moyenne: {item.averageRating}</p>
            </div>
          ))
        ) : (
          <p>Chargement des résultats...</p>
        )}
      </div>
    </GenericModal>
  );
};

export default SurveyResultsModal;
