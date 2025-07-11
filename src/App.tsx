import  { useEffect, useState } from 'react';
import './App.css';
import { usePortfolioData } from './hooks/usePortfolio';
import Sidebar from './components/Sidebar';
import StructureTab from './pages/StructurePage';
import ContentTab from './pages/ContentPage';
import SettingsTab from './pages/SettingsPage';
import Popup from './components/Popup';
import { fetchUser } from './api/fetch';
import { useAuth } from './Provider/AuthProvider';
import Spinner from './components/Spinner';
import { PopupType } from './types';

function App() {
  const [activeTab, setActiveTab] = useState('structure');
  const [loading,setLoading] = useState(true);
  const portfolioData = usePortfolioData();
  const {token} = useAuth()


  useEffect(()=>{

    //If logged in or have token - fetch exisitng data
    async function getData(){
      try{
      const data = await fetchUser("/users",token || "")
      portfolioData.initialiseData(data)
      setLoading(false)
      }
      catch(e:any){
        setLoading(false)
        portfolioData.setPopupMsg({titleMsg:e.message,descMsg:"Error",type:PopupType.Error,setShow:()=>{}})
        portfolioData.setPopup(true)
      }
    }
    getData()

  },[])

  return (
    <div className=''>
    <div className="flex flex-col lg:flex-row h-auto lg:h-screen  bg-gray-100">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        tabsLength={!portfolioData.tabs.some(tab => tab.trim() === "")}
        setShowPopup={portfolioData.setPopup}
        setPopupMsg={portfolioData.setPopupMsg}
        getSiteData={portfolioData.getSiteData}
        setLoading={setLoading}
        wildcard={portfolioData.wildcard}

      />
      
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'structure' && (
          <StructureTab
            name={portfolioData.name}
            setName={portfolioData.setName}
            description={portfolioData.description}
            setDescription={portfolioData.setDescription}
            links={portfolioData.links}
            setLinks={portfolioData.setLinks}
            skills={portfolioData.skills}
            newSkill={portfolioData.newSkill}
            setNewSkill={portfolioData.setNewSkill}
            addSkill={portfolioData.addSkill}
            removeSkill={portfolioData.removeSkill}
            tabs={portfolioData.tabs}
            setTabs={portfolioData.setTabs}
            addTab={portfolioData.addTab}
            updateTab={portfolioData.updateTab}
            removeTab={portfolioData.removeTab}
            setActiveTab={setActiveTab}
            setShowPopup={portfolioData.setPopup}
             setPopupMsg={portfolioData.setPopupMsg}
          />
        )}

        {activeTab === 'content' && (
          <ContentTab
            tabs={portfolioData.tabs}
            content={portfolioData.content}
            tabStructureIds={portfolioData.tabStructureIds}
            setStructureId={portfolioData.setStructureId}
            addContentItem={portfolioData.addContentItem}
            updateContentItem={portfolioData.updateContentItem}
            removeContentItem={portfolioData.removeContentItem}
          />
        )}

        {activeTab === 'settings' && (
          <SettingsTab
            wildcard={portfolioData.wildcard}
            setWildcard={portfolioData.setWildcard}
            theme={portfolioData.theme}
            setTheme={portfolioData.setTheme}
            setShowPopup={portfolioData.setPopup}
          setPopupMsg={portfolioData.setPopupMsg}
          setLoading={setLoading}
          />
        )}
      </div>
    </div>
      {portfolioData.displayPopup ?
        <div className='fixed inset-0 bg-gray-500 opacity-90 flex items-center justify-center z-50'>
      <Popup titleMsg={portfolioData.popupMsg.titleMsg} descMsg={portfolioData.popupMsg.descMsg} type={portfolioData.popupMsg.type}
      confirm={portfolioData.popupMsg.confirm} setShow={portfolioData.setPopup}
      ></Popup>
          </div>
       : null }
       {loading ?  
       <div className='fixed inset-0 bg-gray-500 opacity-90 flex items-center justify-center z-50'>
          <Spinner loading={loading}></Spinner>
        </div>
        : null}
    </div>
    

  );
}

export default App;
