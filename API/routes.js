export const routes = {
  login: "auth/login/",
  users: "auth/users/",
  recordEventAgreement: "report/create_events_agreements/",
  recordMeeting: "report/create-feed-back-session/",
  reportEventAgreements: "report/all-reports/eventsagreements/",
  reportMeeting: "report/all-reports/feedback/",
  reportEventAgreementsForMe: "auth/show-event-for-evaluated-user/",
  reportMeetingForMe: "report/list-feed-back-session/",
  indicators: "performanceManagement/list-Indicators/",
  units: "auth/listUnit/",
  selectedIndicators: "performanceManagement/getIndicatorsForAccount/",
  axesList: "performanceManagement/list-axes/",
  registerIndicators: "performanceManagement/registerIndicatorsForAccount/",
  openAgreements: "report/show-all-agreements-open/",
  evalUser: "performanceManagement/eval-a-user/",
  reportEvaluate: "performanceManagement/show-report-eval/",
  changePassword: "auth/change_password/",
  likeOrDislike: "report/like-or-dislike",
  feedbackAnswers: "report/evaluation-for-feedbackSessions",
  feedbackQuestions: "report/show-questions-for-feedbackSessions",
  feedbackDetail: 'report/report-evaluation-for-feedbackSessions',
  reportEventForIndicator: 'report/all-reports/show-all-events-agreements-for-indicator',
  dashboard: {
    eventArgumentChart: 'dashboard/assessor/event-argument-chart',
    dashboardData: 'dashboard/assessor/data',
    averageEvalFromBegin: 'dashboard/assessor/average-eval-from-begin',
    averageEvalCurrentYear: 'dashboard/assessor/average-eval-current-year',
    reportTable: 'dashboard/assessor/user-report-table'
  },
  beEvalDashboard: {
    eventArgumentChart: 'dashboard/be-eval/event-argument-chart',
    dashboardData: 'dashboard/be-eval/data',
    averageEvalFromBegin: 'dashboard/be-eval/average-eval-from-begin',
    averageEvalCurrentYear: 'dashboard/be-eval/average-eval-current-year',
    reportTable: 'dashboard/be-eval/user-report-table'
  }
};
