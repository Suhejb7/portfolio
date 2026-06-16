import { Code, Database, Globe, Palette, Server, Zap, Github } from 'lucide-react'

const ACCENT_CYCLE = ['#22d3ee', '#6366f1', '#a78bfa', '#818cf8']

export const skills = {
  Frontend: [
    {
      name: 'React',
      icon: Code,
      description: 'Advanced React development with hooks, context, and modern patterns',
    },
    {
      name: 'Tailwind CSS',
      icon: Palette,
      description: 'Utility-first CSS, responsive design, and design systems',
    },
    {
      name: 'JavaScript',
      icon: Zap,
      description: 'ES6+, async programming, and modern JavaScript features',
    },
    {
      name: 'HTML/CSS',
      icon: Globe,
      description: 'Semantic HTML, CSS Grid, Flexbox, and animations',
    },
  ],
  Backend: [
    {
      name: 'PHP',
      icon: Server,
      description: 'Object-oriented PHP, MVC architecture, and API development',
    },
    {
      name: 'MySQL',
      icon: Database,
      description: 'Database design, optimization, and complex queries',
    },
  ],
  Tools: [
    {
      name: 'WordPress',
      icon: Globe,
      description: 'Custom themes, plugins, and WooCommerce development',
    },
    {
      name: 'Git',
      icon: Github,
      description: 'Version control, branching strategies, and collaboration',
    },
  ],
}

export const allSkills = Object.values(skills).flat()

export const getSkillAccent = (index) => ACCENT_CYCLE[index % ACCENT_CYCLE.length]

export const getSkillGlow = (accent) => `${accent}40`
