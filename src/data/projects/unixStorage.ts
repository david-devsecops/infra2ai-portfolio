import { compactCareerProject, deepCareerProject } from "./careerProject.ts";

const migrationChecks = {
  en: [
    "Confirm console access, I/O paths and filesystem visibility before service validation.",
    "Run representative service checks after the infrastructure boundary is stable.",
    "Keep the source system and rollback route available until acceptance is recorded.",
  ],
  ko: [
    "대표 업무 검증 전에 콘솔 접근, I/O 경로와 파일시스템 가시성을 확인합니다.",
    "인프라 경계가 안정된 뒤 대표 서비스 점검을 수행합니다.",
    "인수 확인 전까지 원본 시스템과 롤백 경로를 유지합니다.",
  ],
};

const migrationFailures = {
  en: [
    "The target boots but one storage path, filesystem or service dependency is incomplete.",
    "Data is visible while the expected service identity or cluster registration is missing.",
  ],
  ko: [
    "대상은 부팅되지만 스토리지 경로, 파일시스템 또는 서비스 의존성 일부가 누락되는 경우를 분리합니다.",
    "데이터는 보이지만 필요한 서비스 식별정보나 클러스터 등록이 빠진 경우를 확인합니다.",
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
    ko: "Solaris, Oracle RAC, 스토리지, 테이프, Veritas Volume Manager, NetBackup와 JEUS 운영을 기술 PL로 담당했습니다.",
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
        "UNIX 호스트, DB 클러스터, SAN 스토리지, 볼륨 관리, 백업과 미들웨어가 하나의 서비스 경로를 이루는 엔터프라이즈 환경을 운영했습니다.",
        "기술 PL로서 계층별 변경 증거, 담당 경계와 복구 순서를 하나의 운영 흐름으로 연결했습니다.",
      ],
    },
    problem: {
      en: [
        "A filesystem symptom could originate in a volume, multipath, HBA, fabric, array or backup dependency, while a database or middleware symptom could be downstream evidence only.",
      ],
      ko: [
        "파일시스템 증상이 볼륨, multipath, HBA, fabric, 스토리지 장비 또는 백업 의존성에서 시작할 수 있었고 DB·미들웨어 증상은 하위 장애의 결과일 수 있었습니다.",
      ],
    },
    architecture: {
      en: [
        "Use the boundary sequence Filesystem → Volume → Multipath → HBA → SAN Fabric → Array, then connect database, middleware and backup dependencies to the same map.",
        "Treat the tape and NetBackup path as a recovery system, not an isolated job scheduler.",
      ],
      ko: [
        "파일시스템 → 볼륨 → Multipath → HBA → SAN Fabric → 스토리지 장비 순서로 경계를 나누고 DB, 미들웨어와 백업 의존성을 같은 지도에 연결했습니다.",
        "테이프와 NetBackup 경로를 독립된 작업 스케줄러가 아니라 복구 시스템으로 다뤘습니다.",
      ],
    },
    implementation: {
      en: [
        "Operate Solaris, Oracle RAC, storage and JEUS changes through reviewed procedures with explicit pre-check, stop, rollback and post-check stages.",
        "Use VxVM and multipath evidence to identify whether a visible disk issue belongs to the host, path, fabric or array boundary.",
      ],
      ko: [
        "Solaris, Oracle RAC, 스토리지와 JEUS 변경을 사전 점검, 중단, 롤백과 사후 점검 단계가 있는 검토 절차로 수행했습니다.",
        "VxVM과 multipath 증거로 디스크 증상이 호스트, 경로, fabric와 스토리지 장비 중 어느 경계에 있는지 구분했습니다.",
      ],
    },
    observability: {
      en: [
        "Align host logs, volume state, path state, fabric and array events, database state and backup results on the same incident window.",
        "Record what each healthy signal proves and what it cannot prove.",
      ],
      ko: [
        "호스트 로그, 볼륨 상태, 경로 상태, fabric·스토리지 장비 이벤트, DB 상태와 백업 결과를 같은 장애 시간대에 맞췄습니다.",
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
        "파일시스템은 mount 상태지만 한 경로의 이중화가 이미 손실된 경우를 구분했습니다.",
        "호스트 경로가 모두 online이어도 스토리지 장비 지연으로 서비스가 느려지는 경우를 확인했습니다.",
        "백업 작업은 성공했지만 필요한 복구 의존성이나 검증 단계가 확인되지 않은 경우를 별도로 다뤘습니다.",
      ],
    },
    troubleshooting: {
      en: [
        "Preserve evidence before replacement, isolate the smallest failed boundary and make one reversible change at a time.",
        "After hardware or path work, validate redundancy and service behaviour rather than stopping at device visibility.",
      ],
      ko: [
        "교체 전에 증거를 보존하고 가장 작은 장애 경계를 찾은 뒤 한 번에 하나의 복구 가능한 변경만 수행했습니다.",
        "하드웨어·경로 작업 후 장치 가시성에서 끝내지 않고 이중화와 서비스 동작을 확인했습니다.",
      ],
    },
    productionConsiderations: {
      en: [
        "Keep console access, spare-path state, backup dependencies and a tested rollback procedure available before maintenance.",
        "Do not expose host names, device IDs, capacities, topology or customer procedures in public runbooks.",
      ],
      ko: [
        "유지보수 전에 콘솔 접근, 예비 경로 상태, 백업 의존성과 검증된 롤백 절차를 준비했습니다.",
        "공개 Runbook에는 호스트명, 장비 ID, 용량, 구성도와 고객 절차를 사용하지 않습니다.",
      ],
    },
    lessonsLearned: {
      en: [
        "The same boundary method still applies to cloud block storage: visibility, redundancy, performance, data protection and recoverability are different claims.",
      ],
      ko: [
        "같은 경계 분리 방식은 클라우드 블록 스토리지에도 적용됩니다. 가시성, 이중화, 성능, 데이터 보호와 복구 가능성은 서로 다른 주장입니다.",
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
      ko: "정보계 워크로드를 기존 Solaris 플랫폼에서 신규 Solaris 서버 경계로 이관했습니다.",
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
        "UNIX 시스템, 스토리지 가시성과 서비스 전환 점검 순서를 구성했습니다.",
        "정보계 인수 확인 전까지 롤백 경로를 유지했습니다.",
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
      ko: "업무계 워크로드를 Solaris 서버 플랫폼 사이에서 이관했습니다.",
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
        "시스템 이관과 업무 서비스 전환 경계를 조정했습니다.",
        "콘솔과 I/O 경로부터 대표 서비스 점검까지 대상을 확인했습니다.",
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
      ko: "재해복구 스토리지 경계를 구축하고 엔터프라이즈 스토리지 사이의 볼륨을 이관했습니다.",
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
        "DR 스토리지 대상과 볼륨 이관 순서를 구성했습니다.",
        "호스트 가시성, 경로 이중화, 볼륨 상태와 서비스 준비 상태를 확인했습니다.",
      ],
    },
  }),
  knccsOperations,
];
