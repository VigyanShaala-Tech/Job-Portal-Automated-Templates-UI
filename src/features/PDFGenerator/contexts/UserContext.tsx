import * as React from "react";

type UserProps = {
  children: React.ReactNode;
};

interface UserDetails {
  email: string;
  name: string;
  cohort?: string;
  role: string;
  completionStatus?: string;
}

interface SWOT {
  studentName: string;
  studentDegree: string;
  goal: string;
  strength: string;
  weakness: string;
  opportunity: string;
  threat: string;
}

interface SMARTGOALS {
  goal: string;
  specific: string;
  measurable: string;
  achievable: string;
  relevant: string;
  timeBound: string;
}

export interface IDPFormFirst {
  goal1: string;
  name: string;
  education1: string;
  education2: string;
  proudMoments: string;
  raisec: string;
  matchStrength: string;
  decreaseThreat: string;
  aquiredHardSkills: string;
  aquiredSoftSkills: string;
}

export interface IDPFormSecond {
  goal2: string;
  careerOptions: string;
  hardSkillsToAquire: string;
  softSkillsToAquire: string;
  employers: string;
  mentor1: string;
  mentor2: string;
  mentor3: string;
  mentor4: string;
  mileStone1: string;
  mileStone2: string;
  mileStone3: string;
  m1Step1: string;
  m1Step2: string;
  m1Step3: string;
  m2Step1: string;
  m2Step2: string;
  m2Step3: string;
  m3Step1: string;
  m3Step2: string;
  m3Step3: string;
  adjustment: string;
  review: string;
}
interface CriticalThinking {
  answerA: string;
  answerB: string;
  answerC: string;
}
interface RIASEC {
  realistic: number;
  investigative: number;
  artistic: number;
  social: number;
  enterprising: number;
  conventional: number;
  hollandCode: string;
}
interface COLLABORATION {
  answerA: string;
  answerB: string;
  answerC: string;
}
interface CAGM {
  answerA: string;
  answerB: string;
  answerC: string;
}

interface DataProps {
  userDetails: UserDetails;
  selectedTemplate: string;
  SWOTData: SWOT;
  SMARTGOALSData: SMARTGOALS;
  IDPDataGoalAFirst: IDPFormFirst;
  IDPDataGoalASecond: IDPFormSecond;
  IDPDataGoalBFirst: IDPFormFirst;
  IDPDataGoalBSecond: IDPFormSecond;
  criticalThinking: CriticalThinking;
  RIASECData: RIASEC;
  COLLABORATIONData: COLLABORATION;
  cagmData: CAGM;
}

export interface UserContextProps {
  userState: DataProps;
  dispatch: any;
}

export enum ACTIONS_TYPE {
  SET_USER_DETAILS = "SET_USER_DETAILS",
  SET_SELECTED_TEMPLATE = "SET_SELECTED_TEMPLATE",
  SET_SWOT_DATA = "SET_SWOT_DATA",
  SET_SMART_GOALS_DATA = "SET_SMART_GOALS_DATA",
  SET_IDP_GOAL_A_FIRST = "SET_IDP_GOAL_A_FIRST",
  SET_IDP_GOAL_A_SECOND = "SET_IDP_GOAL_A_SECOND",
  SET_IDP_GOAL_B_FIRST = "SET_IDP_GOAL_B_FIRST",
  SET_IDP_GOAL_B_SECOND = "SET_IDP_GOAL_B_SECOND",
  SET_CRITICAL_THINKING = "SET_CRITICAL_THINKING",
  SET_RIASEC_DATA = "SET_RIASEC_DATA",
  SET_COLLABORATION = "SET_COLLABORATION_DATA",
  SET_CAGM = "SET_CAGM_DATA",
  RESET_STATE = "RESET_STATE",
}

export const UserContext = React.createContext({} as UserContextProps);
const firstInitialValue = {
  goal1: "",
  name: "",
  education1: "",
  education2: "",
  proudMoments: "",
  raisec: "",
  matchStrength: "",
  decreaseThreat: "",
  aquiredHardSkills: "",
  aquiredSoftSkills: "",
};
const secondInitialValue = {
  goal2: "",
  careerOptions: "",
  hardSkillsToAquire: "",
  softSkillsToAquire: "",
  employers: "",
  mentor1: "",
  mentor2: "",
  mentor3: "",
  mentor4: "",
  mileStone1: "",
  mileStone2: "",
  mileStone3: "",
  m1Step1: "",
  m1Step2: "",
  m1Step3: "",
  m2Step1: "",
  m2Step2: "",
  m2Step3: "",
  m3Step1: "",
  m3Step2: "",
  m3Step3: "",
  adjustment: "",
  review: "",
};
const criticalThinking: CriticalThinking = {
  answerA: "",
  answerB: "",
  answerC: "",
};
const riasec: RIASEC = {
  realistic: 0,
  investigative: 0,
  artistic: 0,
  social: 0,
  enterprising: 0,
  conventional: 0,
  hollandCode: "",
};
const swot: SWOT = {
  studentName: "",
  studentDegree: "",
  goal: "",
  strength: "",
  weakness: "",
  opportunity: "",
  threat: "",
};

const smartgoals: SMARTGOALS = {
  goal: "",
  specific: "",
  measurable: "",
  achievable: "",
  relevant: "",
  timeBound: "",
};

const collaboration: COLLABORATION = {
  answerA: "",
  answerB: "",
  answerC: "",
};
const cagm: CAGM = {
  answerA: "",
  answerB: "",
  answerC: "",
};
const templateInitialState = {
  SWOTData: swot,
  SMARTGOALSData: smartgoals,
  IDPDataGoalAFirst: firstInitialValue,
  IDPDataGoalASecond: secondInitialValue,
  IDPDataGoalBFirst: firstInitialValue,
  IDPDataGoalBSecond: secondInitialValue,
  criticalThinking: criticalThinking,
  RIASECData: riasec,
  COLLABORATIONData: collaboration,
  cagmData: cagm,
};
const genericState = {
  userDetails: {
    name: "",
    email: "",
    cohort: "",
    role: "",
  },
  selectedTemplate: "",
};
const initialState: DataProps = { ...templateInitialState, ...genericState };

const dataReducer = (state: any, action: any) => {
  switch (action.type) {
    case ACTIONS_TYPE.SET_USER_DETAILS: {
      return {
        ...state,
        userDetails: action.payload,
      };
    }
    case ACTIONS_TYPE.SET_SELECTED_TEMPLATE: {
      return {
        ...state,
        selectedTemplate: action.payload,
      };
    }
    case ACTIONS_TYPE.SET_SWOT_DATA: {
      return {
        ...state,
        SWOTData: action.payload,
      };
    }
    case ACTIONS_TYPE.SET_SMART_GOALS_DATA: {
      return {
        ...state,
        SMARTGOALSData: action.payload,
      };
    }
    case ACTIONS_TYPE.SET_IDP_GOAL_A_FIRST: {
      return {
        ...state,
        IDPDataGoalAFirst: action.payload,
      };
    }
    case ACTIONS_TYPE.SET_IDP_GOAL_A_SECOND: {
      return {
        ...state,
        IDPDataGoalASecond: action.payload,
      };
    }
    case ACTIONS_TYPE.SET_IDP_GOAL_B_FIRST: {
      return {
        ...state,
        IDPDataGoalBFirst: action.payload,
      };
    }
    case ACTIONS_TYPE.SET_IDP_GOAL_B_SECOND: {
      return {
        ...state,
        IDPDataGoalBSecond: action.payload,
      };
    }
    case ACTIONS_TYPE.SET_CRITICAL_THINKING: {
      return {
        ...state,
        criticalThinking: action.payload,
      };
    }
    case ACTIONS_TYPE.SET_RIASEC_DATA: {
      return {
        ...state,
        RIASECData: action.payload,
      };
    }
    case ACTIONS_TYPE.SET_COLLABORATION: {
      return {
        ...state,
        COLLABORATIONData: action.payload,
      };
    }
    case ACTIONS_TYPE.SET_CAGM: {
      return {
        ...state,
        cagmData: action.payload,
      };
    }
    case ACTIONS_TYPE.RESET_STATE: {
      return { ...state, ...templateInitialState };
    }

    default:
      throw new Error("invalid action type");
  }
};

const UserContextProvider = ({ children }: UserProps) => {
  const [userState, dispatch] = React.useReducer(dataReducer, initialState);

  return (
    <UserContext.Provider value={{ userState, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = (): UserContextProps => {
  return React.useContext(UserContext);
};

export default UserContextProvider;
