import { ArchitectureViewer } from "./ArchitectureViewer";

const SOURCE = `flowchart TB
    %% CLIENT LAYER
    Client["Client App<br/>Web / Dashboard / API Consumer"]

    %% API SERVER
    subgraph API["API Server - Express + TypeScript"]
        direction TB

        Routes["Routes Layer<br/>video.route.ts<br/>jobs.route.ts<br/>health.route.ts"]

        Middleware["Middleware<br/>Auth JWT<br/>Rate Limit<br/>Validation<br/>Error Handler"]

        JobService["JobManagementService"]

        QueueManager["QueueManager<br/>pg-boss Wrapper"]

        NotificationService["NotificationService<br/>WebSocket → SSE → Email"]

        Routes --> Middleware
        Middleware --> JobService
        JobService --> QueueManager
    end

    %% WORKERS
    subgraph Workers["Background Workers"]
        direction LR

        TranscriptWorker["TranscriptWorker<br/>- Fetch Transcript<br/>- Store Transcript<br/>- Generate Summary<br/>- Update Database"]

        GenerationWorker["GenerationWorker<br/>- Read Summary<br/>- Generate Content<br/>- Save Generations<br/>- Send Notifications"]
    end

    %% AI SERVICES
    subgraph AI["AI Processing"]
        direction TB

        Gemini["Gemini AI<br/>Transcript Summary<br/>Key Points"]

        Claude["Claude AI<br/>Platform Content Generation"]
    end

    %% STORAGE & DATABASE
    subgraph Data["Supabase Infrastructure"]
        direction TB

        PostgreSQL["PostgreSQL Database<br/>Users<br/>Sessions<br/>Payloads<br/>Jobs<br/>Generations"]

        Storage["Supabase Storage<br/>Transcript Files"]

        PgBoss["pg-boss Queues<br/>transcript-queue<br/>generation-queue"]
    end

    %% FLOW
    Client -->|"POST /api/v1/yt"| API

    QueueManager --> PgBoss

    PgBoss --> TranscriptWorker
    PgBoss --> GenerationWorker

    TranscriptWorker -->|"Fetch / Save"| Storage
    TranscriptWorker -->|"Read / Write"| PostgreSQL
    TranscriptWorker --> Gemini

    GenerationWorker -->|"Read / Write"| PostgreSQL
    GenerationWorker --> Claude
    GenerationWorker --> NotificationService

    NotificationService --> Client

    %% STYLING
    classDef api fill:#1e293b,stroke:#94a3b8,color:#ffffff
    classDef worker fill:#0f766e,stroke:#5eead4,color:#ffffff
    classDef ai fill:#7c3aed,stroke:#c4b5fd,color:#ffffff
    classDef data fill:#92400e,stroke:#fcd34d,color:#ffffff
    classDef client fill:#111827,stroke:#9ca3af,color:#ffffff

    class API,Routes,Middleware,JobService,QueueManager,NotificationService api
    class Workers,TranscriptWorker,GenerationWorker worker
    class AI,Gemini,Claude ai
    class Data,PostgreSQL,Storage,PgBoss data
    class Client client
`;

export function Architecture() {
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-4">
        <span className="label-mono text-foreground">Sample Architecture</span>
        <div className="flex-1 h-px bg-border-dim" />
        <span className="label-mono">CreatorJot</span>
      </div>

      <ArchitectureViewer
        source={SOURCE}
        title="creatorjot — architecture.mmd"
        caption={
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="font-mono text-[10px] text-muted-foreground tracking-[0.1em] uppercase">
              5 services
            </span>
            <span className="font-mono text-[10px] text-muted-foreground opacity-40">
              ·
            </span>
            <span className="font-mono text-[10px] text-muted-foreground tracking-[0.1em] uppercase">
              Multi-service Railway
            </span>
            <span className="font-mono text-[10px] text-muted-foreground opacity-40">
              ·
            </span>
            <span className="font-mono text-[10px] text-highlight tracking-[0.1em] uppercase">
              97+ Lighthouse
            </span>
            <span className="font-mono text-[10px] text-muted-foreground opacity-40">
              ·
            </span>
            <span className="font-mono text-[10px] text-muted-foreground tracking-[0.1em] uppercase">
              Click to expand
            </span>
          </div>
        }
      />
    </section>
  );
}
