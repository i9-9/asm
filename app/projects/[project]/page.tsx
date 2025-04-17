import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import ProjectPage from '@/components/ProjectPage';

// Generate static paths for all projects
export async function generateStaticParams() {
  const projectsDir = path.join(process.cwd(), 'data/projects');
  
  try {
    const filenames = fs.readdirSync(projectsDir);
    return filenames.map((filename) => ({
      project: filename.replace('.json', ''),
    }));
  } catch (error) {
    console.error('Error reading projects directory:', error);
    return [];
  }
}

// Get project data
async function getData(project: string) {
  try {
    const filePath = path.join(process.cwd(), 'data/projects', `${project}.json`);
    const jsonData = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(jsonData);
  } catch (error) {
    return null;
  }
}

export default async function Page({ params }: { params: { project: string } }) {
  const projectData = await getData(params.project);
  
  if (!projectData) {
    notFound();
  }

  return <ProjectPage data={projectData} />;
} 