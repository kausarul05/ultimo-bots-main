export interface PredefinedQuestion {
    id: number;
    text: string;
}

/** Everything the Design tab edits — shared with the live widget preview. */
export interface DesignState {
    headerText: string;
    inputPlaceholder: string;
    welcomeMessage: string;
    themeColor: string;
    headerFontColor: string;
    buttonHoverColor: string;
    removeBranding: boolean;
    widgetPosition: string;
    enablePulsing: boolean;
    widgetSize: string;
    widgetBorderRadius: string;
    showPopups: boolean;
    delaySeconds: string;
    questions: PredefinedQuestion[];
}

export const QUESTION_MAX = 40;
export const WELCOME_MAX = 300;
export const CONTEXT_MAX = 1000;
export const BEHAVIOR_MAX = 250;
