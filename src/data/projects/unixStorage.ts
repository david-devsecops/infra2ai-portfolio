import { compactCareerProject, deepCareerProject } from "./careerProject.ts";

const migrationChecks = {
  en: [
    "Confirm console access, I/O paths and filesystem visibility before service validation.",
    "Run representative service checks after the infrastructure boundary is stable.",
    "Keep the source system and rollback route available until acceptance is recorded.",
  ],
  ko: [
    "대표 업무 검증 전에 console 접근, I/O path와 filesystem 가시성을 확인합니다.",
    "인프라 경계가 안정된 뒤 대표 service 점검을 수행합니다.",
    "인수 확인 전까지 source 시스템과 rollback 경로를 유지합니다.",
  ],
};

const migrationFailures = {
  en: [
    "The target boots but one storage path, filesystem or service dependency is incomplete.",
    "Data is visible while the expected service identity or cluster registration is missing.",
  ],
  ko: [
    "Target은 boot되지만 storage path, filesystem 또는 service 의존성 일부가 누락되는 경우를 분리합니다.",
    "데이터는 보이지만 필요한 service identity나 cluster 등록이 빠진 경우를 확인합니다.",
  ],
};

function migrationProject(
  input: Omit<Parameters<typeof compactCareerProject>[0], "group" | "checks" | "failures">,
) {
  return compactCareerProject({
    ...input,
    group: "unix-storage",
    checks: migrationChecks,
    failures: migrationFailures,
  });
}

const knccsOperations = deepCareerProject({
  slug: "knccs-enterprise-infrastructure-operations",
  title: {
    en: "KNCCS Enterprise Infrastructure Operations",
    ko: "해군 C4I(KNCCS) 엔터프라이즈 인프라 운영",
  },
  summary: {
    en: "Technical lead work across Solaris, Oracle RAC, storage, tape, Veritas Volume Manager, NetBackup and JEUS operations.",
    ko: "Solaris, Oracle RAC, storage, tape, Veritas Volume Manager, NetBackup와 JEUS 운영을 기술 PL로 담당했습니다.",
  },
  client: "해군 C4I(KNCCS)",
  period: "2010.12–2013.08",
  periodLabel: { ko: "소속 재직기간", en: "Employment period" },
  affiliation: {
    ko: "쌍용정보기술 · 기술지원부 과장 팀장",
    en: "쌍용정보기술 · Technical Support Manager / Team Lead",
  },
  role: { en: "Technical Lead", ko: "기술 PL" },
  group: "unix-storage",
  technologies: [
    "Solaris",
    "Oracle RAC",
    "Storage",
    "Tape",
    "Veritas Volume Manager",
    "NetBackup",
    "JEUS",
  ],
  sections: {
    overview: {
      en: [
        "I operated an enterprise stack in which UNIX hosts, database clusters, SAN storage, volume management, backup and middleware shared one service path.",
        "As technical lead, the practical responsibility was to keep change evidence, ownership and recovery order connected across those layers.",
      ],
      ko: [
        "UNIX host, DB cluster, SAN storage, volume 관리, backup과 middleware가 하나의 서비스 경로를 이루는 엔터프라이즈 환경을 운영했습니다.",
        "기술 PL로서 계층별 변경 증거, 담당 경계와 복구 순서를 하나의 운영 흐름으로 연결했습니다.",
      ],
    },
    problem: {
      en: [
        "A filesystem symptom could originate in a volume, multipath, HBA, fabric, array or backup dependency, while a database or middleware symptom could be downstream evidence only.",
      ],
      ko: [
        "Filesystem 증상이 volume, multipath, HBA, fabric, array 또는 backup 의존성에서 시작할 수 있었고 DB·middleware 증상은 하위 장애의 결과일 수 있었습니다.",
      ],
    },
    architecture: {
      en: [
        "Use the boundary sequence Filesystem → Volume → Multipath → HBA → SAN Fabric → Array, then connect database, middleware and backup dependencies to the same map.",
        "Treat the tape and NetBackup path as a recovery system, not an isolated job scheduler.",
      ],
      ko: [
        "Filesystem → Volume → Multipath → HBA → SAN Fabric → Array 순서로 경계를 나누고 DB, middleware와 backup 의존성을 같은 지도에 연결했습니다.",
        "Tape와 NetBackup 경로를 독립된 job scheduler가 아니라 복구 시스템으로 다뤘습니다.",
      ],
    },
    implementation: {
      en: [
        "Operate Solaris, Oracle RAC, storage and JEUS changes through reviewed procedures with explicit pre-check, stop, rollback and post-check stages.",
        "Use VxVM and multipath evidence to identify whether a visible disk issue belongs to the host, path, fabric or array boundary.",
      ],
      ko: [
        "Solaris, Oracle RAC, storage와 JEUS 변경을 사전 점검, 중단, rollback과 사후 점검 단계가 있는 검토 절차로 수행했습니다.",
        "VxVM과 multipath 증거로 디스크 증상이 host, path, fabric와 array 중 어느 경계에 있는지 구분했습니다.",
      ],
    },
    observability: {
      en: [
        "Align host logs, volume state, path state, fabric and array events, database state and backup results on the same incident window.",
        "Record what each healthy signal proves and what it cannot prove.",
      ],
      ko: [
        "Host log, volume 상태, path 상태, fabric·array 이벤트, DB 상태와 backup 결과를 같은 장애 시간대에 맞췄습니다.",
        "각 정상 신호가 증명하는 범위와 증명하지 못하는 범위를 함께 기록했습니다.",
      ],
    },
    failureScenarios: {
      en: [
        "A filesystem remains mounted while redundancy has already been lost on one path.",
        "Every host path appears online while array latency degrades the service.",
        "A backup job completes while required recovery dependencies or validation steps remain untested.",
      ],
      ko: [
        "Filesystem은 mount 상태지만 한 path의 redundancy가 이미 손실된 경우를 구분했습니다.",
        "Host path가 모두 online이어도 array 지연으로 서비스가 느려지는 경우를 확인했습니다.",
        "Backup job은 성공했지만 필요한 복구 의존성이나 검증 단계가 확인되지 않은 경우를 별도로 다뤘습니다.",
      ],
    },
    troubleshooting: {
      en: [
        "Preserve evidence before replacement, isolate the smallest failed boundary and make one reversible change at a time.",
        "After hardware or path work, validate redundancy and service behaviour rather than stopping at device visibility.",
      ],
      ko: [
        "교체 전에 증거를 보존하고 가장 작은 장애 경계를 찾은 뒤 한 번에 하나의 복구 가능한 변경만 수행했습니다.",
        "Hardware·path 작업 후 장치 가시성에서 끝내지 않고 redundancy와 service 동작을 확인했습니다.",
      ],
    },
    productionConsiderations: {
      en: [
        "Keep console access, spare-path state, backup dependencies and a tested rollback procedure available before maintenance.",
        "Do not expose host names, device IDs, capacities, topology or customer procedures in public runbooks.",
      ],
      ko: [
        "유지보수 전에 console 접근, 예비 path 상태, backup 의존성과 검증된 rollback 절차를 준비했습니다.",
        "공개 Runbook에는 host명, 장비 ID, 용량, topology와 고객 절차를 사용하지 않습니다.",
      ],
    },
    lessonsLearned: {
      en: [
        "The same boundary method still applies to cloud block storage: visibility, redundancy, performance, data protection and recoverability are different claims.",
      ],
      ko: [
        "같은 경계 분리 방식은 Cloud block storage에도 적용됩니다. 가시성, redundancy, 성능, 데이터 보호와 복구 가능성은 서로 다른 주장입니다.",
      ],
    },
  },
});

export const unixStorageProjects = [
  migrationProject({
    slug: "korea-money-brokerage-info-migration",
    title: {
      en: "Korea Money Brokerage Information-System Migration",
      ko: "외환선물 정보계 시스템 Migration",
    },
    summary: {
      en: "Migrated the information-system workload from a legacy Solaris platform to a newer Solaris server boundary.",
      ko: "정보계 workload를 기존 Solaris 플랫폼에서 신규 Solaris 서버 경계로 migration했습니다.",
    },
    client: "외환선물",
    period: "2013.08–2014.11",
    periodLabel: { ko: "소속 재직기간", en: "Employment period" },
    affiliation: { ko: "해오름기술 · 기술지원팀", en: "해오름기술 · Technical Support Team" },
    role: { en: "UNIX Migration Engineer", ko: "UNIX Migration Engineer" },
    technologies: ["Solaris", "SF4800", "T5-2", "Migration"],
    scope: {
      en: [
        "Sequence UNIX system, storage visibility and service transition checks.",
        "Preserve a rollback route until information-system acceptance.",
      ],
      ko: [
        "UNIX 시스템, storage 가시성과 service 전환 점검 순서를 구성했습니다.",
        "정보계 인수 확인 전까지 rollback 경로를 유지했습니다.",
      ],
    },
  }),
  migrationProject({
    slug: "korea-money-brokerage-business-migration",
    title: {
      en: "Korea Money Brokerage Business-System Migration",
      ko: "외환선물 업무계 시스템 Migration",
    },
    summary: {
      en: "Migrated the business-system workload between Solaris server platforms.",
      ko: "업무계 workload를 Solaris 서버 플랫폼 사이에서 migration했습니다.",
    },
    client: "외환선물",
    period: "2013.08–2014.11",
    periodLabel: { ko: "소속 재직기간", en: "Employment period" },
    affiliation: { ko: "해오름기술 · 기술지원팀", en: "해오름기술 · Technical Support Team" },
    role: { en: "UNIX Migration Engineer", ko: "UNIX Migration Engineer" },
    technologies: ["Solaris", "SF4900", "M10-4", "Migration"],
    scope: {
      en: [
        "Coordinate system migration and business-service cutover boundaries.",
        "Validate the target from console and I/O path through representative service checks.",
      ],
      ko: [
        "시스템 migration과 업무 service cutover 경계를 조정했습니다.",
        "Console과 I/O path부터 대표 service 점검까지 target을 확인했습니다.",
      ],
    },
  }),
  migrationProject({
    slug: "korea-money-brokerage-dr-storage-migration",
    title: {
      en: "Korea Money Brokerage DR Storage Migration",
      ko: "외환선물 DR Storage Migration",
    },
    summary: {
      en: "Built the disaster-recovery storage boundary and migrated volumes between enterprise arrays.",
      ko: "재해복구 storage 경계를 구축하고 enterprise array 사이의 volume을 migration했습니다.",
    },
    client: "외환선물",
    period: "2013.08–2014.11",
    periodLabel: { ko: "소속 재직기간", en: "Employment period" },
    affiliation: { ko: "해오름기술 · 기술지원팀", en: "해오름기술 · Technical Support Team" },
    role: { en: "UNIX and Storage Migration Engineer", ko: "UNIX·Storage Migration Engineer" },
    technologies: ["EMC DMX3-950", "VMAX 10K", "DR", "Volume Migration"],
    scope: {
      en: [
        "Build the DR storage target and volume-migration sequence.",
        "Verify host visibility, path redundancy, volume state and service readiness.",
      ],
      ko: [
        "DR storage target과 volume migration 순서를 구성했습니다.",
        "Host 가시성, path redundancy, volume 상태와 service readiness를 확인했습니다.",
      ],
    },
  }),
  knccsOperations,
];
