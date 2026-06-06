export const curriculumTopics = {
  "artificial-intelligence": {
    1: ["Python Fundamentals", "Data Structures & Control Flow", "NumPy & Pandas Basics", "Jupyter & Colab Environments"],
    2: ["Supervised & Unsupervised Learning", "Linear & Logistic Regression", "Decision Trees & Random Forests", "Model Evaluation & Scikit-Learn"],
    3: ["Neural Network Architecture", "Backpropagation & Activation Functions", "TensorFlow & PyTorch Basics", "Training Deep Models"],
    4: ["Text Preprocessing & Tokenization", "Word Embeddings & Word2Vec", "RNNs & LSTMs", "Transformers & HuggingFace Models"],
    5: ["Image Processing with OpenCV", "Convolutional Neural Networks (CNNs)", "Object Detection (YOLO)", "Image Segmentation"],
    6: ["Model Serialization & Export", "FastAPI for ML Model Serving", "Dockerizing AI Applications", "MLOps & CI/CD Pipelines"]
  },
  "machine-learning": {
    1: ["Python Programming Basics", "Data Analysis with Pandas", "Mathematical Foundations (Linear Algebra)", "Exploratory Data Analysis"],
    2: ["Regression Algorithms", "Classification (SVM, KNN, Naive Bayes)", "Ensemble Methods (XGBoost, Random Forest)", "Feature Engineering & Selection"],
    3: ["Clustering (K-Means, Hierarchical)", "Dimensionality Reduction (PCA)", "Anomaly Detection", "Recommender Systems"],
    4: ["Model Pipelines", "Model Monitoring & Tracking", "MLflow & Experiment Tracking", "Deploying Models to Production"]
  },
  "data-science": {
    1: ["Descriptive & Inferential Statistics", "Probability Distributions", "Hypothesis Testing & A/B Testing", "Data Types & Sampling Techniques"],
    2: ["Advanced Pandas & NumPy", "Data Cleaning & Imputation", "Data Merging & Joining", "Time Series Basics"],
    3: ["Data Visualization Principles", "Matplotlib & Seaborn Libraries", "Creating Dashboards in Tableau", "Power BI Integration"],
    4: ["Relational Database Design", "Complex SQL Queries & Subqueries", "Joins, Aggregations & Indexes", "NoSQL Databases (MongoDB)"],
    5: ["Intro to Machine Learning", "Regression & Classification Models", "Model Evaluation Metrics", "Feature Selection & Tuning"]
  },
  "python": {
    1: ["Variables, Data Types & Operators", "Control Flow (If/Else, Loops)", "Lists, Tuples, Dictionaries & Sets", "Functions & Scope"],
    2: ["Classes & Objects", "Inheritance, Polymorphism & Encapsulation", "Exception Handling", "Decorators & Generators"],
    3: ["Reading & Writing Files (TXT, CSV, JSON)", "Working with SQLite Databases", "Regular Expressions (Regex)", "Debugging & Testing"],
    4: ["Making HTTP Requests", "Web Scraping with Beautiful Soup", "Automating System Tasks", "Building CLI Applications"]
  },
  "full-stack": {
    1: ["HTML5 Semantic Tags & Forms", "CSS3 Layouts (Flexbox & Grid)", "Tailwind CSS & Responsive Design", "JavaScript ES6+ Concepts"],
    2: ["React Components & Props", "State Management & Hooks", "React Router for SPAs", "Context API & Redux Basics"],
    3: ["Creating REST APIs with Express", "Node.js Event Loop & File System", "Asynchronous Programming", "Error Handling & Middleware"],
    4: ["MongoDB Database Design & Mongoose", "Authentication (JWT & Cookies)", "CRUD Operations & Validation", "API Security Best Practices"],
    5: ["Dockerizing Web Apps", "CI/CD with GitHub Actions", "Deploying React to AWS S3/CloudFront", "Deploying Backend to AWS EC2"]
  },
  "aws": {
    1: ["Introduction to Cloud Computing", "AWS Global Infrastructure", "Shared Responsibility Model", "AWS Billing & Pricing Overview"],
    2: ["Amazon EC2 & Elastic Load Balancing", "Amazon S3 & EBS Storage", "Amazon RDS & DynamoDB Databases", "AWS Lambda & Serverless Intro"],
    3: ["Virtual Private Cloud (VPC)", "Subnets & Route Tables", "Security Groups & Network ACLs", "IAM Users, Groups & Policies"],
    4: ["AWS CloudWatch & CloudTrail Monitoring", "Infrastructure as Code (Terraform)", "AWS CodePipeline & CI/CD", "AWS CloudFormation Templates"]
  },
  "devops": {
    1: ["Linux Navigation & File Management", "Users, Permissions & Processes", "Bash Scripting & Cron Jobs", "Git Version Control & Branching"],
    2: ["Introduction to Containerization", "Writing Dockerfiles", "Docker Volumes & Networking", "Multi-Container Apps with Compose"],
    3: ["Kubernetes Architecture", "Pods, Services & Deployments", "ConfigMaps & Secrets", "Helm Package Manager & Ingress"],
    4: ["CI/CD Concepts", "Jenkins Pipeline Configurations", "Infrastructure Provisioning (Terraform)", "Configuration Management (Ansible)"]
  },
  "cyber-security": {
    1: ["TCP/IP Suite & OSI Model", "IP Addressing & Subnetting", "Routing & Switching Protocols", "Firewalls, VPNs & IDS/IPS"],
    2: ["Reconnaissance & Footprinting", "Scanning Networks (Nmap)", "Vulnerability Analysis", "System Hacking & Metasploit"],
    3: ["OWASP Top 10 Web Vulnerabilities", "SQL Injection & XSS Attacks", "Burp Suite Intercepting Proxy", "Wireless Network Security"],
    4: ["Introduction to Digital Forensics", "Analyzing Security Logs", "Malware Analysis Basics", "Incident Response & Reporting"]
  },
  "java": {
    1: ["Java Syntax & Object-Oriented Programming", "Inheritance, Interfaces & Abstraction", "Generics & Collections Framework", "Java Streams & Lambda Expressions"],
    2: ["Dependency Injection Concepts", "Spring Boot Architecture", "Creating REST Controllers", "Spring Boot Starter Packages"],
    3: ["Connecting Java to Databases", "Hibernate ORM Framework", "JPA Repository Operations", "Transaction Management"],
    4: ["Microservices Architecture Intro", "Service Discovery (Eureka Server)", "API Gateway & Routing", "Inter-service Communication (Feign Client)"]
  },
  "digital-marketing": {
    1: ["On-Page SEO Optimization", "Off-Page SEO & Link Building", "Technical SEO Auditing", "Keyword Research Tools"],
    2: ["Google Ads Campaign Setup", "Search Engine Marketing (SEM)", "Display & Video Ads", "Bidding Strategies & ROI"],
    3: ["Social Media Marketing Strategy", "Content Calendars & Copywriting", "Email Marketing Campaigns", "Google Analytics 4 (GA4) Tracking"]
  },
  "embedded-systems": {
    1: ["C Language Syntax for Microcontrollers", "Bitwise Operations & Registers", "Memory Organization (Stack & Heap)", "Interrupt Handling"],
    2: ["GPIO Input & Output Configuration", "Analog to Digital Converters (ADC)", "Serial Communication (UART, I2C, SPI)", "Sensor & Actuator Interfacing"],
    3: ["Real-Time Operating System (RTOS) Basics", "Task Creation & Prioritization", "Semaphores, Mutexes & Queues", "ARM Cortex-M Architecture"],
    4: ["Wi-Fi & Bluetooth Stack", "MQTT & CoAP Protocols", "AWS IoT Core Integration", "PCB Design Foundations"]
  },
  "r-programming": {
    1: ["R Syntax & Data Classes", "Vectors, Matrices & Data Frames", "Control Structures & Functions", "Importing Data from CSV/Excel"],
    2: ["Data Manipulation with dplyr", "Data Cleaning with tidyr", "Pipes & Tidy Data Principles", "Handling Missing Values"],
    3: ["Creating Plots with ggplot2", "Customizing Data Visualizations", "Building Web Apps with Shiny", "Generating Reports with RMarkdown"]
  }
};
