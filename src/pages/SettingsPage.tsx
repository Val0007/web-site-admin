import React, { useRef } from 'react';
import {  PopupTypes, type PopupContent } from '../types';
import { updateWildCard } from '../api/fetch';
import { useAuth } from '../Provider/AuthProvider';

interface SettingsTabProps {
  wildcard: string;
  setWildcard: (wildcard: string) => void;
  theme: string;
  setTheme: (theme: string) => void;
  setPopupMsg:(arg0: PopupContent)=>void
  setShowPopup:(arg0:boolean)=>void
  setLoading:(arg0: boolean)=>void

}

const SettingsTab: React.FC<SettingsTabProps> = ({
  wildcard, setWildcard, theme, setTheme , setPopupMsg , setShowPopup,setLoading
}) => {
  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(e.target.value);
  };
  const {token} = useAuth()
  const oldWildCard = useRef(wildcard)
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
              onClick={async ()=>{

                if(oldWildCard.current == wildcard){
                    setPopupMsg({titleMsg:`Try something different`,descMsg:`Update with a new wildcard`,type:"ALERT",setShow:()=>{}})
                    setShowPopup(true)
                    return
                }

                //check backend
                setLoading(true)
                try{
                const bool = await updateWildCard(`/users/wildcard/${wildcard}`,token || "")
                if(bool){
                    setPopupMsg({titleMsg:`Updated Successfully`,descMsg:`Your site URL : ${wildcard}.zipfolio.xyz`,type:PopupTypes[2],setShow:()=>{}})
                    oldWildCard.current = wildcard
                }
                else{
                    setPopupMsg({titleMsg:`Wildcard not available`,descMsg:`Try a different wildcard`,type:"ERROR",setShow:()=>{}})
                    setWildcard(oldWildCard.current)
                }
                }
                catch(e:any){
                    setWildcard(oldWildCard.current)
                    setPopupMsg({titleMsg:"Error",descMsg:`Try a different wildcard`,type:"ERROR",setShow:()=>{}})
                }
                setLoading(false)
                setShowPopup(true)
              }}
              >Update</button>
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