import React, { useState, useEffect, useCallback, useMemo } from 'react';
import SkillGraph from './components/SkillGraph';
import ControlPanel from './components/ControlPanel';
import DetailsPanel from './components/DetailsPanel';
import { analyzeProjectRequirements } from './services/geminiService';
import { EMPLOYEES, SKILLS } from './constants';
import type { GraphNode, GraphLink } from './types';

const App: React.FC = () => {
  const [nodes, setNodes] = useState<GraphNode[]>([]);
  const [links, setLinks] = useState<GraphLink[]>([]);
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [highlightedSkills, setHighlightedSkills] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysisCompleted, setAnalysisCompleted] = useState(false);

  useEffect(() => {
    const employeeNodes: GraphNode[] = EMPLOYEES.map(e => ({
      id: e.id,
      name: e.name,
      type: 'employee',
      radius: 20,
      data: e,
    }));

    const skillNodes: GraphNode[] = SKILLS.map(s => ({
      id: s.id,
      name: s.name,
      type: 'skill',
      radius: 12,
      data: s,
    }));

    const allLinks: GraphLink[] = [];
    EMPLOYEES.forEach(e => {
      e.skills.forEach(s => {
        allLinks.push({ source: e.id, target: s.skillId });
      });
    });

    setNodes([...employeeNodes, ...skillNodes]);
    setLinks(allLinks);
  }, []);

  const handleNodeClick = useCallback((node: GraphNode) => {
    setSelectedNode(node);
  }, []);

  const handleCloseDetails = useCallback(() => {
    setSelectedNode(null);
  }, []);

  const handleAnalyze = useCallback(async (description: string) => {
    setIsLoading(true);
    setError(null);
    setHighlightedSkills([]);
    setAnalysisCompleted(false);
    try {
      const requiredSkills = await analyzeProjectRequirements(description);
      const lowerCaseRequiredSkills = requiredSkills.map(s => s.toLowerCase());
      
      const matchedSkillIds = SKILLS
        .filter(skill => lowerCaseRequiredSkills.includes(skill.name.toLowerCase()))
        .map(skill => skill.id);

      setHighlightedSkills(matchedSkillIds);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
      setAnalysisCompleted(true);
    }
  }, []);
  
  const highlightedSkillIdsSet = useMemo(() => new Set(highlightedSkills), [highlightedSkills]);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-gray-900 flex flex-col items-center p-4">
      <header className="w-full max-w-7xl text-center mb-4">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
          <span className="animated-gradient-text">SkillGraph</span>
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Visualize Your Team's Expertise. Power-up with AI.
        </p>
      </header>
      <main className="w-full flex-1 grid grid-cols-1 grid-rows-[minmax(0,_2fr)_minmax(0,_1fr)] lg:grid-cols-3 lg:grid-rows-1 gap-4 max-w-7xl">
        <div className="lg:col-span-2 relative h-full">
           <SkillGraph 
             nodes={nodes} 
             links={links} 
             onNodeClick={handleNodeClick}
             selectedNodeId={selectedNode?.id}
             highlightedSkillIds={highlightedSkillIdsSet}
           />
        </div>
        <div className="h-full overflow-hidden">
            <ControlPanel 
              onAnalyze={handleAnalyze} 
              isLoading={isLoading} 
              error={error}
              analysisCompleted={analysisCompleted}
              foundSkillsCount={highlightedSkills.length}
            />
        </div>
      </main>
      <DetailsPanel node={selectedNode} onClose={handleCloseDetails} />
    </div>
  );
};

export default App;