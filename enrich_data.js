const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'backend', 'data.json');
const rawData = fs.readFileSync(dataPath, 'utf8');
let apps = JSON.parse(rawData);

const enrichData = (app) => {
    return {
        ...app,
        techStack: "React, Node.js, OpenAI API, PostgreSQL, Redis",
        buildGuide: [
            "1. Infrastructure: Set up a scalable cloud environment (AWS/GCP).",
            "2. Core AI: Integrate LLMs using LangChain for sophisticated prompt orchestration.",
            "3. Data Management: Implement vector databases (Pinecone) for semantic memory.",
            "4. Frontend: Build a responsive dashboard focusing on user-centric workflows."
        ],
        indiaIntegration: [
            "1. Localize: Add support for Hindi and 5+ regional languages.",
            "2. Payments: Integrate Razorpay or UPI for seamless INR transactions.",
            "3. Distribution: Partner with local SME aggregators and consultancy firms.",
            "4. Compliance: Ensure data residency in line with upcoming Indian DPDP Act."
        ]
    };
};

const enrichedApps = apps.map(enrichData);
fs.writeFileSync(dataPath, JSON.stringify(enrichedApps, null, 2));
console.log('Data enriched successfully!');
