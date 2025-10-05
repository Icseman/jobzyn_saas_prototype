import React, { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { 
  Mail, 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Upload, 
  Eye, 
  Check, 
  X, 
  Merge, 
  FileText, 
  User, 
  Phone, 
  MapPin, 
  Briefcase, 
  GraduationCap,
  Star,
  Settings,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react'

// Types
interface Email {
  id: string
  inboxId: string
  from: string
  to: string
  subject: string
  body: string
  date: string
  attachments: Attachment[]
  isRead: boolean
  isParsed: boolean
  parsedCandidate?: ParsedCandidate
}

interface Attachment {
  id: string
  filename: string
  type: string
  size: number
  content: string // base64 or text content
}

interface ParsedCandidate {
  id: string
  emailId: string
  confidence: number
  fields: {
    name: { value: string; confidence: number; source: string }
    email: { value: string; confidence: number; source: string }
    phone: { value: string; confidence: number; source: string }
    location: { value: string; confidence: number; source: string }
    title: { value: string; confidence: number; source: string }
    summary: { value: string; confidence: number; source: string }
    experience: Array<{ value: any; confidence: number; source: string }>
    education: Array<{ value: any; confidence: number; source: string }>
    skills: Array<{ value: string; confidence: number; source: string }>
  }
  status: 'pending' | 'approved' | 'rejected' | 'merged'
  duplicates?: string[]
  insights?: {
    overallScore: number
    strengths: string[]
    concerns: string[]
    recommendations: string[]
    matchScore: number
  }
}

interface Inbox {
  id: string
  name: string
  type: 'gmail' | 'imap'
  isActive: boolean
  emailCount: number
}

interface Candidate {
  id: string
  name: string
  email: string
  phone: string
  location: string
  title: string
  summary: string
  experience: Array<{
    id: string
    title: string
    company: string
    period: string
    description: string
  }>
  education: Array<{
    id: string
    degree: string
    school: string
    period: string
  }>
  skills: string[]
  createdAt: string
  updatedAt: string
}

// Real-life mock data
const mockInboxes: Inbox[] = [
  { id: 'inbox-1', name: 'careers@techcorp.com', type: 'gmail', isActive: true, emailCount: 47 },
  { id: 'inbox-2', name: 'hiring@startup.io', type: 'imap', isActive: true, emailCount: 23 },
  { id: 'inbox-3', name: 'jobs@fintech.com', type: 'gmail', isActive: true, emailCount: 89 },
  { id: 'inbox-4', name: 'recruiting@consulting.com', type: 'outlook', isActive: false, emailCount: 156 }
]

const mockEmails: Email[] = [
  {
    id: 'email-1',
    inboxId: 'inbox-1',
    from: 'sarah.chen@outlook.com',
    to: 'careers@techcorp.com',
    subject: 'Application for Senior Full-Stack Developer Position - Sarah Chen',
    body: `Dear Hiring Team,

I am excited to apply for the Senior Full-Stack Developer position at TechCorp. With over 6 years of experience in building scalable web applications, I believe I would be a valuable addition to your engineering team.

I have attached my resume and portfolio for your review. I am particularly interested in TechCorp's innovative approach to AI-driven solutions and would love to contribute to your next-generation products.

Best regards,
Sarah Chen
Senior Full-Stack Developer
Email: sarah.chen@outlook.com
Phone: +1 (415) 555-0123
LinkedIn: linkedin.com/in/sarahchen-dev
Portfolio: sarahchen.dev
Location: San Francisco, CA

---

PROFESSIONAL EXPERIENCE:

Senior Full-Stack Developer | Meta (2022 - Present)
• Led development of React-based dashboard serving 2M+ daily active users
• Architected microservices using Node.js, Express, and PostgreSQL
• Implemented CI/CD pipelines reducing deployment time by 60%
• Mentored 4 junior developers and conducted technical interviews
• Technologies: React, TypeScript, Node.js, GraphQL, AWS, Docker, Kubernetes

Full-Stack Developer | Stripe (2020 - 2022)
• Built payment processing features handling $50M+ in transactions monthly
• Developed RESTful APIs and integrated with third-party services
• Collaborated with product and design teams in agile environment
• Technologies: React, Python, Django, PostgreSQL, Redis

Software Engineer | Airbnb (2019 - 2020)
• Developed booking platform features using React and Ruby on Rails
• Optimized database queries improving page load times by 40%
• Participated in code reviews and maintained high code quality standards
• Technologies: React, Ruby, Rails, MySQL, Elasticsearch

EDUCATION:
Master of Science in Computer Science
Stanford University (2017 - 2019)
GPA: 3.8/4.0

Bachelor of Science in Software Engineering
UC Berkeley (2013 - 2017)
GPA: 3.9/4.0

CERTIFICATIONS:
• AWS Certified Solutions Architect (2023)
• Google Cloud Professional Developer (2022)
• Certified Kubernetes Administrator (2021)

TECHNICAL SKILLS:
Frontend: React, TypeScript, JavaScript, HTML5, CSS3, Sass, Webpack, Jest
Backend: Node.js, Python, Java, Express, Django, Spring Boot
Databases: PostgreSQL, MongoDB, Redis, Elasticsearch
Cloud: AWS, Google Cloud Platform, Docker, Kubernetes
Tools: Git, Jenkins, Jira, Figma, Postman

PROJECTS:
• Open-source React component library with 1,000+ GitHub stars
• Machine learning model for fraud detection achieving 95% accuracy
• Real-time chat application supporting 10,000+ concurrent users

LANGUAGES: English (Native), Mandarin (Fluent), Spanish (Conversational)`,
    date: '2024-01-15T14:22:00Z',
    attachments: [
      { id: 'att-1', filename: 'Sarah_Chen_Resume_2024.pdf', type: 'application/pdf', size: 892340, content: 'PDF_CONTENT_PLACEHOLDER' },
      { id: 'att-2', filename: 'Sarah_Chen_Portfolio.pdf', type: 'application/pdf', size: 2345670, content: 'PDF_CONTENT_PLACEHOLDER' }
    ],
    isRead: false,
    isParsed: false
  },
  {
    id: 'email-2',
    inboxId: 'inbox-2',
    from: 'marcus.johnson@gmail.com',
    to: 'hiring@startup.io',
    subject: 'DevOps Engineer Application - Marcus Johnson',
    body: `Hello Hiring Team,

I'm writing to express my strong interest in the DevOps Engineer position at Startup.io. As a passionate DevOps professional with 5+ years of experience in cloud infrastructure and automation, I'm excited about the opportunity to help scale your platform.

I've been following Startup.io's growth and am impressed by your innovative approach to fintech solutions. I believe my experience with AWS, Kubernetes, and CI/CD pipelines would be a great fit for your team.

Please find my resume attached. I'm available for an interview at your convenience.

Warm regards,
Marcus Johnson
DevOps Engineer
Email: marcus.johnson@gmail.com
Phone: +1 (512) 555-0456
GitHub: github.com/marcusjohnson
Location: Austin, TX

---

EXPERIENCE:

Senior DevOps Engineer | Netflix (2021 - Present)
• Managed Kubernetes clusters serving 100M+ subscribers globally
• Implemented GitOps workflows reducing deployment failures by 75%
• Designed disaster recovery strategies achieving 99.99% uptime
• Led migration from on-premise to AWS cloud infrastructure
• Technologies: Kubernetes, Docker, AWS, Terraform, Prometheus, Grafana

DevOps Engineer | Spotify (2019 - 2021)
• Built CI/CD pipelines for microservices architecture
• Automated infrastructure provisioning using Terraform and Ansible
• Implemented monitoring and alerting systems
• Technologies: Jenkins, Docker, AWS, Python, Bash

Site Reliability Engineer | Google (2018 - 2019)
• Ensured reliability of critical production systems
• Developed automation scripts for incident response
• Participated in on-call rotations and post-incident reviews
• Technologies: Python, Go, Kubernetes, BigQuery

EDUCATION:
Bachelor of Science in Computer Engineering
University of Texas at Austin (2014 - 2018)
GPA: 3.7/4.0

CERTIFICATIONS:
• AWS Certified DevOps Engineer - Professional (2023)
• Certified Kubernetes Administrator (2022)
• HashiCorp Certified: Terraform Associate (2021)
• Google Cloud Professional DevOps Engineer (2020)

SKILLS:
Cloud Platforms: AWS, Google Cloud Platform, Azure
Containerization: Docker, Kubernetes, Helm
Infrastructure as Code: Terraform, CloudFormation, Ansible
CI/CD: Jenkins, GitLab CI, GitHub Actions, ArgoCD
Monitoring: Prometheus, Grafana, ELK Stack, Datadog
Languages: Python, Go, Bash, YAML
Databases: PostgreSQL, MongoDB, Redis

PROJECTS:
• Open-source Kubernetes operator with 500+ GitHub stars
• Infrastructure automation toolkit reducing setup time by 80%
• Cost optimization framework saving $2M+ annually

LANGUAGES: English (Native), Spanish (Conversational)`,
    date: '2024-01-15T09:15:00Z',
    attachments: [
      { id: 'att-3', filename: 'Marcus_Johnson_DevOps_Resume.pdf', type: 'application/pdf', size: 678920, content: 'PDF_CONTENT_PLACEHOLDER' }
    ],
    isRead: false,
    isParsed: false
  },
  {
    id: 'email-3',
    inboxId: 'inbox-3',
    from: 'elena.rodriguez@yahoo.com',
    to: 'jobs@fintech.com',
    subject: 'Product Manager Position - Elena Rodriguez',
    body: `Dear Hiring Manager,

I am thrilled to apply for the Product Manager position at FinTech.com. With 7 years of experience in fintech product management and a strong background in user experience, I am confident I can drive innovation and growth for your platform.

I have successfully launched multiple financial products that have generated over $50M in revenue. My experience with agile methodologies, user research, and data-driven decision making aligns perfectly with FinTech.com's mission.

I have attached my resume and would welcome the opportunity to discuss how I can contribute to your product roadmap.

Best regards,
Elena Rodriguez
Senior Product Manager
Email: elena.rodriguez@yahoo.com
Phone: +1 (305) 555-0789
LinkedIn: linkedin.com/in/elenarodriguez-pm
Location: Miami, FL

---

PROFESSIONAL EXPERIENCE:

Senior Product Manager | PayPal (2021 - Present)
• Led product strategy for mobile payments platform serving 400M+ users
• Increased user engagement by 35% through feature optimization
• Managed cross-functional teams of 15+ engineers and designers
• Launched AI-powered fraud detection reducing false positives by 40%
• Technologies: SQL, Tableau, Jira, Confluence, Figma

Product Manager | Square (2019 - 2021)
• Developed point-of-sale solutions for small businesses
• Conducted user research and A/B testing to improve conversion rates
• Collaborated with engineering teams to deliver features on time
• Increased merchant onboarding by 50% through UX improvements
• Technologies: Mixpanel, Optimizely, Sketch, InVision

Associate Product Manager | Capital One (2018 - 2019)
• Managed credit card application and approval workflow
• Analyzed customer data to identify product improvement opportunities
• Worked with compliance teams to ensure regulatory requirements
• Technologies: Excel, SQL, Salesforce

EDUCATION:
Master of Business Administration (MBA)
Wharton School, University of Pennsylvania (2016 - 2018)
Concentration: Finance and Technology

Bachelor of Science in Economics
University of Miami (2012 - 2016)
GPA: 3.8/4.0

CERTIFICATIONS:
• Certified Scrum Product Owner (CSPO) - 2022
• Google Analytics Certified - 2021
• AWS Cloud Practitioner - 2020

SKILLS:
Product Management: Roadmapping, User Stories, Agile, Scrum
Analytics: SQL, Tableau, Google Analytics, Mixpanel
Design: Figma, Sketch, InVision, User Research
Finance: Financial Modeling, Risk Assessment, Compliance
Tools: Jira, Confluence, Slack, Microsoft Office

ACHIEVEMENTS:
• Led product that generated $50M+ in annual revenue
• Reduced customer churn by 25% through feature improvements
• Launched 5 successful products with 90%+ user satisfaction
• Mentored 3 junior product managers

LANGUAGES: English (Native), Spanish (Native), Portuguese (Conversational)`,
    date: '2024-01-14T16:45:00Z',
    attachments: [
      { id: 'att-4', filename: 'Elena_Rodriguez_PM_Resume.pdf', type: 'application/pdf', size: 456780, content: 'PDF_CONTENT_PLACEHOLDER' },
      { id: 'att-5', filename: 'Elena_Rodriguez_Portfolio.pdf', type: 'application/pdf', size: 1234567, content: 'PDF_CONTENT_PLACEHOLDER' }
    ],
    isRead: false,
    isParsed: false
  },
  {
    id: 'email-4',
    inboxId: 'inbox-1',
    from: 'david.kim@protonmail.com',
    to: 'careers@techcorp.com',
    subject: 'Data Scientist Application - David Kim',
    body: `Dear Recruiting Team,

I am writing to apply for the Data Scientist position at TechCorp. As a data scientist with 4+ years of experience in machine learning and statistical analysis, I am excited about the opportunity to contribute to your AI-driven initiatives.

My background includes developing predictive models for customer behavior, building recommendation systems, and implementing MLOps pipelines. I am particularly interested in TechCorp's work in natural language processing and computer vision.

I have attached my resume and a portfolio of my recent projects. I would be delighted to discuss how my skills can help advance TechCorp's data science capabilities.

Sincerely,
David Kim
Data Scientist
Email: david.kim@protonmail.com
Phone: +1 (206) 555-0234
GitHub: github.com/davidkim-ds
Kaggle: kaggle.com/davidkim
Location: Seattle, WA

---

PROFESSIONAL EXPERIENCE:

Senior Data Scientist | Amazon (2022 - Present)
• Built recommendation systems improving conversion rates by 20%
• Developed computer vision models for product categorization
• Implemented MLOps pipelines using AWS SageMaker and MLflow
• Led A/B testing framework for machine learning experiments
• Technologies: Python, R, SQL, TensorFlow, PyTorch, AWS, Docker

Data Scientist | Microsoft (2020 - 2022)
• Created predictive models for customer churn and lifetime value
• Developed natural language processing solutions for customer support
• Collaborated with engineering teams to deploy models to production
• Technologies: Python, Azure ML, Spark, Hadoop, Tableau

Junior Data Scientist | Uber (2019 - 2020)
• Analyzed ride-sharing data to optimize driver allocation
• Built time-series forecasting models for demand prediction
• Created interactive dashboards for business stakeholders
• Technologies: Python, R, SQL, Jupyter, D3.js

EDUCATION:
Ph.D. in Statistics
University of Washington (2015 - 2019)
Dissertation: "Advanced Machine Learning Techniques for High-Dimensional Data"

Master of Science in Data Science
University of California, Berkeley (2013 - 2015)
GPA: 3.9/4.0

Bachelor of Science in Mathematics
Seoul National University (2009 - 2013)
GPA: 3.8/4.0

PUBLICATIONS:
• "Deep Learning for Time Series Forecasting" - Journal of Machine Learning Research (2023)
• "Ensemble Methods for Imbalanced Classification" - ICML 2022
• "Interpretable AI: A Survey of Methods and Applications" - Nature Machine Intelligence (2021)

CERTIFICATIONS:
• AWS Certified Machine Learning - Specialty (2023)
• Google Cloud Professional Data Engineer (2022)
• Databricks Certified Data Scientist (2021)

SKILLS:
Programming: Python, R, SQL, Scala, Java
ML/AI: TensorFlow, PyTorch, Scikit-learn, XGBoost, Keras
Big Data: Spark, Hadoop, Kafka, Airflow
Cloud: AWS, Azure, Google Cloud Platform
Visualization: Tableau, Power BI, D3.js, Matplotlib, Seaborn
Databases: PostgreSQL, MongoDB, Redis, Elasticsearch

PROJECTS:
• Open-source ML library with 2,000+ GitHub stars
• Kaggle competition winner (top 1% in 3 competitions)
• Real-time fraud detection system processing 1M+ transactions/day

LANGUAGES: English (Fluent), Korean (Native), Japanese (Conversational)`,
    date: '2024-01-14T11:30:00Z',
    attachments: [
      { id: 'att-6', filename: 'David_Kim_DataScientist_Resume.pdf', type: 'application/pdf', size: 789123, content: 'PDF_CONTENT_PLACEHOLDER' },
      { id: 'att-7', filename: 'David_Kim_Research_Portfolio.pdf', type: 'application/pdf', size: 3456789, content: 'PDF_CONTENT_PLACEHOLDER' }
    ],
    isRead: false,
    isParsed: false
  },
  {
    id: 'email-5',
    inboxId: 'inbox-2',
    from: 'lisa.wang@icloud.com',
    to: 'hiring@startup.io',
    subject: 'UX/UI Designer Application - Lisa Wang',
    body: `Hello Design Team,

I'm excited to apply for the UX/UI Designer position at Startup.io. With 5+ years of experience in user-centered design and a passion for creating intuitive digital experiences, I believe I can make a significant impact on your product design.

I've been following Startup.io's design evolution and am impressed by your commitment to accessibility and user experience. My background in fintech design and mobile-first approaches aligns perfectly with your needs.

Please find my portfolio and resume attached. I'm available for a design challenge or interview at your convenience.

Best regards,
Lisa Wang
Senior UX/UI Designer
Email: lisa.wang@icloud.com
Phone: +1 (617) 555-0567
Portfolio: lisawang.design
Dribbble: dribbble.com/lisawang
Location: Boston, MA

---

PROFESSIONAL EXPERIENCE:

Senior UX/UI Designer | Airbnb (2022 - Present)
• Led design for booking platform serving 150M+ users globally
• Conducted user research and usability testing with 500+ participants
• Designed mobile-first experiences increasing conversion by 25%
• Collaborated with product and engineering teams in agile environment
• Technologies: Figma, Sketch, Principle, InVision, Miro

UX/UI Designer | Robinhood (2020 - 2022)
• Designed trading interface for mobile and web platforms
• Created design system components used across 20+ product teams
• Implemented accessibility standards (WCAG 2.1 AA compliance)
• Led design sprints and cross-functional workshops
• Technologies: Figma, Framer, Zeplin, Abstract, Jira

Product Designer | Dropbox (2019 - 2020)
• Designed file sharing and collaboration features
• Created user flows and wireframes for complex workflows
• Conducted A/B testing to optimize user experience
• Technologies: Sketch, InVision, Marvel, Hotjar

EDUCATION:
Master of Fine Arts in Digital Design
Rhode Island School of Design (2017 - 2019)

Bachelor of Arts in Graphic Design
Boston University (2013 - 2017)
GPA: 3.8/4.0

CERTIFICATIONS:
• Google UX Design Certificate (2023)
• Certified Usability Analyst (CUA) - 2022
• Adobe Certified Expert (ACE) - 2021

SKILLS:
Design Tools: Figma, Sketch, Adobe Creative Suite, Principle, Framer
Prototyping: InVision, Marvel, ProtoPie, Origami Studio
Research: User Interviews, Usability Testing, A/B Testing, Analytics
Collaboration: Miro, Slack, Jira, Confluence, Notion

DESIGN EXPERTISE:
• User Experience (UX) Design
• User Interface (UI) Design
• Design Systems
• Mobile App Design
• Web Design
• Prototyping
• User Research
• Information Architecture
• Interaction Design
• Accessibility Design

PORTFOLIO HIGHLIGHTS:
• Redesigned mobile banking app increasing user engagement by 40%
• Created design system used by 50+ designers across company
• Led accessibility audit improving compliance from 60% to 95%
• Designed award-winning fintech app with 4.8/5 App Store rating

AWARDS:
• Webby Award for Best User Experience (2023)
• Awwwards Site of the Day (2022)
• Dribbble Shot of the Year (2021)

LANGUAGES: English (Native), Mandarin (Fluent), French (Conversational)`,
    date: '2024-01-14T08:20:00Z',
    attachments: [
      { id: 'att-8', filename: 'Lisa_Wang_UX_Resume.pdf', type: 'application/pdf', size: 567890, content: 'PDF_CONTENT_PLACEHOLDER' },
      { id: 'att-9', filename: 'Lisa_Wang_Portfolio.pdf', type: 'application/pdf', size: 4567890, content: 'PDF_CONTENT_PLACEHOLDER' }
    ],
    isRead: false,
    isParsed: false
  },
  {
    id: 'email-6',
    inboxId: 'inbox-3',
    from: 'alex.rodriguez@hotmail.com',
    to: 'jobs@fintech.com',
    subject: 'Backend Engineer Application - Alex Rodriguez',
    body: `Dear Engineering Team,

I am writing to apply for the Backend Engineer position at FinTech.com. As a backend engineer with 6+ years of experience in building scalable financial systems, I am excited about the opportunity to contribute to your platform's growth.

My experience includes developing high-performance APIs, implementing security measures for financial data, and optimizing database performance. I am particularly interested in FinTech.com's microservices architecture and cloud-native approach.

I have attached my resume and would welcome the opportunity to discuss how I can help scale your backend infrastructure.

Best regards,
Alex Rodriguez
Senior Backend Engineer
Email: alex.rodriguez@hotmail.com
Phone: +1 (713) 555-0890
GitHub: github.com/alexrodriguez-dev
Location: Houston, TX

---

PROFESSIONAL EXPERIENCE:

Senior Backend Engineer | Goldman Sachs (2021 - Present)
• Developed trading systems processing $1B+ in daily transactions
• Implemented real-time risk management algorithms
• Built RESTful APIs serving 10,000+ requests per second
• Led migration from monolithic to microservices architecture
• Technologies: Java, Spring Boot, PostgreSQL, Redis, Kafka, Docker

Backend Engineer | JPMorgan Chase (2019 - 2021)
• Built payment processing systems for mobile banking
• Implemented fraud detection algorithms reducing false positives by 30%
• Optimized database queries improving response times by 50%
• Technologies: Java, Python, Oracle, MongoDB, RabbitMQ

Software Engineer | Bank of America (2018 - 2019)
• Developed customer account management systems
• Implemented security measures for PCI DSS compliance
• Created automated testing frameworks
• Technologies: Java, Spring, SQL Server, Jenkins

EDUCATION:
Master of Science in Computer Science
Rice University (2016 - 2018)
GPA: 3.9/4.0

Bachelor of Science in Software Engineering
University of Texas at Austin (2012 - 2016)
GPA: 3.7/4.0

CERTIFICATIONS:
• AWS Certified Solutions Architect - Professional (2023)
• Oracle Certified Professional Java Developer (2022)
• Certified Information Systems Security Professional (CISSP) - 2021

SKILLS:
Programming: Java, Python, Go, C++, SQL
Frameworks: Spring Boot, Django, Flask, Express.js
Databases: PostgreSQL, MySQL, MongoDB, Redis, Oracle
Cloud: AWS, Azure, Google Cloud Platform
Tools: Docker, Kubernetes, Jenkins, Git, IntelliJ IDEA

PROJECTS:
• Open-source financial API framework with 1,500+ GitHub stars
• High-frequency trading system processing 100,000+ orders/second
• Blockchain-based payment verification system

LANGUAGES: English (Native), Spanish (Native), Portuguese (Conversational)`,
    date: '2024-01-13T15:10:00Z',
    attachments: [
      { id: 'att-10', filename: 'Alex_Rodriguez_Backend_Resume.pdf', type: 'application/pdf', size: 678901, content: 'PDF_CONTENT_PLACEHOLDER' }
    ],
    isRead: false,
    isParsed: false
  },
  {
    id: 'email-7',
    inboxId: 'inbox-1',
    from: 'maria.garcia@outlook.com',
    to: 'careers@techcorp.com',
    subject: 'Marketing Manager Application - Maria Garcia',
    body: `Dear Marketing Team,

I am excited to apply for the Marketing Manager position at TechCorp. With 8+ years of experience in B2B marketing and a proven track record of driving growth through digital channels, I am confident I can help scale TechCorp's market presence.

My experience includes developing comprehensive marketing strategies, managing cross-functional teams, and implementing data-driven campaigns that have generated over $100M in pipeline. I am particularly interested in TechCorp's AI solutions and would love to contribute to your go-to-market strategy.

I have attached my resume and would welcome the opportunity to discuss how I can help accelerate TechCorp's growth.

Best regards,
Maria Garcia
Senior Marketing Manager
Email: maria.garcia@outlook.com
Phone: +1 (312) 555-0345
LinkedIn: linkedin.com/in/mariagarcia-marketing
Location: Chicago, IL

---

PROFESSIONAL EXPERIENCE:

Senior Marketing Manager | Salesforce (2021 - Present)
• Led B2B marketing campaigns generating $50M+ in pipeline
• Managed team of 8 marketing professionals
• Developed account-based marketing strategies for enterprise clients
• Increased lead quality score by 35% through data-driven optimization
• Technologies: Salesforce, HubSpot, Marketo, Google Analytics, Tableau

Marketing Manager | Microsoft (2019 - 2021)
• Executed integrated marketing campaigns across multiple channels
• Collaborated with sales teams to develop targeted messaging
• Implemented marketing automation workflows
• Technologies: Dynamics 365, Pardot, LinkedIn Campaign Manager

Digital Marketing Specialist | IBM (2018 - 2019)
• Managed paid search and social media advertising campaigns
• Optimized landing pages improving conversion rates by 25%
• Conducted competitive analysis and market research
• Technologies: Google Ads, Facebook Ads, Adobe Analytics

EDUCATION:
Master of Business Administration (MBA)
Northwestern University, Kellogg School of Management (2016 - 2018)
Concentration: Marketing and Strategy

Bachelor of Arts in Communications
University of Illinois at Urbana-Champaign (2012 - 2016)
GPA: 3.8/4.0

CERTIFICATIONS:
• Google Analytics Certified (2023)
• HubSpot Content Marketing Certified (2022)
• Salesforce Certified Marketing Cloud Consultant (2021)
• Google Ads Certified (2020)

SKILLS:
Marketing Platforms: Salesforce, HubSpot, Marketo, Pardot
Analytics: Google Analytics, Adobe Analytics, Tableau, Power BI
Advertising: Google Ads, Facebook Ads, LinkedIn Campaign Manager
Content: WordPress, Canva, Adobe Creative Suite
Email Marketing: Mailchimp, Constant Contact, SendGrid
Social Media: Hootsuite, Buffer, Sprout Social

ACHIEVEMENTS:
• Led marketing campaigns generating $100M+ in pipeline
• Increased brand awareness by 60% through integrated campaigns
• Reduced cost per lead by 40% through optimization
• Launched 3 successful product marketing campaigns
• Mentored 5 junior marketing professionals

LANGUAGES: English (Native), Spanish (Native), Italian (Conversational)`,
    date: '2024-01-13T10:45:00Z',
    attachments: [
      { id: 'att-11', filename: 'Maria_Garcia_Marketing_Resume.pdf', type: 'application/pdf', size: 456789, content: 'PDF_CONTENT_PLACEHOLDER' },
      { id: 'att-12', filename: 'Maria_Garcia_Campaign_Portfolio.pdf', type: 'application/pdf', size: 2345678, content: 'PDF_CONTENT_PLACEHOLDER' }
    ],
    isRead: false,
    isParsed: false
  },
  {
    id: 'email-8',
    inboxId: 'inbox-2',
    from: 'sarah.wilson@email.com',
    to: 'careers@company.com',
    subject: 'Application for UX Designer Role',
    body: `Hi there,

I'm Sarah Wilson, a UX Designer with 4+ years of experience. I've attached my portfolio and resume.

Contact: sarah.wilson@email.com
Phone: +1 (555) 987-6543
Based in: New York, NY

SUMMARY:
Creative UX/UI designer passionate about user-centered design and creating intuitive experiences.

EXPERIENCE:
Senior UX Designer at Design Studio (2022-2024)
- Lead design initiatives for mobile and web applications
- Created design systems and conducted user research

UX Designer at Digital Agency (2020-2022)
- Designed user interfaces for various clients
- Created wireframes and prototypes

EDUCATION:
Master of Design in User Experience
Parsons School of Design (2018-2020)

SKILLS: Figma, Adobe Creative Suite, Sketch, Prototyping, User Research, Design Systems`,
    date: '2024-01-14T14:20:00Z',
    attachments: [
      { id: 'att-2', filename: 'sarah_wilson_portfolio.pdf', type: 'application/pdf', size: 1024000, content: 'PDF_CONTENT_PLACEHOLDER' },
      { id: 'att-3', filename: 'sarah_wilson_resume.docx', type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', size: 51200, content: 'DOCX_CONTENT_PLACEHOLDER' }
    ],
    isRead: true,
    isParsed: true,
    parsedCandidate: {
      id: 'parsed-1',
      emailId: 'email-2',
      confidence: 0.85,
      fields: {
        name: { value: 'Sarah Wilson', confidence: 0.95, source: 'email body' },
        email: { value: 'sarah.wilson@email.com', confidence: 1.0, source: 'email body' },
        phone: { value: '+1 (555) 987-6543', confidence: 0.9, source: 'email body' },
        location: { value: 'New York, NY', confidence: 0.85, source: 'email body' },
        title: { value: 'UX Designer', confidence: 0.8, source: 'subject' },
        summary: { value: 'Creative UX/UI designer passionate about user-centered design and creating intuitive experiences.', confidence: 0.7, source: 'email body' },
        experience: [
          { value: { title: 'Senior UX Designer', company: 'Design Studio', period: '2022-2024', description: 'Lead design initiatives for mobile and web applications' }, confidence: 0.8, source: 'email body' }
        ],
        education: [
          { value: { degree: 'Master of Design in User Experience', school: 'Parsons School of Design', period: '2018-2020' }, confidence: 0.85, source: 'email body' }
        ],
        skills: [
          { value: 'Figma', confidence: 0.9, source: 'email body' },
          { value: 'Adobe Creative Suite', confidence: 0.9, source: 'email body' },
          { value: 'User Research', confidence: 0.8, source: 'email body' }
        ]
      },
      status: 'pending'
    }
  }
]

const mockCandidates: Candidate[] = [
  {
    id: 'candidate-1',
    name: 'Ahmed Benali',
    email: 'ahmed.benali@email.com',
    phone: '+212 6 12 34 56 78',
    location: 'Casablanca, Morocco',
    title: 'Senior Software Engineer',
    summary: 'Experienced software engineer with 5+ years of expertise in full-stack development.',
    experience: [
      { id: 'exp-1', title: 'Senior Software Engineer', company: 'Tech Corp Morocco', period: '2021 - Present', description: 'Led development of microservices architecture' }
    ],
    education: [
      { id: 'edu-1', degree: 'Bachelor of Science in Computer Science', school: 'Mohammed V University', period: '2015 - 2019' }
    ],
    skills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  }
]

// Storage keys
const STORAGE_KEYS = {
  MAILBOXES: 'recruiter:mailboxes:v1',
  EMAILS: 'recruiter:emails:v1',
  PARSED_CANDIDATES: 'recruiter:parsedCandidates:v1',
  CANDIDATES: 'recruiter:candidates:v1',
  PARSE_MAPPINGS: 'recruiter:parseMappings:v1',
  LAST_SAVED: 'recruiter:lastSaved:v1'
}

// Advanced AI-powered parser function
const mockParseEmail = (email: Email): ParsedCandidate => {
  const body = email.body.toLowerCase()
  const subject = email.subject.toLowerCase()
  
  // Enhanced pattern matching with confidence scoring
  const namePatterns = [
    /(?:i am|my name is|sincerely,?)\s+([a-z\s]+)/i,
    /([A-Z][a-z]+ [A-Z][a-z]+)(?:\s|$|,|\n)/,
    /from:\s*([A-Z][a-z]+ [A-Z][a-z]+)/i
  ]
  
  const emailPatterns = [
    /([a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,})/i,
    /email:?\s*([a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,})/i
  ]
  
  const phonePatterns = [
    /(\+?1?[-.\s]?\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4})/i,
    /phone:?\s*(\+?1?[-.\s]?\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4})/i,
    /(\+?[0-9]{1,3}[-.\s]?[0-9]{3,4}[-.\s]?[0-9]{3,4}[-.\s]?[0-9]{3,4})/i
  ]
  
  const locationPatterns = [
    /(?:based in|location:?|from:?)\s*([^,\n]+)/i,
    /([A-Z][a-z]+,\s*[A-Z]{2})/,
    /([A-Z][a-z]+,\s*[A-Z][a-z]+)/
  ]
  
  // Extract name with highest confidence
  let name = 'Unknown'
  let nameConfidence = 0.1
  let nameSource = 'email body'
  
  for (const pattern of namePatterns) {
    const match = email.body.match(pattern)
    if (match && match[1]) {
      const extractedName = match[1].trim()
      if (extractedName.length > 2 && extractedName.split(' ').length >= 2) {
        name = extractedName
        nameConfidence = 0.9
        break
      }
    }
  }
  
  // Extract email
  let emailValue = email.from
  let emailConfidence = 0.7
  let emailSource = 'from field'
  
  for (const pattern of emailPatterns) {
    const match = email.body.match(pattern)
    if (match && match[1]) {
      emailValue = match[1]
      emailConfidence = 0.95
      emailSource = 'email body'
      break
    }
  }
  
  // Extract phone
  let phone = ''
  let phoneConfidence = 0.0
  
  for (const pattern of phonePatterns) {
    const match = email.body.match(pattern)
    if (match && match[1]) {
      phone = match[1]
      phoneConfidence = 0.85
      break
    }
  }
  
  // Extract location
  let location = ''
  let locationConfidence = 0.0
  
  for (const pattern of locationPatterns) {
    const match = email.body.match(pattern)
    if (match && match[1]) {
      location = match[1].trim()
      locationConfidence = 0.8
      break
    }
  }
  
  // Extract title/position
  let title = 'Professional'
  let titleConfidence = 0.5
  
  const titleKeywords = {
    'software engineer': ['software engineer', 'developer', 'programmer'],
    'data scientist': ['data scientist', 'ml engineer', 'ai engineer'],
    'product manager': ['product manager', 'pm', 'product owner'],
    'devops engineer': ['devops', 'sre', 'site reliability'],
    'ux designer': ['ux designer', 'ui designer', 'product designer'],
    'backend engineer': ['backend engineer', 'api developer'],
    'marketing manager': ['marketing manager', 'growth manager']
  }
  
  for (const [jobTitle, keywords] of Object.entries(titleKeywords)) {
    for (const keyword of keywords) {
      if (subject.includes(keyword) || body.includes(keyword)) {
        title = jobTitle
        titleConfidence = 0.8
        break
      }
    }
    if (titleConfidence > 0.5) break
  }
  
  // Extract experience
  const experience: Array<{value: any, confidence: number, source: string}> = []
  const expPattern = /([A-Z][a-z\s]+(?:Engineer|Manager|Developer|Designer|Scientist|Analyst))\s*[\|\-\@]\s*([A-Z][a-z\s&]+)\s*\(?([0-9]{4}\s*[-–]\s*[0-9]{4}|[0-9]{4}\s*[-–]\s*Present)\)?/gi
  let expMatch
  
  while ((expMatch = expPattern.exec(email.body)) !== null) {
    experience.push({
      value: {
        title: expMatch[1].trim(),
        company: expMatch[2].trim(),
        period: expMatch[3] ? expMatch[3].trim() : '',
        description: ''
      },
      confidence: 0.75,
      source: 'email body'
    })
  }
  
  // Extract education
  const education: Array<{value: any, confidence: number, source: string}> = []
  const eduPattern = /(Bachelor|Master|PhD|MBA|Associate)\s+(?:of\s+)?([A-Z][a-z\s]+)\s*(?:in\s+)?([A-Z][a-z\s]+)?\s*([A-Z][a-z\s&]+)\s*\(?([0-9]{4}\s*[-–]\s*[0-9]{4})\)?/gi
  let eduMatch
  
  while ((eduMatch = eduPattern.exec(email.body)) !== null) {
    education.push({
      value: {
        degree: `${eduMatch[1]} ${eduMatch[2]} ${eduMatch[3] || ''}`.trim(),
        school: eduMatch[4].trim(),
        period: eduMatch[5] ? eduMatch[5].trim() : ''
      },
      confidence: 0.8,
      source: 'email body'
    })
  }
  
  // Extract skills
  const skills: Array<{value: string, confidence: number, source: string}> = []
  const skillKeywords = [
    'JavaScript', 'TypeScript', 'Python', 'Java', 'React', 'Node.js', 'AWS', 'Docker', 'Kubernetes',
    'SQL', 'MongoDB', 'PostgreSQL', 'Redis', 'GraphQL', 'REST', 'Git', 'Jenkins', 'Terraform',
    'Machine Learning', 'AI', 'TensorFlow', 'PyTorch', 'Data Science', 'Analytics', 'Tableau',
    'Figma', 'Sketch', 'Adobe', 'UX', 'UI', 'Design', 'Product Management', 'Agile', 'Scrum'
  ]
  
  for (const skill of skillKeywords) {
    if (body.includes(skill.toLowerCase())) {
      skills.push({
        value: skill,
        confidence: 0.7,
        source: 'email body'
      })
    }
  }
  
  // Extract summary from email body
  const summary = email.body.substring(0, 300).replace(/\n/g, ' ').trim() + '...'
  
  // Calculate overall confidence
  const confidenceScores = [nameConfidence, emailConfidence, phoneConfidence, locationConfidence, titleConfidence]
  const overallConfidence = confidenceScores.reduce((sum, score) => sum + score, 0) / confidenceScores.length
  
  return {
    id: `parsed-${Date.now()}`,
    emailId: email.id,
    confidence: Math.round(overallConfidence * 100) / 100,
    fields: {
      name: { value: name, confidence: nameConfidence, source: nameSource },
      email: { value: emailValue, confidence: emailConfidence, source: emailSource },
      phone: { value: phone, confidence: phoneConfidence, source: 'email body' },
      location: { value: location, confidence: locationConfidence, source: 'email body' },
      title: { value: title, confidence: titleConfidence, source: 'subject/body' },
      summary: { value: summary, confidence: 0.6, source: 'email body' },
      experience,
      education,
      skills
    },
    status: 'pending'
  }
}

// Advanced duplicate detection with AI insights
const findDuplicates = (parsedCandidate: ParsedCandidate, candidates: Candidate[]): string[] => {
  const duplicates: string[] = []
  const similarityThreshold = 0.8
  
  candidates.forEach(candidate => {
    let similarityScore = 0
    let matchReasons: string[] = []
    
    // Email match (exact)
    if (candidate.email.toLowerCase() === parsedCandidate.fields.email.value.toLowerCase()) {
      similarityScore += 0.4
      matchReasons.push('Email address')
    }
    
    // Phone match (normalized)
    if (candidate.phone && parsedCandidate.fields.phone.value) {
      const phone1 = candidate.phone.replace(/\D/g, '')
      const phone2 = parsedCandidate.fields.phone.value.replace(/\D/g, '')
      if (phone1 === phone2 && phone1.length >= 10) {
        similarityScore += 0.3
        matchReasons.push('Phone number')
      }
    }
    
    // Name similarity (fuzzy matching)
    const name1 = candidate.name.toLowerCase().split(' ').filter(word => word.length > 2)
    const name2 = parsedCandidate.fields.name.value.toLowerCase().split(' ').filter(word => word.length > 2)
    
    if (name1.length > 0 && name2.length > 0) {
      const commonWords = name1.filter(word => name2.includes(word))
      const nameSimilarity = commonWords.length / Math.max(name1.length, name2.length)
      
      if (nameSimilarity >= 0.6) {
        similarityScore += 0.2
        matchReasons.push('Name similarity')
      }
    }
    
    // Location similarity
    if (candidate.location && parsedCandidate.fields.location.value) {
      const loc1 = candidate.location.toLowerCase()
      const loc2 = parsedCandidate.fields.location.value.toLowerCase()
      
      if (loc1.includes(loc2) || loc2.includes(loc1)) {
        similarityScore += 0.1
        matchReasons.push('Location')
      }
    }
    
    // Title/role similarity
    if (candidate.title && parsedCandidate.fields.title.value) {
      const title1 = candidate.title.toLowerCase()
      const title2 = parsedCandidate.fields.title.value.toLowerCase()
      
      const titleKeywords1 = title1.split(' ')
      const titleKeywords2 = title2.split(' ')
      const commonTitleWords = titleKeywords1.filter(word => titleKeywords2.includes(word))
      
      if (commonTitleWords.length >= 1) {
        similarityScore += 0.1
        matchReasons.push('Job title')
      }
    }
    
    // Add to duplicates if similarity score meets threshold
    if (similarityScore >= similarityThreshold) {
      duplicates.push(candidate.id)
      console.log(`Duplicate detected: ${candidate.name} (${similarityScore.toFixed(2)} similarity) - ${matchReasons.join(', ')}`)
    }
  })
  
  return duplicates
}

// AI-powered candidate scoring and insights
const generateCandidateInsights = (parsedCandidate: ParsedCandidate): {
  overallScore: number
  strengths: string[]
  concerns: string[]
  recommendations: string[]
  matchScore: number
} => {
  const insights = {
    overallScore: 0,
    strengths: [] as string[],
    concerns: [] as string[],
    recommendations: [] as string[],
    matchScore: 0
  }
  
  // Score based on data completeness
  const fields = parsedCandidate.fields
  let completenessScore = 0
  const totalFields = 9 // name, email, phone, location, title, summary, experience, education, skills
  
  if (fields.name.value !== 'Unknown') completenessScore++
  if (fields.email.value) completenessScore++
  if (fields.phone.value) completenessScore++
  if (fields.location.value) completenessScore++
  if (fields.title.value !== 'Professional') completenessScore++
  if (fields.summary.value.length > 50) completenessScore++
  if (fields.experience.length > 0) completenessScore++
  if (fields.education.length > 0) completenessScore++
  if (fields.skills.length > 0) completenessScore++
  
  insights.overallScore = Math.round((completenessScore / totalFields) * 100)
  
  // Generate strengths
  if (fields.experience.length >= 3) {
    insights.strengths.push('Extensive work experience')
  }
  if (fields.education.length >= 2) {
    insights.strengths.push('Strong educational background')
  }
  if (fields.skills.length >= 5) {
    insights.strengths.push('Diverse technical skills')
  }
  if (fields.phone.value && fields.location.value) {
    insights.strengths.push('Complete contact information')
  }
  if (parsedCandidate.confidence >= 0.8) {
    insights.strengths.push('High data quality')
  }
  
  // Generate concerns
  if (fields.experience.length === 0) {
    insights.concerns.push('No work experience found')
  }
  if (fields.education.length === 0) {
    insights.concerns.push('No education information')
  }
  if (fields.skills.length < 3) {
    insights.concerns.push('Limited technical skills listed')
  }
  if (!fields.phone.value) {
    insights.concerns.push('Missing phone number')
  }
  if (parsedCandidate.confidence < 0.6) {
    insights.concerns.push('Low parsing confidence')
  }
  
  // Generate recommendations
  if (insights.concerns.length > 0) {
    insights.recommendations.push('Review and verify extracted information')
  }
  if (fields.experience.length === 0) {
    insights.recommendations.push('Request resume or CV for complete work history')
  }
  if (fields.skills.length < 5) {
    insights.recommendations.push('Ask for detailed technical skills list')
  }
  if (insights.overallScore >= 80) {
    insights.recommendations.push('Strong candidate - consider fast-tracking to interview')
  }
  
  // Calculate match score based on role relevance
  const roleKeywords = {
    'software engineer': ['javascript', 'python', 'java', 'react', 'node.js', 'aws', 'docker'],
    'data scientist': ['python', 'machine learning', 'ai', 'tensorflow', 'pytorch', 'sql', 'analytics'],
    'product manager': ['product', 'management', 'agile', 'scrum', 'strategy', 'analytics'],
    'devops engineer': ['aws', 'docker', 'kubernetes', 'terraform', 'ci/cd', 'monitoring'],
    'ux designer': ['figma', 'sketch', 'design', 'ux', 'ui', 'user research', 'prototyping'],
    'backend engineer': ['java', 'python', 'node.js', 'sql', 'api', 'microservices'],
    'marketing manager': ['marketing', 'campaigns', 'analytics', 'social media', 'content']
  }
  
  const candidateTitle = fields.title.value.toLowerCase()
  const candidateSkills = fields.skills.map(s => s.value.toLowerCase())
  
  let matchScore = 0
  for (const [role, keywords] of Object.entries(roleKeywords)) {
    if (candidateTitle.includes(role) || role.includes(candidateTitle)) {
      const matchingSkills = keywords.filter(keyword => 
        candidateSkills.some(skill => skill.includes(keyword) || keyword.includes(skill))
      )
      matchScore = Math.min(100, (matchingSkills.length / keywords.length) * 100)
      break
    }
  }
  
  insights.matchScore = Math.round(matchScore)
  
  return insights
}

export const Mailbox: React.FC = () => {
  const [inboxes, setInboxes] = useState<Inbox[]>([])
  const [emails, setEmails] = useState<Email[]>([])
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [selectedInbox, setSelectedInbox] = useState<string | null>(null)
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null)
  const [selectedParsedCandidate, setSelectedParsedCandidate] = useState<ParsedCandidate | null>(null)
  const [viewMode, setViewMode] = useState<'unified' | 'per-inbox'>('unified')
  const [filter, setFilter] = useState<'all' | 'unread' | 'parsed' | 'needs-review' | 'duplicates'>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [showMergeUI, setShowMergeUI] = useState(false)
  const [mergeCandidate, setMergeCandidate] = useState<Candidate | null>(null)

  // Load data from localStorage
  useEffect(() => {
    const loadData = () => {
      const savedInboxes = localStorage.getItem(STORAGE_KEYS.MAILBOXES)
      const savedEmails = localStorage.getItem(STORAGE_KEYS.EMAILS)
      const savedCandidates = localStorage.getItem(STORAGE_KEYS.CANDIDATES)
      
      setInboxes(savedInboxes ? JSON.parse(savedInboxes) : mockInboxes)
      setEmails(savedEmails ? JSON.parse(savedEmails) : mockEmails)
      setCandidates(savedCandidates ? JSON.parse(savedCandidates) : mockCandidates)
    }
    
    loadData()
  }, [])

  // Save data to localStorage only when data changes
  useEffect(() => {
    if (inboxes.length > 0 || emails.length > 0 || candidates.length > 0) {
      localStorage.setItem(STORAGE_KEYS.MAILBOXES, JSON.stringify(inboxes))
      localStorage.setItem(STORAGE_KEYS.EMAILS, JSON.stringify(emails))
      localStorage.setItem(STORAGE_KEYS.CANDIDATES, JSON.stringify(candidates))
      localStorage.setItem(STORAGE_KEYS.LAST_SAVED, new Date().toISOString())
    }
  }, [inboxes, emails, candidates])

  // Add mock inbox
  const addMockInbox = () => {
    const newInbox: Inbox = {
      id: `inbox-${Date.now()}`,
      name: `Mock Inbox ${inboxes.length + 1}`,
      type: 'gmail',
      isActive: true,
      emailCount: Math.floor(Math.random() * 10) + 1
    }
    setInboxes(prev => [...prev, newInbox])
  }

  // Parse email with AI insights
  const parseEmail = (email: Email) => {
    const parsedCandidate = mockParseEmail(email)
    const duplicates = findDuplicates(parsedCandidate, candidates)
    const insights = generateCandidateInsights(parsedCandidate)
    
    parsedCandidate.duplicates = duplicates
    parsedCandidate.insights = insights
    
    const updatedEmail = { ...email, isParsed: true, parsedCandidate }
    setEmails(prev => prev.map(e => e.id === email.id ? updatedEmail : e))
    setSelectedEmail(updatedEmail)
    setSelectedParsedCandidate(parsedCandidate)
  }

  // Approve candidate
  const approveCandidate = (parsedCandidate: ParsedCandidate, mergeWithId?: string) => {
    if (mergeWithId) {
      // Merge with existing candidate
      const existingCandidate = candidates.find(c => c.id === mergeWithId)
      if (existingCandidate) {
        const mergedCandidate = {
          ...existingCandidate,
          name: parsedCandidate.fields.name.value || existingCandidate.name,
          email: parsedCandidate.fields.email.value || existingCandidate.email,
          phone: parsedCandidate.fields.phone.value || existingCandidate.phone,
          location: parsedCandidate.fields.location.value || existingCandidate.location,
          title: parsedCandidate.fields.title.value || existingCandidate.title,
          summary: parsedCandidate.fields.summary.value || existingCandidate.summary,
          updatedAt: new Date().toISOString()
        }
        setCandidates(prev => prev.map(c => c.id === mergeWithId ? mergedCandidate : c))
      }
    } else {
      // Create new candidate
      const newCandidate: Candidate = {
        id: `candidate-${Date.now()}`,
        name: parsedCandidate.fields.name.value,
        email: parsedCandidate.fields.email.value,
        phone: parsedCandidate.fields.phone.value,
        location: parsedCandidate.fields.location.value,
        title: parsedCandidate.fields.title.value,
        summary: parsedCandidate.fields.summary.value,
        experience: parsedCandidate.fields.experience.map(exp => ({
          id: `exp-${Date.now()}`,
          ...exp.value
        })),
        education: parsedCandidate.fields.education.map(edu => ({
          id: `edu-${Date.now()}`,
          ...edu.value
        })),
        skills: parsedCandidate.fields.skills.map(skill => skill.value),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      setCandidates(prev => [...prev, newCandidate])
    }

    // Update parsed candidate status
    const updatedEmail = selectedEmail ? {
      ...selectedEmail,
      parsedCandidate: { ...parsedCandidate, status: mergeWithId ? 'merged' : 'approved' }
    } : null
    
    if (updatedEmail) {
      setEmails(prev => prev.map(e => e.id === updatedEmail.id ? updatedEmail : e))
      setSelectedEmail(updatedEmail)
    }
    
    setShowMergeUI(false)
    setMergeCandidate(null)
  }

  // Reject candidate
  const rejectCandidate = (parsedCandidate: ParsedCandidate) => {
    const updatedEmail = selectedEmail ? {
      ...selectedEmail,
      parsedCandidate: { ...parsedCandidate, status: 'rejected' }
    } : null
    
    if (updatedEmail) {
      setEmails(prev => prev.map(e => e.id === updatedEmail.id ? updatedEmail : e))
      setSelectedEmail(updatedEmail)
    }
  }

  // Filter emails
  const filteredEmails = emails.filter(email => {
    if (selectedInbox && viewMode === 'per-inbox' && email.inboxId !== selectedInbox) return false
    if (filter === 'unread' && email.isRead) return false
    if (filter === 'parsed' && !email.isParsed) return false
    if (filter === 'needs-review' && (!email.parsedCandidate || email.parsedCandidate.status !== 'pending')) return false
    if (filter === 'duplicates' && (!email.parsedCandidate || !email.parsedCandidate.duplicates?.length)) return false
    if (searchTerm && !email.subject.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !email.from.toLowerCase().includes(searchTerm.toLowerCase())) return false
    return true
  })

  return (
    <div className="flex h-screen bg-background relative">
      {/* Left Column - Inbox List */}
      <div className="w-80 border-r border-border bg-card p-4 overflow-y-auto">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Mailboxes</h2>
            <Button onClick={addMockInbox} size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Add Inbox
            </Button>
          </div>

          {/* View Mode Toggle */}
          <div className="flex gap-2">
            <Button
              variant={viewMode === 'unified' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('unified')}
              className="flex-1"
            >
              Unified
            </Button>
            <Button
              variant={viewMode === 'per-inbox' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('per-inbox')}
              className="flex-1"
            >
              Per Inbox
            </Button>
          </div>

          {/* Inbox List */}
          <div className="space-y-2">
            {inboxes.map(inbox => (
              <div
                key={inbox.id}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  selectedInbox === inbox.id && viewMode === 'per-inbox'
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:border-border/80 bg-card'
                }`}
                onClick={() => {
                  if (viewMode === 'per-inbox') {
                    setSelectedInbox(inbox.id)
                  }
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium text-sm text-foreground">{inbox.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {inbox.emailCount}
                    </Badge>
                    <div className={`w-2 h-2 rounded-full ${inbox.isActive ? 'bg-green-500' : 'bg-gray-400'}`} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-foreground">Filters</h3>
            <div className="space-y-1">
              {['all', 'unread', 'parsed', 'needs-review', 'duplicates'].map(filterType => (
                <button
                  key={filterType}
                  className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                    filter === filterType
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-muted'
                  }`}
                  onClick={() => setFilter(filterType as any)}
                >
                  {filterType.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Center Column - Email List */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="border-b border-border bg-card p-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search emails and candidates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-2" />
              Import
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Email List */}
        <div className="flex-1 overflow-y-auto">
          {selectedEmail ? (
            <div className="h-full flex flex-col">
              {/* Email Header */}
              <div className="border-b border-border bg-card p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedEmail(null)}
                      className="p-1 h-8 w-8 hover:bg-muted"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{selectedEmail.subject}</h3>
                      <p className="text-sm text-muted-foreground">
                        From: {selectedEmail.from} • {new Date(selectedEmail.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {selectedEmail.attachments.length > 0 && (
                      <Badge variant="secondary">
                        <FileText className="h-3 w-3 mr-1" />
                        {selectedEmail.attachments.length}
                      </Badge>
                    )}
                    {selectedEmail.isParsed && (
                      <Badge variant={selectedEmail.parsedCandidate?.status === 'approved' ? 'default' : 'secondary'}>
                        {selectedEmail.parsedCandidate?.status === 'approved' ? 'Approved' : 'Parsed'}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              {/* Email Content */}
              <div className="flex-1 p-4 overflow-y-auto">
                <div className="space-y-4">
                  <div className="prose prose-sm max-w-none">
                    <pre className="whitespace-pre-wrap text-sm text-foreground bg-muted p-4 rounded">
                      {selectedEmail.body}
                    </pre>
                  </div>

                  {selectedEmail.attachments.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-medium text-foreground">Attachments</h4>
                      {selectedEmail.attachments.map(attachment => (
                        <div key={attachment.id} className="flex items-center gap-2 p-2 border border-border rounded">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-foreground">{attachment.filename}</span>
                          <Badge variant="outline" className="text-xs">
                            {attachment.type}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  )}

                  {!selectedEmail.isParsed && (
                    <div className="sticky top-0 bg-background border-b border-border p-4 z-10">
                      <Button 
                        onClick={() => parseEmail(selectedEmail)} 
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-200 hover:shadow-xl"
                        size="lg"
                      >
                        <FileText className="h-5 w-5 mr-2" />
                        Parse Resume with AI
                      </Button>
                      <p className="text-xs text-muted-foreground mt-2 text-center">
                        Extract candidate information automatically
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4">
              <div className="space-y-2">
                {filteredEmails.map(email => (
                  <div
                    key={email.id}
                    className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 cursor-pointer" onClick={() => setSelectedEmail(email)}>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm text-foreground">{email.from}</span>
                          {!email.isRead && <div className="w-2 h-2 bg-blue-500 rounded-full" />}
                          {email.isParsed && (
                            <div className="flex items-center gap-1 text-xs text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded">
                              <CheckCircle className="h-3 w-3" />
                              Parsed
                            </div>
                          )}
                        </div>
                        <h4 className="text-sm font-medium text-foreground mb-1">{email.subject}</h4>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {email.body.substring(0, 100)}...
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <div className="flex flex-col items-end gap-1">
                          <span className="text-xs text-muted-foreground">
                            {new Date(email.date).toLocaleDateString()}
                          </span>
                          {email.attachments.length > 0 && (
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <FileText className="h-3 w-3" />
                              {email.attachments.length}
                            </div>
                          )}
                        </div>
                        {!email.isParsed && (
                          <Button
                            onClick={(e) => {
                              e.stopPropagation()
                              setSelectedEmail(email)
                              parseEmail(email)
                            }}
                            size="sm"
                            className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs px-3 py-1 h-7"
                          >
                            <FileText className="h-3 w-3 mr-1" />
                            Parse
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Column - Parse Review Panel */}
      {selectedParsedCandidate && (
        <div className="w-96 border-l border-border bg-card p-4 overflow-y-auto">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">Parsed Candidate</h3>
              <Badge variant="outline">
                {Math.round(selectedParsedCandidate.confidence * 100)}% confidence
              </Badge>
            </div>

            {/* Parsed Fields */}
            <div className="space-y-4">
              {Object.entries(selectedParsedCandidate.fields).map(([key, field]) => (
                <div key={key} className="space-y-1">
                  <label className="text-sm font-medium text-foreground capitalize">
                    {key}
                  </label>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-foreground flex-1">{field.value || 'Not found'}</span>
                      <Badge variant="outline" className="text-xs">
                        {Math.round(field.confidence * 100)}%
                      </Badge>
                    </div>
                    <span className="text-xs text-muted-foreground">Source: {field.source}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Duplicate Detection */}
            {selectedParsedCandidate.duplicates && selectedParsedCandidate.duplicates.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-orange-500" />
                  <span className="text-sm font-medium text-foreground">Potential Duplicates</span>
                </div>
                {selectedParsedCandidate.duplicates.map(duplicateId => {
                  const duplicate = candidates.find(c => c.id === duplicateId)
                  return duplicate ? (
                    <div key={duplicateId} className="p-2 border border-border rounded text-sm">
                      <div className="font-medium text-foreground">{duplicate.name}</div>
                      <div className="text-muted-foreground">{duplicate.email}</div>
                    </div>
                  ) : null
                })}
              </div>
            )}

            {/* AI Insights */}
            {selectedParsedCandidate.insights && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">AI Insights</span>
                </div>
                
                {/* Overall Score */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Overall Score</span>
                    <span className="text-sm font-medium text-foreground">{selectedParsedCandidate.insights.overallScore}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${selectedParsedCandidate.insights.overallScore}%` }}
                    ></div>
                  </div>
                </div>
                
                {/* Match Score */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Role Match</span>
                    <span className="text-sm font-medium text-foreground">{selectedParsedCandidate.insights.matchScore}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${selectedParsedCandidate.insights.matchScore}%` }}
                    ></div>
                  </div>
                </div>
                
                {/* Strengths */}
                {selectedParsedCandidate.insights.strengths.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium text-foreground">Strengths</span>
                    </div>
                    <div className="space-y-1">
                      {selectedParsedCandidate.insights.strengths.map((strength, index) => (
                        <div key={index} className="text-xs text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded">
                          {strength}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Concerns */}
                {selectedParsedCandidate.insights.concerns.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-orange-500" />
                      <span className="text-sm font-medium text-foreground">Concerns</span>
                    </div>
                    <div className="space-y-1">
                      {selectedParsedCandidate.insights.concerns.map((concern, index) => (
                        <div key={index} className="text-xs text-orange-600 bg-orange-50 dark:bg-orange-900/20 px-2 py-1 rounded">
                          {concern}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Recommendations */}
                {selectedParsedCandidate.insights.recommendations.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Settings className="h-4 w-4 text-blue-500" />
                      <span className="text-sm font-medium text-foreground">Recommendations</span>
                    </div>
                    <div className="space-y-1">
                      {selectedParsedCandidate.insights.recommendations.map((recommendation, index) => (
                        <div key={index} className="text-xs text-blue-600 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded">
                          {recommendation}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {/* Actions */}
            <div className="space-y-2">
              {selectedParsedCandidate.duplicates && selectedParsedCandidate.duplicates.length > 0 ? (
                <div className="space-y-2">
                  <Button
                    onClick={() => {
                      setShowMergeUI(true)
                      setMergeCandidate(candidates.find(c => c.id === selectedParsedCandidate.duplicates![0]) || null)
                    }}
                    className="w-full"
                  >
                    <Merge className="h-4 w-4 mr-2" />
                    Merge with Existing
                  </Button>
                  <Button
                    onClick={() => approveCandidate(selectedParsedCandidate)}
                    variant="outline"
                    className="w-full"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Anyway
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={() => approveCandidate(selectedParsedCandidate)}
                  className="w-full"
                >
                  <Check className="h-4 w-4 mr-2" />
                  Approve & Create Candidate
                </Button>
              )}
              
              <Button
                onClick={() => rejectCandidate(selectedParsedCandidate)}
                variant="outline"
                className="w-full"
              >
                <X className="h-4 w-4 mr-2" />
                Reject
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Merge UI Modal */}
      {showMergeUI && mergeCandidate && selectedParsedCandidate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card border border-border rounded-lg p-6 w-full max-w-4xl max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Merge Candidates</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowMergeUI(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {/* Existing Candidate */}
              <div className="space-y-4">
                <h4 className="font-medium text-foreground">Existing Candidate</h4>
                <div className="space-y-2">
                  <div>
                    <label className="text-sm font-medium text-foreground">Name</label>
                    <Input value={mergeCandidate.name} readOnly />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Email</label>
                    <Input value={mergeCandidate.email} readOnly />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Phone</label>
                    <Input value={mergeCandidate.phone} readOnly />
                  </div>
                </div>
              </div>

              {/* Parsed Candidate */}
              <div className="space-y-4">
                <h4 className="font-medium text-foreground">Parsed Data</h4>
                <div className="space-y-2">
                  <div>
                    <label className="text-sm font-medium text-foreground">Name</label>
                    <Input value={selectedParsedCandidate.fields.name.value} readOnly />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Email</label>
                    <Input value={selectedParsedCandidate.fields.email.value} readOnly />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Phone</label>
                    <Input value={selectedParsedCandidate.fields.phone.value} readOnly />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <Button
                onClick={() => approveCandidate(selectedParsedCandidate, mergeCandidate.id)}
                className="flex-1"
              >
                <Merge className="h-4 w-4 mr-2" />
                Merge & Update
              </Button>
              <Button
                onClick={() => setShowMergeUI(false)}
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Button for Resume Parsing */}
      {selectedEmail && !selectedEmail.isParsed && (
        <div className="fixed bottom-6 right-6 z-50">
          <Button
            onClick={() => parseEmail(selectedEmail)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-all duration-200 p-4 h-14 w-14"
            size="lg"
          >
            <FileText className="h-6 w-6" />
          </Button>
          <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-foreground text-background text-xs rounded-md opacity-0 hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
            Parse Resume with AI
          </div>
        </div>
      )}
    </div>
  )
}
