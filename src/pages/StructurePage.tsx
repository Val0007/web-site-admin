import React from 'react';
import BasicInfoForm from '../components/BasicInfo';
import SkillsManager from '../components/SkillsManager';
import TabsManager from '../components/TabsManager';
import type { Links } from '../types';
import { PopupType, type PopupContent } from '../types';


interface StructureTabProps {
  name: string;
  setName: (name: string) => void;
  description: string;
  setDescription: (email: string) => void;
  links: Links;
  setLinks: (links: Links) => void;
  skills: string[];
  newSkill: string;
  setNewSkill: (skill: string) => void;
  addSkill: () => void;
  removeSkill: (skill: string) => void;
  tabs: string[];
  setTabs: (tabs: string[]) => void;
  addTab: () => void;
  updateTab: (index: number, value: string) => void;
  removeTab: (index: number) => void;
  setActiveTab: (tab: string) => void;
  setPopupMsg:(arg0: PopupContent)=>void
  setShowPopup:(arg0:boolean)=>void
}

const StructureTab: React.FC<StructureTabProps> = ({
  name, setName, description, setDescription, links, setLinks,
  skills, newSkill, setNewSkill, addSkill, removeSkill,
  tabs, setTabs, addTab, removeTab, setActiveTab , setShowPopup , setPopupMsg , updateTab
}) => {
  const handleGoToContent = () => {
    if (tabs.length > 0 && name.length > 0 && !tabs.some(tab => tab.trim() === "")) {
      setActiveTab("content");
    } else {
        showError({titleMsg:"Tabs names or your name must not be empty",descMsg:"Add missing fields",type:PopupType.Error,setShow:()=>{}})
      console.log("Please fill in required fields");
    }
  };

  const showError = (content:PopupContent) => {
        setPopupMsg(content)
        setShowPopup(true)
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Structure</h2>
      
      <BasicInfoForm
        name={name}
        setName={setName}
        description={description}
        setDescription={setDescription}
        links={links}
        setLinks={setLinks}
      />

      <div className="mt-6">
        <SkillsManager
          skills={skills}
          newSkill={newSkill}
          setNewSkill={setNewSkill}
          addSkill={addSkill}
          removeSkill={removeSkill}
        />
      </div>

      <TabsManager
        tabs={tabs}
        setTabs={setTabs}
        addTab={addTab}
        updateTab={updateTab}
        removeTab={removeTab}
        showError={showError}
      />

      <div className="w-full flex justify-center items-center mt-4 mb-4">
        <button
          onClick={handleGoToContent}
          className="w-3/6 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors cursor-pointer"
        >
          Go To Site Content
        </button>
      </div>
    </div>
  );
};

export default StructureTab;
