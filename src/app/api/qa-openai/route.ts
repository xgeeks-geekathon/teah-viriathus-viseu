import dotenv from "dotenv";
import { StreamingTextResponse, OpenAIStream } from "ai";
import OpenAI from "openai";

dotenv.config({ path: `.env.local` });

// const model = "gpt-4-1106-preview";
const model = "gpt-3.5-turbo-16k";

const data = `My name is John Doe, we're on the 12th of November of 2023.
The current sprint is "45/2023";
Below we define a list of tickets in the following structure:
[{
  "title": "Title of the jira ticket",
  "assignees": "An array of the people assigned to the ticket",
  "duration": "How many hours the ticket has been in development, null if not yet started",
  "estimate": "How many hours we estimate the ticket will take",
  "time_spent_in_blocked": How many hours the ticket spent in blocked state,
  "status": "The current state of the ticket",
  "completed_at": "The date when the ticket has been complete",
  "sprint": "Name of the sprint associated with the ticket",
  "okr": "The Objective associated with this ticket",
}

Consider the following JSON structure:
{
  "title": "Optimize Database Queries"
  "assignees": ["Alice Brown"],
  "duration": 40,
  "estimate": 32,
  "time_spent_in_blocked": 0,
  "status": "Done",
  "completed_at": "2023-09-15 15:00",
  "sprint": "37/2023",
  "okr": "Improve system performance",
},
{
  "title": "Implement Wishlist Feature"
  "assignees": ["John Doe"],
  "duration": 32,
  "estimate": 40,
  "time_spent_in_blocked": 0,
  "status": "Done",
  "completed_at": "2023-09-21 15:00",
  "sprint": "38/2023",
  "okr": "Improve user engagement",
},
{
  "title": "Fix Security Vulnerabilities"
  "assignees": ["Alice Brown", "Michael Johnson"],
  "duration": 32,
  "estimate": 32,
  "time_spent_in_blocked": 8,
  "status": "Done",
  "completed_at": "2023-09-21 15:00",
  "sprint": "38/2023",
  "okr": "Enhance system security",
},
{
  "title": "Implement Admin Dashboard"
  "assignees": ["Jane Smith"],
  "duration": 40,
  "estimate": 40,
  "time_spent_in_blocked": 0,
  "status": "Done",
  "completed_at": "2023-09-22 15:00",
  "sprint": "38/2023",
  "okr": "Improve admin functionality",
},
{
  "title": "Enhance Search Functionality"
  "assignees": ["John Doe"],
  "duration": 28,
  "estimate": 24,
  "time_spent_in_blocked": 8,
  "status": "Done",
  "completed_at": "2023-09-26 15:00",
  "sprint": "39/2023",
  "okr": "Improve user engagement",
},
{
  "title": "Implement Mobile Responsiveness"
  "assignees": ["Alice Brown"],
  "duration": 40,
  "estimate": 32,
  "time_spent_in_blocked": 0,
  "status": "Done",
  "completed_at": "2023-09-26 15:00",
  "sprint": "39/2023",
  "okr": "Improve mobile usage and retention",
},
{
  "title": "Refactor Codebase"
  "assignees": ["Michael Johnson"],
  "duration": 34,
  "estimate": 40,
  "time_spent_in_blocked": 8,
  "status": "Done",
  "completed_at": "2023-09-27 15:00",
  "sprint": "39/2023",
  "okr": "Neutral",
},
{
  "title": "Implement Customer Reviews"
  "assignees": ["Jane Smith"],
  "duration": 32,
  "estimate": 32,
  "time_spent_in_blocked": 0,
  "status": "Done",
  "completed_at": "2023-09-28 15:00",
  "sprint": "39/2023",
  "okr": "Encourage user feedback",
},
{
  "title": "Fix UI Bugs"
  "assignees": ["John Doe"],
  "duration": 16,
  "estimate": 16,
  "time_spent_in_blocked": 0,
  "status": "Done",
  "completed_at": "2023-09-29 15:00",
  "sprint": "39/2023",
  "okr": "Neutral",
},
{
  "title": "Implement Social Media Integration"
  "assignees": ["Alice Brown"],
  "duration": 32,
  "estimate": 32,
  "time_spent_in_blocked": 0,
  "status": "Done",
  "completed_at": "2023-10-03 15:00",
  "sprint": "40/2023",
  "okr": "Improve user engagement",
},
{
  "title": "Conduct Load Testing"
  "assignees": ["Michael Johnson"],
  "duration": 32,
  "estimate": 40,
  "time_spent_in_blocked": 0,
  "status": "Done",
  "completed_at": "2023-10-04 15:00",
  "sprint": "40/2023",
  "okr": "Ensure scalability",
},
{
  "title": "Implement Subscription Service"
  "assignees": ["Jane Smith"],
  "duration": 88,
  "estimate": 72,
  "time_spent_in_blocked": 0,
  "status": "Done",
  "completed_at": "2023-10-04 15:00",
  "sprint": "40/2023",
  "okr": "Launch product subscriptions",
},
{
  "title": "Enhance Product Recommendation Algorithm"
  "assignees": ["John Doe"],
  "duration": 24,
  "estimate": 32,
  "time_spent_in_blocked": 0,
  "status": "Done",
  "completed_at": "2023-10-06 15:00",
  "sprint": "40/2023",
  "okr": "Enhance recommendation accuracy",
},
{
  "title": "Implement Multi-Language Support"
  "assignees": ["Alice Brown"],
  "duration": 32,
  "estimate": 40,
  "time_spent_in_blocked": 0,
  "status": "Done",
  "completed_at": "2023-10-09 15:00",
  "sprint": "41/2023",
  "okr": "Internationalise platform",
},
{
  "title": "Fix Checkout Process Issues"
  "assignees": ["Michael Johnson"],
  "duration": 40,
  "estimate": 40,
  "time_spent_in_blocked": 8,
  "status": "Done",
  "completed_at": "2023-10-10 15:00",
  "sprint": "41/2023",
  "okr": "Increase conversion rate",
},
{
  "title": "Enhance User Profile Page"
  "assignees": ["Jane Smith"],
  "duration": 16,
  "estimate": 16,
  "time_spent_in_blocked": 0,
  "status": "Done",
  "completed_at": "2023-10-13 15:00",
  "sprint": "41/2023",
  "okr": "Enhance user experience",
},
{
  "title": "Implement Real-time Chat"
  "assignees": ["John Doe"],
  "duration": 32,
  "estimate": 32,
  "time_spent_in_blocked": 8,
  "status": "Done",
  "completed_at": "2023-10-13 15:00",
  "sprint": "41/2023",
  "okr": "Enhance user experience",
},
{
  "title": "Implement AI-Powered Recommendations"
  "assignees": ["Alice Brown"],
  "duration": 40,
  "estimate": 40,
  "time_spent_in_blocked": 0,
  "status": "Done",
  "completed_at": "2023-10-16 15:00",
  "sprint": "42/2023",
  "okr": "Enhance recommendation accuracy",
},
{
  "title": "Implement Image Recognition for Products"
  "assignees": ["Michael Johnson"],
  "duration": 24,
  "estimate": 24,
  "time_spent_in_blocked": 0,
  "status": "Done",
  "completed_at": "2023-10-18 15:00",
  "sprint": "42/2023",
  "okr": "Enhance product management",
},
{
  "title": "Conduct Usability Testing"
  "assignees": ["Jane Smith"],
  "duration": 16,
  "estimate": 16,
  "time_spent_in_blocked": 0,
  "status": "Done",
  "completed_at": "2023-10-18 15:00",
  "sprint": "42/2023",
  "okr": "Optimize user interface",
},
{
  "title": "Implement Push Notifications"
  "assignees": ["John Doe"],
  "duration": 24,
  "estimate": 24,
  "time_spent_in_blocked": 0,
  "status": "Done",
  "completed_at": "2023-10-20 15:00",
  "sprint": "42/2023",
  "okr": "Improve mobile experience",
},
{
  "title": "Optimize Mobile App Performance"
  "assignees": ["Alice Brown"],
  "duration": 25,
  "estimate": 32,
  "time_spent_in_blocked": 8,
  "status": "Blocked",
  "completed_at": "2023-10-23 15:00",
  "sprint": "43/2023",
  "okr": "Improve mobile experience",
},
{
  "title": "Enhance Product Page Layout"
  "assignees": ["Michael Johnson"],
  "duration": 16,
  "estimate": 16,
  "time_spent_in_blocked": 0,
  "status": "Done",
  "completed_at": "2023-10-24 15:00",
  "sprint": "43/2023",
  "okr": "Optimize product presentation",
},
{
  "title": "Implement In-App Purchase Functionality"
  "assignees": ["Jane Smith"],
  "duration": 30,
  "estimate": 32,
  "time_spent_in_blocked": 0,
  "status": "Done",
  "completed_at": "2023-10-25 15:00",
  "sprint": "43/2023",
  "okr": "Facilitate in-app transactions",
},
{
  "title": "Implement Advanced Search Filters"
  "assignees": ["John Doe"],
  "duration": 24,
  "estimate": 24,
  "time_spent_in_blocked": 0,
  "status": "Done",
  "completed_at": "2023-10-27 15:00",
  "sprint": "43/2023",
  "okr": "Optimize search experience",
},
{
  "title": "Enhance Customer Support System"
  "assignees": ["Alice Brown"],
  "duration": 40,
  "estimate": 40,
  "time_spent_in_blocked": 8,
  "status": "Done",
  "completed_at": "2023-10-31 15:00",
  "sprint": "44/2023",
  "okr": "Improve customer satisfaction",
},
{
  "title": "Implement Augmented Reality Product Preview"
  "assignees": ["Michael Johnson"],
  "duration": 32,
  "estimate": 32,
  "time_spent_in_blocked": 0,
  "status": "Done",
  "completed_at": "2023-11-01 15:00",
  "sprint": "44/2023",
  "okr": "Increase time spent on product page",
},
{
  "title": "Implement Gamification Elements"
  "assignees": ["Jane Smith"],
  "duration": 24,
  "estimate": 24,
  "time_spent_in_blocked": 0,
  "status": "Done",
  "completed_at": "2023-11-03 15:00",
  "sprint": "44/2023",
  "okr": "Increase customer retention",
},
{
  "title": "Optimize Checkout Page Load Time"
  "assignees": ["John Doe"],
  "duration": 30,
  "estimate": 40,
  "time_spent_in_blocked": 0,
  "status": "In Progress",
  "completed_at": "2023-11-10 15:00",
  "sprint": "45/2023",
  "okr": "Increase customer retention",
},
{
  "title": "Implement Social Authentication"
  "assignees": ["Alice Brown"],
  "duration": 4,
  "estimate": 24,
  "time_spent_in_blocked": 0,
  "status": "In Progress",
  "completed_at": "2023-11-10 15:00",
  "sprint": "45/2023",
  "okr": "Simplify user registration",
},
{
  "title": "Implement Dynamic Pricing"
  "assignees": ["Michael Johnson"],
  "duration": 10,
  "estimate": 32,
  "time_spent_in_blocked": 0,
  "status": "In Progress",
  "completed_at": "2023-11-10 15:00",
  "sprint": "45/2023",
  "okr": "Increase sale margins",
},
{
  "title": "Enhance Seller Dashboard"
  "assignees": [],
  "duration": 0,
  "estimate": 24,
  "time_spent_in_blocked": 0,
  "status": "To Do",
  "completed_at": "2023-11-15 15:00",
  "sprint": "46/2023",
  "okr": "Increase seller retention",
},
{
  "title": "Implement Voice Search"
  "assignees": [],
  "duration": 0,
  "estimate": 32,
  "time_spent_in_blocked": 8,
  "status": "To Do",
  "completed_at": "2023-11-15 15:00",
  "sprint": "46/2023",
  "okr": "Enhance search accessibility",
}]

Using the JSON data above, answer the following question in the most summarized way possible:\n`;

export async function POST(request: Request) {
  const { prompt } = await request.json();

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const response = await openai.chat.completions.create({
    temperature: 0,
    messages: [{ role: "user", content: data + prompt }],
    temperature: 0,
    model,
    stream: true,
  });

  const stream = OpenAIStream(response);

  return new StreamingTextResponse(stream);
}
