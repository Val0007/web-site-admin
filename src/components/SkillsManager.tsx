import React from 'react';

interface SkillsManagerProps {
  skills: string[];
  newSkill: string;
  setNewSkill: (skill: string) => void;
  addSkill: () => void;
  removeSkill: (skill: string) => void;
}

const SkillsManager: React.FC<SkillsManagerProps> = ({
  skills, newSkill, setNewSkill, addSkill, removeSkill
}) => {
  const handleSkillKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addSkill();
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow mb-6">
      <div className="flex flex-col items-start justify-between mb-4 gap-2">
        <h3 className="text-lg font-semibold text-gray-700">Skills</h3>
        <input
          type="text"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyDown={handleSkillKeyPress}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter Skill"
        />
      </div>
      <div className='flex rounded-lg w-full border border-gray-300 h-auto py-4 px-3 gap-2'>
        {skills.length === 0 ? (
          <div className="text-gray-500 p-2">No skills added yet</div>
        ) : (
          skills.map((skill, index) => (
            <div key={index} className="border border-gray-400 rounded-full text-gray-700 py-1 px-2 flex gap-2 items-center">
              <div>{skill}</div>
              <div 
                className="text-red-500 cursor-pointer hover:text-red-700" 
                onClick={() => removeSkill(skill)}
              >
                ×
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SkillsManager;