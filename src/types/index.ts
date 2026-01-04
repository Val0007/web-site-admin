export interface TabData {
    title: string;
    description?: string;
    link: string|undefined;
  }
  
  export interface Content {
    structureId: number;
    data: TabData[];
  }
  
  export interface Links {
    github: string|undefined;
    linkedin: string|undefined;
    mail: string|undefined;
  }
  
  export interface HeaderData {
    name: string;
    email: string;
    links?: Links;
    skills?: string[];
    description?: string;
  }
  
  export interface SiteData {
    name: string;
    wildcard: string;
    templateId: number;
    links?: Links;
    tabs: string[];
    skills?: string[];
    description?: string;
    color?: string;
    content?: {
      [key: string]: Content;
    };
  }




 type PopupType = "ERROR" | "ALERT" | "SUCCESS"
export const PopupTypes:PopupType[] = ["ERROR","ALERT","SUCCESS"] //this will supply the type PopupTypes[2]

export interface PopupContent {
  type:PopupType
  titleMsg: string;
  descMsg: string
  setShow: (value: boolean) => void;
  confirm?: () => void;
}
