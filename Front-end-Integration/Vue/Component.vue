<template>
    <div class="">
        <SurveyWidget :surveyId="surveyId" fetchUrl="Route to access the survey"
            responseUrl="Path to save answers"
            onAlert="Función para mostrar alertas. Puedes usar vue-toastification" />
    </div>
</template>

<script>
import { useRoute } from 'vue-router';
import { SurveyWidget } from 'survey-container';

export default {
    components: {
        SurveyWidget
    },
    setup() {
        const route = useRoute();
        const surveyId = route.params.surveyId;

        return {
            surveyId
        };
    }
};
</script>