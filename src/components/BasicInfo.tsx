import React from 'react';
import type { Links } from '../types';

interface BasicInfoFormProps {
  name: string;
  setName: (name: string) => void;
  description: string;
  setDescription: (email: string) => void;
  links: Links;
  setLinks: (links: Links) => void;
}

const BasicInfoForm: React.FC<BasicInfoFormProps> = ({
  name, setName, description, setDescription, links, setLinks
}) => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 shadow">
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
            <label className="block text-sm font-medium text-gray-600 mb-2">Description(Optional)</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your description"
            />
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg p-6 shadow">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">Links(Optional)</h3>
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
    </div>
  );
};

export default BasicInfoForm;