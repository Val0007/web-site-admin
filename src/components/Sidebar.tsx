import React from 'react';
import { type PopupContent, type SiteData } from '../types';
import { updateUser } from '../api/fetch';
import { useAuth } from '../Provider/AuthProvider';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  tabsLength: boolean;
  setPopupMsg:(arg0: PopupContent)=>void
  setShowPopup:(arg0:boolean)=>void
  getSiteData:()=>SiteData
  setLoading:(arg0: boolean)=>void
  wildcard:string
  
}


const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, tabsLength,setPopupMsg,setShowPopup,getSiteData,setLoading,wildcard }) => {
    const {logout} = useAuth()
    return (
      <div className="w-full lg:w-64 bg-white shadow-lg lg:h-full">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold text-gray-800">Zip Folio</h1>
        </div>
        
        <nav className="mt-4">
          <button
            onClick={() => setActiveTab('structure')}
            className={`w-full text-left px-4 py-3 hover:bg-gray-50 ${
              activeTab === 'structure' ? 'bg-blue-50 border-r-2 border-blue-500 text-blue-600' : 'text-gray-600'
            }`}
          >
            Structure
          </button>
          <button
            onClick={() => {
              if (!tabsLength) {
                setPopupMsg({titleMsg:"Tabs must not be empty",descMsg:"Tabs must have a name",type:"ERROR",setShow:()=>{}})
                setShowPopup(true)
                return
              };
              setActiveTab('content');
            }}
            className={`w-full text-left px-4 py-3 hover:bg-gray-50 ${
              activeTab === 'content' ? 'bg-blue-50 border-r-2 border-blue-500 text-blue-600' : 'text-gray-600'
            }`}
          >
            Content
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full text-left px-4 py-3 hover:bg-gray-50 ${
              activeTab === 'settings' ? 'bg-blue-50 border-r-2 border-blue-500 text-blue-600' : 'text-gray-600'
            }`}
          >
            Site Settings
          </button>
        </nav>
        <div className='w-full flex flex-col justify-center items-center mt-5'>
        <button className='bg-blue-600 text-white w-4/5 py-2 px-4 rounded cursor-pointer'
        onClick={async ()=>{
            const data = getSiteData()
            console.log(data)
            setLoading(true)
            try{

            
            const result = await updateUser("/users",data,"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZhbGxpeWFwcGFudmVsdTg4OEBnbWFpbC5jb20iLCJpYXQiOjE3NTE3Mzc3Nzd9.HCJFD1FUZIdoaj4MRrNX2yvESrPtcOlltI4k-7Sa-Hs")
            console.log(result)
            setLoading(false)

            //Show success
            setPopupMsg({titleMsg:"Data updated successfully",descMsg:`Access your site : ${wildcard}`,type:"SUCCESS",setShow:()=>{}})
            setShowPopup(true)
            }
            catch(e:any){
                setLoading(false)
                console.log(e.message);
                setPopupMsg({titleMsg:e.message,descMsg:"Error",type:"ERROR",setShow:()=>{}})
                setShowPopup(true)

            }
        }}
        >Save and Publish</button>
        <button className='bg-blue-600 text-white w-4/5 py-2 px-4 rounded cursor-pointer mt-5 '
        onClick={async ()=>{
            logout()
            window.location.reload()
        }}
        >Logout</button>
        </div>
        {/* popup for confirmation */}
      </div>
    );
  };
  
  export default Sidebar;