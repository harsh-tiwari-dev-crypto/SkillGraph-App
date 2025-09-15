import React from 'react';
import type { GraphNode, Employee, Skill, Proficiency } from '../types';
import { EMPLOYEES, SKILLS } from '../constants';

interface DetailsPanelProps {
  node: GraphNode | null;
  onClose: () => void;
}

const proficiencyColors: Record<Proficiency, string> = {
  Beginner: 'bg-gray-500',
  Intermediate: 'bg-blue-500',
  Advanced: 'bg-green-500',
  Expert: 'bg-purple-500',
};

const DetailsPanel: React.FC<DetailsPanelProps> = ({ node, onClose }) => {
  const renderContent = () => {
    if (!node) return null;

    if (node.type === 'employee') {
      const employee = node.data as Employee;
      return (
        <>
          <img src={employee.avatar} alt={employee.name} className="w-24 h-24 rounded-full mx-auto border-4 border-gray-600" />
          <h3 className="text-2xl font-bold text-center mt-4">{employee.name}</h3>
          <p className="text-center text-blue-400">{employee.role}</p>
          <div className="mt-6">
            <h4 className="font-semibold text-lg text-gray-300 mb-2">Skills</h4>
            <ul className="space-y-2">
              {employee.skills.map(({ skillId, proficiency }) => {
                const skill = SKILLS.find(s => s.id === skillId);
                return (
                  <li key={skillId} className="flex justify-between items-center bg-gray-700 p-2 rounded-md">
                    <span className="text-gray-200">{skill?.name}</span>
                    <span className={`px-2 py-1 text-xs font-semibold text-white rounded-full ${proficiencyColors[proficiency]}`}>
                      {proficiency}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </>
      );
    }

    if (node.type === 'skill') {
      const skill = node.data as Skill;
      const employeesWithSkill = EMPLOYEES.filter(e => e.skills.some(s => s.skillId === skill.id));
      return (
        <>
          <div className="w-24 h-24 rounded-full mx-auto bg-green-500 flex items-center justify-center border-4 border-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-center mt-4">{skill.name}</h3>
          <div className="mt-6">
            <h4 className="font-semibold text-lg text-gray-300 mb-2">Employees with this skill</h4>
            {employeesWithSkill.length > 0 ? (
                <ul className="space-y-2">
                {employeesWithSkill.map(employee => (
                    <li key={employee.id} className="flex items-center gap-3 bg-gray-700 p-2 rounded-md">
                        <img src={employee.avatar} alt={employee.name} className="w-8 h-8 rounded-full" />
                        <span className="text-gray-200">{employee.name}</span>
                    </li>
                ))}
                </ul>
            ) : (
                <p className="text-gray-400">No employees have this skill yet.</p>
            )}
          </div>
        </>
      );
    }

    return null;
  };

  return (
    <div className={`absolute top-0 right-0 h-full w-96 bg-gray-800 bg-opacity-80 backdrop-blur-sm p-6 shadow-2xl border-l border-gray-700 overflow-y-auto transform transition-transform duration-300 ease-in-out ${node ? 'translate-x-0' : 'translate-x-full'}`}>
      {node && (
        <>
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="mt-8">
            {renderContent()}
          </div>
        </>
      )}
    </div>
  );
};

export default DetailsPanel;