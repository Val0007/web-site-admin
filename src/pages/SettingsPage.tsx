import React from 'react';
import { PopupType, type PopupContent } from '../types';

interface SettingsTabProps {
  wildcard: string;
  setWildcard: (wildcard: string) => void;
  theme: string;
  setTheme: (theme: string) => void;
  setPopupMsg:(arg0: PopupContent)=>void
  setShowPopup:(arg0:boolean)=>void
}

const SettingsTab: React.FC<SettingsTabProps> = ({
  wildcard, setWildcard, theme, setTheme , setPopupMsg , setShowPopup
}) => {
  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(e.target.value);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Site Settings</h2>
      
      <div className="bg-white rounded-lg p-6 mb-6 shadow">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">How your site will be visible</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Your Custom Wildcard (john.site.com)</label>
            <div className='flex flex-row gap-4'>
              <input
                type="text"
                value={wildcard}
                onChange={(e) => setWildcard(e.target.value)}
                className="flex-5 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your wildcard"
              />
              <button className='flex-1 bg-blue-600 text-white rounded'
              onClick={()=>{
                //check backend
                setPopupMsg({titleMsg:`Updated Successfully`,descMsg:`Your site URL : ${wildcard}.site.com`,type:PopupType.Warning,setShow:()=>{}})
                setShowPopup(true)
              }}
              >Check</button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Site Appearance</label>
            <div className="relative inline-block">
              <select
                value={theme}
                onChange={handleThemeChange}
                className="appearance-none bg-white border border-gray-600 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
              >
                <option value="light">☀️ Light</option>
                <option value="dark">🌙 Dark</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsTab;