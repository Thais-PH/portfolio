import Image from "next/image";
import Link from "next/link";

// --- COMPOSANTS UI ---

const SectionTitle = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <h2 className={`text-3xl md:text-5xl font-bold tracking-tight mb-12 ${className}`}>
    {children}
  </h2>
);

const Badge = ({ children, color = "bg-slate-100" }: { children: React.ReactNode; color?: string }) => (
  <span className={`px-4 py-2 rounded-full text-sm font-medium ${color} text-slate-800`}>
    {children}
  </span>
);

// --- SECTIONS ---

const Navbar = () => (
  <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-slate-100">
    <div className="container mx-auto px-6 h-20 flex items-center justify-between">
      <Link href="#" className="text-2xl font-bold tracking-tighter hover:text-secondary transition-colors">
        THAÏS<span className="text-accent">.</span>
      </Link>
      <div className="hidden md:flex space-x-8 text-sm font-medium text-slate-600">
        <Link href="#about" className="hover:text-secondary transition-colors">À propos</Link>
        <Link href="#skills" className="hover:text-secondary transition-colors">Compétences</Link>
        <Link href="#projects" className="hover:text-secondary transition-colors">Projets</Link>
        <Link href="#contact" className="px-5 py-2.5 bg-slate-900 text-white rounded-full hover:bg-secondary transition-colors">
          Me contacter
        </Link>
      </div>
    </div>
  </nav>
);

const Hero = () => (
  <section id="about" className="min-h-screen flex items-center pt-20 relative overflow-hidden">
    {/* Formes d'arrière-plan abstraites */}
    <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-3xl -z-10 animate-pulse" />
    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/20 rounded-full blur-3xl -z-10" />

    <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
      <div className="space-y-8 animate-fade-in-up">
        <div className="inline-flex items-center space-x-2 bg-white border border-slate-200 rounded-full px-4 py-1.5 shadow-sm">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Disponible pour opportunités</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold leading-tight text-balance">
          Développeuse <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent">Full Stack</span> & Créative.
        </h1>
        
        <p className="text-xl text-slate-600 max-w-lg leading-relaxed text-balance">
          Je suis Thaïs. Actuellement en <strong>Master 2 à MyDigitalSchool Nantes</strong> et en alternance à la <strong>DGFiP</strong>. Je conçois des expériences web modernes et performantes.
        </p>

        <div className="flex flex-wrap gap-4 pt-4">
          <Link href="#projects" className="px-8 py-4 bg-slate-900 text-white font-medium rounded-full hover:bg-secondary hover:scale-105 transition-all duration-300 shadow-lg shadow-slate-900/20">
            Voir mes projets
          </Link>
          <Link href="#contact" className="px-8 py-4 bg-white text-slate-900 border border-slate-200 font-medium rounded-full hover:border-secondary hover:text-secondary transition-all duration-300">
            En savoir plus
          </Link>
        </div>
      </div>

      {/* Placeholder Visuel Hero */}
      <div className="relative h-[500px] w-full hidden md:block">
        <div className="absolute inset-0 bg-gradient-to-tr from-primary via-white to-secondary rounded-[2rem] opacity-50 rotate-3 transform hover:rotate-0 transition-transform duration-700 ease-out" />
        <div className="absolute inset-0 bg-slate-50 rounded-[2rem] border border-slate-100 shadow-2xl flex items-center justify-center overflow-hidden">
           <div className="text-center p-8">
             <div className="w-32 h-32 bg-slate-200 rounded-full mx-auto mb-6 animate-pulse" />
             <p className="text-slate-400 font-mono text-sm">Photo de profil / Illustration 3D</p>
           </div>
        </div>
      </div>
    </div>
  </section>
);

const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend",
      skills: ["React", "Next.js 16", "Tailwind CSS", "TypeScript", "Framer Motion"],
      color: "bg-primary/30"
    },
    {
      title: "Backend",
      skills: ["Node.js", "PostgreSQL", "Prisma", "API REST", "Auth.js"],
      color: "bg-secondary/30"
    },
    {
      title: "Outils & Design",
      skills: ["Figma", "Git/GitHub", "Vercel", "Docker", "Agile/Scrum"],
      color: "bg-accent/30"
    }
  ];

  return (
    <section id="skills" className="py-32 bg-white">
      <div className="container mx-auto px-6">
        <SectionTitle>Expertise Technique</SectionTitle>
        
        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, idx) => (
            <div key={idx} className="p-8 rounded-3xl border border-slate-100 bg-slate-50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className={`w-12 h-12 ${category.color} rounded-xl mb-6 flex items-center justify-center`}>
                <div className="w-6 h-6 bg-slate-900/10 rounded-full" />
              </div>
              <h3 className="text-xl font-bold mb-6">{category.title}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <Badge key={skill} color="bg-white border border-slate-200">{skill}</Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Projects = () => (
  <section id="projects" className="py-32 bg-slate-50">
    <div className="container mx-auto px-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
        <SectionTitle className="mb-0">Projets Sélectionnés</SectionTitle>
        <Link href="#" className="text-slate-500 hover:text-secondary border-b border-slate-300 pb-1 hover:border-secondary transition-all">
          Voir tout le portfolio
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-x-12 gap-y-24">
        {[1, 2, 3, 4].map((item, index) => (
          <div key={item} className={`group cursor-pointer ${index % 2 !== 0 ? "md:mt-24" : ""}`}>
            <div className="relative aspect-[4/3] bg-white rounded-2xl overflow-hidden mb-6 shadow-sm border border-slate-100">
              <div className="absolute inset-0 bg-slate-200 group-hover:scale-105 transition-transform duration-700 ease-out" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/5">
                <span className="bg-white px-6 py-3 rounded-full text-sm font-bold shadow-lg">Voir le projet</span>
              </div>
            </div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-bold mb-2 group-hover:text-secondary transition-colors">Nom du Projet {item}</h3>
                <p className="text-slate-500">Next.js • Tailwind • Supabase</p>
              </div>
              <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-secondary group-hover:border-secondary group-hover:text-white transition-all">
                ↗
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Contact = () => (
  <section id="contact" className="py-32 bg-white">
    <div className="container mx-auto px-6 max-w-4xl">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-bold mb-6">Parlons de votre projet.</h2>
        <p className="text-xl text-slate-600">
          À la recherche d'une opportunité en agence ou d'une collaboration technique ?
        </p>
      </div>

      <form className="space-y-6 bg-slate-50 p-8 md:p-12 rounded-3xl border border-slate-100">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-slate-700">Nom complet</label>
            <input type="text" id="name" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all bg-white" placeholder="John Doe" />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-slate-700">Email professionnel</label>
            <input type="email" id="email" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all bg-white" placeholder="john@agence.com" />
          </div>
        </div>
        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-medium text-slate-700">Message</label>
          <textarea id="message" rows={4} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all bg-white resize-none" placeholder="Dites-m'en plus sur le poste..." />
        </div>
        <button type="button" className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-secondary transition-colors shadow-lg shadow-slate-900/10">
          Envoyer le message
        </button>
      </form>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
    <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="text-sm">
        © {new Date().getFullYear()} Thaïs. Tous droits réservés.
      </div>
      <div className="flex space-x-6">
        <Link href="#" className="hover:text-white transition-colors">LinkedIn</Link>
        <Link href="#" className="hover:text-white transition-colors">GitHub</Link>
        <Link href="#" className="hover:text-white transition-colors">Twitter</Link>
      </div>
    </div>
  </footer>
);

// --- PAGE PRINCIPALE ---

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-slate-50">
      <Navbar />
      <Hero />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}
