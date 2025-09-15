import type * as d3 from 'd3';

export interface Skill {
  id: string;
  name: string;
}

export type Proficiency = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';

export interface EmployeeSkill {
  skillId: string;
  proficiency: Proficiency;
}

export interface Employee {
  id: string;
  name: string;
  role: string;
  avatar: string;
  skills: EmployeeSkill[];
}

export interface GraphNode extends d3.SimulationNodeDatum {
  id: string;
  name: string;
  type: 'employee' | 'skill';
  radius: number;
  data: Employee | Skill;
}

export interface GraphLink extends d3.SimulationLinkDatum<GraphNode> {
  // FIX: D3 mutates links, populating source/target with GraphNode objects from string IDs.
  // The original type created a conflict (string vs. object) resulting in `never`.
  // Using `any` allows the type to be flexible for both states (initial and populated).
  source: any;
  target: any;
}
