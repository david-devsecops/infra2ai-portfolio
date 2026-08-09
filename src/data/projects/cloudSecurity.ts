import { compactCareerProject, deepCareerProject } from "./careerProject.ts";

const cloudChecks = {
  en: [
    "Confirm route symmetry and the intended traffic path before and after change.",
    "Review security policy, representative health checks and monitoring continuity.",
    "Keep a tested rollback point and the decision owner visible in the change record.",
  ],
  ko: [
    "변경 전후 라우팅 대칭성과 의도한 트래픽 경로를 확인합니다.",
    "보안 정책, 대표 health check와 모니터링 연속성을 함께 점검합니다.",
    "검증한 rollback 지점과 복귀 판단 책임자를 변경 기록에 남깁니다.",
  ],
};

function cloudCompact(input: Omit<Parameters<typeof compactCareerProject>[0], "group" | "checks">) {
  return compactCareerProject({
    ...input,
    group: "cloud-security",
    checks: cloudChecks,
  });
}

const cbdcInfrastructure = deepCareerProject({
  slug: "bok-cbdc-ncp-infrastructure",
  title: {
    en: "Bank of Korea CBDC NCP Infrastructure",
    ko: "한국은행 CBDC NCP 인프라",
  },
  summary: {
    en: "Technical architecture for NCP network, security, institution connectivity, DaaS and operational runbooks for the CBDC infrastructure program.",
    ko: "CBDC 인프라 사업에서 NCP 네트워크·보안, 기관 연계, DaaS와 운영 Runbook을 기술 아키텍처 관점에서 담당하고 있습니다.",
  },
  client: "한국은행·기업은행",
  period: "2026.04–2026.12",
  role: { en: "Technical Architect", ko: "TA" },
  group: "cloud-security",
  status: "In Progress",
  technologies: ["NCP", "Transit VPC", "SFC", "SSL Offloading", "IPSec VPN", "Hiware", "DBSafer"],
  sections: {
    overview: {
      en: [
        "The current scope connects NCP network and security services, third-party controls, DaaS and institution VPN paths under one operational architecture.",
        "The project is in progress; this page describes the confirmed scope and current operating model, not a completed outcome.",
      ],
      ko: [
        "현재 NCP 네트워크·보안 서비스, 3rd-party 보안 솔루션, DaaS와 기관 VPN 경로를 하나의 운영 아키텍처로 연결하고 있습니다.",
        "진행 중인 프로젝트이므로 완료 성과가 아니라 확인된 범위와 현재 적용 중인 운영 기준을 설명합니다.",
      ],
    },
    problem: {
      en: [
        "Transit, inspection, service and data paths have different owners and change windows, but one user transaction crosses all of them.",
        "A component-level health check is insufficient when SSL termination, inspection policy, routing or institution connectivity can fail independently.",
      ],
      ko: [
        "Transit, 보안 검사, service와 data 경계는 담당 조직과 변경 시간이 다르지만 하나의 사용자 요청은 모든 경계를 통과합니다.",
        "SSL termination, 검사 정책, routing과 기관 연결이 서로 독립적으로 실패할 수 있어 개별 컴포넌트 health check만으로는 부족합니다.",
      ],
    },
    architecture: {
      en: [
        "Separate transit, inspection, service, data and operations planes and document the ingress and return path between them.",
        "Treat DaaS and privileged-access products as controlled dependencies with their own readiness, logging and recovery checks.",
      ],
      ko: [
        "Transit, inspection, service, data와 operations plane을 분리하고 각 경계의 ingress와 return path를 함께 기록합니다.",
        "DaaS와 접근제어 제품은 readiness, logging과 복구 점검 기준이 따로 있는 통제된 의존성으로 다룹니다.",
      ],
    },
    designDecisions: {
      en: [
        "Keep policy ownership and traffic ownership separate so an approval does not become an implicit routing change.",
        "Use one sanitized boundary map and one interface checklist as the hand-off contract between infrastructure and security teams.",
      ],
      ko: [
        "정책 소유권과 트래픽 경로 소유권을 구분해 정책 승인이 암묵적인 routing 변경이 되지 않게 합니다.",
        "공개 가능한 boundary map과 interface checklist를 인프라·보안 조직 사이의 인계 계약으로 사용합니다.",
      ],
    },
    implementation: {
      en: [
        "Coordinate NCP network/security, third-party security controls, DaaS, institution VPN and operating runbook workstreams.",
        "Describe each interface by source role, destination role, protocol purpose, inspection point and expected evidence without publishing real values.",
      ],
      ko: [
        "NCP 네트워크·보안, 3rd-party 보안 통제, DaaS, 기관 VPN과 운영 Runbook 작업을 하나의 변경 흐름으로 조정합니다.",
        "각 연계는 실제 값을 공개하지 않고 source 역할, destination 역할, protocol 목적, inspection 지점과 예상 증거로 설명합니다.",
      ],
    },
    deployment: {
      en: [
        "Sequence shared transit and inspection dependencies before service-plane changes, then validate the same request on the return path.",
        "Define stop and rollback conditions before each coordinated change window.",
      ],
      ko: [
        "공통 transit와 inspection 의존성을 service plane 변경보다 먼저 배치하고, 같은 요청의 return path까지 검증합니다.",
        "연계 변경 전마다 중단 조건과 rollback 조건을 먼저 합의합니다.",
      ],
    },
    observability: {
      en: [
        "Correlate load-balancer health, security events, route state, VPN state and representative application checks on one timeline.",
        "Require evidence from both sides of an interface before assigning the failure to one component.",
      ],
      ko: [
        "Load balancer health, 보안 이벤트, route 상태, VPN 상태와 대표 업무 점검을 하나의 시간축으로 맞춥니다.",
        "한 컴포넌트의 장애로 판단하기 전에 interface 양쪽의 증거를 확인합니다.",
      ],
    },
    failureScenarios: {
      en: [
        "SSL termination succeeds but inspection or the return route rejects the session.",
        "The VPN tunnel is established while the expected service route or security rule is missing.",
        "A privileged-access dependency is reachable but cannot complete the intended administrative flow.",
      ],
      ko: [
        "SSL termination은 성공하지만 inspection 또는 return route에서 session이 거부되는 경우를 분리합니다.",
        "VPN tunnel은 연결됐지만 필요한 service route나 보안 규칙이 없는 경우를 따로 확인합니다.",
        "접근제어 시스템은 연결되지만 의도한 관리 흐름을 완료하지 못하는 경우를 점검합니다.",
      ],
    },
    troubleshooting: {
      en: [
        "Start with the failed user path and move boundary by boundary rather than beginning with a product restart.",
        "Compare ingress and return evidence, then change only the smallest boundary supported by the evidence.",
      ],
      ko: [
        "제품 재시작보다 실패한 사용자 경로에서 시작해 boundary를 한 단계씩 이동합니다.",
        "Ingress와 return 증거를 비교한 뒤 근거가 있는 가장 작은 경계만 변경합니다.",
      ],
    },
    productionConsiderations: {
      en: [
        "Preserve route symmetry, policy review, representative health checks, monitoring continuity and rollback readiness.",
        "Keep people, addresses, domains, accounts, resource IDs and configuration values out of public artifacts.",
      ],
      ko: [
        "Routing 대칭성, 정책 검토, 대표 health check, 모니터링 연속성과 rollback 준비 상태를 함께 유지합니다.",
        "공개 자료에는 인명, 주소, 도메인, 계정, resource ID와 실제 구성값을 사용하지 않습니다.",
      ],
    },
    lessonsLearned: {
      en: [
        "The useful architecture boundary is the point where ownership, evidence and rollback decisions can be stated together.",
      ],
      ko: [
        "유용한 아키텍처 경계는 담당자, 확인할 증거와 rollback 판단을 함께 설명할 수 있는 지점입니다.",
      ],
    },
  },
});

const cbdcUsabilityTest = deepCareerProject({
  slug: "bok-cbdc-usability-test",
  title: {
    en: "Bank of Korea CBDC Usability-Test Infrastructure",
    ko: "한국은행 CBDC 활용성 테스트 인프라",
  },
  summary: {
    en: "Technical architecture for NCP infrastructure and network/security integration during the CBDC usability test.",
    ko: "CBDC 활용성 테스트에서 NCP 인프라와 네트워크·보안 연계를 기술 아키텍처 관점에서 담당했습니다.",
  },
  client: "한국은행·기업은행",
  period: "2024.08–2025.07",
  role: { en: "Technical Architect", ko: "TA" },
  group: "cloud-security",
  technologies: ["NCP", "Transit VPC", "SFC", "SSL Offloading", "IPSec VPN", "DaaS"],
  sections: {
    overview: {
      en: [
        "The work covered NCP usability-test infrastructure and the integration boundaries between transit, security inspection, services, DaaS and institution connectivity.",
      ],
      ko: [
        "NCP 활용성 테스트 인프라와 transit, 보안 검사, service, DaaS, 기관 연결 사이의 연계 경계를 담당했습니다.",
      ],
    },
    problem: {
      en: [
        "End-to-end test success depended on infrastructure and security teams observing the same traffic path and agreeing on failure ownership.",
      ],
      ko: [
        "End-to-end 테스트를 성공시키려면 인프라와 보안 담당자가 같은 트래픽 경로를 보고 장애 책임 경계를 합의해야 했습니다.",
      ],
    },
    architecture: {
      en: [
        "Model transit, inspection, load-balancing, service and data dependencies as separate failure domains joined by explicit interfaces.",
      ],
      ko: [
        "Transit, inspection, load balancing, service와 data 의존성을 명시적인 interface로 연결된 별도 장애 도메인으로 구성했습니다.",
      ],
    },
    designDecisions: {
      en: [
        "Separate shared-path verification from service-specific checks so a common dependency does not hide behind application symptoms.",
      ],
      ko: [
        "공통 경로 검증과 service별 점검을 분리해 공통 의존성이 애플리케이션 증상 뒤에 숨지 않도록 했습니다.",
      ],
    },
    implementation: {
      en: [
        "Coordinate NCP network and security integration, SSL offloading, VPN and DaaS interfaces through reviewed change and test sequences.",
      ],
      ko: [
        "NCP 네트워크·보안 연계, SSL offloading, VPN과 DaaS interface를 검토된 변경·테스트 순서로 조정했습니다.",
      ],
    },
    deployment: {
      en: [
        "Validate shared dependencies first, then service reachability, representative transactions and the return path.",
      ],
      ko: [
        "공통 의존성을 먼저 확인한 뒤 service 연결, 대표 transaction과 return path 순서로 검증했습니다.",
      ],
    },
    observability: {
      en: [
        "Align network state, security events, load-balancer health and application checks to the same test window.",
      ],
      ko: [
        "네트워크 상태, 보안 이벤트, load balancer health와 애플리케이션 점검을 같은 테스트 시간대에 맞췄습니다.",
      ],
    },
    failureScenarios: {
      en: [
        "Distinguish reachability, inspection, SSL, load-balancing, application-readiness and return-path failures.",
      ],
      ko: [
        "연결, inspection, SSL, load balancing, 애플리케이션 readiness와 return path 장애를 구분했습니다.",
      ],
    },
    troubleshooting: {
      en: [
        "Reproduce one request and move hop by hop using evidence from both sides of every interface.",
      ],
      ko: ["하나의 요청을 재현하고 모든 interface 양쪽의 증거를 비교하며 hop 단위로 이동했습니다."],
    },
    productionConsiderations: cloudChecks,
    lessonsLearned: {
      en: [
        "A test plan becomes operationally useful when every step names expected evidence, a stop condition and the rollback owner.",
      ],
      ko: [
        "각 단계에 예상 증거, 중단 조건과 rollback 책임자가 있어야 테스트 계획을 운영 절차로 사용할 수 있습니다.",
      ],
    },
  },
});

export const cloudSecurityProjects = [
  cbdcInfrastructure,
  cbdcUsabilityTest,
  cloudCompact({
    slug: "amorepacific-aws-migration",
    title: { en: "Amorepacific AWS Migration", ko: "아모레퍼시픽 AWS Migration" },
    summary: {
      en: "Supported the infrastructure transition from on-premises systems to AWS, including dependency review and cutover scope.",
      ko: "온프레미스 시스템을 AWS로 전환하며 인프라 의존성 검토와 cutover 범위를 담당했습니다.",
    },
    client: "아모레퍼시픽",
    period: "2023.01–2023.10",
    role: { en: "Solutions Architect", ko: "SA" },
    technologies: ["AWS", "Migration", "Network", "Compute"],
    scope: {
      en: [
        "Review on-premises dependencies and AWS target boundaries.",
        "Define cutover and rollback checkpoints for the migration.",
      ],
      ko: [
        "온프레미스 의존성과 AWS target 경계를 검토했습니다.",
        "Migration cutover와 rollback 점검 지점을 정의했습니다.",
      ],
    },
  }),
  cloudCompact({
    slug: "amorepacific-aws-operations",
    title: { en: "Amorepacific AWS Operations", ko: "아모레퍼시픽 AWS 운영" },
    summary: {
      en: "Operated AWS infrastructure with change review, monitoring and service-health verification.",
      ko: "변경 검토, 모니터링과 서비스 상태 확인을 기준으로 AWS 인프라를 운영했습니다.",
    },
    client: "아모레퍼시픽",
    period: "2023.11–2025.04",
    role: { en: "Operations Solutions Architect", ko: "운영 SA" },
    technologies: ["AWS", "Operations", "Monitoring"],
    scope: {
      en: [
        "Operate AWS infrastructure through reviewed changes.",
        "Connect monitoring signals to representative service checks.",
      ],
      ko: [
        "검토된 변경 절차로 AWS 인프라를 운영했습니다.",
        "모니터링 신호와 대표 서비스 점검을 연결했습니다.",
      ],
    },
  }),
  cloudCompact({
    slug: "moim-metaverse-devops",
    title: { en: "MOIM Metaverse DevOps", ko: "MOIM 메타버스 DevOps" },
    summary: {
      en: "Led the DevOps function for a metaverse platform and coordinated cloud delivery boundaries.",
      ko: "메타버스 플랫폼의 DevOps 팀을 이끌고 클라우드 delivery 경계를 조정했습니다.",
    },
    client: "MOIM",
    period: "2022.01–2023.01",
    role: { en: "DevOps Team Lead", ko: "DevOps 차장 팀장" },
    technologies: ["DevOps", "Cloud", "CI/CD"],
    scope: {
      en: [
        "Coordinate DevOps delivery and operational hand-off.",
        "Keep deployment, monitoring and rollback responsibilities explicit.",
      ],
      ko: [
        "DevOps delivery와 운영 인계를 조정했습니다.",
        "배포, 모니터링과 rollback 책임 경계를 명시했습니다.",
      ],
    },
  }),
  cloudCompact({
    slug: "skt-tdeal-aws-operations",
    title: { en: "SKT T deal AWS Operations", ko: "SKT T deal AWS 운영" },
    summary: {
      en: "Maintained AWS infrastructure for the T deal service and handled reviewed operational changes.",
      ko: "T deal 서비스의 AWS 인프라 유지보수와 검토된 운영 변경을 담당했습니다.",
    },
    client: "SKT",
    period: "2018.12–2021.09",
    role: { en: "Cloud Infrastructure Engineer", ko: "Cloud Infrastructure Engineer" },
    technologies: ["AWS", "Operations"],
    scope: {
      en: [
        "Maintain service infrastructure and operational dependencies.",
        "Verify component health and representative service paths after change.",
      ],
      ko: [
        "서비스 인프라와 운영 의존성을 유지보수했습니다.",
        "변경 후 컴포넌트 상태와 대표 서비스 경로를 확인했습니다.",
      ],
    },
  }),
  cloudCompact({
    slug: "skt-tdeal-terraform-infrastructure",
    title: { en: "SKT T deal Terraform Infrastructure", ko: "SKT T deal Terraform 인프라 구축" },
    summary: {
      en: "Built T deal service infrastructure with Terraform-based, reviewable infrastructure definitions.",
      ko: "Terraform 기반의 검토 가능한 인프라 정의로 T deal 서비스 인프라를 구축했습니다.",
    },
    client: "SKT",
    period: "2018.12–2021.09",
    role: { en: "Cloud Infrastructure Engineer", ko: "Cloud Infrastructure Engineer" },
    technologies: ["AWS", "Terraform", "IaC"],
    scope: {
      en: [
        "Express service infrastructure as reviewed Terraform changes.",
        "Separate plan review, apply order and post-change verification.",
      ],
      ko: [
        "서비스 인프라를 검토 가능한 Terraform 변경으로 표현했습니다.",
        "Plan 검토, apply 순서와 변경 후 검증을 분리했습니다.",
      ],
    },
  }),
  cloudCompact({
    slug: "skt-tdeal-data-cost-review",
    title: { en: "SKT T deal Data Cost Review", ko: "SKT T deal 데이터 비용 검토" },
    summary: {
      en: "Tested EMR and Athena options to review the cost boundary of an AWS Glue-related data workload.",
      ko: "AWS Glue 관련 데이터 workload의 비용 경계를 검토하기 위해 EMR과 Athena를 테스트했습니다.",
    },
    client: "SKT",
    period: "2018.12–2021.09",
    role: { en: "Cloud Infrastructure Engineer", ko: "Cloud Infrastructure Engineer" },
    technologies: ["AWS Glue", "EMR", "Spark", "Zeppelin", "Athena"],
    scope: {
      en: [
        "Compare EMR and Athena operating models for the target workload.",
        "Review service boundaries that influence execution and cost.",
      ],
      ko: [
        "대상 workload에서 EMR과 Athena 운영 방식을 비교했습니다.",
        "실행과 비용에 영향을 주는 서비스 경계를 검토했습니다.",
      ],
    },
  }),
  cloudCompact({
    slug: "skt-tdeal-cross-account-monitoring",
    title: {
      en: "SKT T deal Cross-Account Monitoring",
      ko: "SKT T deal Cross-Account Monitoring 구축",
    },
    summary: {
      en: "Built a cross-account monitoring view for AWS operational signals.",
      ko: "AWS 운영 신호를 계정 경계 너머에서 확인할 수 있는 cross-account monitoring을 구축했습니다.",
    },
    client: "SKT",
    period: "2018.12–2021.09",
    role: { en: "Cloud Infrastructure Engineer", ko: "Cloud Infrastructure Engineer" },
    technologies: ["AWS", "CloudWatch", "Multi-Account"],
    scope: {
      en: [
        "Define monitoring visibility across account boundaries.",
        "Keep source-account ownership and central observation responsibilities separate.",
      ],
      ko: [
        "계정 경계를 넘는 모니터링 가시성을 정의했습니다.",
        "Source account 소유권과 중앙 관측 책임을 구분했습니다.",
      ],
    },
  }),
  cloudCompact({
    slug: "metanet-agile-aws-migration",
    title: { en: "Metanet Agile AWS Migration", ko: "메타넷 에자일 AWS Migration" },
    summary: {
      en: "Participated in transitioning infrastructure workloads to AWS.",
      ko: "인프라 workload를 AWS로 전환하는 migration 업무를 수행했습니다.",
    },
    client: "메타넷 에자일",
    period: "2018.12–2021.09",
    role: { en: "Cloud Infrastructure Engineer", ko: "Cloud Infrastructure Engineer" },
    technologies: ["AWS", "Migration"],
    scope: {
      en: [
        "Review source and AWS target infrastructure dependencies.",
        "Support migration sequencing and post-cutover checks.",
      ],
      ko: [
        "Source와 AWS target 인프라 의존성을 검토했습니다.",
        "Migration 순서와 cutover 후 점검을 지원했습니다.",
      ],
    },
  }),
  cloudCompact({
    slug: "skcc-wdp-gcp-infrastructure",
    title: { en: "SK C&C WDP GCP Infrastructure", ko: "SK C&C WDP GCP 인프라 구축" },
    summary: {
      en: "Built Google Cloud infrastructure for the WDP workload.",
      ko: "WDP workload를 위한 Google Cloud 인프라를 구축했습니다.",
    },
    client: "SK C&C",
    period: "2018.12–2021.09",
    role: { en: "Cloud Infrastructure Engineer", ko: "Cloud Infrastructure Engineer" },
    technologies: ["GCP", "Cloud Infrastructure"],
    scope: {
      en: [
        "Define the GCP infrastructure boundary for WDP.",
        "Verify connectivity and service readiness after provisioning.",
      ],
      ko: [
        "WDP의 GCP 인프라 경계를 정의했습니다.",
        "Provisioning 후 연결과 서비스 readiness를 확인했습니다.",
      ],
    },
  }),
  cloudCompact({
    slug: "sk-ec-iot-gcp-landing-zone",
    title: { en: "SK E&C IoT GCP Landing Zone", ko: "SK건설 IoT GCP Landing Zone" },
    summary: {
      en: "Built a Google Cloud landing zone for an IoT workload.",
      ko: "IoT workload를 위한 Google Cloud landing zone을 구축했습니다.",
    },
    client: "SK건설",
    period: "2018.12–2021.09",
    role: { en: "Cloud Infrastructure Engineer", ko: "Cloud Infrastructure Engineer" },
    technologies: ["GCP", "Landing Zone", "IoT"],
    scope: {
      en: [
        "Define the landing-zone account, network and operational boundaries.",
        "Prepare the shared foundation for the IoT workload.",
      ],
      ko: [
        "Landing zone의 계정, 네트워크와 운영 경계를 정의했습니다.",
        "IoT workload가 사용할 공통 기반을 구성했습니다.",
      ],
    },
  }),
  cloudCompact({
    slug: "sk-innovation-baas-azure-pipeline",
    title: { en: "SK Innovation Azure BaaS Pipeline", ko: "SK이노베이션 Azure BaaS Pipeline" },
    summary: {
      en: "Built the infrastructure and delivery pipeline boundary for a BaaS platform on Azure.",
      ko: "Azure 기반 BaaS 플랫폼의 인프라와 delivery pipeline 경계를 구축했습니다.",
    },
    client: "SK이노베이션",
    period: "2018.12–2021.09",
    role: { en: "Cloud Infrastructure Engineer", ko: "Cloud Infrastructure Engineer" },
    technologies: ["Azure", "BaaS", "Pipeline"],
    scope: {
      en: [
        "Build the platform infrastructure boundary on Azure.",
        "Connect pipeline stages to controlled deployment and verification steps.",
      ],
      ko: [
        "Azure에서 플랫폼 인프라 경계를 구축했습니다.",
        "Pipeline 단계를 통제된 배포와 검증 절차에 연결했습니다.",
      ],
    },
  }),
];
