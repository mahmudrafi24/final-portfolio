"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  ArrowRight,
  Code,
  Cloud,
  Database,
  ExternalLink,
  Figma,
  Github,
  GitBranch,
  Mail,
  Server,
  Smartphone,
  TestTube,
  Workflow,
  Phone,
  Menu,
  X,
} from "lucide-react"
import { TwitterLogo, LinkedInLogo } from "@/components/tech-logos"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { useRef, useState } from "react"
import { useInView } from "framer-motion"
import { sendContactEmail } from "@/app/actions"
import { useToast } from "@/hooks/use-toast"

// Fixing the SkillCard component's icon mapping logic
const iconMap = {
  Code,
  Smartphone,
  Server,
  Database,
  GitBranch,
  Workflow,
  TestTube,
  Figma,
  Cloud,
} as const;

type IconMap = typeof iconMap;

type SkillCardProps = {
  skill: {
    name: string;
    icon: keyof IconMap;
    level: number;
  };
};

function SkillCard({ skill }: SkillCardProps) {
  const IconComponent = iconMap[skill.icon] || Code;

  return (
    <motion.div
      className="flex flex-col items-center p-4 rounded-lg border border-teal/20 bg-dark-accent text-card-foreground shadow-sm"
      whileHover={{ y: -5, boxShadow: "0 0 15px rgba(46, 149, 153, 0.3)" }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileTap={{ scale: 0.95 }}
    >
      <IconComponent className="h-8 w-8 mb-2 text-teal animate-pulse" />
      <h4 className="font-medium text-sm">{skill.name}</h4>
      <div className="w-full bg-muted rounded-full h-1.5 mt-2">
        <div className="skill-progress-bar h-1.5 rounded-full" style={{ width: `${skill.level}%` }} />
      </div>
    </motion.div>
  );
}

export default function Home() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await sendContactEmail(formData)
      toast({
        title: "Message sent!",
        description: "Thank you for your message. I'll get back to you soon.",
      })
      setFormData({ name: "", email: "", message: "" })
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Animation refs
  const educationRef = useRef(null)
  const experienceRef = useRef(null)
  const projectsRef = useRef(null)
  const contactRef = useRef(null)
  const skillsRef = useRef(null)

  const educationInView = useInView(educationRef, { once: true, amount: 0.2 })
  const experienceInView = useInView(experienceRef, { once: true, amount: 0.2 })
  const projectsInView = useInView(projectsRef, { once: true, amount: 0.2 })
  const contactInView = useInView(contactRef, { once: true, amount: 0.2 })
  const skillsInView = useInView(skillsRef, { once: true, amount: 0.2 })

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.3,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <header className="sticky top-0 z-50 w-full border-b border-teal/20 bg-black/90 backdrop-blur supports-[backdrop-filter]:bg-black/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold">
            <Smartphone className="h-5 w-5 text-teal" />
            <span className="text-gradient">Rafi</span>
          </Link>

          {/* Mobile menu button */}
          <button className="md:hidden p-2 text-teal" onClick={toggleMobileMenu} aria-label="Toggle menu">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          {/* Desktop navigation */}
          <nav className="hidden md:flex gap-6">
            <Link href="#home" className="text-sm font-medium hover:text-teal transition-colors">
              Home
            </Link>
            <Link href="#education" className="text-sm font-medium hover:text-teal transition-colors">
              Education
            </Link>
            <Link href="#experience" className="text-sm font-medium hover:text-teal transition-colors">
              Experience
            </Link>
            <Link href="#skills" className="text-sm font-medium hover:text-teal transition-colors">
              Skills
            </Link>
            <Link href="#projects" className="text-sm font-medium hover:text-teal transition-colors">
              Projects
            </Link>
            <Link href="#contact" className="text-sm font-medium hover:text-teal transition-colors">
              Contact
            </Link>
          </nav>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <motion.div
            className="md:hidden absolute top-16 left-0 right-0 bg-dark-accent border-b border-teal/20 z-50"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col p-4 gap-4">
              <Link
                href="#home"
                className="text-sm font-medium hover:text-teal transition-colors py-2 px-4 rounded-md hover:bg-black/50"
                onClick={closeMobileMenu}
              >
                Home
              </Link>
              <Link
                href="#education"
                className="text-sm font-medium hover:text-teal transition-colors py-2 px-4 rounded-md hover:bg-black/50"
                onClick={closeMobileMenu}
              >
                Education
              </Link>
              <Link
                href="#experience"
                className="text-sm font-medium hover:text-teal transition-colors py-2 px-4 rounded-md hover:bg-black/50"
                onClick={closeMobileMenu}
              >
                Experience
              </Link>
              <Link
                href="#skills"
                className="text-sm font-medium hover:text-teal transition-colors py-2 px-4 rounded-md hover:bg-black/50"
                onClick={closeMobileMenu}
              >
                Skills
              </Link>
              <Link
                href="#projects"
                className="text-sm font-medium hover:text-teal transition-colors py-2 px-4 rounded-md hover:bg-black/50"
                onClick={closeMobileMenu}
              >
                Projects
              </Link>
              <Link
                href="#contact"
                className="text-sm font-medium hover:text-teal transition-colors py-2 px-4 rounded-md hover:bg-black/50"
                onClick={closeMobileMenu}
              >
                Contact
              </Link>
            </nav>
          </motion.div>
        )}
      </header>

      <main className="flex-1 bg-black">
        <motion.section
          id="home"
          className="w-full py-12 md:py-24 lg:py-32"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
              <motion.div
                className="flex flex-col justify-center space-y-4"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    <span className="text-gradient">Modacher Mahmud Rafi</span>
                  </h1>
                  <p className="text-xl text-teal">Mobile App Developer</p>
                </div>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  I build exceptional and accessible digital experiences for mobile platforms. Specialized in Flutter Architecture with 15+ Industry Standard App building experience.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="#contact">
                    <Button className="group bg-teal hover:bg-teal/80 glow-teal">
                      Contact Me
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                  <Link href="#projects">
                    <Button variant="outline" className="border-teal text-teal hover:bg-teal/10">
                      View My Work
                    </Button>
                  </Link>
                </div>
                <div className="flex gap-4">
                  <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:scale-110 transition-transform hover:text-teal animate-pulse"
                    >
                      <Github className="h-5 w-5" />
                      <span className="sr-only">GitHub</span>
                    </Button>
                  </Link>
                  <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:scale-110 transition-transform hover:text-coral animate-pulse"
                    >
                      <TwitterLogo />
                      <span className="sr-only">Twitter</span>
                    </Button>
                  </Link>
                  <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:scale-110 transition-transform hover:text-magenta animate-pulse"
                    >
                      <LinkedInLogo />
                      <span className="sr-only">LinkedIn</span>
                    </Button>
                  </Link>
                  <Link href="mailto:contact@example.com">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:scale-110 transition-transform hover:text-yellow animate-pulse"
                    >
                      <Mail className="h-5 w-5" />
                      <span className="sr-only">Email</span>
                    </Button>
                  </Link>
                </div>
              </motion.div>
              <motion.div
                className="flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className="relative w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px] rounded-full overflow-hidden border-4 border-teal glow-teal">
                  <Image
                    src="/placeholder.svg?height=400&width=400"
                    width={400}
                    height={400}
                    alt="Developer Portrait"
                    className="object-cover"
                    priority
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        <motion.section
          id="education"
          className="w-full py-12 md:py-24 lg:py-32 bg-dark-accent"
          ref={educationRef}
          variants={sectionVariants}
          initial="hidden"
          animate={educationInView ? "visible" : "hidden"}
        >
          <div className="container px-4 md:px-6">
            <motion.div
              className="flex flex-col items-center justify-center space-y-4 text-center"
              variants={itemVariants}
            >
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gradient">Education</h2>
                <p className="max-w-[700px] text-teal md:text-xl">
                  My academic journey that shaped my technical foundation
                </p>
              </div>
            </motion.div>
            <div className="mx-auto grid max-w-5xl gap-8 py-8 md:py-12">
              <motion.div
                className="grid gap-1 p-4 rounded-lg border border-teal/20 bg-black shimmer"
                variants={itemVariants}
              >
                <h3 className="text-xl font-bold text-coral">Bachelor of Science in Software Engineering Major in Data Science</h3>
                <p className="text-muted-foreground">Daffodil International University • 2020-2024</p>
                <ul className="mt-2 list-disc pl-5 text-foreground">
                  <li>Attended at Escape the Room Contest - 2021</li>
                  <li>AWS Certified Developer - Associate</li>
                  <li>React Native Advanced Patterns</li>
                  <li>Flutter Development Bootcamp</li>
                </ul>
              </motion.div>
              <motion.div
                className="grid gap-1 p-4 rounded-lg border border-coral/20 bg-black shimmer"
                variants={itemVariants}
              >
                <h3 className="text-xl font-bold text-teal">Bachelor of Science in Software Engineering</h3>
                <p className="text-muted-foreground">Daffodil International University • 2020-2025</p>
                <p className="mt-2 text-foreground">
                  Graduated with honors. Focused on software architecture and mobile development. Participated in
                  multiple hackathons and won the university's app development competition.
                </p>
              </motion.div>
              <motion.div
                className="grid gap-1 p-4 rounded-lg border border-magenta/20 bg-black shimmer"
                variants={itemVariants}
              >
                <h3 className="text-xl font-bold text-magenta">Certifications</h3>
                <p className="text-muted-foreground">Various • 2018-Present</p>
                <ul className="mt-2 list-disc pl-5 text-foreground">
                  <li>Google Certified Mobile Web Specialist</li>
                  <li>AWS Certified Developer - Associate</li>
                  <li>React Native Advanced Patterns</li>
                  <li>Flutter Development Bootcamp</li>
                </ul>
              </motion.div>
            </div>
          </div>
        </motion.section>

        <motion.section
          id="experience"
          className="w-full py-12 md:py-24 lg:py-32 bg-black"
          ref={experienceRef}
          variants={sectionVariants}
          initial="hidden"
          animate={experienceInView ? "visible" : "hidden"}
        >
          <div className="container px-4 md:px-6">
            <motion.div
              className="flex flex-col items-center justify-center space-y-4 text-center"
              variants={itemVariants}
            >
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gradient">
                  Experience
                </h2>
                <p className="max-w-[700px] text-teal md:text-xl">My professional journey in app development</p>
              </div>
            </motion.div>
            <div className="mx-auto grid max-w-5xl gap-8 py-8 md:py-12">
              <motion.div
                className="grid gap-1 p-4 rounded-lg border border-magenta/20 bg-dark-accent shimmer"
                variants={itemVariants}
              >
                <h3 className="text-xl font-bold text-magenta">Senior Mobile Developer</h3>
                <p className="text-muted-foreground">Tech Innovations Inc. • 2020-Present</p>
                <p className="mt-2 text-foreground">
                  Lead developer for the company's flagship mobile application with over 1 million downloads. Managed a
                  team of 5 developers and implemented CI/CD pipelines that reduced deployment time by 40%.
                </p>
                <p className="mt-1">
                  <span className="font-medium text-yellow">Technologies:</span> React Native, TypeScript, Redux,
                  Firebase, Jest
                </p>
              </motion.div>
              <motion.div
                className="grid gap-1 p-4 rounded-lg border border-coral/20 bg-dark-accent shimmer"
                variants={itemVariants}
              >
                <h3 className="text-xl font-bold text-coral">Mobile Application Developer</h3>
                <p className="text-muted-foreground">AppWorks Solutions • 2017-2020</p>
                <p className="mt-2 text-foreground">
                  Developed and maintained multiple iOS and Android applications for clients in finance, healthcare, and
                  e-commerce sectors. Improved app performance by 30% through code optimization and architecture
                  redesign.
                </p>
                <p className="mt-1">
                  <span className="font-medium text-yellow">Technologies:</span> Flutter, Dart, Swift, Kotlin, GraphQL
                </p>
              </motion.div>
              <motion.div
                className="grid gap-1 p-4 rounded-lg border border-teal/20 bg-dark-accent shimmer"
                variants={itemVariants}
              >
                <h3 className="text-xl font-bold text-teal">Mobile Development Intern</h3>
                <p className="text-muted-foreground">StartApp • Summer 2016</p>
                <p className="mt-2 text-foreground">
                  Assisted in developing a social media app that reached 50,000 downloads in the first month.
                  Implemented key features including real-time messaging and location-based services.
                </p>
                <p className="mt-1">
                  <span className="font-medium text-yellow">Technologies:</span> React Native, JavaScript, Firebase
                </p>
              </motion.div>
            </div>
          </div>
        </motion.section>

        <motion.section
          id="skills"
          className="w-full py-12 md:py-24 lg:py-32 bg-dark-accent"
          ref={skillsRef}
          variants={sectionVariants}
          initial="hidden"
          animate={skillsInView ? "visible" : "hidden"}
        >
          <div className="container px-4 md:px-6">
            <motion.div
              className="flex flex-col items-center justify-center space-y-4 text-center"
              variants={itemVariants}
            >
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gradient">
                  Skills & Tech Stack
                </h2>
                <p className="max-w-[700px] text-teal md:text-xl">Technologies and tools I work with</p>
              </div>
            </motion.div>

            <div className="mx-auto max-w-5xl py-8 md:py-12">
              <div className="grid gap-8">
                <motion.div variants={itemVariants}>
                  <h3 className="text-xl font-bold mb-4 text-teal">Mobile Development</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {[
                      { name: "React Native", icon: "Code", level: 95 },
                      { name: "Flutter", icon: "Smartphone", level: 90 },
                      { name: "Swift", icon: "Smartphone", level: 85 },
                      { name: "Kotlin", icon: "Smartphone", level: 80 },
                      { name: "Ionic", icon: "Smartphone", level: 75 },
                    ].map((skill) => (
                      <SkillCard key={skill.name} skill={skill} />
                    ))}
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <h3 className="text-xl font-bold mb-4 text-coral">Frontend Development</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {[
                      { name: "React", icon: "Code", level: 95 },
                      { name: "TypeScript", icon: "Code", level: 90 },
                      { name: "JavaScript", icon: "Code", level: 95 },
                      { name: "HTML/CSS", icon: "Code", level: 90 },
                      { name: "Next.js", icon: "Code", level: 85 },
                    ].map((skill) => (
                      <SkillCard key={skill.name} skill={skill} />
                    ))}
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <h3 className="text-xl font-bold mb-4 text-magenta">Backend & Database</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {[
                      { name: "Node.js", icon: "Server", level: 85 },
                      { name: "Firebase", icon: "Database", level: 90 },
                      { name: "MongoDB", icon: "Database", level: 80 },
                      { name: "GraphQL", icon: "Database", level: 85 },
                      { name: "SQL", icon: "Database", level: 75 },
                    ].map((skill) => (
                      <SkillCard key={skill.name} skill={skill} />
                    ))}
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <h3 className="text-xl font-bold mb-4 text-yellow">Tools & Others</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {[
                      { name: "Git", icon: "GitBranch", level: 90 },
                      { name: "CI/CD", icon: "Workflow", level: 85 },
                      { name: "Jest", icon: "TestTube", level: 80 },
                      { name: "Figma", icon: "Figma", level: 75 },
                      { name: "AWS", icon: "Cloud", level: 70 },
                    ].map((skill) => (
                      <SkillCard key={skill.name} skill={skill} />
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          id="projects"
          className="w-full py-12 md:py-24 lg:py-32 bg-black"
          ref={projectsRef}
          variants={sectionVariants}
          initial="hidden"
          animate={projectsInView ? "visible" : "hidden"}
        >
          <div className="container px-4 md:px-6">
            <motion.div
              className="flex flex-col items-center justify-center space-y-4 text-center"
              variants={itemVariants}
            >
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gradient">Projects</h2>
                <p className="max-w-[700px] text-teal md:text-xl">Showcasing my best mobile application work</p>
              </div>
            </motion.div>
            <div className="mx-auto grid max-w-5xl gap-8 py-8 md:grid-cols-2 md:py-12">
              <motion.div
                variants={itemVariants}
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="h-full overflow-hidden border-teal/20 bg-dark-accent shadow-lg glow-teal">
                  <CardContent className="p-0">
                    <Image
                      src="/placeholder.svg?height=250&width=500"
                      width={500}
                      height={250}
                      alt="HealthTrack App"
                      className="w-full object-cover h-48"
                    />
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-teal">HealthTrack</h3>
                      <p className="text-muted-foreground">Fitness tracking app with social features</p>
                      <p className="mt-2 text-sm">
                        A comprehensive health and fitness tracking application with over 200,000 active users. Features
                        include workout tracking, nutrition planning, and social challenges.
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <span className="inline-flex items-center rounded-md bg-black text-teal px-2 py-1 text-xs font-medium">
                          React Native
                        </span>
                        <span className="inline-flex items-center rounded-md bg-black text-coral px-2 py-1 text-xs font-medium">
                          Firebase
                        </span>
                        <span className="inline-flex items-center rounded-md bg-black text-magenta px-2 py-1 text-xs font-medium">
                          Redux
                        </span>
                      </div>
                      <div className="mt-4 flex gap-2">
                        <Link href="#" target="_blank" rel="noopener noreferrer">
                          <Button
                            variant="outline"
                            size="sm"
                            className="group border-coral text-coral hover:bg-coral/10 hover:text-white focus:text-white active:text-white animate-pulse"
                          >
                            <ExternalLink className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                            Live Demo
                          </Button>
                        </Link>
                        <Link href="#" target="_blank" rel="noopener noreferrer">
                          <Button
                            variant="outline"
                            size="sm"
                            className="group border-teal text-teal hover:bg-teal/10 hover:text-white focus:text-white active:text-white animate-pulse"
                          >
                            <Github className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                            Code
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div
                variants={itemVariants}
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="h-full overflow-hidden border-coral/20 bg-dark-accent shadow-lg glow-coral">
                  <CardContent className="p-0">
                    <Image
                      src="/placeholder.svg?height=250&width=500"
                      width={500}
                      height={250}
                      alt="FinanceFlow App"
                      className="w-full object-cover h-48"
                    />
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-coral">FinanceFlow</h3>
                      <p className="text-muted-foreground">Personal finance management app</p>
                      <p className="mt-2 text-sm">
                        A secure and intuitive personal finance app that helps users track expenses, set budgets, and
                        achieve financial goals. Features include bank synchronization and expense analytics.
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <span className="inline-flex items-center rounded-md bg-black text-teal px-2 py-1 text-xs font-medium">
                          Flutter
                        </span>
                        <span className="inline-flex items-center rounded-md bg-black text-coral px-2 py-1 text-xs font-medium">
                          Dart
                        </span>
                        <span className="inline-flex items-center rounded-md bg-black text-magenta px-2 py-1 text-xs font-medium">
                          SQLite
                        </span>
                      </div>
                      <div className="mt-4 flex gap-2">
                        <Link href="#" target="_blank" rel="noopener noreferrer">
                          <Button
                            variant="outline"
                            size="sm"
                            className="group border-coral text-coral hover:bg-coral/10 hover:text-white focus:text-white active:text-white animate-pulse"
                          >
                            <ExternalLink className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                            Live Demo
                          </Button>
                        </Link>
                        <Link href="#" target="_blank" rel="noopener noreferrer">
                          <Button
                            variant="outline"
                            size="sm"
                            className="group border-teal text-teal hover:bg-teal/10 hover:text-white focus:text-white active:text-white animate-pulse"
                          >
                            <Github className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                            Code
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div
                variants={itemVariants}
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="h-full overflow-hidden border-magenta/20 bg-dark-accent shadow-lg glow-magenta">
                  <CardContent className="p-0">
                    <Image
                      src="/placeholder.svg?height=250&width=500"
                      width={500}
                      height={250}
                      alt="TravelBuddy App"
                      className="w-full object-cover h-48"
                    />
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-magenta">TravelBuddy</h3>
                      <p className="text-muted-foreground">Travel planning and exploration app</p>
                      <p className="mt-2 text-sm">
                        An all-in-one travel companion app that helps users discover destinations, plan itineraries, and
                        share experiences. Features include offline maps and local recommendations.
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <span className="inline-flex items-center rounded-md bg-black text-teal px-2 py-1 text-xs font-medium">
                          React Native
                        </span>
                        <span className="inline-flex items-center rounded-md bg-black text-coral px-2 py-1 text-xs font-medium">
                          GraphQL
                        </span>
                        <span className="inline-flex items-center rounded-md bg-black text-magenta px-2 py-1 text-xs font-medium">
                          MapBox
                        </span>
                      </div>
                      <div className="mt-4 flex gap-2">
                        <Link href="#" target="_blank" rel="noopener noreferrer">
                          <Button
                            variant="outline"
                            size="sm"
                            className="group border-coral text-coral hover:bg-coral/10 hover:text-white focus:text-white active:text-white animate-pulse"
                          >
                            <ExternalLink className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                            Live Demo
                          </Button>
                        </Link>
                        <Link href="#" target="_blank" rel="noopener noreferrer">
                          <Button
                            variant="outline"
                            size="sm"
                            className="group border-teal text-teal hover:bg-teal/10 hover:text-white focus:text-white active:text-white animate-pulse"
                          >
                            <Github className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                            Code
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div
                variants={itemVariants}
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="h-full overflow-hidden border-yellow/20 bg-dark-accent shadow-lg glow-yellow">
                  <CardContent className="p-0">
                    <Image
                      src="/placeholder.svg?height=250&width=500"
                      width={500}
                      height={250}
                      alt="ChatConnect App"
                      className="w-full object-cover h-48"
                    />
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-yellow">ChatConnect</h3>
                      <p className="text-muted-foreground">Real-time messaging platform</p>
                      <p className="mt-2 text-sm">
                        A secure messaging app with end-to-end encryption, group chats, and media sharing capabilities.
                        Optimized for low data usage and high performance even on slower networks.
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <span className="inline-flex items-center rounded-md bg-black text-teal px-2 py-1 text-xs font-medium">
                          Flutter
                        </span>
                        <span className="inline-flex items-center rounded-md bg-black text-coral px-2 py-1 text-xs font-medium">
                          Firebase
                        </span>
                        <span className="inline-flex items-center rounded-md bg-black text-magenta px-2 py-1 text-xs font-medium">
                          WebRTC
                        </span>
                      </div>
                      <div className="mt-4 flex gap-2">
                        <Link href="#" target="_blank" rel="noopener noreferrer">
                          <Button
                            variant="outline"
                            size="sm"
                            className="group border-coral text-coral hover:bg-coral/10 hover:text-white focus:text-white active:text-white animate-pulse"
                          >
                            <ExternalLink className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                            Live Demo
                          </Button>
                        </Link>
                        <Link href="#" target="_blank" rel="noopener noreferrer">
                          <Button
                            variant="outline"
                            size="sm"
                            className="group border-teal text-teal hover:bg-teal/10 hover:text-white focus:text-white active:text-white animate-pulse"
                          >
                            <Github className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                            Code
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </motion.section>

        <motion.section
          id="contact"
          className="w-full py-12 md:py-24 lg:py-32 bg-dark-accent"
          ref={contactRef}
          variants={sectionVariants}
          initial="hidden"
          animate={contactInView ? "visible" : "hidden"}
        >
          <div className="container px-4 md:px-6">
            <motion.div
              className="flex flex-col items-center justify-center space-y-4 text-center"
              variants={itemVariants}
            >
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gradient">
                  Contact Me
                </h2>
                <p className="max-w-[700px] text-teal md:text-xl">
                  Let's discuss your project or potential opportunities
                </p>
              </div>
            </motion.div>
            <div className="mx-auto grid max-w-5xl gap-8 py-8 md:grid-cols-2 md:py-12">
              <motion.div className="space-y-4" variants={itemVariants}>
                <Link
                  href="mailto:contact@example.com"
                  className="flex items-center gap-2 hover:text-teal transition-colors p-3 rounded-md hover:bg-black"
                >
                  <Mail className="h-5 w-5 text-yellow" />
                  <p className="text-foreground">contact@example.com</p>
                </Link>
                <Link
                  href="tel:+15551234567"
                  className="flex items-center gap-2 hover:text-teal transition-colors p-3 rounded-md hover:bg-black"
                >
                  <Phone className="h-5 w-5 text-coral" />
                  <p className="text-foreground">+1 (555) 123-4567</p>
                </Link>
                <Link
                  href="https://github.com/johndoe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-teal transition-colors p-3 rounded-md hover:bg-black"
                >
                  <Github className="h-5 w-5 text-magenta" />
                  <p className="text-foreground">github.com/johndoe</p>
                </Link>
                <div className="flex items-center gap-4 mt-4 p-3">
                  <Link
                    href="https://twitter.com/johndoe"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-coral transition-colors"
                  >
                    <TwitterLogo />
                  </Link>
                  <Link
                    href="https://linkedin.com/in/johndoe"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-magenta transition-colors"
                  >
                    <LinkedInLogo />
                  </Link>
                </div>
                <div className="mt-6 p-4 rounded-lg border border-teal/20 bg-black shimmer">
                  <h3 className="text-xl font-bold mb-2 text-teal">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center rounded-md bg-dark-accent text-teal px-2 py-1 text-xs font-medium">
                      React Native
                    </span>
                    <span className="inline-flex items-center rounded-md bg-dark-accent text-yellow px-2 py-1 text-xs font-medium">
                      Flutter
                    </span>
                    <span className="inline-flex items-center rounded-md bg-dark-accent text-coral px-2 py-1 text-xs font-medium">
                      Swift
                    </span>
                    <span className="inline-flex items-center rounded-md bg-dark-accent text-magenta px-2 py-1 text-xs font-medium">
                      Kotlin
                    </span>
                    <span className="inline-flex items-center rounded-md bg-dark-accent text-teal px-2 py-1 text-xs font-medium">
                      TypeScript
                    </span>
                    <span className="inline-flex items-center rounded-md bg-dark-accent text-yellow px-2 py-1 text-xs font-medium">
                      JavaScript
                    </span>
                    <span className="inline-flex items-center rounded-md bg-dark-accent text-coral px-2 py-1 text-xs font-medium">
                      Firebase
                    </span>
                    <span className="inline-flex items-center rounded-md bg-dark-accent text-magenta px-2 py-1 text-xs font-medium">
                      Redux
                    </span>
                    <span className="inline-flex items-center rounded-md bg-dark-accent text-teal px-2 py-1 text-xs font-medium">
                      GraphQL
                    </span>
                    <span className="inline-flex items-center rounded-md bg-dark-accent text-yellow px-2 py-1 text-xs font-medium">
                      CI/CD
                    </span>
                  </div>
                </div>
              </motion.div>
              <motion.div className="space-y-4" variants={itemVariants}>
                <form
                  onSubmit={handleSubmit}
                  className="space-y-4 p-6 rounded-lg border border-teal/20 bg-black shimmer"
                >
                  <div className="grid gap-2">
                    <label
                      htmlFor="name"
                      className="text-sm font-medium leading-none text-teal peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="flex h-10 w-full rounded-md border border-teal/20 bg-dark-accent px-3 py-2 text-sm text-foreground ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium leading-none text-teal peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="flex h-10 w-full rounded-md border border-teal/20 bg-dark-accent px-3 py-2 text-sm text-foreground ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Your email"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <label
                      htmlFor="message"
                      className="text-sm font-medium leading-none text-teal peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="flex min-h-[120px] w-full rounded-md border border-teal/20 bg-dark-accent px-3 py-2 text-sm text-foreground ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Your message"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-coral hover:bg-coral/90 text-white font-bold py-3 text-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl glow-coral"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </motion.div>
            </div>
          </div>
        </motion.section>
      </main>
      <footer className="w-full border-t border-teal/20 py-6 bg-black">
        <div className="container flex flex-col items-center justify-center gap-4 px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Smartphone className="h-5 w-5 text-teal" />
            <p className="text-sm font-medium text-teal">John Doe • App Developer</p>
          </div>
          <div className="flex gap-4">
            <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon" className="hover:scale-110 transition-transform hover:text-teal">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Button>
            </Link>
            <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon" className="hover:scale-110 transition-transform hover:text-coral">
                <TwitterLogo />
                <span className="sr-only">Twitter</span>
              </Button>
            </Link>
            <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon" className="hover:scale-110 transition-transform hover:text-magenta">
                <LinkedInLogo />
                <span className="sr-only">LinkedIn</span>
              </Button>
            </Link>
          </div>
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} John Doe. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
