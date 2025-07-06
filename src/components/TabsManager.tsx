import React from 'react';
import { PopupType, type PopupContent } from '../types';

interface TabsManagerProps {
  tabs: string[];
  setTabs: (tabs: string[]) => void;
  addTab: () => void;
  removeTab: (index: number) => void;
  showError : (content:PopupContent) => void
  updateTab: (index: number, value: string) => void;

}

const TabsManager: React.FC<TabsManagerProps> = ({
  tabs, setTabs, addTab, removeTab,showError , updateTab
}) => {

  return (
    <div className="bg-white rounded-lg p-6 shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-700">Tabs</h3>
        {tabs.length < 3 && (
          <button
            onClick={()=>{
                if(tabs.length == 0){
                    addTab()
                }
                else{
                    const hasEmptyTab = tabs.some(tab => tab.trim() === "");
                    if(hasEmptyTab){
                        showError({titleMsg:"Tab name must not be empty",descMsg:"Add missing fields",type:PopupType.Error,setShow:()=>{}})
                        return
                    }
                    addTab()
                }
            }}
            className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors"
          >
            Add Tab
          </button>
        )}
      </div>
      
      <div className="space-y-3">
        {tabs.map((tab, index) => (
          <div key={index} className="flex items-center gap-3">
            <input
              type="text"
              value={tab}
              onChange={(e) => updateTab(index, e.target.value)}
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Tab name"
            />
            <button
              onClick={() => removeTab(index)}
              className="text-red-500 hover:text-red-700 p-2"
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TabsManager;