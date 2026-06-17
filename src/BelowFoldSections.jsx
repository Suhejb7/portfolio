import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'

const BelowFoldSections = ({
  content,
  currentLanguage,
  projects,
  skills,
}) => (
  <>
    <About
      content={content}
      currentLanguage={currentLanguage}
      projectCount={projects.length}
      skillCount={Object.values(skills).flat().length}
    />

    <Skills content={content} currentLanguage={currentLanguage} />

    <Projects projects={projects} content={content} currentLanguage={currentLanguage} />

    <Contact content={content} currentLanguage={currentLanguage} />
  </>
)

export default BelowFoldSections
