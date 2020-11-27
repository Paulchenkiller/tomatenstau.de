import {IconName} from '@fortawesome/fontawesome-common-types';

interface Social {
  icon: IconName;
  link: string;
}

export interface Member {
  name: string;
  jobTitle: string;
  slogan: string;
  picture: string;
  social: Array<Social>;
}
