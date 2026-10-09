/**
 * Global site content: identity, links, navigation and career timeline.
 * Edit this file to change the hero copy, external links and resume placeholder.
 */

export const siteConfig = {
  name: "Cloud & Infrastructure Architect",
  role: "CLOUD & INFRASTRUCTURE ARCHITECT",
  headline: "Connecting cloud delivery and operations",
  subline: "Solaris · x86 · Storage · Oracle · Terraform · Cloud · Security Solution Operations",
  positioning:
    "Production operations across UNIX, x86, storage and Oracle — extended into Terraform and cloud architecture with the same focus on recovery and verification.",
  links: {
    github: "https://github.com/david-devsecops",
    linkedin: "https://www.linkedin.com/in/sang-jun-park-52553591/",
    companyContact: "https://elfirst.org/ko.html#contact",
    resume: "", // TODO: put resume.pdf in /public and set to "/resume.pdf"
    email: "", // optional: "mailto:you@example.com"
  },
  resumeNote:
    "Resume link placeholder. Add resume.pdf to the public directory and set links.resume in src/data/site.ts.",
};

export const nav = [
  { label: "Home", to: "/" },
  { label: "Projects", to: "/projects" },
  { label: "Experience", to: "/experience" },
  { label: "Blog", to: "/blog" },
  { label: "Architecture", to: "/architecture" },
  { label: "About", to: "/about" },
] as const;

export const careerTransition = [
  {
    stage: "Production Infrastructure",
    state: "Foundation",
    detail: "Solaris, Linux, AIX and x86 — enterprise systems, storage and Oracle operations.",
  },
  {
    stage: "Cloud Infrastructure",
    state: "Current",
    detail: "AWS and NCP infrastructure, on-premises and IDC to cloud migration.",
  },
  {
    stage: "Infrastructure as Code",
    state: "Current",
    detail: "Terraform modules, reviewed infrastructure changes and repeatable cloud provisioning.",
  },
  {
    stage: "MLOps / ML Platform",
    state: "In Progress",
    detail: "Lab and design work for model registry, serving, deployment and rollback flows.",
  },
  {
    stage: "AI Platform Engineering",
    state: "Target",
    detail: "LLM inference platforms, GPU infrastructure, platform observability.",
  },
] as const;

export const productionExperienceHighlights = [
  {
    title: "Enterprise UNIX and x86 systems",
    detail:
      "Solaris, Linux, AIX and x86 operations under change control, with rollback and post-change verification.",
  },
  {
    title: "Storage, backup and disaster recovery",
    detail:
      "Host, SAN fabric and array fault isolation with backup, restore and recovery procedures.",
  },
  {
    title: "Oracle operations and recovery",
    detail:
      "Backup, recovery, migration and performance analysis with evidence-based verification.",
  },
  {
    title: "Cloud infrastructure on AWS and NCP",
    detail:
      "VPC, subnet, routing, load balancer, WAF, VPN and DNS design across multiple environments.",
  },
  {
    title: "Terraform and infrastructure automation",
    detail:
      "Environment boundaries and repeatable infrastructure changes expressed as reviewed code.",
  },
  {
    title: "Operational stability",
    detail:
      "Recovery procedures, change verification and communication-path validation between systems.",
  },
] as const;
