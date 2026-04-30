# Sensai: Project Architecture Diagrams

These diagrams map out the core interactions, system architecture, and use cases of the Sensai platform. They are formatted using Mermaid.js and will render automatically in any markdown viewer that supports Mermaid (like VSCode extensions or GitHub).

## 1. System Architecture & Data Flow (Sequence Diagram)
This diagram illustrates the flow of data when a user requests an AI-generated service (e.g., generating a cover letter or analyzing a resume).

```mermaid
sequenceDiagram
    autonumber
    actor User
    participant Frontend as Next.js Client (React)
    participant Auth as Clerk Authentication
    participant Backend as Next.js Server Actions
    participant Database as PostgreSQL (Prisma)
    participant Queue as Inngest (Background Jobs)
    participant AI as Google Gemini API

    User->>Frontend: Clicks "Generate Cover Letter"
    Frontend->>Auth: Validates session
    Auth-->>Frontend: Token verified
    Frontend->>Backend: Submits form data (Job Title, Company)
    
    Backend->>Database: Fetch User Profile (Skills, Experience)
    Database-->>Backend: Return User Data
    
    Backend->>Queue: Dispatch Inngest Event (AI Generation Task)
    Queue-->>Backend: Event Accepted
    Backend-->>Frontend: Return "Generating..." status
    
    Queue->>AI: Send prompt (User Profile + Job Data)
    AI-->>Queue: Return generated Markdown content
    
    Queue->>Database: Save generated Cover Letter
    Database-->>Queue: Save confirmed
    
    Queue-->>Frontend: Trigger UI refresh/update
    Frontend-->>User: Displays generated Cover Letter
```

## 2. Platform Use Cases (Use Case Diagram)
This diagram maps out what an authenticated user can do within the platform versus what the AI system handles.

```mermaid
usecaseDiagram
    actor "Registered User" as user
    actor "Gemini AI Engine" as ai
    actor "Clerk Auth" as auth

    rectangle Sensai Platform {
        usecase "Sign Up / Log In" as UC1
        usecase "Manage Career Profile" as UC2
        usecase "Upload Resume" as UC3
        usecase "Take Mock Interview" as UC4
        usecase "Generate Cover Letter" as UC5
        usecase "View Industry Insights" as UC6
        
        usecase "Analyze Resume & Score ATS" as AI1
        usecase "Generate Interview Questions" as AI2
        usecase "Evaluate Interview Answers" as AI3
        usecase "Draft Tailored Cover Letter" as AI4
    }

    user --> UC1
    user --> UC2
    user --> UC3
    user --> UC4
    user --> UC5
    user --> UC6

    UC1 .> auth : authenticates via

    UC3 .> AI1 : triggers
    AI1 --> ai
    
    UC4 .> AI2 : triggers
    AI2 --> ai
    UC4 .> AI3 : triggers
    AI3 --> ai

    UC5 .> AI4 : triggers
    AI4 --> ai
```

## 3. High-Level Component Architecture (Flowchart)
This flowchart shows the separation of concerns between the Client (Browser), the Edge/Server (Next.js), the Database, and External Services.

```mermaid
graph TD
    subgraph Client [Client / Browser]
        UI[React UI Components - Tailwind/Shadcn]
        Forms[User Input Forms]
        ClerkUI[Clerk Sign In/Out Modal]
    end

    subgraph Server [Next.js App Router Server]
        SA[Server Actions]
        RSC[React Server Components]
        InngestClient[Inngest Client]
    end

    subgraph Data [Data Layer]
        Prisma[Prisma ORM]
        DB[(PostgreSQL)]
    end

    subgraph External [External Services]
        Gemini[Google Gemini API]
        ClerkAuth[Clerk Auth Service]
        InngestCloud[Inngest Cloud]
    end

    UI --> SA
    Forms --> SA
    ClerkUI <--> ClerkAuth

    SA --> RSC
    SA --> Prisma
    SA --> InngestClient

    Prisma <--> DB
    InngestClient <--> InngestCloud
    InngestCloud <--> Gemini
```

## 4. Entity Relationship Diagram (ERD)
*(Included here for completeness alongside the other diagrams)*

```mermaid
erDiagram
    INDUSTRY_INSIGHT ||--o{ USER : "categorizes"
    USER ||--o{ ASSESSMENT : "takes"
    USER ||--o| RESUME : "owns"
    USER ||--o{ COVER_LETTER : "generates"

    USER {
        String id PK
        String clerkUserId UK
        String email UK
        String industry FK
        String bio
        Int experience
        String[] skills
    }

    INDUSTRY_INSIGHT {
        String id PK
        String industry UK
        Json[] salaryRanges
        DemandLevel demandLevel
        MarketOutlook marketOutlook
        String[] topSkills
    }

    ASSESSMENT {
        String id PK
        String userId FK
        Float quizScore
        Json[] questions
        String category
        String improvementTip
    }

    RESUME {
        String id PK
        String userId FK
        String content
        Float atsScore
        String feedback
    }

    COVER_LETTER {
        String id PK
        String userId FK
        String content
        String jobDescription
        String companyName
        String jobTitle
        String status
    }
```

## 5. Navigation & Page Routing Flow
This flowchart maps out the user journey between the different routes (pages) in the Next.js application, including how the authentication middleware protects specific paths.

```mermaid
graph TD
    subgraph Public Routes
        Landing[Landing Page<br/>`/`]
        SignIn[Sign In<br/>`/sign-in`]
        SignUp[Sign Up<br/>`/sign-up`]
    end

    subgraph Protected Routes
        Onboarding[Onboarding<br/>`/onboarding`]
        Dashboard[Dashboard<br/>`/dashboard`]
        Resume[Resume Builder<br/>`/resume`]
        CoverLetter[Cover Letters<br/>`/ai-cover-letter`]
        Interview[Mock Interview<br/>`/interview`]
    end

    %% User Navigation
    Landing -- "Get Started" --> SignIn
    SignIn -- "Auth Success" --> Onboarding
    SignUp -- "Auth Success" --> Onboarding
    
    Onboarding -- "Complete Profile" --> Dashboard

    Dashboard -- "Build Resume" --> Resume
    Dashboard -- "Generate Cover Letter" --> CoverLetter
    Dashboard -- "Practice Interview" --> Interview

    %% Security Middleware Interception
    Dashboard -. "If Unauthenticated (Middleware)" .-> SignIn
    Resume -. "If Unauthenticated" .-> SignIn
    CoverLetter -. "If Unauthenticated" .-> SignIn
    Interview -. "If Unauthenticated" .-> SignIn
```
