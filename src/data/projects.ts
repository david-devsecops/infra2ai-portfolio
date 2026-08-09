import { cloudSecurityProjects } from "./projects/cloudSecurity.ts";
import { oracleDataProjects } from "./projects/oracleData.ts";
import { unixStorageProjects } from "./projects/unixStorage.ts";
import type { Project, ProjectGroup } from "./types.ts";

/**
 * Project content. To add a project: append an object here — the list page and
 * the /projects/$slug detail page pick it up automatically.
 * Omit any section key to render the "Content will be added..." placeholder.
 */
export const platformProjects: Project[] = [
  {
    slug: "self-service-ai-platform",
    group: "platform",
    detailLevel: "planned",
    title: "Self-Service AI Platform",
    status: "Planned",
    featured: true,
    summary:
      "Kubernetes 기반 AI Platform. 데이터 사이언티스트가 모델을 등록하고 배포하고 상태를 확인하고 이전 버전으로 롤백할 수 있게 하는 것이 목표입니다.",
    technologiesLabel: "Planned technologies",
    technologies: ["Kubernetes", "MLflow", "FastAPI", "Prometheus", "Grafana"],
    areas: ["kubernetes-platform", "ai-ml-platform", "model-serving", "observability"],
    sections: {
      overview: {
        paragraphs: [
          "A platform project whose goal is to let data scientists register a model, deploy it, check its runtime state and roll back to a previous version without asking an infrastructure engineer for each step.",
          "This is a planned learning project. Sections are filled in only after each part is implemented and verified.",
        ],
      },
      problem: {
        paragraphs: [
          "Model delivery usually stops at a notebook or an ad-hoc container. The gap is not model quality — it is the absence of a repeatable path from a registered model version to a running, observable, reversible deployment.",
        ],
        bullets: [
          "No single place that answers which model version is serving traffic right now.",
          "Rollback depends on individual knowledge instead of a defined platform action.",
          "Deployment and runtime state are visible to infrastructure engineers but not to model owners.",
        ],
      },
      stakeholders: {
        bullets: [
          "Data scientists / model owners — register and deploy model versions, read runtime state.",
          "Platform engineer — owns cluster, serving runtime, rollout and observability.",
          "Service owners — depend on the inference endpoint behaving predictably.",
        ],
      },
      requirements: {
        bullets: [
          "Model versions are registered in a registry, not copied into images by hand.",
          "Deploy and rollback are the same mechanism, triggered the same way.",
          "Runtime state (version, replicas, readiness, error rate) is visible without cluster access.",
          "Platform state is described in Git, not applied imperatively.",
        ],
      },
      currentStatus: {
        paragraphs: [
          "Planned. No cluster implementation or production operation is claimed; evidence will be added only after lab work is completed and verified.",
        ],
      },
    },
  },
  {
    slug: "llm-inference-platform",
    group: "platform",
    detailLevel: "planned",
    title: "LLM Inference Platform",
    status: "Planned",
    featured: true,
    summary:
      "LLM 모델을 API 형태로 제공하고 인증, 요청 제어, 모델 라우팅, 성능 모니터링과 GPU 자원 관리를 수행하는 추론 플랫폼.",
    technologiesLabel: "Planned technologies",
    technologies: ["vLLM", "Kubernetes", "GPU", "Prometheus", "Grafana"],
    areas: ["ai-ml-platform", "model-serving", "observability", "security-access"],
    sections: {
      overview: {
        paragraphs: [
          "Planned project: serve LLM models behind an API with authentication, request control, model routing, performance monitoring and GPU resource management.",
          "Nothing has been built yet. This page exists to record scope and open questions, not results.",
        ],
      },
      problem: {
        paragraphs: [
          "Inference endpoints are easy to start and hard to operate: GPU capacity is finite and expensive, request cost varies per token, and one heavy caller can degrade every other consumer.",
        ],
      },
      requirements: {
        bullets: [
          "Authenticated access per consumer, with per-consumer request limits.",
          "Routing between model versions and model sizes behind one API surface.",
          "GPU scheduling and capacity boundaries expressed as cluster configuration.",
          "Latency, queue depth and GPU utilisation visible per model.",
        ],
      },
      currentStatus: {
        paragraphs: ["Planned. No implementation, benchmark or measurement exists yet."],
      },
    },
  },
  {
    slug: "production-engineering-case-studies",
    group: "platform",
    detailLevel: "compact",
    title: "Production Engineering Case Studies",
    status: "In Progress",
    featured: true,
    summary:
      "실제 Production 환경에서 수행한 Cloud Migration, WAF/Load Balancer 통신 분석, VPN과 Routing 문제 해결 사례를 공개 검토 후 정리한 Case Study 모음.",
    technologiesLabel: "Domains",
    technologies: ["AWS", "NCP", "Load Balancer", "WAF", "VPN", "Linux"],
    areas: ["cloud-infrastructure", "network-connectivity"],
    sections: {
      overview: {
        paragraphs: [
          "A structured write-up of production work: cloud migration, WAF and load balancer traffic analysis, and VPN and routing problems.",
          "Customer and project names may be published after review. People, network values, accounts, hosts and configuration values are replaced; examples use documentation ranges such as 192.0.2.0/24.",
        ],
      },
      currentStatus: {
        paragraphs: [
          "In Progress. Case studies are published on the Experience page as each write-up is reviewed for anonymisation.",
        ],
      },
    },
  },
];

export const projectGroups = [
  { id: "cloud-security", ko: "Cloud · Network · Security", en: "Cloud · Network · Security" },
  {
    id: "oracle-data",
    ko: "Oracle · Database · Data Protection",
    en: "Oracle · Database · Data Protection",
  },
  { id: "unix-storage", ko: "UNIX · Storage · Migration", en: "UNIX · Storage · Migration" },
  { id: "platform", ko: "Platform Lab", en: "Platform Lab" },
] as const;

export const careerProjects: Project[] = [
  ...cloudSecurityProjects,
  ...oracleDataProjects,
  ...unixStorageProjects,
];

export const projects: Project[] = [...careerProjects, ...platformProjects];

export function projectsByGroup(group: ProjectGroup) {
  return projects.filter((project) => project.group === group);
}

export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
