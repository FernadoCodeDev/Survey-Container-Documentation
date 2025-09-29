import React from "react";
import { useParams } from "react-router-dom";
import { SurveyWidget } from "survey-container";

function SurveyContainer() {

    const { surveyId } = useParams();

    return (
        <div className="">
            <SurveyWidget
                surveyId={surveyId}
                fetchUrl="Route to access the survey"
                responseUrl="Path to save answers"
                onAlert="Function to display alerts. You can use react-toastify"
            />
        </div>
    );

}
export default SurveyContainer;