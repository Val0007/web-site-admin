import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Popup from './components/Popup';

// Type definitions
interface TabData {
  title: string;
  description?: string;
  link?: string;
}


interface Content {
  structureId: number;
  data: TabData[];
}

interface Links {
  github: string;
  linkedin: string;
  mail: string;
}

interface HeaderData {
  name: string;
  email: string;
  links?: Links;
  skills?: string[];
  description?: string;
}

interface SiteData {
  name: string;
  wildcard: string;
  email: string;
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


function App() {

  const [activeTab, setActiveTab] = useState('structure');
  const [showPopup, setShowPopup] = useState(false);
  const [selectedTabForContent, setSelectedTabForContent] = useState<string>('');
  
  // Structure data
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [links, setLinks] = useState({
    github: '',
    linkedin: '',
    mail: ''
  });
  const [tabs, setTabs] = useState<string[]>([]);
  const [skills,setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState('');
  const [theme, setTheme] = useState("light");
  const [wildcard,setWildcard] = useState("")
  
  // Content data
  const [content, setContent] = useState<{[key: string]: Content}>({});
  const [tabStructureIds, setTabStructureIds] = useState<{[key: string]: number}>({}); //tab name will have a structure number
  const [showStructurePopup, setShowStructurePopup] = useState(false);
  const [selectedTabForStructure, setSelectedTabForStructure] = useState('');
  
  // Add new tab
  const addTab = () => {
    setTabs([...tabs, ""]);
  };
  
  // Remove tab
  const removeTab = (index:number) => {
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

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };
  
  // Remove skill
  const removeSkill = (skillToRemove:string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };
  
  // Handle skill input key press
  const handleSkillKeyPress = (e:any) => {
    if (e.key === 'Enter') {
      addSkill();
    }
  };

  
  
  // Handle structure ID selection
  const openStructurePopup = (tabName:string) => {
    setSelectedTabForStructure(tabName);
    setShowStructurePopup(true);
  };
  
  const selectStructureId = (structureId:number) => {
    setTabStructureIds({
      ...tabStructureIds,
      [selectedTabForStructure]: structureId //to make selectedTab as a key
    });
    setShowStructurePopup(false);
  };
  
  // Add content item
  const addContentItem = () => {
    if (!selectedTabForContent) return;
    
    const newItem:TabData = {
      title: '',
      description: '',
      link: ''
    };
    
    const updatedContent = { ...content };
    //if content object does not exist , create new
    if (!updatedContent[selectedTabForContent]) {
      updatedContent[selectedTabForContent] = {
        structureId: tabStructureIds[selectedTabForContent] || 1,
        data: []
      };
    }
    //add new item to contents[tabName].data.push()
    if (updatedContent[selectedTabForContent].data.length < 5) {
      updatedContent[selectedTabForContent].data.push(newItem);
      setContent(updatedContent);
    }
    
    setShowPopup(false);
  };
  
  // Update content item
  const updateContentItem = (tabName:string, itemIndex:number, field:keyof TabData, value:string) => { //only fields like title , link , desc
    const updatedContent = { ...content };
    updatedContent[tabName].data[itemIndex][field] = value
    setContent(updatedContent);
  };
  
  // Remove content item
  const removeContentItem = (tabName:string, itemIndex:number) => {
    const updatedContent = { ...content };
    updatedContent[tabName].data = updatedContent[tabName].data.filter((_, i) => i !== itemIndex);
    setContent(updatedContent);
  };
  
  // Get final site data
  const getSiteData = () => {
    const siteData = {
      name,
      wildcard: name.toLowerCase().replace(/\s+/g, ''),
      email,
      templateId: 1,
      links: links.github || links.linkedin || links.mail ? links : undefined,
      tabs,
      content
    };
    
    console.log('Site Data:', siteData);
    return siteData;
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(e.target.value);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold text-gray-800">Portfolio Builder</h1>
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
            onClick={() =>{
              if(tabs.length <= 0) return
              setActiveTab('content')
            } }
            className={`w-full text-left px-4 py-3 hover:bg-gray-50 ${
              activeTab === 'content' ? 'bg-blue-50 border-r-2 border-blue-500 text-blue-600' : 'text-gray-600'
            }`}
          >
            Content
          </button>

          <button
            onClick={() =>{
              // if(tabs.length <= 0) return
              setActiveTab('settings')
            } }
            className={`w-full text-left px-4 py-3 hover:bg-gray-50 ${
              activeTab === 'settings' ? 'bg-blue-50 border-r-2 border-blue-500 text-blue-600' : 'text-gray-600'
            }`}
          >
            Site Settings
          </button>
        </nav>
        
        {/* <div className="absolute bottom-4 left-4 right-4">
          <button
            onClick={getSiteData}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
          >
            Generate Site Data
          </button>
        </div> */}
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {activeTab === 'structure' && (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Structure</h2>
            
            {/* Basic Info */}
            <div className="bg-white rounded-lg p-6 mb-6 shadow">
              <h3 className="text-lg font-semibold mb-4 text-gray-700">Basic Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
            </div>
            
            {/* Links */}
            <div className="bg-white rounded-lg p-6 mb-6 shadow">
              <h3 className="text-lg font-semibold mb-4 text-gray-700">Links</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">GitHub</label>
                  <input
                    type="url"
                    value={links.github}
                    onChange={(e) => setLinks({...links, github: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://github.com/username"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">LinkedIn</label>
                  <input
                    type="url"
                    value={links.linkedin}
                    onChange={(e) => setLinks({...links, linkedin: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Mail</label>
                  <input
                    type="email"
                    value={links.mail}
                    onChange={(e) => setLinks({...links, mail: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="contact@example.com"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow mb-6">
            <div className="flex flex-col items-start justify-between mb-4 gap-2">
                <h3 className="text-lg font-semibold text-gray-700">Skills</h3>
                <input
                      type="text"
                      value={newSkill}
                      onChange={(e) => {
                        setNewSkill(e.target.value)
                      }}
                      onKeyDown={handleSkillKeyPress}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter Skill"
                    />
                </div>
                <div className='flex rounded-lg w-full border border-gray-300 h-auto py-4 px-1 gap-2'>
                {skills.length === 0 ? (
                  <div className="text-gray-500 p-2">No skills added yet</div>
                ) : (
                  skills.map((skill, index) => (
                    <div key={index} className="border border-gray-400 rounded text-gray-700 p-2 flex gap-2 items-center">
                      <div>{skill}</div>
                      <div 
                        className="text-red-500 cursor-pointer hover:text-red-700" 
                        onClick={() => removeSkill(skill)}
                      >
                        ×
                      </div>
                    </div>
                  )))
                }
            </div>
            </div>

            
            {/* Tabs */}
            <div className="bg-white rounded-lg p-6 shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-700">Tabs</h3>
                {tabs.length < 3 && (
                  <button
                    onClick={addTab}
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
                      onChange={(e) => {
                        const updatedTabs = [...tabs];
                        updatedTabs[index] = e.target.value;
                        setTabs(updatedTabs);
                      }}
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

        <div className="w-full flex justify-center items-center mt-4 mb-4">
          <button
            onClick={()=>{
              if(tabs.length > 0 && name.length > 0 && email.length > 0){
                setActiveTab("content")
              }
              else{
                console.log("popup")
              }
            }}
            className=" w-3/6 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors cursor-pointer"
          >
            Go To Site Content
          </button>
        </div>
            
        
          </div>
        )}
        


        {activeTab === 'content' && (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Content</h2>
            
            {tabs.length === 0 ? (
              <div className="bg-white rounded-lg p-6 shadow text-center">
                <p className="text-gray-500">No tabs created yet. Please add tabs in the Structure section first.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {tabs.map((tab, index) => (
                  <div key={index} className="bg-white rounded-lg p-6 shadow">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-700">{tab}</h3>
                      <div className="flex items-center gap-3">
                        {tabStructureIds[tab] && (
                          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                            Structure ID: {tabStructureIds[tab]}
                          </span>
                        )}
                        <button
                          onClick={() => openStructurePopup(tab)}
                          className="flex items-center gap-2 bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700 transition-colors"
                        >
                          {tabStructureIds[tab] ? 'Change Structure' : 'Select Structure'}
                        </button>
                        {tabStructureIds[tab] && (!content[tab] || content[tab].data.length < 5) && (
                          <button
                            onClick={() => setSelectedTabForContent(tab)}
                            className="flex items-center gap-2 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition-colors"
                          >
                          
                            Add Content
                          </button>
                        )}
                      </div>
                    </div>
                    
                    {!tabStructureIds[tab] && (  //while in each tab -> {"about":3,"profile":1} -> if it does not have a strucuture id
                      <div className="text-center py-8 text-gray-500">
                        <p>Please select a structure ID first to add content to this tab.</p>
                      </div>
                    )}
                    
                      {/* if structure id exists and content for that tab */}
                    {tabStructureIds[tab] && content[tab] && content[tab].data.length > 0 && (
                      <div className="space-y-4">
                        {content[tab].data.map((item, itemIndex) => (
                          <div key={itemIndex} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-start justify-between mb-3">
                              <span className="text-sm font-medium text-gray-600">Item {itemIndex + 1}</span>
                              <button
                                onClick={() => removeContentItem(tab, itemIndex)}
                                className="text-red-500 hover:text-red-700"
                              >
                                X
                              </button>
                            </div>
                            
                            <div className="space-y-3">
                              <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Title</label>
                                <input
                                  type="text"
                                  value={item.title}
                                  onChange={(e) => updateContentItem(tab, itemIndex, 'title', e.target.value)}
                                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                  placeholder="Enter title"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Description</label>
                                <textarea
                                  value={item.description || ''}
                                  onChange={(e) => updateContentItem(tab, itemIndex, 'description', e.target.value)}
                                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                  placeholder="Enter description (optional)"
                                  
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Link</label>
                                <input
                                  type="url"
                                  value={item.link || ''}
                                  onChange={(e) => updateContentItem(tab, itemIndex, 'link', e.target.value)}
                                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                  placeholder="Enter link (optional)"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {tabStructureIds[tab] && (!content[tab] || content[tab].data.length === 0) && (
                      <p className="text-gray-500 text-center py-4">No content added yet.</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "settings" && (

        <div>
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Site Settings</h2>
            
            {/* Basic Info */}
            <div className="bg-white rounded-lg p-6 mb-6 shadow">
              <h3 className="text-lg font-semibold mb-4 text-gray-700">How your site will be visible</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Your Custom Wildcard (john.site.com)</label>
                  <div className=' flex flex-row gap-4'>
                  <input
                    type="text"
                    value={wildcard}
                    onChange={(e) => setWildcard(e.target.value)}
                    className="flex-5 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your name"
                  />
                  <button className=' flex-1  bg-blue-400 text-white rounded'>Check</button>
                  </div>
                  
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Site Appearance</label>
                    <div className="relative inline-block">
                      <select
                        value={theme}
                        onChange={handleChange}
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
        </div>

        )}


      </div>



      {/* Content Popup */}
      {/* {showPopup ? <Popup type='ERROR' titleMsg='' ></Popup> : null} */}

      {/* Structure ID Selection Popup */}
      {showStructurePopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">Select Structure ID for {selectedTabForStructure}</h3>
            
            <div className="space-y-3 mb-6">
              {[1, 2, 3].map((id) => (
                <button
                  key={id}
                  onClick={() => selectStructureId(id)}
                  className={`w-full p-3 border rounded-lg text-left hover:bg-gray-50 transition-colors ${
                    tabStructureIds[selectedTabForStructure] === id 
                      ? 'border-blue-500 bg-blue-50 text-blue-700' 
                      : 'border-gray-300'
                  }`}
                >
                  Structure ID {id}
                </button>
              ))}
            </div>
            
            <button
              onClick={() => setShowStructurePopup(false)}
              className="w-full bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
    
  )
}

export default App
