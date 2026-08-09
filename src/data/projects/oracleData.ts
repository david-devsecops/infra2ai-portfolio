import { compactCareerProject } from "./careerProject.ts";

const oracleChecks = {
  en: [
    "Confirm instance or cluster state and storage or ASM visibility before change.",
    "Review backup dependencies and representative business validation steps.",
    "Keep isolation and rollback criteria explicit before migration or recovery work.",
  ],
  ko: [
    "변경 전 instance·cluster 상태와 storage·ASM 가시성을 확인합니다.",
    "Backup 의존성과 대표 업무 검증 단계를 함께 검토합니다.",
    "Migration·복구 전에 격리와 rollback 판단 기준을 명시합니다.",
  ],
};

function oracleProject(
  input: Omit<Parameters<typeof compactCareerProject>[0], "group" | "checks">,
) {
  return compactCareerProject({ ...input, group: "oracle-data", checks: oracleChecks });
}

export const oracleDataProjects = [
  oracleProject({
    slug: "shinhan-zdlra-maintenance",
    title: { en: "Shinhan DS ZDLRA Maintenance", ko: "신한DS ZDLRA 유지보수" },
    summary: {
      en: "Provided maintenance support for Oracle Zero Data Loss Recovery Appliance.",
      ko: "Oracle Zero Data Loss Recovery Appliance 유지보수 기술지원을 담당했습니다.",
    },
    client: "신한DS",
    period: "2018.12–2021.09",
    role: { en: "Oracle Data Protection Engineer", ko: "Oracle·Data Protection Engineer" },
    technologies: ["Oracle", "ZDLRA"],
    scope: {
      en: [
        "Support ZDLRA maintenance and operating checks.",
        "Separate appliance state, protected-database state and recovery readiness.",
      ],
      ko: [
        "ZDLRA 유지보수와 운영 점검을 지원했습니다.",
        "Appliance 상태, 보호 DB 상태와 복구 준비 상태를 구분했습니다.",
      ],
    },
  }),
  oracleProject({
    slug: "kbcard-zdlra-build",
    title: { en: "KB Card ZDLRA Build", ko: "KB카드 ZDLRA 구축" },
    summary: {
      en: "Built Oracle ZDLRA data-protection infrastructure and its database protection boundary.",
      ko: "Oracle ZDLRA 데이터 보호 인프라와 DB 보호 경계를 구축했습니다.",
    },
    client: "KB카드",
    period: "2018.12–2021.09",
    role: { en: "Oracle Data Protection Engineer", ko: "Oracle·Data Protection Engineer" },
    technologies: ["Oracle", "ZDLRA"],
    scope: {
      en: [
        "Build the ZDLRA platform boundary.",
        "Define protected-database integration and verification points.",
      ],
      ko: ["ZDLRA 플랫폼 경계를 구축했습니다.", "보호 DB 연계와 검증 지점을 정의했습니다."],
    },
  }),
  oracleProject({
    slug: "nps-zdlra-build",
    title: { en: "National Pension Service ZDLRA Build", ko: "국민연금 경영·기금 ZDLRA 구축" },
    summary: {
      en: "Built ZDLRA infrastructure for National Pension Service management and fund environments.",
      ko: "국민연금 경영·기금 환경의 ZDLRA 인프라를 구축했습니다.",
    },
    client: "국민연금 경영·기금",
    period: "2018.12–2021.09",
    role: { en: "Oracle Data Protection Engineer", ko: "Oracle·Data Protection Engineer" },
    technologies: ["Oracle", "ZDLRA"],
    scope: {
      en: [
        "Build the recovery-appliance foundation for separate database domains.",
        "Define integration and validation boundaries without exposing database identities.",
      ],
      ko: [
        "분리된 DB 영역을 위한 recovery appliance 기반을 구축했습니다.",
        "DB 식별값을 공개하지 않고 연계와 검증 경계를 정의했습니다.",
      ],
    },
  }),
  oracleProject({
    slug: "woorifis-zdlra-maintenance",
    title: { en: "Woori FIS ZDLRA Maintenance", ko: "우리FIS ZDLRA 유지보수" },
    summary: {
      en: "Provided ZDLRA maintenance support for the protected database environment.",
      ko: "보호 DB 환경을 위한 ZDLRA 유지보수 기술지원을 담당했습니다.",
    },
    client: "우리FIS",
    period: "2018.12–2021.09",
    role: { en: "Oracle Data Protection Engineer", ko: "Oracle·Data Protection Engineer" },
    technologies: ["Oracle", "ZDLRA"],
    scope: {
      en: [
        "Support appliance and protection-flow maintenance.",
        "Keep backup collection status separate from recoverability checks.",
      ],
      ko: [
        "Appliance와 보호 흐름의 유지보수를 지원했습니다.",
        "Backup 수집 상태와 복구 가능성 점검을 구분했습니다.",
      ],
    },
  }),
  oracleProject({
    slug: "suhyup-zdlra-build-maintenance",
    title: { en: "Suhyup ZDLRA Build and Maintenance", ko: "수협 ZDLRA 구축·유지보수" },
    summary: {
      en: "Built and maintained Oracle ZDLRA data-protection infrastructure.",
      ko: "Oracle ZDLRA 데이터 보호 인프라 구축과 유지보수를 담당했습니다.",
    },
    client: "수협",
    period: "2018.12–2021.09",
    role: { en: "Oracle Data Protection Engineer", ko: "Oracle·Data Protection Engineer" },
    technologies: ["Oracle", "ZDLRA"],
    scope: {
      en: [
        "Build the ZDLRA platform and protected-database interfaces.",
        "Carry the build validation model into maintenance checks.",
      ],
      ko: [
        "ZDLRA 플랫폼과 보호 DB interface를 구축했습니다.",
        "구축 검증 기준을 유지보수 점검으로 이어갔습니다.",
      ],
    },
  }),
  oracleProject({
    slug: "kwangju-bank-zdlra-maintenance",
    title: { en: "Kwangju Bank ZDLRA Maintenance", ko: "광주은행 ZDLRA 유지보수" },
    summary: {
      en: "Provided maintenance support for the bank's ZDLRA environment.",
      ko: "광주은행 ZDLRA 환경의 유지보수 기술지원을 담당했습니다.",
    },
    client: "광주은행",
    period: "2018.12–2021.09",
    role: { en: "Oracle Data Protection Engineer", ko: "Oracle·Data Protection Engineer" },
    technologies: ["Oracle", "ZDLRA"],
    scope: {
      en: [
        "Support ZDLRA operating checks and maintenance changes.",
        "Verify the protection flow at appliance and database boundaries.",
      ],
      ko: [
        "ZDLRA 운영 점검과 유지보수 변경을 지원했습니다.",
        "Appliance와 DB 경계에서 보호 흐름을 확인했습니다.",
      ],
    },
  }),
  oracleProject({
    slug: "didc-oracle-hardware-maintenance",
    title: {
      en: "DIDC Oracle Hardware Maintenance",
      ko: "국방통합데이터센터 Oracle Hardware 유지보수",
    },
    summary: {
      en: "Provided technical maintenance support for Oracle server hardware.",
      ko: "Oracle 서버 하드웨어 유지보수 기술지원을 담당했습니다.",
    },
    client: "국방통합데이터센터",
    period: "2016.09–2017.12",
    role: { en: "Oracle Hardware Technical Support", ko: "Oracle Hardware Technical Support" },
    technologies: ["Oracle Server", "Hardware"],
    scope: {
      en: [
        "Support server-hardware maintenance under controlled change.",
        "Preserve system evidence and verify service dependencies after work.",
      ],
      ko: [
        "통제된 변경 절차로 서버 하드웨어 유지보수를 지원했습니다.",
        "작업 전 증거를 보존하고 작업 후 서비스 의존성을 확인했습니다.",
      ],
    },
  }),
  oracleProject({
    slug: "kumho-tore-analysis",
    title: { en: "Kumho Oracle TORE Analysis", ko: "금호그룹 Oracle TORE 정밀분석" },
    summary: {
      en: "Performed an Oracle detailed-analysis service using TORE and performance evidence.",
      ko: "TORE와 성능 증거를 기반으로 Oracle 정밀분석 서비스를 수행했습니다.",
    },
    client: "금호그룹",
    period: "2015.01–2015.12",
    role: { en: "Database Engineer", ko: "Database Engineer" },
    technologies: ["Oracle Database", "TORE", "Performance Analysis"],
    scope: {
      en: [
        "Review Oracle performance evidence across related resource layers.",
        "Separate observation, hypothesis and recommended change.",
      ],
      ko: [
        "연관 자원 계층의 Oracle 성능 증거를 검토했습니다.",
        "관측 사실, 가설과 권고 변경을 구분했습니다.",
      ],
    },
  }),
  oracleProject({
    slug: "police-oracle-ogg-operations",
    title: { en: "Police Oracle and OGG Operations", ko: "경찰청 Oracle·OGG 운영" },
    summary: {
      en: "Maintained Oracle Database and handled Oracle GoldenGate operational responsibility.",
      ko: "Oracle Database 유지보수와 Oracle GoldenGate 운영을 담당했습니다.",
    },
    client: "경찰청",
    period: "2015.01–2015.12",
    role: { en: "Database Engineer", ko: "Database Engineer" },
    technologies: ["Oracle", "OGG", "Operations"],
    scope: {
      en: [
        "Maintain Oracle database services and OGG dependencies.",
        "Check source, replication process and target state as separate boundaries.",
      ],
      ko: [
        "Oracle DB 서비스와 OGG 의존성을 유지보수했습니다.",
        "Source, replication process와 target 상태를 별도 경계로 확인했습니다.",
      ],
    },
  }),
  oracleProject({
    slug: "sahmyook-registration-tuning",
    title: { en: "Sahmyook Registration Tuning", ko: "삼육대학교 수강신청 Tuning·Monitoring" },
    summary: {
      en: "Performed Oracle tuning and monitoring for the course-registration workload.",
      ko: "수강신청 workload의 Oracle tuning과 monitoring을 수행했습니다.",
    },
    client: "삼육대학교",
    period: "2015.01–2015.12",
    role: { en: "Database Engineer", ko: "Database Engineer" },
    technologies: ["Oracle", "Tuning", "Monitoring"],
    scope: {
      en: [
        "Observe database signals during the registration workload.",
        "Link SQL and instance observations to the affected business path.",
      ],
      ko: [
        "수강신청 workload 시간대의 DB 신호를 관측했습니다.",
        "SQL·instance 관측값을 영향받는 업무 경로와 연결했습니다.",
      ],
    },
  }),
  oracleProject({
    slug: "hospital-oracle-rac-build",
    title: { en: "Hospital Oracle RAC Build", ko: "병원 시스템 Oracle RAC 구축" },
    summary: {
      en: "Built an Oracle RAC database environment for a hospital system.",
      ko: "병원 시스템을 위한 Oracle RAC DB 환경을 구축했습니다.",
    },
    client: "병원 시스템",
    period: "2015.01–2015.12",
    role: { en: "Database Engineer", ko: "Database Engineer" },
    technologies: ["Oracle RAC"],
    scope: {
      en: [
        "Build the RAC cluster and database service boundary.",
        "Verify node, listener, service and shared-storage visibility.",
      ],
      ko: [
        "RAC cluster와 DB service 경계를 구축했습니다.",
        "Node, listener, service와 shared storage 가시성을 확인했습니다.",
      ],
    },
  }),
  oracleProject({
    slug: "atomy-esxi-oracle-rac",
    title: { en: "Atomy ESXi Oracle RAC", ko: "ATOMY ESXi 기반 Oracle RAC 구축" },
    summary: {
      en: "Built Oracle RAC in a virtualised ESXi environment.",
      ko: "ESXi 가상화 환경에서 Oracle RAC를 구축했습니다.",
    },
    client: "ATOMY",
    period: "2015.01–2015.12",
    role: { en: "Database Engineer", ko: "Database Engineer" },
    technologies: ["Oracle RAC", "ESXi"],
    scope: {
      en: [
        "Build RAC across virtual-machine and database boundaries.",
        "Verify virtual networking, shared storage, cluster and service state separately.",
      ],
      ko: [
        "VM과 DB 경계를 연결해 RAC를 구축했습니다.",
        "가상 네트워크, shared storage, cluster와 service 상태를 구분해 확인했습니다.",
      ],
    },
  }),
  oracleProject({
    slug: "lsg-db-migration-cluster",
    title: {
      en: "LSG Database Migration and Cluster Registration",
      ko: "LSG DB Migration·Cluster 등록",
    },
    summary: {
      en: "Performed an Oracle database migration and registered the migrated service with the cluster.",
      ko: "Oracle DB migration과 migration 대상의 cluster 등록을 수행했습니다.",
    },
    client: "LSG",
    period: "2015.01–2015.12",
    role: { en: "Database Engineer", ko: "Database Engineer" },
    technologies: ["Oracle", "DB Migration", "Cluster"],
    scope: {
      en: [
        "Sequence database migration and cluster registration.",
        "Verify database state, cluster resource and representative service connectivity.",
      ],
      ko: [
        "DB migration과 cluster 등록 순서를 구성했습니다.",
        "DB 상태, cluster resource와 대표 서비스 연결을 확인했습니다.",
      ],
    },
  }),
  oracleProject({
    slug: "kumho-aviation-rac-asm-rebuild",
    title: { en: "Kumho Aviation RAC ASM Rebuild", ko: "금호그룹 항공 RAC·ASM 재구축" },
    summary: {
      en: "Rebuilt Oracle RAC and ASM for an aviation workload.",
      ko: "항공 업무 환경의 Oracle RAC와 ASM을 재구축했습니다.",
    },
    client: "금호그룹 항공",
    period: "2015.01–2015.12",
    role: { en: "Database Engineer", ko: "Database Engineer" },
    technologies: ["Oracle RAC", "ASM"],
    scope: {
      en: [
        "Rebuild the RAC and ASM layers in a controlled sequence.",
        "Verify disk-group visibility, cluster state and database service readiness.",
      ],
      ko: [
        "RAC와 ASM 계층을 통제된 순서로 재구축했습니다.",
        "Disk group 가시성, cluster 상태와 DB service readiness를 확인했습니다.",
      ],
    },
  }),
  oracleProject({
    slug: "lina-life-oracle12c-asm",
    title: { en: "Lina Life Oracle 12c ASM Build", ko: "라이나생명 Oracle 12c·ASM 구축" },
    summary: {
      en: "Built an Oracle 12c single-instance database with ASM for the next-generation program.",
      ko: "차세대 사업에서 Oracle 12c single instance와 ASM 환경을 구축했습니다.",
    },
    client: "라이나생명",
    period: "2015.01–2015.12",
    role: { en: "Database Engineer", ko: "Database Engineer" },
    technologies: ["Oracle 12c", "Single Instance", "ASM"],
    scope: {
      en: [
        "Build the Oracle 12c instance and ASM storage boundary.",
        "Verify disk-group, listener, database and representative service state.",
      ],
      ko: [
        "Oracle 12c instance와 ASM storage 경계를 구축했습니다.",
        "Disk group, listener, DB와 대표 service 상태를 확인했습니다.",
      ],
    },
  }),
];
