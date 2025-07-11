import { useState } from 'react';
import {   type Content, type Links, type PopupContent, type TabData, type SiteData } from '../types/index';

export const usePortfolioData = () => {
  // Structure data
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [links, setLinks] = useState<Links>({
    github: undefined,
    linkedin: undefined,
    mail: undefined
  });
  const [tabs, setTabs] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState('');
  const [theme, setTheme] = useState("light");
  const [wildcard, setWildcard] = useState("");
  const [displayPopup,setPopup] = useState<boolean>(false);
  const [popupMsg, setPopupMsg] = useState<PopupContent>({
    type: "ALERT", // or PopupType.Error
    titleMsg: "",
    descMsg: "",
    setShow: () => {},
    confirm: () => {},
  });
  
  // Content data
  const [content, setContent] = useState<{[key: string]: Content}>({});
  const [tabStructureIds, setTabStructureIds] = useState<{[key: string]: number}>({});

  // Tab operations
  const addTab = () => {
    setTabs([...tabs, ""]);
  };

  const updateTab = (index: number, value: string) => {
    const updatedTabs = [...tabs];
    const oldKey = updatedTabs[index]
    console.log(oldKey)
    updatedTabs[index] = value;
    setTabs(updatedTabs);

    //Change key of struture id as well
    setTabStructureIds(prev => {
        const ids = {...prev}
        if(ids[oldKey]){
            ids[value] = ids[oldKey]
            delete ids[oldKey]
        }
        return ids
    })

    setContent(prev => {
        const updated = { ...prev };
        console.log(updated[oldKey])
        if (updated[oldKey]) {
          updated[value] = updated[oldKey];
          delete updated[oldKey];
        }
      
        return updated;
      });


  };
  
  const removeTab = (index: number) => {
    const tabName = tabs[index];
    const updatedTabs = tabs.filter((_, i) => i !== index);
    setTabs(updatedTabs);
    
    // Remove corresponding content and structure ID
    const updatedContent = { ...content };
    delete updatedContent[tabName];
    setContent(updatedContent);
    
    const updatedStructureIds = { ...tabStructureIds };
    delete updatedStructureIds[tabName];
    setTabStructureIds(updatedStructureIds);
  };

  // Skill operations
  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };
  
  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  // Content operations
  const addContentItem = (tabName: string) => {
    const newItem: TabData = {
      title: '',
      description: '',
      link: undefined
    };
    
    const updatedContent = { ...content };
    if (!updatedContent[tabName]) {
      updatedContent[tabName] = {
        structureId: tabStructureIds[tabName] || 1,
        data: []
      };
    }
    
    if (updatedContent[tabName].data.length < 5) {
      updatedContent[tabName].data.push(newItem);
      setContent(updatedContent);
    }
  };
  
  const updateContentItem = (tabName: string, itemIndex: number, field: keyof TabData, value: string) => {
    const updatedContent = { ...content };
    updatedContent[tabName].data[itemIndex][field] = value;
    setContent(updatedContent);
  };
  
  const removeContentItem = (tabName: string, itemIndex: number) => {
    const updatedContent = { ...content };
    updatedContent[tabName].data = updatedContent[tabName].data.filter((_, i) => i !== itemIndex);
    setContent(updatedContent);
  };

  const setStructureId = (tabName: string, structureId: number) => {
    setTabStructureIds({
      ...tabStructureIds,
      [tabName]: structureId
    });
  };

  const getSiteData = ():SiteData => {
    return {
      name,
      wildcard,
      description,
      skills,
      templateId: 1,
      links: links.github || links.linkedin || links.mail ? links : undefined,
      tabs,
      content,
      color:theme
    };
  };

  const initialiseData = (data:SiteData) => {
    setName(data.name)
    setWildcard(data.wildcard)
    setDescription(data.description || "")
    setSkills(data.skills || [])
    setLinks(data.links || {
        github: undefined,
        linkedin: undefined,
        mail: undefined
      })
    setTabs(data.tabs)
    setTheme(data.color || "light")


    //save tab structure ids first , followed by content
    //loop through content 
    if(data.content){
        for (const [key, value] of Object.entries(data.content)) {
            console.log("Key:", key);
            tabStructureIds[key] = value.structureId
            content[key] = value
          }
    }



    console.log(content)

  }

  return {
    // State
    name, setName,
    description, setDescription,
    links, setLinks,
    tabs, setTabs,
    skills, setSkills,
    newSkill, setNewSkill,
    theme, setTheme,
    wildcard, setWildcard,
    content, setContent,
    tabStructureIds, setTabStructureIds,
    displayPopup,setPopup,
    popupMsg,setPopupMsg,
    
    // Operations
    addTab,
    updateTab,
    removeTab,
    addSkill,
    removeSkill,
    addContentItem,
    updateContentItem,
    removeContentItem,
    setStructureId,
    getSiteData,
    initialiseData
  };
};
