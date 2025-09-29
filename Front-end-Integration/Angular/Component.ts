import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { SurveyWidget } from "survey-container";

@Component({
  selector: "app-survey-container",
  template: `
    <div class="">
      <survey-widget
        [surveyId]="surveyId"
        [fetchUrl]="'Route to access the survey'"
        [responseUrl]="'Path to save answers'"
        [onAlert]="showAlert"
      ></survey-widget>
    </div>
  `,
})
export class SurveyContainerComponent {
  surveyId: string;

  constructor(private route: ActivatedRoute) {
    this.surveyId = this.route.snapshot.paramMap.get("surveyId");
  }

  showAlert(message: string) {
    // Function to display alerts. You can use ngx-toastr
  }
}
