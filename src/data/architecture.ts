import type { ArchitectureArea } from "./types";

/**
 * Engineering areas. No skill bars, percentages or self-rated scores —
 * each area states what is done, what is in progress and what it links to.
 */
export const architectureAreas: ArchitectureArea[] = [
  {
    id: "cloud-infrastructure",
    title: "Cloud Infrastructure",
    status: "Completed",
    description:
      "AWS and NCP environments: account and network layout, compute, storage and the migration path from IDC and on-premises systems.",
    practices: [
      "VPC, subnet and routing design with non-overlapping address plans",
      "Migration dependency mapping and cutover planning with rollback steps",
      "Post-change verification of request paths and name resolution",
    ],
    relatedProjects: ["production-engineering-case-studies"],
    relatedCaseStudies: ["idc-to-cloud-migration", "vpn-hybrid-connectivity"],
  },
  {
    id: "kubernetes-platform",
    title: "Kubernetes Platform",
    status: "Planned",
    description:
      "A learning and lab track for container orchestration; it is not presented as production build or operations experience.",
    practices: [
      "Building a lab that keeps implementation evidence separate from production experience",
      "Learning workload, service and ingress behaviour through reproducible exercises",
      "Publishing results only after they are implemented and verified",
    ],
    relatedProjects: ["self-service-ai-platform"],
  },
  {
    id: "network-connectivity",
    title: "Network and Connectivity",
    status: "Completed",
    description:
      "Traffic flow across load balancers, WAF, VPN, DNS and routing, analysed as an explicit path rather than a black box.",
    practices: [
      "Request-path reconstruction with tcpdump, curl, routing tables and logs",
      "Load balancer health state compared against backend readiness",
      "Flow inventories (source, destination, port, direction) for policy changes",
    ],
    relatedCaseStudies: [
      "traffic-path-analysis",
      "waf-load-balancer-behaviour",
      "vpn-hybrid-connectivity",
    ],
  },
  {
    id: "ai-ml-platform",
    title: "AI / ML Platform",
    status: "Planned",
    description:
      "Research and design for ML and AI workloads on Kubernetes: model registries, pipelines and model-version operations.",
    practices: [
      "Model registry as the source of truth for deployable versions",
      "Deployment and rollback as one platform mechanism",
      "MLOps pipeline structure — being defined, not yet operated in production",
    ],
    relatedProjects: ["self-service-ai-platform", "llm-inference-platform"],
  },
  {
    id: "model-serving",
    title: "Model Serving",
    status: "Planned",
    description:
      "Planned research into model APIs with versioning, routing and resource boundaries, including LLM inference.",
    practices: [
      "Versioned endpoints with explicit rollout and rollback",
      "Model routing behind a single API surface (planned)",
      "GPU capacity boundaries expressed as cluster configuration (planned)",
    ],
    relatedProjects: ["llm-inference-platform", "self-service-ai-platform"],
  },
  {
    id: "observability",
    title: "Observability",
    status: "In Progress",
    description:
      "Metrics, logs and traces used to answer specific operational questions rather than to fill dashboards.",
    practices: [
      "Correlating logs, captures and component state on one timeline",
      "Cross-account CloudWatch delivery experience; Prometheus and Grafana for AI platforms remain research and planned work",
      "Defining the questions a dashboard must answer before building it",
    ],
    relatedProjects: ["self-service-ai-platform", "llm-inference-platform"],
    relatedCaseStudies: ["production-troubleshooting-method"],
  },
  {
    id: "automation-iac",
    title: "Automation and IaC",
    status: "Completed",
    description:
      "Terraform and operational scripts used to make infrastructure changes reviewable and repeatable.",
    practices: [
      "Environment-specific Terraform kept in version control",
      "Reviewed changes with explicit variables and outputs",
      "Operational scripting for repeatable checks",
    ],
    relatedProjects: ["skt-tdeal-terraform-infrastructure"],
  },
  {
    id: "security-access",
    title: "Security and Access Control",
    status: "In Progress",
    description:
      "Access boundaries at the network and platform layer: who can reach what, and what the platform proves before allowing a request.",
    practices: [
      "WAF and firewall policy analysis against documented flows",
      "Least-privilege access as a design goal for planned platform work",
      "Authenticated, rate-limited inference APIs (planned)",
    ],
    relatedProjects: ["llm-inference-platform"],
    relatedCaseStudies: ["waf-load-balancer-behaviour", "vpn-hybrid-connectivity"],
  },
];
