import React, { useState } from 'react';

interface ControlPanelProps {
  onAnalyze: (description: string) => void;
  isLoading: boolean;
  error: string | null;
  analysisCompleted: boolean;
  foundSkillsCount: number;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ onAnalyze, isLoading, error, analysisCompleted, foundSkillsCount }) => {
  const [description, setDescription] = useState('');

  const handleAnalyzeClick = () => {
    if (description.trim()) {
      onAnalyze(description);
    }
  };

  const placeholderText = `Enter a project description to find matching skills. 
For example: 
"We need to build a new data processing pipeline using Python and deploy it on a cloud server. The project requires a robust SQL database and a simple frontend dashboard built with React for visualization."`;

  return (
    <div className="bg-gray-800 bg-opacity-80 backdrop-blur-sm p-6 rounded-lg shadow-xl border border-gray-700 flex flex-col gap-4 h-full">
      <h2 className="text-2xl font-bold text-white">Project Skill Analyzer</h2>
      <p className="text-gray-400">
        Describe your project requirements below. Our AI will identify the key skills needed and highlight matching employees in the graph.
      </p>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder={placeholderText}
        className="w-full h-48 p-3 bg-gray-900 border border-gray-600 rounded-md text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 resize-none"
        disabled={isLoading}
      />
      <button
        onClick={handleAnalyzeClick}
        disabled={isLoading || !description.trim()}
        className="w-full px-4 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 disabled:bg-gray-500 disabled:cursor-not-allowed transition duration-200 flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Analyzing...
          </>
        ) : (
          'Analyze Skills'
        )}
      </button>
      <div className="mt-2 min-h-[92px]">
        {error && (
            <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded-md animate-fade-in-up">
            <p className="font-bold">Error</p>
            <p>{error}</p>
            </div>
        )}
        {!isLoading && !error && analysisCompleted && (
            foundSkillsCount > 0 ? (
            <div className="bg-green-900 border border-green-700 text-green-200 px-4 py-3 rounded-md animate-fade-in-up">
                <p className="font-bold">Analysis Complete</p>
                <p>{foundSkillsCount} matching skill(s) found and highlighted in the graph.</p>
            </div>
            ) : (
            <div className="bg-yellow-900 border border-yellow-700 text-yellow-200 px-4 py-3 rounded-md animate-fade-in-up">
                <p className="font-bold">Analysis Complete</p>
                <p>No skills in our database matched the project requirements.</p>
            </div>
            )
        )}
      </div>
    </div>
  );
};

export default ControlPanel;