import type { BlogPost } from "./types";

export const blogPosts: BlogPost[] = [
  {
    slug: "solaris-incident-analysis-order",
    series: {
      ko: "Legacy to Cloud — 운영 경험을 설계 원칙으로 바꾸기",
      en: "Legacy to Cloud — Turning Operations into Design Principles",
    },
    category: { ko: "Solaris · 성능분석", en: "Solaris · Performance Analysis" },
    title: {
      ko: "Solaris 장애 대응에서 가장 먼저 확인한 것",
      en: "What I Checked First During Solaris Incident Analysis",
    },
    summary: {
      ko: "Solaris 장애를 분석할 때 CPU, 실행 대기열, 메모리와 디스크를 어떤 순서로 확인했는지 정리했습니다.",
      en: "The order I used to check CPU, run queues, memory and disks when investigating Solaris incidents.",
    },
    englishAbstract: [
      "Across public-sector Solaris performance work, I used a recurring sequence: CPU, run queue, processes, memory, paging, swap, disk, filesystem capacity and network signals, compared by date, weekday and hour.",
      "I checked whether each signal persisted, compared it with related signals and narrowed down the likely failure point. After a change, I checked the same metrics again.",
      "The public version leaves out server names, process details, hardware specifications, capacities, timestamps and measured values while keeping the diagnostic order.",
    ],
    client: "경기도청 외 공공기관",
    project: "공공기관 UNIX 시스템 성능분석",
    publishedAt: "2026-08-09",
    readingMinutes: 12,
    technologies: ["Solaris", "SunOS", "Oracle", "UNIX", "Performance Analysis"],
    sections: [
      {
        id: "evidence-and-scope",
        title: "지표의 관계부터 확인했습니다",
        blocks: [
          {
            kind: "paragraph",
            text: "공공기관 Solaris 서버를 분석할 때는 장비 소개보다 지표 사이의 관계를 먼저 봤습니다. CPU·실행 대기열·프로세스·메모리·페이징·스왑·디스크·파일시스템·네트워크를 날짜, 요일과 시간 단위로 나누고 장애 시간대와 정상 기준선을 비교했습니다.",
          },
          {
            kind: "paragraph",
            text: "증상이 보이는 곳과 원인이 있는 곳은 다를 수 있습니다. 애플리케이션이 느리다고 CPU를 늘리거나 프로세스를 재시작하기 전에, I/O 대기나 메모리 부족이 있는지 함께 확인해야 합니다.",
          },
          {
            kind: "paragraph",
            text: "공개 글에서는 서버명, 프로세스명, 사양, 용량, 날짜와 측정값을 제외하고 실제로 사용한 분석 순서만 설명합니다.",
          },
        ],
      },
      {
        id: "question-before-metric",
        title: "지표보다 먼저 질문을 정했습니다",
        blocks: [
          {
            kind: "paragraph",
            text: "처음부터 모든 숫자를 같은 비중으로 보지 않았습니다. 먼저 사용자 증상이 발생한 시간대와 영향을 받은 기능을 정하고, 그 시간대에 자원 포화가 있었는지, 대기가 늘었는지, 특정 프로세스가 자원을 독점했는지를 차례로 확인했습니다.",
          },
          {
            kind: "bullets",
            items: [
              "CPU 사용이 높았다면 순간 피크인지 지속 부하인지 구분한다.",
              "CPU I/O 대기가 높았다면 디스크 응답과 파일시스템을 함께 본다.",
              "여유 메모리가 줄었다면 page scan과 실제 swap in/out이 뒤따랐는지 확인한다.",
              "디스크 사용률이 높다면 처리량 문제인지 응답 지연인지, 단순 용량 부족인지 분리한다.",
              "모든 판단은 장애 시간대와 정상 기준선의 차이로 설명한다.",
            ],
          },
          {
            kind: "paragraph",
            text: "임계값을 넘은 지표를 찾으면 같은 시간대의 다른 지표도 확인합니다. CPU, 메모리, 디스크 중 무엇이 함께 달라졌는지 봐야 원인을 좁힐 수 있습니다.",
          },
        ],
      },
      {
        id: "cpu-queue-process",
        title: "CPU → Queue → Process 순서로 범위를 줄였습니다",
        blocks: [
          {
            kind: "paragraph",
            text: "CPU 영역에서는 사용자 모드, 시스템 모드, 전체 사용률과 I/O 대기를 분리했습니다. 전체 사용률이 높더라도 사용자 모드가 주도하는지, 커널 작업이 늘었는지, 디스크 완료를 기다리는 시간이 늘었는지에 따라 다음 조사 대상이 달라집니다.",
          },
          {
            kind: "paragraph",
            text: "그다음 실행 대기열 크기와 점유 흐름을 확인했습니다. CPU 사용률이 높고 실행 대기열도 지속적으로 늘면 계산 자원 경쟁을 의심할 수 있습니다. 반대로 CPU 전체 사용률은 높지 않은데 I/O 대기만 늘었다면 CPU 증설보다 디스크와 파일시스템 경로를 먼저 봐야 합니다.",
          },
          {
            kind: "paragraph",
            text: "마지막으로 기간 중 CPU 시간을 많이 사용한 프로세스와 시스템 호출량을 연결했습니다. 특정 프로세스가 상위에 있다는 사실만으로 종료하지 않고, 그 프로세스의 부하가 사용자 요청 증가인지, 반복 I/O인지, 비정상 재시도인지 애플리케이션·데이터베이스 담당자와 확인할 수 있는 근거로 만들었습니다.",
          },
          {
            kind: "code",
            language: "text",
            caption: "CPU 조사 흐름",
            code: "CPU usr/sys/total/wio\n  ├─ total 지속 상승 + run queue 상승 → 계산 자원 경쟁 조사\n  ├─ wio 상승 + disk wait 상승       → I/O 경로 조사\n  └─ 특정 시간대 spike               → top process와 요청 이벤트 대조",
          },
        ],
      },
      {
        id: "memory-page-swap",
        title: "Free memory만으로 메모리 부족을 판정하지 않았습니다",
        blocks: [
          {
            kind: "paragraph",
            text: "Solaris의 여유 메모리는 캐시와 운영 상태에 따라 줄어들 수 있습니다. 따라서 free memory가 낮다는 사실만으로 메모리 부족을 선언하지 않고, 시스템의 메모리 회수 기준과 비교한 뒤 page scan, page in/out, swap in/out이 실제로 발생하는지 확인했습니다.",
          },
          {
            kind: "bullets",
            items: [
              "여유 메모리 감소가 짧게 끝나는지 지속되는지 확인한다.",
              "page scan이 함께 증가하면 메모리 회수 압력을 의심한다.",
              "page in/out은 파일 I/O와 함께 해석하고 swap in/out과 구분한다.",
              "실제 swap 활동이 지속될 때 프로세스 메모리와 응답 지연을 연결한다.",
            ],
          },
          {
            kind: "paragraph",
            text: "이 구분은 불필요한 메모리 증설을 피하고, 디스크 I/O 문제를 메모리 문제로 오인하지 않게 해 줍니다. 메모리와 디스크는 paging 경로에서 연결되므로 반드시 같은 시간축에서 봐야 했습니다.",
          },
        ],
      },
      {
        id: "disk-filesystem-network",
        title: "디스크 사용률, 응답시간, 용량을 서로 다른 문제로 봤습니다",
        blocks: [
          {
            kind: "paragraph",
            text: "디스크 영역은 busy 비율, 서비스 시간, 큐 대기, IOPS, 처리량을 나눠 보았습니다. busy가 높아도 응답시간이 안정적이면 처리량이 많은 정상 작업일 수 있습니다. 반대로 처리량이 크지 않은데 응답과 대기가 길어지면 특정 경로나 장치의 지연을 의심할 수 있습니다.",
          },
          {
            kind: "paragraph",
            text: "파일시스템 사용률은 별도의 용량 위험입니다. 용량 부족은 애플리케이션 중단을 만들 수 있지만, 디스크 응답 지연과 같은 원인으로 단정할 수 없습니다. 그래서 용량 정리, 데이터 재배치, 부하 분산은 서로 다른 변경안으로 관리했습니다.",
          },
          {
            kind: "paragraph",
            text: "네트워크 충돌과 오류도 마지막 계층으로 확인했습니다. 네트워크 지표가 정상이라면 느린 응답의 범위를 OS·프로세스·스토리지 쪽으로 좁힐 수 있고, 반대로 오류가 같은 시간대에 증가하면 링크와 인터페이스 구성을 별도 장애 도메인으로 분리할 수 있습니다.",
          },
        ],
      },
      {
        id: "time-axis-and-baseline",
        title: "날짜·요일·시간축이 임계값보다 중요했습니다",
        blocks: [
          {
            kind: "paragraph",
            text: "보고서는 같은 지표를 날짜별, 요일별, 시간대별로 반복했습니다. 평균값 하나는 짧은 장애를 숨기고, 최대값 하나는 정상 배치 작업을 장애처럼 보이게 만들 수 있기 때문입니다. 업무 시간, 야간 배치, 백업 시간처럼 운영 이벤트와 지표의 모양을 연결해야 원인을 설명할 수 있었습니다.",
          },
          {
            kind: "code",
            language: "text",
            caption: "한 시간축으로 맞춘 공개용 분석 메모 예시",
            code: "T0      사용자 응답 지연 시작\nT+2m    CPU wio 상승, total은 안정\nT+3m    특정 volume의 wait 상승\nT+4m    page scan과 swap 활동은 변화 없음\nT+6m    배치 I/O 종료 후 응답 정상화\n판단    계산 자원이나 메모리보다 I/O 경로를 우선 조사",
          },
          {
            kind: "paragraph",
            text: "장애가 없던 같은 요일·시간대와 비교하면 평소와 달라진 점을 찾기 쉽습니다. 기준값을 먼저 확보해 두는 이유입니다.",
          },
        ],
      },
      {
        id: "change-and-verification",
        title: "복구 조치와 원인 조치를 분리했습니다",
        blocks: [
          {
            kind: "paragraph",
            text: "장애 중에는 서비스 복구가 우선이지만, 재시작이나 우회가 근본 원인을 제거했다고 기록하지 않았습니다. 임시 복구, 원인 가설, 영구 변경을 분리하고 각 변경에 사전 점검, 롤백 조건, 사후 점검을 붙였습니다.",
          },
          {
            kind: "bullets",
            items: [
              "변경 전 장애 시간대의 핵심 지표와 프로세스 상태를 보존한다.",
              "한 번에 하나의 장애 도메인만 바꿔 결과를 해석할 수 있게 한다.",
              "변경 후 동일한 CPU·queue·memory·disk 지표를 다시 확인한다.",
              "응답이 회복돼도 다음 배치나 피크 시간대까지 재발 여부를 관찰한다.",
              "가설과 다른 결과가 나오면 즉시 롤백하고 조사 범위를 다시 설정한다.",
            ],
          },
        ],
      },
      {
        id: "legacy-to-cloud",
        title: "이 분석 순서는 Cloud에서도 그대로 남았습니다",
        blocks: [
          {
            kind: "paragraph",
            text: "환경이 물리 Solaris에서 x86과 클라우드로 바뀌어도 핵심 질문은 같습니다. 가상머신 CPU, load와 run queue, 메모리 압력, 볼륨 latency·IOPS·throughput, 파일시스템 사용률, 네트워크 drop·retransmit을 같은 시간축으로 연결해야 합니다.",
          },
          {
            kind: "paragraph",
            text: "클라우드에서는 지표를 수집하기 쉬워졌지만 지표가 많아진 만큼 단일 그래프에 끌려가기 쉽습니다. Solaris 운영에서 익힌 계층 분리, 기준선 비교, 변경 전후 동일 지표 검증은 Terraform 변경과 클라우드 장애 분석에서도 그대로 적용할 수 있는 운영 원칙입니다.",
          },
          {
            kind: "paragraph",
            text: "저는 장애가 발생한 시간과 요청 경로부터 확인했습니다. 그 시간대의 CPU, 대기열, 메모리, 디스크와 네트워크 상태를 차례로 비교하며 원인을 좁혔습니다.",
          },
        ],
      },
    ],
  },
  {
    slug: "solaris-to-x86-operating-boundaries",
    series: {
      ko: "Legacy to Cloud — 운영 경험을 설계 원칙으로 바꾸기",
      en: "Legacy to Cloud — Turning Operations into Design Principles",
    },
    category: { ko: "x86 · 서버 운영", en: "x86 · Server Operations" },
    title: {
      ko: "Solaris에서 x86으로 옮겨가며 달라진 장애 경계",
      en: "How Failure Boundaries Changed from Solaris to x86",
    },
    summary: {
      ko: "Solaris에서 x86으로 옮겨가며 점검 대상이 어떻게 달라졌는지, 펌웨어부터 게스트 OS까지 무엇을 확인했는지 정리했습니다.",
      en: "How moving from Solaris to x86 changed the checks needed across firmware, I/O adapters, hypervisors and guest operating systems.",
    },
    englishAbstract: [
      "During enterprise server migrations, recurring maintenance and Oracle RAC work on virtualised x86 infrastructure, I saw the operator's fault-isolation boundary expand across more replaceable layers.",
      "An integrated UNIX platform offered a relatively compact support matrix. x86 introduced more replaceable layers: system firmware, management controller, BIOS settings, HBA and NIC firmware, drivers, hypervisor and guest OS. The operational gain came with a larger compatibility and ownership surface.",
      "The public examples omit hardware models, host names, firmware versions, adapter identifiers, capacities and network values and focus on the change and verification method.",
    ],
    client: "기업·금융·공공기관",
    project: "UNIX/x86 서버 구축·이전·운영",
    publishedAt: "2026-08-09",
    readingMinutes: 11,
    technologies: ["x86", "Linux", "VMware", "HBA", "NIC", "SAN"],
    sections: [
      {
        id: "evidence-and-boundary",
        title: "점검할 계층과 담당 범위가 달라졌습니다",
        blocks: [
          {
            kind: "paragraph",
            text: "UNIX 서버 이전, 정기점검과 가상화 환경의 Oracle RAC 작업을 거치면서 장애 경계를 다시 나눠야 했습니다. 장애가 발생했을 때 누가 어느 계층까지 확인하고 어떤 증거를 다음 담당자에게 넘길지가 제품 비교보다 중요한 운영 문제였습니다.",
          },
          {
            kind: "paragraph",
            text: "Solaris 장비에서 x86으로 이동했다고 해서 CPU와 메모리를 보는 기본 원리가 바뀌지는 않았습니다. 달라진 것은 한 제조사가 묶어서 제공하던 경계가 더 많은 부품과 소프트웨어 계층으로 나뉘었다는 점입니다. 교체 가능성과 선택권은 늘었지만 호환성 검증과 책임 분리는 더 중요해졌습니다.",
          },
        ],
      },
      {
        id: "failure-domain-map",
        title: "먼저 장애 도메인 지도를 만들었습니다",
        blocks: [
          {
            kind: "paragraph",
            text: "x86 장애를 OS 로그 한 곳에서 시작하면 하부 계층의 원인을 놓치기 쉽습니다. 물리 부품, 시스템 펌웨어와 관리 컨트롤러, BIOS 설정, HBA·NIC, 하이퍼바이저, 게스트 OS, 미들웨어와 데이터베이스를 별도의 장애 도메인으로 두고 관측 지점과 담당 경계를 적었습니다.",
          },
          {
            kind: "bullets",
            items: [
              "물리 계층: 전원, 냉각, 메모리와 디스크의 하드웨어 이벤트를 확인한다.",
              "플랫폼 계층: 시스템 펌웨어, 관리 컨트롤러와 BIOS 설정 변경 이력을 확인한다.",
              "I/O 계층: HBA·NIC의 링크, 오류 카운터, 펌웨어와 드라이버 조합을 확인한다.",
              "가상화 계층: 호스트 자원 경합, 가상 스위치와 데이터스토어 경로를 확인한다.",
              "게스트 계층: load, memory pressure, 파일시스템, 장치와 네트워크 상태를 확인한다.",
              "서비스 계층: 애플리케이션·DB 증상과 하부 자원 신호의 시간축을 맞춘다.",
            ],
          },
          {
            kind: "paragraph",
            text: "이렇게 나누면 한 계층에서 발견한 오류가 다른 계층과 연결되는지 확인하기 쉽습니다. 다음으로 어디를 점검하고 누구에게 자료를 넘길지도 정할 수 있습니다.",
          },
        ],
      },
      {
        id: "firmware-driver-matrix",
        title: "펌웨어와 드라이버는 한 묶음으로 관리했습니다",
        blocks: [
          {
            kind: "paragraph",
            text: "HBA나 NIC 문제는 카드 한 장의 상태만으로 설명되지 않습니다. 어댑터 펌웨어, OS 드라이버, 하이퍼바이저 지원 범위, 스위치와 스토리지 측 설정이 함께 맞아야 합니다. 그래서 변경 전에는 현재 조합과 지원 매트릭스를 보존하고, 목표 조합과 되돌릴 조합을 같이 적었습니다.",
          },
          {
            kind: "code",
            language: "text",
            code: "Component          Current evidence     Target evidence      Rollback evidence\nSystem firmware    captured             approved package     previous package\nHBA / NIC          firmware + driver    supported pair       known-good pair\nHypervisor         build + patch        validated baseline   bootable baseline\nGuest OS           kernel + modules     tested image         prior image",
            caption: "변경 검토표",
          },
          {
            kind: "paragraph",
            text: "최신 버전이라는 이유만으로 운영 기준이 되지는 않습니다. 실제 기준은 전체 경로에서 지원되는 조합인지, 변경 후 동일한 방식으로 검증할 수 있는지, 문제가 생겼을 때 복귀 가능한지였습니다.",
          },
        ],
      },
      {
        id: "os-check-order",
        title: "OS 점검은 자원보다 경로를 먼저 보았습니다",
        blocks: [
          {
            kind: "paragraph",
            text: "서비스 지연이 발생하면 CPU, load와 실행 대기열, 메모리 압력, block 장치 지연, 파일시스템 사용률, 네트워크 drop과 retransmit을 확인했습니다. 다만 가상화된 x86에서는 이 수치가 게스트에만 속하는지 호스트 경합의 결과인지 분리해야 했습니다.",
          },
          {
            kind: "bullets",
            items: [
              "게스트 CPU가 바쁜지, 실행 기회를 받지 못해 대기하는지 구분한다.",
              "메모리 부족이 게스트 내부 문제인지 호스트의 회수 정책과 겹쳤는지 확인한다.",
              "디스크 지연을 게스트 장치, 하이퍼바이저, SAN 경로와 스토리지 장비 계층으로 나눈다.",
              "패킷 손실을 게스트 인터페이스, 가상 스위치, 물리 NIC와 상위 네트워크에서 교차 확인한다.",
            ],
          },
          {
            kind: "paragraph",
            text: "같은 CPU 사용률도 물리 Solaris와 가상 x86에서 해석 범위가 다릅니다. 숫자를 비교하기 전에 그 숫자를 만든 스케줄러와 I/O 경로가 어디까지 보이는지 확인해야 했습니다.",
          },
        ],
      },
      {
        id: "change-and-rollback",
        title: "변경 계획에는 실패 방법을 먼저 적었습니다",
        blocks: [
          {
            kind: "paragraph",
            text: "서버 이전과 정기점검 자료에서 반복되는 핵심은 작업 순서, 담당 경계, 연결 확인, 복귀 조건이었습니다. x86에서는 선택 가능한 계층이 늘어난 만큼 한 번에 여러 펌웨어와 드라이버를 바꾸면 결과를 해석하기 어려웠습니다. 따라서 변경 단위를 장애 도메인에 맞춰 작게 유지했습니다.",
          },
          {
            kind: "bullets",
            items: [
              "변경 전 관리 경로와 콘솔 접근을 서비스 네트워크와 별도로 확인한다.",
              "부팅 가능 이미지와 이전 설정을 확보하고 복귀 제한 시간을 정한다.",
              "한 단계가 끝날 때마다 하드웨어 이벤트, 링크, 장치, 파일시스템을 확인한다.",
              "서비스 확인은 포트 응답이 아니라 대표 트랜잭션과 데이터 정합성까지 포함한다.",
              "사후 관찰은 즉시 점검과 다음 피크 시간대 점검으로 나눈다.",
            ],
          },
        ],
      },
      {
        id: "cloud-translation",
        title: "이 운영 경계는 Cloud 책임 모델로 이어졌습니다",
        blocks: [
          {
            kind: "paragraph",
            text: "클라우드에서는 물리 펌웨어를 직접 다루지 않지만 장애 도메인이 사라진 것은 아닙니다. 인스턴스 이미지, 타입, 가상 NIC, block 볼륨, zone, 로드 밸런서와 managed database가 새로운 경계가 됩니다. 무엇을 공급자가 운영하고 무엇을 사용자가 검증해야 하는지 명확히 해야 합니다.",
          },
          {
            kind: "paragraph",
            text: "x86 환경에서도 계층별 상태와 롤백 절차를 함께 확인했습니다. 지금은 Terraform plan을 검토하고 클라우드 변경 후 상태 점검과 업무 트랜잭션을 확인할 때 이 경험을 활용합니다.",
          },
        ],
      },
    ],
  },
  {
    slug: "storage-fault-isolation-layers",
    series: {
      ko: "Legacy to Cloud — 운영 경험을 설계 원칙으로 바꾸기",
      en: "Legacy to Cloud — Turning Operations into Design Principles",
    },
    category: { ko: "Storage · 장애 분석", en: "Storage · Troubleshooting" },
    title: {
      ko: "스토리지 장애를 파일시스템부터 Array까지 분리하는 법",
      en: "Isolating Storage Failures from Filesystem to Array",
    },
    summary: {
      ko: "스토리지 응답이 느릴 때와 연결 경로가 끊겼을 때를 구분하고, 파일시스템부터 SAN·스토리지 장비까지 확인하는 순서를 정리했습니다.",
      en: "Checks for distinguishing slow I/O from lost paths, from the filesystem through volumes, multipathing, HBAs, SAN fabrics, arrays and backups.",
    },
    englishAbstract: [
      "While operating Fibre Channel storage, tape libraries, Veritas Volume Manager and NetBackup, I treated the filesystem, volume, path, fabric, array and backup layers as one recoverable data path.",
      "The method separates service symptoms from host, path, fabric, array and data-protection layers. A healthy filesystem does not prove that every path is healthy, and a successful backup job does not prove that the required recovery sequence works.",
      "The public examples leave out WWNs, LUN identifiers, zoning, path counts, capacities, policy names, schedules and device models.",
    ],
    client: "해군 C4I(KNCCS) 외 기업 고객",
    project: "SAN Storage·Veritas·NetBackup 운영",
    publishedAt: "2026-08-09",
    readingMinutes: 13,
    technologies: ["SAN", "Fibre Channel", "Veritas Volume Manager", "NetBackup", "Multipath"],
    sections: [
      {
        id: "evidence-and-scope",
        title: "파일시스템부터 스토리지 장비까지 나눠 봤습니다",
        blocks: [
          {
            kind: "paragraph",
            text: "Fibre Channel 스토리지와 테이프 장비를 운영하면서 Veritas Volume Manager와 NetBackup을 함께 다뤘습니다. 디스크 장애처럼 보여도 파일시스템, 볼륨, multipath, HBA, SAN fabric, 스토리지 장비, 백업 중 어디에서 끊겼는지에 따라 대응 순서가 달라졌습니다.",
          },
          {
            kind: "paragraph",
            text: "스토리지 장애의 어려움은 애플리케이션이 보는 하나의 파일 경로 아래에 여러 계층이 있다는 점입니다. 파일시스템이 mount되어 있어도 일부 경로는 이미 손실됐을 수 있고, 경로가 모두 online이어도 스토리지 장비 내부 지연으로 서비스가 느릴 수 있습니다. 그래서 ‘보인다’와 ‘정상적으로 처리한다’를 분리했습니다.",
          },
        ],
      },
      {
        id: "layered-question",
        title: "증상을 계층별 질문으로 바꿨습니다",
        blocks: [
          {
            kind: "paragraph",
            text: "파일에 접근할 수 없거나 응답이 느리다는 문의가 들어오면 데이터가 지나가는 경로를 확인했습니다. 파일시스템, 볼륨, 연결 경로와 장비에서 각각 무엇을 확인할지 나눴습니다.",
          },
          {
            kind: "code",
            language: "text",
            code: "Service request\n  -> filesystem: mounted, space and error state?\n  -> volume: enabled and mirrors consistent?\n  -> multipath: expected paths usable and balanced?\n  -> HBA: link and transport errors?\n  -> SAN fabric: port, login and zone reachability?\n  -> array: front-end, controller, pool and drive health?\n  -> backup: independent recovery copy available?",
            caption: "스토리지 장애 도메인 지도",
          },
          {
            kind: "paragraph",
            text: "같은 시각의 호스트 I/O 대기, 경로 이벤트, 스위치 포트 이벤트와 스토리지 응답시간을 비교합니다. 여러 지표가 가리키는 공통 구간을 찾는 방식입니다.",
          },
        ],
      },
      {
        id: "host-volume-multipath",
        title: "Host에서는 Volume과 Path 상태를 분리했습니다",
        blocks: [
          {
            kind: "paragraph",
            text: "먼저 파일시스템의 mount, 사용률, read-only 전환, OS I/O 오류를 확인하고 그 아래 볼륨과 disk object의 상태를 확인했습니다. Veritas Volume Manager 환경에서는 논리 볼륨이 활성 상태라는 사실과 구성 요소가 모두 정상이라는 사실을 같게 보지 않았습니다.",
          },
          {
            kind: "bullets",
            items: [
              "파일시스템 오류가 발생한 시각과 OS 장치 오류 시각을 맞춘다.",
              "볼륨이 서비스 중인지와 mirror·plex가 정상 상태인지 분리한다.",
              "multipath의 일부 손실인지 전체 장치 손실인지 구분한다.",
              "경로가 복구된 뒤 I/O가 다시 분산되는지 확인한다.",
              "재부팅으로 상태를 지우기 전에 경로와 장치 증거를 보존한다.",
            ],
          },
          {
            kind: "paragraph",
            text: "경로 이중화는 장애를 감추는 장치이기도 합니다. 서비스가 계속된다는 이유로 단일 경로 상태를 방치하면 다음 스위치나 HBA 장애가 전체 중단으로 커질 수 있습니다. 따라서 degraded 상태도 복구가 필요한 사건으로 관리했습니다.",
          },
        ],
      },
      {
        id: "hba-and-fabric",
        title: "HBA와 SAN Fabric에서는 양쪽 끝의 증거를 맞췄습니다",
        blocks: [
          {
            kind: "paragraph",
            text: "호스트에서 경로가 사라졌다는 사실만으로 HBA 고장이라고 결론 내리지 않았습니다. HBA link와 transport 오류, switch port 상태와 오류 카운터, fabric login, zoning에 따른 도달 가능성을 같은 시간대에 확인했습니다. 한쪽 기록만 보면 케이블, 포트, 설정, 상대 장비 중 무엇이 원인인지 분리하기 어렵습니다.",
          },
          {
            kind: "paragraph",
            text: "변경 작업에서도 호스트와 fabric을 따로 승인하지 않았습니다. zoning이나 HBA 교체 전 영향받는 경로를 식별하고, 대체 경로에서 실제 I/O가 유지되는지 확인한 뒤 한 경로씩 변경했습니다.",
          },
        ],
      },
      {
        id: "array-latency",
        title: "Array에서는 Health와 성능을 따로 보았습니다",
        blocks: [
          {
            kind: "paragraph",
            text: "스토리지 장비가 정상 상태를 표시해도 서비스 응답이 정상이라는 뜻은 아닙니다. front-end port, controller, cache, pool과 drive 계층의 이벤트를 확인하고 latency, IOPS와 throughput의 관계를 워크로드 시간축과 비교해야 했습니다.",
          },
          {
            kind: "bullets",
            items: [
              "latency 상승이 특정 볼륨인지 공통 controller·pool인지 범위를 좁힌다.",
              "IOPS 증가와 전송량 증가를 구분해 작은 I/O 폭증과 대용량 전송을 분리한다.",
              "cache나 controller 전환 이벤트가 호스트 경로 event와 같은 시각인지 확인한다.",
              "용량 여유와 성능 여유를 별도 기준으로 관리한다.",
              "복구 후 오류가 사라졌는지뿐 아니라 응답 기준선이 회복됐는지 확인한다.",
            ],
          },
        ],
      },
      {
        id: "backup-and-restore",
        title: "Backup 성공과 Restore 가능은 다른 상태였습니다",
        blocks: [
          {
            kind: "paragraph",
            text: "NetBackup 작업이 성공했다는 기록은 데이터가 정책에 따라 복사됐다는 증거입니다. 하지만 필요한 시점의 catalog가 남아 있는지, media를 읽을 수 있는지, 대상 호스트와 파일시스템을 준비할 수 있는지, 복구 후 애플리케이션이 정합성을 확인할 수 있는지는 별도의 증거가 필요합니다.",
          },
          {
            kind: "bullets",
            items: [
              "복구 대상과 시점을 업무 시나리오로 정의한다.",
              "catalog, media, 암호화 키와 복구 권한의 의존성을 확인한다.",
              "원본과 격리된 위치에서 restore를 수행할 수 있게 한다.",
              "파일 존재뿐 아니라 소유권, 권한과 애플리케이션 정합성을 검증한다.",
              "복구 소요와 실패 원인을 기록해 다음 runbook을 갱신한다.",
            ],
          },
        ],
      },
      {
        id: "cloud-volume-translation",
        title: "Cloud Volume에서도 계층 분리는 필요합니다",
        blocks: [
          {
            kind: "paragraph",
            text: "클라우드 블록 스토리지는 fabric과 스토리지 장비의 많은 부분을 서비스 뒤로 숨깁니다. 대신 볼륨 type, IOPS·throughput 한도, 인스턴스 연결, zone 경계, snapshot과 백업 정책이 사용자의 운영 경계가 됩니다. 관리 화면의 healthy 상태만으로 guest 파일시스템과 업무 복구를 증명할 수 없는 점은 동일합니다.",
          },
          {
            kind: "paragraph",
            text: "온프레미스에서는 데이터 경로를 계층별로 나누고 양쪽 기록의 시간을 맞춰 봤습니다. 관리형 스토리지에서도 같은 방식으로 OS, 연결 경로와 스토리지 중 어디에 문제가 있는지 좁힐 수 있습니다.",
          },
        ],
      },
    ],
  },
  {
    slug: "oracle-backup-to-recovery-scenario",
    series: {
      ko: "Legacy to Cloud — 운영 경험을 설계 원칙으로 바꾸기",
      en: "Legacy to Cloud — Turning Operations into Design Principles",
    },
    category: { ko: "Oracle · Backup & Recovery", en: "Oracle · Backup & Recovery" },
    title: {
      ko: "Oracle 백업을 복구 시나리오로 바꾸는 법",
      en: "Turning Oracle Backups into a Recovery Scenario",
    },
    summary: {
      ko: "Oracle 복구에 필요한 파일, 복원·복구 순서, 데이터 검증과 롤백 기준을 Runbook에 어떻게 정리할지 설명합니다.",
      en: "How to organise required files, restore and recovery steps, data checks and rollback criteria in an Oracle recovery runbook.",
    },
    englishAbstract: [
      "My direct work includes maintaining Oracle single-instance and RAC environments, performing database migrations, and providing technical support and pre-sales engineering for Oracle Zero Data Loss Recovery Appliance. In that work, I treated a successful backup job and a recoverable database as separate operational checks.",
      "The central distinction is between backup completion and recoverability. A usable recovery plan defines the failure scenario, target recovery point, required control and data files, dependency order, validation queries, business checks and a rollback or isolation decision.",
      "Public examples exclude database names, SIDs, service names, accounts, schemas, tables, SCNs, timestamps, backup paths, retention values and performance figures.",
    ],
    client: "금융·공공·기업 고객",
    project: "Oracle RAC 유지보수·DB Migration·복구 아키텍처",
    publishedAt: "2026-08-09",
    readingMinutes: 14,
    technologies: ["Oracle Database", "RAC", "RMAN", "Data Pump", "ZDLRA"],
    sections: [
      {
        id: "evidence-boundary",
        title: "백업 성공과 복구 가능성을 따로 봤습니다",
        blocks: [
          {
            kind: "paragraph",
            text: "Oracle single과 RAC를 유지보수했고, 여러 DB 이관을 수행했습니다. Oracle Zero Data Loss Recovery Appliance는 기술지원과 pre-sales를 맡았습니다. 이런 업무에서는 백업 작업이 성공했다는 결과만으로 복구 가능하다고 판단하지 않았습니다.",
          },
          {
            kind: "paragraph",
            text: "복구 runbook에는 장애 범위, 복구 시점, 필요한 파일, restore·recover 순서, 데이터 정합성 확인과 롤백 기준이 함께 있어야 합니다. 이 글은 그 판단 순서를 정리한 것이며 고객 DB명, schema, SCN, 백업 경로와 시간값은 사용하지 않았습니다.",
          },
        ],
      },
      {
        id: "backup-is-not-recovery",
        title: "백업 성공은 복구 가능성의 한 조건일 뿐입니다",
        blocks: [
          {
            kind: "paragraph",
            text: "백업 작업이 성공하면 정해진 데이터가 백업 대상으로 전송됐다는 사실은 알 수 있습니다. 그러나 control file과 catalog가 현재 상태를 설명하는지, 필요한 archived redo가 모두 있는지, 암호화 의존성을 확보했는지, restore할 별도 공간과 권한이 있는지는 증명하지 못합니다.",
          },
          {
            kind: "bullets",
            items: [
              "어떤 장애를 복구할 것인지: datafile 손상, 호스트 손실, 논리 오류, 사이트 손실을 구분한다.",
              "어느 시점으로 돌아갈 것인지: 업무가 허용하는 손실 범위를 합의한다.",
              "어디에 복구할 것인지: 원본을 덮지 않는 격리 공간과 컴퓨팅을 준비한다.",
              "무엇으로 검증할 것인지: DB 상태, 객체 정합성, 대표 업무 트랜잭션을 정한다.",
              "언제 중단하거나 롤백할 것인지: 시간과 데이터 기준을 사전에 정한다.",
            ],
          },
        ],
      },
      {
        id: "scenario-first",
        title: "도구보다 복구 시나리오를 먼저 골랐습니다",
        blocks: [
          {
            kind: "paragraph",
            text: "장애 유형이 다르면 필요한 파일과 순서도 달라집니다. 일부 datafile의 물리 손상과 사용자의 논리 삭제, RAC node 한 대의 손실, 전체 사이트 손실을 같은 restore 절차로 다루면 과도한 중단이나 데이터 손실을 만들 수 있습니다.",
          },
          {
            kind: "code",
            language: "text",
            code: "Scenario       Preserve first        Recovery target        Validation\nPhysical loss  logs and metadata     selected recovery point DB + business checks\nLogical error  current evidence      isolated earlier copy   row/object comparison\nNode loss      surviving services    restore node capability cluster + service checks\nSite loss      latest remote copy    alternate site          end-to-end transaction",
            caption: "실제 DB와 시간값을 제거한 복구 시나리오 분류",
          },
          {
            kind: "paragraph",
            text: "복구할 시점은 작업 전에 정해야 합니다. 복구 시점이 RPO를, 예상 복구 시간이 RTO를 충족하는지 의사결정권자와 확인합니다.",
          },
        ],
      },
      {
        id: "required-evidence",
        title: "필요한 파일과 의존성을 한 장에 모았습니다",
        blocks: [
          {
            kind: "paragraph",
            text: "runbook에는 datafile만 적지 않았습니다. control file, server parameter file, password와 encryption 의존성, archived redo, 백업 metadata, Oracle software와 patch 호환성, 스토리지 공간, listener와 서비스 연결 정보를 분리했습니다.",
          },
          {
            kind: "bullets",
            items: [
              "백업 piece가 존재하는지와 실제 읽을 수 있는지를 구분한다.",
              "control file·catalog가 선택한 복구 시점을 찾을 수 있는지 확인한다.",
              "암호화된 백업에 필요한 wallet·key 접근 절차를 별도로 검증한다.",
              "대상 Oracle home과 patch 수준이 복구본에 적합한지 확인한다.",
              "RAC에서는 클러스터 리소스와 서비스 시작 순서를 DB 복구와 분리한다.",
            ],
          },
        ],
      },
      {
        id: "restore-recover-open",
        title: "Restore, Recover, Open을 서로 다른 단계로 보았습니다",
        blocks: [
          {
            kind: "paragraph",
            text: "restore는 백업에서 파일을 되가져오는 작업이고, recover는 redo를 적용해 목표 시점의 일관성을 만드는 작업입니다. database가 open됐다는 사실은 Oracle 내부 상태의 한 관문을 통과했다는 의미이지 업무 데이터가 완전하다는 최종 판정은 아닙니다.",
          },
          {
            kind: "bullets",
            items: [
              "장애 증거와 현재 redo를 보존하고 불필요한 쓰기를 차단한다.",
              "원본과 분리된 대상에 control metadata와 datafile을 준비한다.",
              "선택한 복구 시점까지만 redo를 적용하고 경고·gap을 기록한다.",
              "open 방식과 후속 백업 필요 여부를 변경 승인에 포함한다.",
              "실패하면 반복 실행하기 전에 원인과 현재 파일 상태를 다시 보존한다.",
            ],
          },
        ],
      },
      {
        id: "validation-layers",
        title: "검증은 Instance에서 업무 트랜잭션까지 올렸습니다",
        blocks: [
          {
            kind: "paragraph",
            text: "Oracle 내부 검증은 인스턴스와 database가 기대 상태인지 확인하는 데서 시작합니다. 그다음 invalid object, datafile 상태, 주요 작업과 서비스를 확인하고, 마지막에는 애플리케이션 담당자가 대표 조회와 쓰기 트랜잭션을 수행해야 합니다.",
          },
          {
            kind: "code",
            language: "sql",
            code: "select status from v$instance;\nselect open_mode from v$database;\nselect status from v$datafile;",
            caption:
              "인스턴스와 데이터파일 상태를 확인하는 기본 예제입니다. 복구 시나리오에 따라 검증 항목을 추가해야 합니다.",
          },
          {
            kind: "paragraph",
            text: "row count 하나만으로 정합성을 판정하지 않았습니다. 기준 시점의 업무 집계, 참조 관계, 최근 처리 건의 상태처럼 도메인 검증을 함께 해야 합니다. 검증 결과가 합의 기준을 벗어나면 복구본을 서비스에 연결하지 않고 원인을 재분석합니다.",
          },
        ],
      },
      {
        id: "migration-and-rollback",
        title: "Migration도 복구 가능한 변경으로 설계했습니다",
        blocks: [
          {
            kind: "paragraph",
            text: "Data Pump나 platform 이관은 데이터를 옮기는 도구 선택보다 전환 경계가 중요합니다. 원본 write를 언제 멈추고, 최종 차이를 어떻게 반영하며, 대상 검증에 실패하면 어느 시점까지 원본으로 돌아갈 수 있는지를 한 흐름으로 관리해야 합니다.",
          },
          {
            kind: "paragraph",
            text: "ZDLRA와 managed database도 같은 질문을 없애지 않습니다. 백업 수집과 redo 보호가 자동화돼도 복구 시점 선택, 별도 복구 검증, 애플리케이션 연결과 업무 승인 책임은 남습니다. 클라우드로 갈수록 도구보다 이 책임 경계를 명시하는 일이 중요해졌습니다.",
          },
        ],
      },
    ],
  },
  {
    slug: "ibk-ncp-terraform-vpc-boundaries",
    series: {
      ko: "Legacy to Cloud — 운영 경험을 설계 원칙으로 바꾸기",
      en: "Legacy to Cloud — Turning Operations into Design Principles",
    },
    category: { ko: "Terraform · NCP", en: "Terraform · NCP" },
    title: {
      ko: "기업은행 NCP Terraform을 VPC별로 나눈 이유",
      en: "Why We Split IBK NCP Terraform by VPC Boundary",
    },
    summary: {
      ko: "기업은행 NCP 프로젝트에서 VPC별로 Terraform을 나눈 구조와, 권한·state·배포 순서에서 함께 확인할 사항을 정리했습니다.",
      en: "The VPC-based Terraform structure in the IBK NCP project, with checks for permissions, state and deployment order.",
    },
    englishAbstract: [
      "In the IBK NCP project, COMVPC, DEVVPC, DMZVPC and PRDVPC separated VPC, subnet, network-interface, server, storage, load-balancing and managed-data resources into distinct change areas.",
      "The directory split also raises questions about provider access, backend and state ownership, approvals and deployment order. Those need separate verification; directories alone do not establish isolation.",
      "The examples are newly written and exclude credentials, keys, state data, CIDRs, instance specifications, resource identifiers and actual names.",
    ],
    client: "기업은행",
    project: "NCP 기반 CBDC 활용성 테스트 인프라",
    publishedAt: "2026-08-09",
    readingMinutes: 15,
    technologies: ["Terraform", "NCP", "VPC", "Cloud DB", "Kafka", "Load Balancer"],
    sections: [
      {
        id: "evidence-structure",
        title: "VPC별 디렉터리를 변경 경계로 사용했습니다",
        blocks: [
          {
            kind: "paragraph",
            text: "기업은행 NCP 프로젝트에서는 COMVPC, DEVVPC, DMZVPC, PRDVPC를 나누고 각 영역의 VPC, subnet, 네트워크 인터페이스, server, 블록 스토리지, 로드 밸런서, MySQL, Redis와 Kafka 리소스를 별도로 관리했습니다.",
          },
          {
            kind: "paragraph",
            text: "VPC별로 나누면 변경이 어느 환경에 영향을 주는지 살펴보기 쉽습니다. 다만 provider 권한, backend와 state, 실행 승인과 배포 순서도 함께 확인해야 합니다. 아래는 VPC별 구성 방식을 설명하기 위한 예제입니다.",
          },
        ],
      },
      {
        id: "four-boundaries",
        title: "네 VPC는 네 가지 변경 반경을 뜻했습니다",
        blocks: [
          {
            kind: "paragraph",
            text: "COMVPC는 공통 관리, DEVVPC는 개발 검증, DMZVPC는 외부 연결, PRDVPC는 운영 영역으로 볼 수 있습니다. 각 영역을 나눌 때는 한쪽 변경이 다른 쪽 plan과 apply에 영향을 주는지 확인해야 합니다.",
          },
          {
            kind: "bullets",
            items: [
              "공통 영역: 공유 의존성을 적게 유지하고 변경 승인자를 명확히 한다.",
              "개발 영역: 운영과 다른 수명주기를 가지되 구조 차이가 무제한 커지지 않게 한다.",
              "DMZ 영역: 외부 진입점과 보안 장비, 로드 밸런서 변경을 서비스 컴퓨팅과 분리한다.",
              "운영 영역: 업무 영향과 롤백 기준을 가장 엄격하게 적용한다.",
            ],
          },
          {
            kind: "paragraph",
            text: "폴더를 나누는 것만으로 blast radius가 줄지는 않습니다. provider credential, backend와 state, 실행 권한, 파이프라인 승인 단계까지 같은 경계를 따라야 실제 격리가 됩니다.",
          },
        ],
      },
      {
        id: "provider-data-resource",
        title: "Provider, Data, Resource의 책임을 섞지 않았습니다",
        blocks: [
          {
            kind: "paragraph",
            text: "provider는 어느 API 경계와 인증 컨텍스트를 사용할지 정하고, data 블록은 이미 존재하거나 공급자가 제공하는 선택지를 조회하며, 리소스 block은 Terraform이 수명주기를 관리할 대상을 선언합니다. 세 역할을 구분하면 plan에서 ‘조회 결과가 바뀐 것’과 ‘관리 대상이 바뀌는 것’을 다르게 검토할 수 있습니다.",
          },
          {
            kind: "code",
            language: "hcl",
            code: 'variable "environment" {\n  type = string\n}\n\nvariable "server_spec_code" {\n  type = string\n}\n\ndata "ncloud_server_specs" "selected" {\n  filter {\n    name   = "server_spec_code"\n    values = [var.server_spec_code]\n  }\n}\n\nresource "ncloud_vpc" "service" {\n  name = "${var.environment}-service"\n}',
            caption: "리소스 경계를 설명하는 최소 예시",
          },
          {
            kind: "paragraph",
            text: "data source(데이터 소스)가 암묵적으로 최신 항목을 고르게 두면 공급자 catalog 변경이 다음 plan에 섞일 수 있습니다. 선택 기준을 입력으로 명시하고 review에서 그 값이 왜 바뀌는지 설명할 수 있어야 합니다.",
          },
        ],
      },
      {
        id: "variables-outputs-secrets",
        title: "Variable과 Output은 공개 API처럼 다뤘습니다",
        blocks: [
          {
            kind: "paragraph",
            text: "variable은 단순히 값을 빼놓는 장치가 아니라 구성 단위의 입력 계약입니다. type, description, validation을 붙이고 환경마다 달라져야 하는 값만 노출해야 합니다. 모든 리소스 속성을 variable로 만들면 검토할 수 없는 범용 모듈이 됩니다.",
          },
          {
            kind: "bullets",
            items: [
              "credential은 코드와 tfvars에 저장하지 않고 실행 환경의 secret 경계에서 주입한다.",
              "CIDR과 리소스 사양은 승인된 환경 입력으로 관리하고 기본값으로 숨기지 않는다.",
              "output은 다음 stack에 필요한 최소 reference만 제공한다.",
              "민감한 output은 sensitive로 표시하되 state에는 남을 수 있음을 전제로 보호한다.",
              "key material과 인증서는 Terraform 원본과 별도의 수명주기로 관리한다.",
            ],
          },
        ],
      },
      {
        id: "state-isolation",
        title: "State와 backend는 별도로 확인해야 합니다",
        blocks: [
          {
            kind: "paragraph",
            text: "하나의 state에 공통, DMZ, 개발과 운영 리소스를 모두 넣으면 작은 변경도 전체 graph를 읽고 lock해야 합니다. 권한이 넓어지고 잘못된 destroy나 import의 영향도 커집니다. 반대로 state를 너무 잘게 나누면 output 전달과 배포 순서가 복잡해집니다.",
          },
          {
            kind: "paragraph",
            text: "state를 나눌 때는 VPC와 운영 담당 범위를 기준으로 검토할 수 있습니다. 공통 의존성은 버전을 관리하는 output이나 승인된 참조로 전달하는 방법이 있습니다. 여기서 다루는 구성은 디렉터리를 VPC별로 나눈 구조입니다. 디렉터리 분리만으로 backend와 state까지 격리되지는 않습니다. 저장 위치와 접근 권한 설정, 잠금·암호화·접근 로그·복구 절차는 별도로 확인해야 합니다.",
          },
        ],
      },
      {
        id: "plan-and-deployment-order",
        title: "Plan 검토와 배포 순서를 아키텍처에 포함했습니다",
        blocks: [
          {
            kind: "paragraph",
            text: "Terraform graph가 dependency 순서를 계산해도 조직의 승인 순서까지 결정해 주지는 않습니다. 네트워크와 공통 연결을 먼저 검증하고, 진입 경계, 서비스 컴퓨팅, 데이터 서비스 순으로 영향과 상태 점검을 연결해야 합니다.",
          },
          {
            kind: "bullets",
            items: [
              "format과 validate 후 예상 provider와 state 경계를 확인한다.",
              "plan에서 create, update, replace, destroy를 분리해 사람이 검토한다.",
              "네트워크 변경은 경로와 통신 검증을 통과한 뒤 워크로드 변경으로 넘어간다.",
              "database와 Kafka 변경은 데이터 보호와 client 호환성 검증을 별도로 둔다.",
              "apply 후 콘솔 상태가 아니라 실제 상태 점검과 대표 통신을 확인한다.",
            ],
          },
        ],
      },
      {
        id: "drift-and-recovery",
        title: "운영 중에는 Drift와 복구 가능성을 같이 보았습니다",
        blocks: [
          {
            kind: "paragraph",
            text: "장애 대응 중에는 콘솔에서 긴급 변경을 할 수 있습니다. 누가 왜 바꿨는지 기록하고, 안정화한 뒤 import·코드 수정·재적용 중 어떤 방법으로 코드와 실제 상태를 맞출지 정해야 합니다.",
          },
          {
            kind: "paragraph",
            text: "서버 변경 전에 설정과 롤백 절차를 남겼듯, Terraform 작업에서도 state 백업과 검토한 plan을 보관해야 합니다. apply 범위를 작게 나누고 작업 뒤 drift를 확인하면 변경 결과를 추적하기 쉽습니다.",
          },
        ],
      },
    ],
  },
  {
    slug: "cloud-operations-principles",
    series: {
      ko: "Legacy to Cloud — 운영 경험을 설계 원칙으로 바꾸기",
      en: "Legacy to Cloud — Turning Operations into Design Principles",
    },
    category: { ko: "Cloud · 운영 아키텍처", en: "Cloud · Operations Architecture" },
    title: {
      ko: "온프레미스 운영 원칙을 Cloud 아키텍처로 옮긴 방법",
      en: "Translating On-Premises Operations into Cloud Architecture",
    },
    summary: {
      ko: "NCP 인프라에서 트래픽 경로와 담당 범위를 나눴던 경험을 바탕으로, 변경·복구·검증 시 확인할 사항을 정리했습니다.",
      en: "Checks for changes, recovery and verification, drawing on my work separating traffic paths and responsibilities in NCP infrastructure.",
    },
    englishAbstract: [
      "In the NCP CBDC infrastructure work, I separated transit, security inspection, load balancing, service and managed-data concerns so each failure domain had an observable boundary and an owner.",
      "The generic figure explains where traffic is decrypted, inspected, routed, observed and recovered without reproducing the production topology.",
      "Public examples exclude regions, zones, CIDRs, domains, source identities, certificates, policies, capacities, product settings and resource identifiers.",
    ],
    client: "기업은행·한국은행",
    project: "CBDC 활용성 테스트 NCP 클라우드 인프라",
    publishedAt: "2026-08-09",
    readingMinutes: 15,
    technologies: ["NCP", "Transit VPC", "SFC", "Load Balancer", "MySQL", "Redis", "Kafka"],
    sections: [
      {
        id: "evidence-and-reconstruction",
        title: "트래픽 경계를 운영 책임으로 나눴습니다",
        blocks: [
          {
            kind: "paragraph",
            text: "NCP에서 외부와 기관 연계 트래픽을 다룰 때 transit, firewall·IPS·WAF 보안 검사, 로드 밸런서, 서비스 VPC의 컴퓨팅과 데이터 서비스를 서로 다른 운영 경계로 나눴습니다. Terraform도 VPC, subnet, 네트워크 인터페이스, server, 블록 스토리지, 로드 밸런서, MySQL, Redis와 Kafka 리소스의 변경 범위를 분리했습니다.",
          },
          {
            kind: "paragraph",
            text: "아래 개념도는 외부 진입, 보안 검사, 서비스, 데이터와 운영 영역의 관계를 설명합니다. 운영 환경의 실제 구성도는 아닙니다.",
          },
          {
            kind: "figure",
            src: "/blog/cloud-operations-principles/boundary-map.svg",
            alt: "외부 사용자와 기관 연계가 ingress, 보안 검사, service, data 경계를 지나고 operations plane이 각 계층을 관측하는 공개용 Cloud 장애 도메인 그림",
            caption: "Cloud 운영 책임 경계 개념도",
          },
        ],
      },
      {
        id: "principles-that-remain",
        title: "Cloud에서도 남은 네 가지 운영 원칙",
        blocks: [
          {
            kind: "paragraph",
            text: "물리 장비를 직접 교체하지 않아도 운영 책임은 사라지지 않습니다. 온프레미스에서 사용한 변경 통제, 실패 범위 분리, 백업·recovery, 작업 전후 동일한 방식의 검증은 클라우드 리소스와 managed 서비스에 맞게 형태만 바뀝니다.",
          },
          {
            kind: "bullets",
            items: [
              "변경 통제: 콘솔 변경도 코드와 승인 기록으로 desired state에 되돌린다.",
              "실패 범위: edge, transit, 보안 검사, 서비스, 데이터를 별도 장애 도메인으로 본다.",
              "복구: snapshot과 managed 백업을 실제 restore·업무 검증까지 연결한다.",
              "검증: 리소스 상태와 end-to-end 트랜잭션을 변경 전후 같은 기준으로 비교한다.",
            ],
          },
        ],
      },
      {
        id: "traffic-and-identity",
        title: "트래픽 경로와 Source Identity를 함께 설계했습니다",
        blocks: [
          {
            kind: "paragraph",
            text: "보안 장비를 경로에 넣는 것만으로 검사가 완성되지는 않습니다. 로드 밸런서와 proxy를 통과하면서 원래 요청자 정보가 어디까지 유지되는지, 정책 엔진이 어떤 identity를 기준으로 판단하는지, 응답 경로가 같은 검사 경계를 지나는지 확인해야 합니다.",
          },
          {
            kind: "bullets",
            items: [
              "외부 진입 경로와 기관 전용 연결의 trust 경계를 분리한다.",
              "경로와 서비스 chaining 변경 시 순방향·역방향 경로를 함께 검증한다.",
              "proxy 이후 전달되는 원본 정보를 어느 계층이 신뢰할지 명시한다.",
              "보안 정책 로그와 application access 로그의 correlation 기준을 만든다.",
              "한 보안 장비의 우회가 다른 보안 검사를 무력화하지 않는지 확인한다.",
            ],
          },
        ],
      },
      {
        id: "tls-inspection-boundary",
        title: "TLS 종료 위치가 보안과 운영 책임을 결정했습니다",
        blocks: [
          {
            kind: "paragraph",
            text: "암호화된 트래픽을 검사하려면 어느 지점에서 TLS를 종료하거나 보안 검사 가능한 형태로 전달할지 정해야 합니다. 종료 지점이 바뀌면 certificate와 key의 보관 주체, client identity 전달, 재암호화, 상태 점검, 장애 시 우회 방법도 함께 바뀝니다.",
          },
          {
            kind: "paragraph",
            text: "따라서 SSL offloading은 로드 밸런서 설정 하나가 아니라 보안 검사 성능, 종단 간 암호화 요구, 원래 요청자 정보, certificate rotation과 장애 도메인을 묶은 설계 결정으로 다뤘습니다. 실제 인증서명, domain과 cipher 정책은 공개 범위에서 제외했습니다.",
          },
        ],
      },
      {
        id: "service-and-data-boundaries",
        title: "Service와 Data 장애를 같은 Health로 묶지 않았습니다",
        blocks: [
          {
            kind: "paragraph",
            text: "로드 밸런서 대상이 healthy여도 database connection pool이 고갈되거나 Kafka consumer lag가 늘면 업무는 실패할 수 있습니다. 반대로 managed database 이벤트가 있어도 retry와 failover가 정상 동작하면 사용자 영향은 제한될 수 있습니다. 계층별 health와 업무 health를 분리해 관측해야 합니다.",
          },
          {
            kind: "code",
            language: "text",
            code: "Edge       -> reachability and TLS handshake\nInspection -> policy decision and processing health\nService    -> target health and representative request\nDatabase   -> connection, transaction and replication state\nCache      -> availability, eviction and fallback behaviour\nStreaming  -> producer success, consumer lag and replay path",
            caption: "계층별로 확인할 상태와 동작",
          },
          {
            kind: "paragraph",
            text: "처리량, 연결 수, lag과 timeout의 임계값은 평소 측정값과 워크로드 특성에 맞춰 정해야 합니다.",
          },
        ],
      },
      {
        id: "operations-plane",
        title: "Operations Plane을 별도 아키텍처로 두었습니다",
        blocks: [
          {
            kind: "paragraph",
            text: "요청이 외부 진입점에서 보안 검사, 서비스와 데이터 계층을 지나는 동안 로그를 연결해 볼 수 있어야 합니다. 이를 위해 시간과 요청 식별 기준을 맞추고, 변경 기록과 장애 시간대도 함께 비교합니다.",
          },
          {
            kind: "bullets",
            items: [
              "각 계층의 metric, 로그와 trace가 공통 시간 기준을 사용한다.",
              "배포와 정책 변경을 관측 화면의 event로 남긴다.",
              "관리 경로 장애와 서비스 경로 장애를 별도로 경보한다.",
              "runbook에는 첫 확인 지표, 다음 담당 경계와 롤백 조건을 적는다.",
              "장애 후 alert가 너무 늦거나 원인을 설명하지 못했다면 관측 설계를 수정한다.",
            ],
          },
        ],
      },
      {
        id: "backup-recovery-and-iac",
        title: "Backup·Recovery와 IaC를 하나의 변경 흐름으로 묶었습니다",
        blocks: [
          {
            kind: "paragraph",
            text: "managed database 백업과 볼륨 snapshot이 있어도 restore 대상 네트워크, security policy, credential과 application 연결이 준비되지 않으면 복구 시간이 길어집니다. Terraform은 복구 환경의 네트워크와 컴퓨팅을 반복 생성할 수 있지만 데이터 recovery와 업무 정합성까지 대신하지는 않습니다.",
          },
          {
            kind: "paragraph",
            text: "그래서 변경 전 데이터 보호 상태를 확인하고, Terraform plan에서 replace·destroy 영향을 검토하며, apply 후 traffic과 트랜잭션을 검증하고, 정기적으로 별도 환경 복구를 연습하는 하나의 운영 흐름이 필요합니다. 온프레미스에서 익힌 복구 절차가 클라우드에서는 IaC와 managed 서비스를 연결하는 runbook으로 확장됩니다.",
          },
        ],
      },
    ],
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
