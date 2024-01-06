export const PUBLIC_PATH = "/app";
export const TEMPLATE_INFO = [
    {
        name: "SWOT Analysis"
    }
]
type TemplateActions = {
    [key: string]: string;
  };
export const TEMPLATE_ACTIONS: TemplateActions =
    {
        "SWOT": "SET_SWOT_DATA",
        "CT": "SET_CRITICAL_THINKING",
        "RIASEC": "SET_RIASEC",
        "SMARTGOALS" : "SET_SMART_GOALS_DATA",
        "COLLABORATION": "SET_COLLABORATION_DATA",
        "CAGM": "SET_CAGM_DATA"
    }