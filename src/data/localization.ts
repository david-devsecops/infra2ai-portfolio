import type { Language } from "@/lib/language";
import {
  projectSectionLabels,
  type ArchitectureArea,
  type CaseStudy,
  type Project,
  type ProjectSectionKey,
} from "./types";

export const commonCopy = {
  ko: {
    role: "클라우드·인프라 아키텍트",
    brandSubtitle: "클라우드 전환과 운영 안정화",
    contact: "채용·프로젝트 문의",
    nav: {
      "/": "홈",
      "/projects": "프로젝트",
      "/experience": "경험",
      "/blog": "블로그",
      "/architecture": "아키텍처",
      "/about": "소개",
    },
    mainNavLabel: "주요 메뉴",
    footerNavLabel: "푸터 메뉴",
    site: "사이트",
    links: "링크",
    resume: "이력서",
    resumePdf: "이력서 (PDF)",
    resumePlaceholder: "이력서 — 링크 준비 중",
    resumeNote: "이력서 PDF가 준비되면 링크가 활성화됩니다.",
    soon: "준비 중",
    openMenu: "메뉴 열기",
    closeMenu: "메뉴 닫기",
    languageLabel: "언어 선택",
    korean: "한국어",
    english: "영어",
    anonymised:
      "고객사와 프로젝트명은 검토 후 공개할 수 있습니다. 인명, 네트워크, 계정, 호스트 및 실제 구성값은 공개용 값으로 재구성합니다.",
  },
  en: {
    role: "CLOUD & INFRASTRUCTURE ARCHITECT",
    brandSubtitle: "Cloud migration and operations",
    contact: "Discuss a role or project",
    nav: {
      "/": "Home",
      "/projects": "Projects",
      "/experience": "Experience",
      "/blog": "Blog",
      "/architecture": "Architecture",
      "/about": "About",
    },
    mainNavLabel: "Main",
    footerNavLabel: "Footer",
    site: "Site",
    links: "Links",
    resume: "Resume",
    resumePdf: "Resume (PDF)",
    resumePlaceholder: "Resume — link placeholder",
    resumeNote: "The resume link will be enabled when the PDF is ready.",
    soon: "soon",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    languageLabel: "Select language",
    korean: "Korean",
    english: "English",
    anonymised:
      "Customer and project names may be published after review. People, networks, accounts, hosts and configuration values are reconstructed for publication.",
  },
} as const satisfies Record<Language, object>;

export const homeCopy = {
  ko: {
    role: "클라우드·인프라 아키텍트",
    identity: "박상준 · 13년 이상 엔터프라이즈 인프라 경험",
    headline: "클라우드 전환부터 안정적인 운영까지",
    subline: "Solaris · x86 · Storage · Oracle · Terraform · Cloud · 보안 솔루션 운영",
    positioning:
      "금융권과 기업 서비스의 클라우드 전환, 네트워크·보안 연계, 운영 안정화를 수행합니다. Oracle·Unix·스토리지에서 쌓은 경험을 AWS·NCP와 클라우드 자동화 업무로 넓혀 왔습니다.",
    viewProjects: "대표 프로젝트 보기",
    viewExperience: "경험 보기",
    careerEyebrow: "경력 확장",
    careerTitle: "인프라 운영에서 클라우드 구축과 자동화까지",
    careerDescription:
      "서버·데이터베이스·스토리지 운영에서 클라우드 전환과 자동화로 경험을 넓혀 왔습니다. AI 플랫폼은 연구·계획 영역으로 구분합니다.",
    projectsEyebrow: "주요 프로젝트",
    projectsTitle: "완료한 대표 프로젝트",
    projectsDescription:
      "금융권 NCP 인프라, AWS 이관, Terraform 구축과 모니터링에서 직접 맡은 범위를 소개합니다.",
    experienceEyebrow: "프로덕션 엔지니어링 경험",
    experienceTitle: "시스템과 클라우드를 함께 다룬 경험",
    experienceDescription:
      "서버·스토리지·데이터베이스부터 클라우드 네트워크까지, 서비스 경로와 복구 기준을 함께 다룹니다.",
    readCaseStudies: "사례 보기",
    areasEyebrow: "핵심 엔지니어링 영역",
    areasTitle: "실무로 연결되는 핵심 역량",
    areasDescription:
      "클라우드 구축, 네트워크·보안 연계, 자동화와 운영 경험을 관련 사례로 확인하세요. 연구·계획 영역은 상태를 구분해 표시합니다.",
    viewArchitecture: "아키텍처 및 플랫폼 영역 보기",
    contactEyebrow: "연락처",
    contactTitle: "클라우드 전환과 인프라 구축·운영 협업",
    contactDescription:
      "채용은 역할과 근무 형태를, 프로젝트는 현재 환경·해결할 문제·희망 일정을 LinkedIn으로 알려주세요. 초기 문의에는 계정 정보나 내부 구성 자료를 포함하지 않아도 됩니다.",
    about: "소개",
  },
  en: {
    role: "CLOUD & INFRASTRUCTURE ARCHITECT",
    identity: "Sang jun (David) park · 13+ years in enterprise infrastructure",
    headline: "From cloud migration to reliable operations",
    subline: "Solaris · x86 · Storage · Oracle · Terraform · Cloud · Security Solution Operations",
    positioning:
      "I work on cloud migration, network and security integration, and reliable operations for financial institutions and enterprise services. My work has grown from Oracle, Unix and storage into AWS, NCP and cloud automation.",
    viewProjects: "View selected projects",
    viewExperience: "View Experience",
    careerEyebrow: "Career transition",
    careerTitle: "From infrastructure operations to cloud delivery and automation",
    careerDescription:
      "My experience spans servers, databases and storage through cloud migration and automation. AI platform work remains a separate research and planning track.",
    projectsEyebrow: "Featured projects",
    projectsTitle: "Selected completed projects",
    projectsDescription:
      "My delivery scope across financial NCP infrastructure, AWS migration, Terraform provisioning and monitoring.",
    experienceEyebrow: "Production engineering experience",
    experienceTitle: "Experience across systems and cloud",
    experienceDescription:
      "From servers, storage and databases to cloud networks, I work with service paths and recovery requirements together.",
    readCaseStudies: "Read the case studies",
    areasEyebrow: "Core engineering areas",
    areasTitle: "Capabilities grounded in practice",
    areasDescription:
      "Explore the projects behind my cloud delivery, network and security integration, automation and operations work. Research and planned areas are clearly labelled.",
    viewArchitecture: "Architecture and platform areas",
    contactEyebrow: "Contact",
    contactTitle: "Cloud migration, infrastructure and operations",
    contactDescription:
      "For a role, share the responsibilities and working arrangements. For a project, share your current environment, the problem to solve and your preferred timeline on LinkedIn. Account details and internal configuration documents are not needed for an initial conversation.",
    about: "About",
  },
} as const satisfies Record<Language, object>;

export const koreanCareerTransition = [
  {
    stage: "프로덕션 인프라",
    state: "Foundation",
    stateLabel: "기반",
    detail: "Solaris, Linux, AIX, x86, Storage 및 Oracle 기반 엔터프라이즈 운영 경험.",
  },
  {
    stage: "클라우드 인프라",
    state: "Current",
    stateLabel: "현재",
    detail: "AWS와 NCP 인프라, 온프레미스·IDC 환경의 클라우드 마이그레이션.",
  },
  {
    stage: "Infrastructure as Code",
    state: "Current",
    stateLabel: "현재",
    detail: "Terraform 모듈과 검토 가능한 코드로 반복 가능한 클라우드 인프라 구성.",
  },
  {
    stage: "MLOps / ML 플랫폼",
    state: "Research",
    stateLabel: "연구 중",
    detail: "모델 등록, 서빙, 배포 및 롤백 흐름을 위한 학습·설계 프로젝트.",
  },
  {
    stage: "AI 플랫폼 엔지니어링",
    state: "Target",
    stateLabel: "목표",
    detail: "LLM 추론 플랫폼, GPU 인프라 및 플랫폼 관측성.",
  },
] as const;

export const koreanProductionExperienceHighlights = [
  {
    title: "엔터프라이즈 UNIX 및 x86",
    detail: "Solaris·Linux·AIX·x86 운영과 변경·롤백·사후 검증 절차.",
  },
  {
    title: "Storage·백업·재해복구",
    detail: "호스트·SAN Fabric·Array 계층 분리와 백업·복구 절차 검증.",
  },
  {
    title: "Oracle 운영과 복구",
    detail: "백업·복구·Migration·성능 분석과 결과 검증.",
  },
  {
    title: "AWS 및 NCP 클라우드 인프라",
    detail: "다중 환경의 VPC, 서브넷, 라우팅, 로드 밸런서, WAF, VPN 및 DNS 설계.",
  },
  {
    title: "Terraform 및 인프라 자동화",
    detail: "환경 경계를 코드로 표현하고 검토 가능한 변경과 반복 가능한 점검을 구성.",
  },
  {
    title: "운영 안정성",
    detail: "복구 절차, 변경 검증 및 시스템 간 통신 경로 확인.",
  },
] as const;

export const koreanArchitectureAreas: Record<
  string,
  Pick<ArchitectureArea, "title" | "description" | "practices">
> = {
  "cloud-infrastructure": {
    title: "클라우드 인프라",
    description:
      "AWS와 NCP 환경의 계정·네트워크 구성, 컴퓨팅, 스토리지 및 IDC·온프레미스 마이그레이션 경로.",
    practices: [
      "중복되지 않는 주소 계획을 기반으로 VPC, 서브넷 및 라우팅 설계",
      "롤백 단계를 포함한 마이그레이션 의존성 분석과 전환 계획",
      "변경 후 요청 경로와 이름 해석 검증",
    ],
  },
  "kubernetes-platform": {
    title: "Kubernetes 플랫폼 — 학습·계획",
    description:
      "프로덕션 구축·운영 경력으로 표시하지 않는 학습 영역이며, 실습 결과는 구현과 검증 후 공개합니다.",
    practices: [
      "프로덕션 경험과 실습 근거를 분리해 기록",
      "재현 가능한 실습으로 워크로드·Service·Ingress 동작 학습",
      "직접 구현하고 검증한 결과만 공개",
    ],
  },
  "network-connectivity": {
    title: "네트워크 및 연결성",
    description:
      "로드 밸런서, WAF, VPN, DNS 및 라우팅을 블랙박스가 아닌 명확한 통신 경로로 분석합니다.",
    practices: [
      "tcpdump, curl, 라우팅 테이블 및 로그를 활용한 요청 경로 재구성",
      "로드 밸런서 상태와 실제 백엔드 준비 상태 비교",
      "정책 변경을 위한 출발지·목적지·포트·방향 기준 통신 목록 작성",
    ],
  },
  "ai-ml-platform": {
    title: "AI / ML 플랫폼",
    description:
      "ML·AI 워크로드를 위한 모델 레지스트리, 파이프라인과 모델 버전 운영 기준을 학습·설계하는 영역.",
    practices: [
      "배포 가능한 버전의 기준 정보로 모델 레지스트리 사용",
      "배포와 롤백을 하나의 플랫폼 메커니즘으로 구성",
      "아직 프로덕션 운영 전인 MLOps 파이프라인 구조 정의",
    ],
  },
  "model-serving": {
    title: "모델 서빙",
    description: "LLM 추론을 포함한 모델 API의 버전 관리·라우팅·자원 경계를 연구하는 계획 영역.",
    practices: [
      "명확한 롤아웃·롤백 절차를 가진 버전별 엔드포인트",
      "단일 API 진입점 뒤에서 모델 라우팅 구성 예정",
      "GPU 용량 경계를 클러스터 구성으로 표현할 예정",
    ],
  },
  observability: {
    title: "관측성",
    description:
      "대시보드를 채우는 것이 아니라 구체적인 운영 질문에 답하기 위한 메트릭, 로그 및 추적.",
    practices: [
      "로그, 패킷 캡처 및 컴포넌트 상태를 하나의 타임라인으로 연결",
      "교차 계정 CloudWatch 모니터링 구축 경험; AI 플랫폼용 Prometheus·Grafana는 연구·계획",
      "대시보드가 답해야 할 질문을 먼저 정의한 뒤 구현",
    ],
  },
  "automation-iac": {
    title: "자동화 및 IaC",
    description: "Terraform과 운영 스크립트로 인프라 변경을 검토 가능하고 반복 가능하게 만듭니다.",
    practices: [
      "환경별 Terraform 구성을 버전 관리",
      "변수와 출력이 명확한 검토 가능 변경",
      "반복 가능한 점검을 위한 운영 스크립트 작성",
    ],
  },
  "security-access": {
    title: "보안 및 접근 제어",
    description: "네트워크와 플랫폼 계층에서 접근 주체와 허용 조건을 명확하게 정의합니다.",
    practices: [
      "문서화된 통신 흐름을 기준으로 WAF·방화벽 정책 분석",
      "계획 단계 플랫폼에 최소 권한을 설계 목표로 적용",
      "인증과 요청 제한을 적용한 추론 API 구성 예정",
    ],
  },
};

export const englishProjectSummaries: Record<string, string> = {
  "self-service-ai-platform":
    "A Kubernetes-based AI platform that enables data scientists to register, deploy, inspect and roll back model versions without an infrastructure engineer handling every step.",
  "llm-inference-platform":
    "An inference platform for serving LLMs as APIs with authentication, request control, model routing, performance monitoring and GPU resource management.",
  "production-engineering-case-studies":
    "A reviewed collection of production case studies covering cloud migration, WAF and load balancer traffic analysis, VPN and routing incidents.",
};

export const pageCopy = {
  ko: {
    projects: {
      eyebrow: "프로젝트",
      title: "경력 프로젝트와 플랫폼 랩",
      description:
        "완료한 고객 프로젝트는 분야별로 정리하고, 학습·계획 프로젝트는 Platform Lab으로 분리합니다.",
      all: "전체 프로젝트",
      stack: "기술 스택",
    },
    experience: {
      eyebrow: "경험",
      title: "프로덕션 엔지니어링 사례",
      description:
        "연도 대신 엔지니어링 영역별로 구성했습니다. 각 사례는 검증할 수 없는 수치 없이 배경, 역할, 제약 사항, 수행 내용과 결과를 설명하며 모든 식별 정보는 제거했습니다.",
      all: "전체 사례",
      technologies: "기술",
      context: "배경",
      role: "담당 역할",
      constraints: "제약 사항",
      keyActions: "주요 수행 내용",
      result: "결과",
      deeper:
        "아키텍처, 분석 단계 및 회고를 포함한 상세 내용은 사례의 익명화 검토가 완료되는 대로 추가합니다.",
      detail: "사례 상세",
    },
    architecture: {
      eyebrow: "아키텍처",
      title: "플랫폼 영역과 연결 관계",
      description:
        "로고 목록이나 역량 점수 대신 각 영역의 실제 업무, 현재 상태, 근거가 되는 프로젝트와 사례를 설명합니다.",
      practice: "주요 실무",
      relatedProjects: "관련 프로젝트",
      relatedCaseStudies: "관련 사례",
    },
    about: {
      eyebrow: "소개",
      title: "박상준 | 클라우드·인프라 아키텍트",
      description: "금융권과 기업 서비스의 클라우드 전환, 인프라 구축, 운영 안정화를 수행합니다.",
    },
    details: {
      sections: "섹션",
      onThisPage: "이 페이지의 내용",
      placeholder: "프로젝트 진행에 맞춰 내용을 추가할 예정입니다.",
    },
    errors: {
      notFoundTitle: "페이지를 찾을 수 없습니다",
      notFoundDescription: "요청한 페이지가 없거나 이동되었습니다.",
      goHome: "홈으로 이동",
      loadFailed: "페이지를 불러오지 못했습니다",
      loadFailedDescription: "문제가 발생했습니다. 새로고침하거나 홈으로 돌아가 주세요.",
      tryAgain: "다시 시도",
    },
  },
  en: {
    projects: {
      eyebrow: "Projects",
      title: "Career projects and platform lab",
      description:
        "Delivered customer work is grouped by engineering domain; learning and planned work remains in Platform Lab.",
      all: "All projects",
      stack: "Stack",
    },
    experience: {
      eyebrow: "Experience",
      title: "Production engineering case studies",
      description:
        "Organised by engineering domain rather than by year. Each case study states context, role, constraints, actions taken and outcome — without performance numbers that cannot be evidenced. All identifying details are removed.",
      all: "All case studies",
      technologies: "Technologies",
      context: "Context",
      role: "My role",
      constraints: "Constraints",
      keyActions: "Key actions",
      result: "Result",
      deeper:
        "A deeper write-up (architecture, analysis steps and lessons learned) will be added as the case study is reviewed for anonymisation.",
      detail: "Case study detail",
    },
    architecture: {
      eyebrow: "Architecture",
      title: "Platform areas and how they connect",
      description:
        "No logo wall, no skill bars, no self-rated percentages. Each area describes what the work involves, its current status, and which project or case study it is backed by.",
      practice: "Practice",
      relatedProjects: "Related projects",
      relatedCaseStudies: "Related case studies",
    },
    about: {
      eyebrow: "About",
      title: "Sang jun (David) park | Cloud & Infrastructure Architect",
      description:
        "Cloud migration, infrastructure delivery and operations for financial institutions and enterprise services.",
    },
    details: {
      sections: "Sections",
      onThisPage: "On this page",
      placeholder: "Content will be added as the project progresses.",
    },
    errors: {
      notFoundTitle: "Page not found",
      notFoundDescription: "The page you're looking for doesn't exist or has been moved.",
      goHome: "Go home",
      loadFailed: "This page didn't load",
      loadFailedDescription: "Something went wrong. Try refreshing or head back home.",
      tryAgain: "Try again",
    },
  },
} as const satisfies Record<Language, object>;

export const projectSectionLabelsByLanguage: Record<Language, Record<ProjectSectionKey, string>> = {
  ko: {
    overview: "개요",
    problem: "문제 정의",
    stakeholders: "사용자 / 이해관계자",
    requirements: "요구사항",
    architecture: "아키텍처",
    designDecisions: "설계 결정",
    technologySelection: "기술 선정",
    implementation: "구현",
    deployment: "배포",
    observability: "관측성",
    failureScenarios: "장애 시나리오",
    troubleshooting: "문제 해결",
    tradeOffs: "트레이드오프",
    productionConsiderations: "프로덕션 고려사항",
    currentStatus: "현재 상태",
    demo: "데모",
    repository: "GitHub 저장소",
    lessonsLearned: "회고",
  },
  en: projectSectionLabels,
};

type AboutSectionCopy = {
  title: string;
  paragraphs: string[];
  bullets: string[];
  links?: { projects: string; connector: string; experience: string };
};

export const aboutSections: Record<Language, AboutSectionCopy[]> = {
  ko: [
    {
      title: "소개",
      paragraphs: [
        "박상준입니다. 서버와 데이터베이스 운영을 기반으로 클라우드 인프라의 구축과 운영을 담당해 왔습니다. 서비스가 사용하는 네트워크, 보안 솔루션, 데이터베이스와 인프라를 함께 이해하며 업무를 수행합니다.",
        "한국은행 CBDC 프로젝트의 NCP 인프라, 아모레퍼시픽 AWS 전환, SKT Tdeal의 Terraform 구축과 모니터링이 주요 경험입니다. 초기 경력에서는 Oracle RAC, Solaris, 스토리지, 백업과 DR 환경을 다뤘습니다.",
        "이 사이트에는 프로젝트별 소속과 역할, 구현한 내용을 정리합니다. 현재는 운영 기록과 Runbook을 활용한 지식화 체계를 설계하며, AI·빅데이터 학습을 바탕으로 AI 업무 도구의 활용 가능성을 탐구하고 있습니다.",
      ],
      bullets: [],
    },
    {
      title: "기술 역량",
      paragraphs: [],
      bullets: [
        "클라우드 구축과 전환: AWS·NCP를 중심으로 GCP·Azure 인프라 프로젝트 경험",
        "네트워크와 보안 연계: Transit VPC, SFC, SSL Offloading, IPSec VPN, 망분리 DaaS",
        "자동화와 관측: Terraform 인프라 구축, 교차 계정 CloudWatch 모니터링",
        "시스템과 데이터: Oracle RAC·ZDLRA, Unix·Solaris, 스토리지·백업·DR",
        "운영 문서화: 장애 대응 기록, 네트워크 구성, 보안 정책, Runbook의 지식화 설계",
      ],
    },
    {
      title: "소속·계약 관계와 경력",
      paragraphs: [
        "고객 프로젝트 기간과 소속·계약 기간을 구분합니다. 우나프론트 전체 참여기간은 초기 근무와 이후 개인사업자 프리랜서 용역계약을 포함하며, 전환 월은 확정하지 않습니다.",
      ],
      bullets: [
        "엘퍼스트 · 프리랜서 TA · 2026.04–현재 (현재 CBDC 프로젝트 예정 범위 2026.04–2026.12)",
        "엘퍼스트 · 프리랜서 TA · 2024.09–2025.07 (CBDC 활용성 테스트 프로젝트 2024.08–2025.07)",
        "우나프론트 · 초기 차장·SA 근무 후 개인사업자 프리랜서 용역계약 · 전체 참여 2023.01–2025.04",
        "그리드 · DevOps 차장 팀장 · 2022.01–2023.01",
        "아이와이씨앤씨(주) · 오라클팀 차장 · 2018.12–2021.09",
        "화인S&C · 기술지원팀 · 2016.09–2017.12",
        "테크데이타 · OTS 팀원 · 2015.01–2015.12",
        "해오름기술 · 기술지원팀 · 2013.08–2014.11",
        "쌍용정보기술 · 기술지원부 과장 팀장 · 2010.12–2013.08",
      ],
    },
    {
      title: "학력과 자격 취득 이력",
      paragraphs: [
        "서울과학종합대학원대학교 AI빅데이터학과 석사과정 · 2024.03 입학 · 휴학 중. 학위 취득 또는 졸업 예정일을 의미하지 않습니다.",
        "아래 자격은 취득 이력입니다. 표시된 만료일 이후 갱신은 확인되지 않았습니다.",
      ],
      bullets: [
        "AWS Solutions Architect – Associate · 2023.05 취득 · 표시 만료 2026.05",
        "AWS Database – Specialty · 2023.04 취득 · 표시 만료 2026.04",
        "Google Cloud Professional Cloud Architect · 2020.09 취득 · 표시 만료 2022.09",
      ],
    },
    {
      title: "엔터프라이즈 프로덕션 환경",
      paragraphs: [
        "Solaris·Linux·AIX·x86 시스템과 Storage·Oracle을 사용하는 엔터프라이즈 프로덕션 환경에서 업무를 시작했습니다. 모든 변경이 검토되고 롤백 경로를 가지며 사후 검증되는 환경이었습니다. 이 경험은 인프라를 설계할 때 단순히 동작 여부뿐 아니라 일부가 실패했을 때의 동작과 복구 방법까지 고려하게 합니다.",
      ],
      bullets: [],
    },
    {
      title: "Terraform과 클라우드로의 확장",
      paragraphs: [
        "이후 AWS와 NCP 클라우드 인프라, Terraform 기반 인프라 코드화, 온프레미스·IDC 시스템의 클라우드 마이그레이션으로 영역을 확장했습니다. 이는 직무를 바꾼 것이 아니라 같은 운영 책임을 더 넓은 환경에서 이어가는 과정입니다.",
      ],
      bullets: [],
    },
    {
      title: "시스템 간 실제 통신 흐름 분석",
      paragraphs: [
        "대부분의 프로덕션 문제는 하나의 컴포넌트 안이 아니라 컴포넌트 사이의 경로에서 발생합니다. 클라이언트, 로드 밸런서, WAF, 웹·미들웨어, 데이터베이스와 스토리지로 이어지는 실제 요청 경로를 재구성하고 각 홉의 예상 동작을 정의한 뒤 검증합니다.",
      ],
      bullets: [],
    },
    {
      title: "로그, 패킷, 라우팅 및 컴포넌트 상태 연결",
      paragraphs: [],
      bullets: [
        "동일한 요청 시간대를 기준으로 tcpdump 캡처와 curl 점검 연결",
        "라우팅 테이블, DNS 해석, 방화벽 또는 WAF 동작을 각각 검증",
        "로드 밸런서 대상 상태와 실제 백엔드 준비 상태 비교",
        "애플리케이션·미들웨어 로그를 개별적으로 보지 않고 장애 홉과 연결",
      ],
    },
    {
      title: "엔지니어링 업무에서 AI를 사용하는 방식",
      paragraphs: [
        "AI가 생성한 코드를 그대로 배포하지 않습니다. 탐색 속도를 높이는 데 AI를 사용하고, 구조와 배치 위치는 직접 설계하며 실제 시스템 동작을 기준으로 결과를 검증합니다. 플랫폼에서 검증되지 않은 결과는 미래의 장애가 될 수 있습니다.",
      ],
      bullets: [],
    },
    {
      title: "지향하는 방향",
      paragraphs: [
        "장기 목표는 AI 플랫폼 엔지니어링입니다. Kubernetes 기반 ML·AI 워크로드, 모델 레지스트리와 서빙, MLOps와 LLM 추론은 현재 프로덕션 경력이 아닌 학습·계획 영역입니다. 직접 구현하고 검증한 내용만 진행 또는 완료 상태로 전환합니다.",
      ],
      bullets: [],
      links: { projects: "프로젝트 보기", connector: "또는", experience: "프로덕션 사례 보기" },
    },
  ],
  en: [
    {
      title: "About me",
      paragraphs: [
        "I am Sang jun (David) park, a cloud and infrastructure architect with a background in server and database operations. I work across the networks, security solutions, databases and infrastructure that support a service.",
        "My main projects include NCP infrastructure for Bank of Korea CBDC projects, Amorepacific's AWS migration, and Terraform provisioning and monitoring for SKT Tdeal. Earlier work covered Oracle RAC, Solaris, storage, backup and disaster recovery.",
        "This site records my affiliation, role and implementation scope for each project. I am currently designing an operational knowledge structure around incident records and runbooks, and exploring AI workflow tools through AI and big data studies.",
      ],
      bullets: [],
    },
    {
      title: "Technical capabilities",
      paragraphs: [],
      bullets: [
        "Cloud delivery and migration: AWS and NCP, with infrastructure projects on GCP and Azure",
        "Network and security integration: Transit VPC, SFC, SSL offloading, IPSec VPN and segregated DaaS",
        "Automation and observability: Terraform infrastructure and cross-account CloudWatch monitoring",
        "Systems and data: Oracle RAC and ZDLRA, Unix and Solaris, storage, backup and disaster recovery",
        "Operational documentation: designing knowledge structures for incident records, networks, security policies and runbooks",
      ],
    },
    {
      title: "Affiliations and engagements",
      paragraphs: [
        "Customer project dates are distinct from employment and contract dates. The overall 우나프론트 engagement includes initial employment followed by a freelance services contract as a sole proprietor; the transition month is unconfirmed.",
      ],
      bullets: [
        "엘퍼스트 · Freelance TA · 2026.04–present (current CBDC project planned scope: 2026.04–2026.12)",
        "엘퍼스트 · Freelance TA · 2024.09–2025.07 (CBDC usability-test project: 2024.08–2025.07)",
        "우나프론트 · Initially Deputy General Manager / SA, then freelance services contractor · overall engagement 2023.01–2025.04",
        "그리드 · DevOps Deputy General Manager / Team Lead · 2022.01–2023.01",
        "아이와이씨앤씨(주) · Oracle Team Deputy General Manager · 2018.12–2021.09",
        "화인S&C · Technical Support Team · 2016.09–2017.12",
        "테크데이타 · OTS Team Member · 2015.01–2015.12",
        "해오름기술 · Technical Support Team · 2013.08–2014.11",
        "쌍용정보기술 · Technical Support Manager / Team Lead · 2010.12–2013.08",
      ],
    },
    {
      title: "Education and certification history",
      paragraphs: [
        "서울과학종합대학원대학교 · AI and Big Data master's program · enrolled 2024.03 · on leave. No completed degree or confirmed graduation date is claimed.",
        "These are previously earned certifications. Renewal after the listed expiry dates has not been confirmed.",
      ],
      bullets: [
        "AWS Solutions Architect – Associate · earned 2023.05 · listed expiry 2026.05",
        "AWS Database – Specialty · earned 2023.04 · listed expiry 2026.04",
        "Google Cloud Professional Cloud Architect · earned 2020.09 · listed expiry 2022.09",
      ],
    },
    {
      title: "Enterprise production environments",
      paragraphs: [
        "My work started in enterprise production across Solaris, Linux, AIX and x86 systems, storage and Oracle. Every change was reviewed, had a rollback path and was verified afterwards. That context shapes how I design infrastructure — not only whether it works, but how it fails and how it is restored.",
      ],
      bullets: [],
    },
    {
      title: "Expanding into Terraform and cloud",
      paragraphs: [
        "From there I moved into AWS and NCP cloud infrastructure, Terraform-based infrastructure delivery, and migration of on-premises and IDC systems to cloud environments. This is an extension of the same operational responsibility, not a change of profession.",
      ],
      bullets: [],
    },
    {
      title: "Analysing real communication flow between systems",
      paragraphs: [
        "Most production problems are not inside one component; they are on the path between components. I reconstruct the actual request path across client, load balancer, WAF, web and middleware tiers, databases and storage, state the expected behaviour at each hop, and then verify it.",
      ],
      bullets: [],
    },
    {
      title: "Connecting logs, packets, routing and component state",
      paragraphs: [],
      bullets: [
        "tcpdump captures and curl probes aligned to the same request window",
        "Routing tables, DNS resolution and firewall or WAF behaviour verified separately",
        "Load balancer target health compared against real backend readiness",
        "Application and middleware logs correlated to the failing hop, not read in isolation",
      ],
    },
    {
      title: "How I use AI in engineering work",
      paragraphs: [
        "I do not ship AI-generated code as-is. I use AI to accelerate exploration, then design the structure myself, decide what belongs where, and verify the result against how the system actually behaves. On a platform, unverified output is a future incident.",
      ],
      bullets: [],
    },
    {
      title: "Where I am heading",
      paragraphs: [
        "My long-term goal is AI Platform Engineering. Kubernetes-based ML and AI workloads, model serving, MLOps and LLM inference are learning and planned work rather than production experience. A project moves to in-progress or completed only after I implement and verify it.",
      ],
      bullets: [],
      links: {
        projects: "See the projects",
        connector: "or",
        experience: "read the production case studies",
      },
    },
  ],
};

const koreanProjects: Record<
  string,
  Pick<Project, "title" | "summary" | "technologiesLabel" | "sections">
> = {
  "self-service-ai-platform": {
    title: "셀프서비스 AI 플랫폼",
    summary:
      "Kubernetes 기반 AI 플랫폼입니다. 데이터 사이언티스트가 인프라 엔지니어에게 매번 요청하지 않고 모델을 등록·배포하고 상태를 확인하며 이전 버전으로 롤백할 수 있도록 하는 것이 목표입니다.",
    technologiesLabel: "예정 기술",
    sections: {
      overview: {
        paragraphs: [
          "데이터 사이언티스트가 각 단계마다 인프라 엔지니어에게 요청하지 않고 모델을 등록하고 배포하며 실행 상태를 확인하고 이전 버전으로 롤백할 수 있게 하는 플랫폼 프로젝트입니다.",
          "현재 계획 단계이며 직접 구현하고 검증한 내용만 아래 영역에 기록합니다.",
        ],
      },
      problem: {
        paragraphs: [
          "모델 전달은 노트북이나 임시 컨테이너 단계에서 멈추기 쉽습니다. 문제는 모델 품질이 아니라 등록된 모델 버전을 실행 가능하고 관측 가능하며 되돌릴 수 있는 배포로 연결하는 반복 가능한 경로가 없다는 점입니다.",
        ],
        bullets: [
          "현재 어떤 모델 버전이 트래픽을 처리하는지 한 곳에서 확인할 수 없습니다.",
          "롤백이 정의된 플랫폼 동작이 아니라 개인의 경험에 의존합니다.",
          "배포와 실행 상태는 인프라 엔지니어에게만 보이고 모델 소유자에게는 보이지 않습니다.",
        ],
      },
      stakeholders: {
        bullets: [
          "데이터 사이언티스트 / 모델 소유자 — 모델 버전 등록·배포와 실행 상태 확인",
          "플랫폼 엔지니어 — 클러스터, 서빙 런타임, 롤아웃 및 관측성 담당",
          "서비스 소유자 — 예측 가능한 추론 엔드포인트 동작에 의존",
        ],
      },
      requirements: {
        bullets: [
          "모델 버전을 이미지에 수동으로 복사하지 않고 레지스트리에 등록합니다.",
          "배포와 롤백을 동일한 방식으로 실행되는 하나의 메커니즘으로 구성합니다.",
          "클러스터 접근 없이 버전, 레플리카, 준비 상태, 오류율을 확인할 수 있어야 합니다.",
          "플랫폼 상태는 명령형 적용이 아니라 Git에 선언합니다.",
        ],
      },
      currentStatus: {
        paragraphs: [
          "계획 단계입니다. Kubernetes 구축·운영 경력으로 표시하지 않으며, 실습 결과는 직접 구현하고 검증한 뒤 추가합니다.",
        ],
      },
    },
  },
  "llm-inference-platform": {
    title: "LLM 추론 플랫폼",
    summary:
      "LLM을 API로 제공하고 인증, 요청 제어, 모델 라우팅, 성능 모니터링 및 GPU 자원 관리를 수행하는 추론 플랫폼입니다.",
    technologiesLabel: "예정 기술",
    sections: {
      overview: {
        paragraphs: [
          "인증, 요청 제어, 모델 라우팅, 성능 모니터링 및 GPU 자원 관리를 포함해 LLM을 API 뒤에서 제공하는 프로젝트입니다.",
          "아직 구현 전이며 이 페이지는 결과가 아니라 범위와 미결정 사항을 기록합니다.",
        ],
      },
      problem: {
        paragraphs: [
          "추론 엔드포인트는 시작하기는 쉽지만 운영하기는 어렵습니다. GPU 용량은 제한적이고 비용이 높으며 요청 비용은 토큰 수에 따라 달라지고 하나의 과도한 사용자가 다른 모든 사용자의 성능을 저하시킬 수 있습니다.",
        ],
      },
      requirements: {
        bullets: [
          "사용자별 인증과 요청 제한을 적용합니다.",
          "단일 API 진입점 뒤에서 모델 버전과 크기를 라우팅합니다.",
          "GPU 스케줄링과 용량 경계를 클러스터 구성으로 표현합니다.",
          "모델별 지연 시간, 대기열 깊이 및 GPU 사용률을 확인할 수 있어야 합니다.",
        ],
      },
      currentStatus: {
        paragraphs: ["예정 단계입니다. 아직 구현, 벤치마크 또는 측정 결과가 없습니다."],
      },
    },
  },
  "production-engineering-case-studies": {
    title: "프로덕션 엔지니어링 사례",
    summary:
      "실제 프로덕션 환경에서 수행한 클라우드 마이그레이션, WAF·로드 밸런서 통신 분석, VPN 및 라우팅 문제 해결 사례를 공개 검토 후 정리한 모음입니다.",
    technologiesLabel: "분야",
    sections: {
      overview: {
        paragraphs: [
          "클라우드 마이그레이션, WAF·로드 밸런서 트래픽 분석, VPN 및 라우팅 문제를 구조화해 정리합니다.",
          "고객사와 프로젝트명은 검토 후 공개할 수 있습니다. 인명, 실제 네트워크·계정·호스트·구성값은 치환하며 주소 예시는 192.0.2.0/24 같은 문서용 대역만 사용합니다.",
        ],
      },
      currentStatus: {
        paragraphs: [
          "진행 중입니다. 익명화 검토가 끝나는 대로 경험 페이지에 각 사례를 공개합니다.",
        ],
      },
    },
  },
};

export function localizeProject(project: Project, language: Language): Project {
  if (language === "ko" && project.localized?.ko) {
    return { ...project, ...project.localized.ko };
  }

  if (language === "en") {
    return {
      ...project,
      summary: englishProjectSummaries[project.slug] ?? project.summary,
    };
  }

  const localized = koreanProjects[project.slug];
  return localized ? { ...project, ...localized } : project;
}

export function localizeArchitectureArea(
  area: ArchitectureArea,
  language: Language,
): ArchitectureArea {
  if (language === "en") return area;
  const localized = koreanArchitectureAreas[area.id];
  return localized ? { ...area, ...localized } : area;
}

export const koreanCategoryLabels: Record<string, string> = {
  "Cloud Migration": "클라우드 마이그레이션",
  "Network and Traffic Flow": "네트워크 및 트래픽 흐름",
  "Load Balancer and WAF": "로드 밸런서 및 WAF",
  "VPN and Hybrid Connectivity": "VPN 및 하이브리드 연결",
  "Middleware and Enterprise Systems": "미들웨어 및 엔터프라이즈 시스템",
  "Production Troubleshooting": "프로덕션 문제 해결",
};

const koreanCaseStudies: Record<
  string,
  Pick<
    CaseStudy,
    "category" | "title" | "context" | "role" | "constraints" | "keyActions" | "result"
  >
> = {
  "idc-to-cloud-migration": {
    category: "클라우드 마이그레이션",
    title: "IDC 워크로드의 퍼블릭 클라우드 마이그레이션",
    context:
      "고객 A는 IDC에서 애플리케이션과 미들웨어 서버를 운영하고 있었습니다. 전환 기간에는 IDC 서비스를 유지하면서 일부 워크로드를 퍼블릭 클라우드 환경(AWS / NCP)으로 이전했습니다.",
    role: "네트워크·플랫폼 설계, 전환 실행 및 마이그레이션 후 검증을 담당한 인프라 엔지니어입니다.",
    constraints: [
      "전환 중에도 기존 IDC 시스템이 계속 트래픽을 처리해야 했습니다.",
      "변경 가능 시간이 정해져 있고 변경별 승인이 필요했습니다.",
      "주소 대역은 기존 사설 대역과 중복되지 않아야 했습니다(예: 192.0.2.0/24).",
    ],
    keyActions: [
      "이전 전에 시스템별 인바운드·아웃바운드 의존성을 정리했습니다.",
      "VPC, 서브넷, 라우팅과 IDC·클라우드 간 통신 경로를 설계했습니다.",
      "전체 전환뿐 아니라 각 전환 단계별 롤백 절차를 준비했습니다.",
      "전환 후 curl, DNS 해석, 라우팅 테이블 및 패킷 캡처로 트래픽 경로를 검증했습니다.",
    ],
    result:
      "선정한 워크로드가 검증된 요청 경로와 문서화된 롤백 절차를 기반으로 클라우드 환경에서 트래픽을 처리했습니다. 검증되지 않은 성능 수치는 제시하지 않습니다.",
  },
  "traffic-path-analysis": {
    category: "네트워크 및 트래픽 흐름",
    title: "다중 시스템의 종단 간 트래픽 경로 분석",
    context:
      "요청이 클라이언트, 로드 밸런서, WAF, 웹 계층, 미들웨어 및 백엔드 시스템을 통과했습니다. 증상은 애플리케이션에 나타났지만 원인은 다른 경로에 있었습니다.",
    role: "서로 다른 팀이 담당하는 컴포넌트를 아우르는 트래픽 경로 조사를 주도했습니다.",
    constraints: [
      "컴포넌트마다 운영 팀, 로그 형식 및 보존 기간이 달랐습니다.",
      "패킷 캡처는 특정 호스트와 시간대에서만 허용됐습니다.",
    ],
    keyActions: [
      "요청 경로를 홉 단위로 재구성하고 각 홉의 예상 동작을 먼저 정의했습니다.",
      "동일한 요청 시간대를 기준으로 tcpdump, curl, 라우팅 테이블 및 애플리케이션 로그를 연결했습니다.",
      "변경을 제안하기 전에 장애 범위를 하나의 컴포넌트로 좁혔습니다.",
    ],
    result:
      "추측이 아니라 패킷 캡처와 로그 근거로 장애 홉을 확인하고 관련 데이터를 담당 팀에 전달했습니다.",
  },
  "waf-load-balancer-behaviour": {
    category: "로드 밸런서 및 WAF",
    title: "요청 실패 시 로드 밸런서와 WAF 동작 분석",
    context: "WAF와 로드 밸런서를 통해 공개된 서비스에서 간헐적인 요청 실패가 보고됐습니다.",
    role: "로드 밸런서·WAF 동작을 분석하고 상태 점검과 검사 규칙에 대한 가정을 검증했습니다.",
    constraints: [
      "WAF 규칙을 여러 서비스가 공유하므로 변경 시 다른 서비스에도 영향이 있었습니다.",
      "재현 여부는 트래픽 양이 아니라 특정 요청 형태에 따라 달라졌습니다.",
    ],
    keyActions: [
      "동일한 시간대의 로드 밸런서 대상 상태와 백엔드 준비 상태를 비교했습니다.",
      "WAF가 생성한 응답과 백엔드가 생성한 응답을 구분했습니다.",
      "헤더와 HTTP 메서드를 통제한 curl 요청으로 실패를 재현했습니다.",
    ],
    result: "실패 응답이 발생한 계층을 특정하여 담당자가 검토 가능한 수정안을 만들 수 있었습니다.",
  },
  "vpn-hybrid-connectivity": {
    category: "VPN 및 하이브리드 연결",
    title: "온프레미스와 클라우드 간 VPN·하이브리드 연결",
    context:
      "마이그레이션된 시스템과 기존 시스템이 계속 통신할 수 있도록 온프레미스 네트워크와 클라우드 환경을 VPN으로 연결했습니다.",
    role: "연결 경로를 설계·검증하고 통신 불가 문제를 조사했습니다.",
    constraints: [
      "양쪽 주소 대역이 중복되지 않아야 했습니다(예: 192.0.2.0/24, 198.51.100.0/24).",
      "온프레미스 방화벽 정책은 다른 팀이 관리했습니다.",
    ],
    keyActions: [
      "정책 변경 요청 전에 출발지, 목적지, 포트 및 방향으로 필요한 통신을 문서화했습니다.",
      "통신 가능 여부를 하나의 조건으로 보지 않고 터널 상태, 경로 전파 및 보안 정책을 각각 검증했습니다.",
      "각 통신의 양방향을 명시적으로 확인했습니다.",
    ],
    result:
      "각 계층을 독립적으로 검증해 필요한 통신을 확보했으며 통신 목록을 이후 정책 요청의 기준으로 사용했습니다.",
  },
  "enterprise-middleware-operations": {
    category: "미들웨어 및 엔터프라이즈 시스템",
    title: "엔터프라이즈 미들웨어와 UNIX 프로덕션 운영",
    context:
      "변경 통제 환경에서 Linux와 AIX, JEUS 애플리케이션 서버 및 WebtoB 웹 서버로 프로덕션 서비스를 운영했습니다.",
    role: "미들웨어와 OS 계층을 운영하고 장애 대응 및 검토된 변경 작업을 수행했습니다.",
    constraints: [
      "변경에는 승인과 정의된 롤백 경로가 필요했습니다.",
      "레거시 컴포넌트로 인해 적용 가능한 구성 변경 범위가 제한됐습니다.",
    ],
    keyActions: [
      "웹 계층에서 애플리케이션 서버와 백엔드까지 요청 처리 경로를 추적했습니다.",
      "미들웨어·시스템 로그로 자원 고갈과 애플리케이션 오류를 구분했습니다.",
      "사전에 정의한 사전·사후 점검과 함께 변경을 수행했습니다.",
    ],
    result:
      "담당 계층을 식별해 장애를 해결하고 승인된 시간 안에 검증 절차를 기록하며 변경을 적용했습니다.",
  },
  "production-troubleshooting-method": {
    category: "프로덕션 문제 해결",
    title: "반복 가능한 프로덕션 장애 분석 방법",
    context: "장애는 어떤 컴포넌트가 원인인지 알 수 없는 사용자 증상 형태로 접수됐습니다.",
    role: "분석을 주도하고 애플리케이션, 네트워크 및 보안 담당자에게 결과를 전달했습니다.",
    constraints: [
      "장애 중에는 복구와 근본 원인 분석이 동시에 요구되는 시간 압박이 있었습니다.",
      "장애 환경을 추가로 변경하지 않고 증거를 수집해야 했습니다.",
    ],
    keyActions: [
      "변경 전에 실제 요청 경로와 마지막 정상 홉을 확인했습니다.",
      "홉별로 패킷 캡처, 로드 밸런서 상태, 라우팅, DNS 해석 및 로그를 수집했습니다.",
      "복구 조치와 근본 원인 조치를 분리하고 모두 기록했습니다.",
    ],
    result:
      "수집한 근거로 결과를 뒷받침해 담당 범위에 대한 논쟁을 줄이고 후속 조치를 구체화했습니다.",
  },
};

export function localizeCaseStudy(study: CaseStudy, language: Language): CaseStudy {
  if (language === "en") return study;
  const localized = koreanCaseStudies[study.slug];
  return localized ? { ...study, ...localized } : study;
}

export const mentoringCopy = {
  ko: {
    section: "멘토링·대외활동",
    title: "윈터뷰 멘토",
    relationship: "플랫폼 멘토 활동",
    period: "2026.03–현재",
    description:
      "윈터뷰에서 이력서 리뷰와 커리어 커피챗을 진행하며, DevOps 진로 상담과 STAR 방식 경력기술서 피드백을 제공합니다.",
    reviews: "평점 5.0/5.0 · 후기 3건 (2026년 10월 확인 기준)",
    link: "윈터뷰 플랫폼 보기",
  },
  en: {
    section: "Mentoring and community activities",
    title: "Winterview mentor",
    relationship: "Platform mentoring activity",
    period: "Mar 2026–Present",
    description:
      "Mentor on Winterview, providing resume reviews, career conversations, DevOps career guidance, and feedback on structuring experience using the STAR method.",
    reviews: "5.0/5.0 across 3 reviews (as of October 2026).",
    link: "Visit Winterview",
  },
} as const satisfies Record<Language, object>;
