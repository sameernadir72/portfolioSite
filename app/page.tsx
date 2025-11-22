"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Code2, Zap } from "lucide-react";
import Button from "../components/ui/Button";
import ProjectCard from "../components/ProjectCard";

const stats = [
  { label: "Projects Built", value: "15+", icon: Code2 },
  { label: "Happy Clients", value: "30+", icon: Sparkles },
  { label: "Years Experience", value: "4+", icon: Zap },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7 },
  },
};

const heroTitleVariants = {
  hidden: { opacity: 0, x: -100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8 },
  },
};

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6 },
  },
};

export default function HomePage() {
  return (
    <section className="space-y-16 md:space-y-24 pt-20 md:pt-32 pb-20">
      {/* Hero Section */}
      <motion.section
        className="space-y-8 text-center max-w-4xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Badge */}
        <motion.div variants={badgeVariants} className="inline-block">
          <div className="px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 dark:from-cyan-500/30 dark:to-purple-500/30 border border-cyan-200/50 dark:border-cyan-700/50 flex items-center gap-2 justify-center backdrop-blur-sm">
            <Sparkles size={16} className="text-cyan-600 dark:text-cyan-400" />
            <span className="text-sm font-semibold text-cyan-700 dark:text-cyan-300">Welcome to my portfolio</span>
          </div>
        </motion.div>

        {/* Main Heading */}
        <div className="space-y-4">
          <motion.h1 variants={heroTitleVariants} className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
            <span className="block">Hi, I'm</span>
            <span className="block mt-2 bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 dark:from-cyan-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              Sameer Nadir
            </span>
          </motion.h1>
          <motion.p variants={itemVariants} className="text-xl sm:text-2xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Full-stack engineer & creative developer building <span className="text-cyan-600 dark:text-cyan-400 font-bold">delightful, accessible</span> web experiences with React, Next.js, and modern technologies.
          </motion.p>
        </div>

        {/* CTA Buttons */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link href="/projects">
            <Button variant="default" size="lg" className="group">
              View My Work
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="ghost" size="lg">
              Get in Touch
            </Button>
          </Link>
        </motion.div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group p-8 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 dark:from-white/5 dark:to-white/[0.02] border border-white/20 dark:border-white/10 backdrop-blur-md hover:border-cyan-400/50 dark:hover:border-cyan-400/30 transition-all duration-300 hover:shadow-glow"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-2">{stat.label}</p>
                  <p className="text-4xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
                </div>
                <motion.div whileHover={{ scale: 1.2, rotate: 15 }}>
                  <Icon className="w-8 h-8 text-cyan-600 dark:text-cyan-400 opacity-60 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </motion.section>

      {/* Featured Projects Section */}
      <motion.section
        className="space-y-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center space-y-4 max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">Featured Projects</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Showcasing some of my latest work in full-stack development, design, and creative problem-solving.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
        >
          {[
            { id: 1, title: "Portfolio Site", description: "Modern portfolio with scroll animations", image: "/api/placeholder", tech: ["Next.js", "Tailwind", "Framer Motion"] },
            { id: 2, title: "E-Commerce Platform", description: "Full-stack shopping experience", image: "/api/placeholder", tech: ["React", "Node.js", "PostgreSQL"] },
            { id: 3, title: "SaaS Dashboard", description: "Analytics and management UI", image: "/api/placeholder", tech: ["Next.js", "Supabase", "TypeScript"] },
          ].map((project) => (
            <motion.div key={project.id} variants={itemVariants}>
              <ProjectCard project={project as any} />
            </motion.div>
          ))}
        </motion.div>

        {/* View All CTA */}
        <motion.div variants={itemVariants} className="text-center pt-8">
          <Link href="/projects">
            <Button variant="secondary" size="lg">
              View All Projects
              <ArrowRight size={20} />
            </Button>
          </Link>
        </motion.div>
      </motion.section>

      {/* About Section */}
      <motion.section
        className="space-y-8 max-w-4xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white text-center">
          About Me
        </motion.h2>

        <motion.p variants={itemVariants} className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed text-center">
          I'm a passionate full-stack developer with a strong focus on creating beautiful, performant web applications. With experience in React, Next.js, Node.js, and cloud infrastructure, I help businesses bring their ideas to life.
        </motion.p>

        {/* Skills */}
        <motion.div
          className="flex flex-wrap gap-3 justify-center"
          variants={containerVariants}
        >
          {["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS", "Framer Motion", "Supabase"].map((tech) => (
            <motion.span
              key={tech}
              variants={itemVariants}
              whileHover={{ scale: 1.1, y: -2 }}
              className="px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-cyan-500/20 to-purple-500/20 dark:from-cyan-500/30 dark:to-purple-500/30 text-cyan-700 dark:text-cyan-300 border border-cyan-200/50 dark:border-cyan-700/50 cursor-pointer hover:shadow-glow transition-all duration-300"
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="space-y-8 text-center py-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} className="space-y-4 max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">Let's Build Something Great</h2>
          <p className="text-xl text-slate-600 dark:text-slate-400">
            I'm always interested in hearing about new projects and opportunities.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contact">
            <Button variant="default" size="lg">
              <ArrowRight size={20} />
              Start a Project
            </Button>
          </Link>
          <Link href="/projects">
            <Button variant="outline" size="lg">
              View Portfolio
            </Button>
          </Link>
        </motion.div>
      </motion.section>
    </section>
  );
}
