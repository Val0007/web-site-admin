import React from 'react';
import type { Content, TabData } from '../types';
import structure1 from "../assets/structure1.png"
import structure2 from "../assets/structure2.png"
import structure3 from "../assets/structure3.png"


interface ContentTabProps {
  tabs: string[];
  content: {[key: string]: Content};
  tabStructureIds: {[key: string]: number};
  setStructureId: (tabName: string, structureId: number) => void;
  addContentItem: (tabName: string) => void;
  updateContentItem: (tabName: string, itemIndex: number, field: keyof TabData, value: string) => void;
  removeContentItem: (tabName: string, itemIndex: number) => void;
}

const ContentTab: React.FC<ContentTabProps> = ({
    tabs, content, tabStructureIds, setStructureId,
    addContentItem, updateContentItem, removeContentItem
  }) => {
    const [showStructurePopup, setShowStructurePopup] = React.useState(false);
    const [selectedTabForStructure, setSelectedTabForStructure] = React.useState('');
  
    const openStructurePopup = (tabName: string) => {
      setSelectedTabForStructure(tabName);
      setShowStructurePopup(true);
    };
  
    const selectStructureId = (structureId: number) => {
      setStructureId(selectedTabForStructure, structureId);
      content[selectedTabForStructure]["structureId"] = structureId
      setShowStructurePopup(false);
    };
  
    return (
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
                <div className="flex flex-col lg:flex-row items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-700">{tab}</h3>
                  <div className="flex items-center gap-3">
                    {tabStructureIds[tab] && (
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        Structure ID: {tabStructureIds[tab]}
                      </span>
                    )}
                    <button
                      onClick={() => openStructurePopup(tab)}
                      className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1 rounded  transition-colors"
                    >
                      {tabStructureIds[tab] ? 'Change Structure' : 'Select Structure'}
                    </button>
                    {tabStructureIds[tab] && (!content[tab] || content[tab].data.length < 5) && (
                      <button
                        onClick={() => addContentItem(tab)}
                        className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1 rounded  transition-colors"
                      >
                        Add Content
                      </button>
                    )}
                  </div>
                </div>
                
                {!tabStructureIds[tab] && (
                  <div className="text-center py-8 text-gray-500">
                    <p>Please select a structure ID first to add content to this tab.</p>
                  </div>
                )}
                
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
  
        {/* Structure ID Selection Popup */}
        {showStructurePopup && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-6 w-96">
      <h3 className="text-lg font-semibold mb-4">Select Structure ID for {selectedTabForStructure}</h3>
      <div className="space-y-3 mb-6">
        {[structure1, structure2, structure3].map((image,index) => (
          <button
            key={index+1}
            onClick={() => selectStructureId(index+1)}
            className={`w-full p-3 border rounded-lg text-left hover:bg-gray-50 transition-colors flex items-center gap-3 ${
              tabStructureIds[selectedTabForStructure] === index+1
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-300'
            }`}
          >
            <img 
              src={`${image}`}
              alt={`Structure ${index+1}`}
              className="w-full h-50 object-contain rounded border"
            />
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
    );
  };
  
  export default ContentTab;