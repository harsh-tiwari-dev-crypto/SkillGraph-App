import type { Skill, Employee } from './types';

export const SKILLS: Skill[] = [
  { id: 's1', name: 'React' },
  { id: 's2', name: 'TypeScript' },
  { id: 's3', name: 'Node.js' },
  { id: 's4', name: 'Python' },
  { id: 's5', name: 'Machine Learning' },
  { id: 's6', name: 'UI/UX Design' },
  { id: 's7', name: 'Project Management' },
  { id: 's8', name: 'SQL' },
  { id: 's9', name: 'DevOps' },
  { id: 's10', name: 'Go' },
  { id: 's11', name: 'System Design' },
  { id: 's12', name: 'Data Structures' },
  { id: 's13', name: 'AWS' },
  { id: 's14', name: 'Docker' },
  { id: 's15', name: 'Kubernetes' },
  { id: 's16', name: 'CI/CD' },
  { id: 's17', name: 'GraphQL' },
  { id: 's18', name: 'Rust' },
];

export const EMPLOYEES: Employee[] = [
  {
    id: 'e1',
    name: 'Alice Johnson',
    role: 'Sr. Frontend Engineer',
    avatar: 'https://i.pravatar.cc/150?u=e1',
    skills: [
      { skillId: 's1', proficiency: 'Expert' },
      { skillId: 's2', proficiency: 'Advanced' },
      { skillId: 's6', proficiency: 'Intermediate' },
      { skillId: 's11', proficiency: 'Intermediate' },
      { skillId: 's17', proficiency: 'Beginner' },
    ],
  },
  {
    id: 'e2',
    name: 'Bob Williams',
    role: 'Backend Developer',
    avatar: 'https://i.pravatar.cc/150?u=e2',
    skills: [
      { skillId: 's3', proficiency: 'Expert' },
      { skillId: 's8', proficiency: 'Advanced' },
      { skillId: 's9', proficiency: 'Intermediate' },
      { skillId: 's10', proficiency: 'Beginner' },
      { skillId: 's18', proficiency: 'Intermediate' },
    ],
  },
  {
    id: 'e3',
    name: 'Charlie Brown',
    role: 'Data Scientist',
    avatar: 'https://i.pravatar.cc/150?u=e3',
    skills: [
      { skillId: 's4', proficiency: 'Expert' },
      { skillId: 's5', proficiency: 'Advanced' },
      { skillId: 's8', proficiency: 'Intermediate' },
      { skillId: 's12', proficiency: 'Expert' },
      { skillId: 's13', proficiency: 'Intermediate' },
    ],
  },
  {
    id: 'e4',
    name: 'Diana Prince',
    role: 'UI/UX Designer',
    avatar: 'https://i.pravatar.cc/150?u=e4',
    skills: [
      { skillId: 's6', proficiency: 'Expert' },
      { skillId: 's1', proficiency: 'Beginner' },
    ],
  },
  {
    id: 'e5',
    name: 'Ethan Hunt',
    role: 'Project Manager',
    avatar: 'https://i.pravatar.cc/150?u=e5',
    skills: [
      { skillId: 's7', proficiency: 'Expert' },
    ],
  },
  {
    id: 'e6',
    name: 'Fiona Glenanne',
    role: 'Full-Stack Engineer',
    avatar: 'https://i.pravatar.cc/150?u=e6',
    skills: [
      { skillId: 's1', proficiency: 'Advanced' },
      { skillId: 's2', proficiency: 'Advanced' },
      { skillId: 's3', proficiency: 'Intermediate' },
      { skillId: 's11', proficiency: 'Advanced' },
      { skillId: 's12', proficiency: 'Intermediate' },
      { skillId: 's17', proficiency: 'Intermediate' },
    ],
  },
  {
    id: 'e7',
    name: 'George Costanza',
    role: 'DevOps Specialist',
    avatar: 'https://i.pravatar.cc/150?u=e7',
    skills: [
        { skillId: 's9', proficiency: 'Expert' },
        { skillId: 's3', proficiency: 'Intermediate' },
        { skillId: 's4', proficiency: 'Beginner' },
        { skillId: 's10', proficiency: 'Intermediate' },
        { skillId: 's16', proficiency: 'Advanced' },
        { skillId: 's14', proficiency: 'Advanced' },
    ]
  },
  {
    id: 'e8',
    name: 'Heidi Klum',
    role: 'Cloud Engineer',
    avatar: 'https://i.pravatar.cc/150?u=e8',
    skills: [
        { skillId: 's13', proficiency: 'Expert' },
        { skillId: 's14', proficiency: 'Advanced' },
        { skillId: 's15', proficiency: 'Advanced' },
        { skillId: 's16', proficiency: 'Expert' },
        { skillId: 's9', proficiency: 'Intermediate' },
    ]
  }
];