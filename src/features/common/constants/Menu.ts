import {
    Home as HomeIcon,
    ScreenSearchDesktop as JobIcon,
    AssignmentReturned as TemplateIcon,
    GroupAdd as AddUsersIcon
  } from '@mui/icons-material';

  import type { SvgIconTypeMap } from '@mui/material';
import type { OverridableComponent } from '@mui/material/OverridableComponent';


export interface IMenuItem {
  route?: string;
  literal: string;
  Icon: OverridableComponent<SvgIconTypeMap>;
};
export interface IJobMenuItems{
  route?: string;
  literal: string;
}

export const ROUTES = {
    main: '/home',
    addUsers:'/AddUsers',
    job: `/JobPortal`,
    locations:'/JobPortal/Locations',
    companies:'/JobPortal/Companies',
    jobTitles:'/JobPortal/JobTitles',
    industries:'/JobPortal/Industries',
    workModes:'/JobPortal/WorkModes',
    qualifications:'/JobPortal/EducationQualifications',
    templateSelection: '/PDFGenerator/dashboard',
  };
  
  export const MENU_LIST: IMenuItem[] = [
    {
      route: ROUTES.main,
      literal: 'Home',
      Icon: HomeIcon
    },
    {route: ROUTES.addUsers,
      literal: 'Add Users',
      Icon: AddUsersIcon
    },
    {
      route: ROUTES.job,
      literal: 'Job Portal',
      Icon: JobIcon
    },
    {
      route: ROUTES.templateSelection,
      literal: 'Assignment Templates',
      Icon: TemplateIcon
    }
  ];

    export const JOB_MENU_LIST: IJobMenuItems[]=[
      {
        route: ROUTES.locations,
        literal: 'Locations'
      },
      {
        route: ROUTES.companies,
        literal: 'Companies'
      },
      {
        route: ROUTES.jobTitles,
        literal: 'Job Titles'
      },
      {
        route: ROUTES.industries,
        literal: 'Industries'
      },
      {
        route: ROUTES.qualifications,
        literal: 'Qualifications'
      },
      {
        route: ROUTES.workModes,
        literal: 'Work Modes'
      },
    ];
  