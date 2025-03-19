# General Guidelines
- Strive for simplicity and clarity. Over-engineering is a liability at this stage.
- When a file becomes too long (over 1,500 lines), split it into smaller files. When a function becomes too long, split it into smaller functions. Make sure to inspect how the files are currently being used to ensure the new split does not affect the functionality of the code.
- Follow engineering principles inspired by Stripe & Basecamp: Stripe – High-quality API design, balancing technical elegance with product experience. Basecamp – "Small team, big impact" philosophy, emphasizing clarity and long-term maintainability over trends.

# UX/UI Guidelines
- Design with the highest standards inspired by Airbnb & Apple, ensuring a seamless and intuitive user experience.
- Reduce unnecessary complexity in UI/UX—prioritize usability and clarity.
- Consistency is key – maintain uniform design patterns, typography, and spacing across the application.
- Prioritize accessibility – ensure the interface is inclusive and easy to use for all users

# Debugging
Follow this structured sequence to quickly identify and resolve issues:
1. Hypothesize Broadly – List 5-7 possible root causes, including edge cases, concurrency issues, and unexpected dependencies.
2. Distill with First Principles – Reduce the possibilities to 1-2 most probable sources based on known system behavior and past incidents.
3. Validate with Logs – Insert targeted logs to track transformations of key data structures and verify assumptions before modifying code.
4. Simulate Before Fixing – Where feasible, write small mock scenarios to replicate the issue in isolation.
5. Clarify Requirements – If the root cause relates to business logic, either ask for clarifications or list explicit assumptions before making changes.

# Feature Planning & Implementation
To ensure thoughtful and efficient development:
1. Understand Scope Thoroughly
- Read related code before planning.
- Identify all downstream effects (e.g., database schema, API changes, UI updates, dependencies).

2. Ask 4-6 Key Clarifying Questions
- If a requirement is vague, ask the right questions before assuming anything.
- Questions should uncover missing details, potential trade-offs, and edge cases.

3. Draft a Concrete Plan
- Break it down into phases or steps.
- Mention dependencies and risks.
- Highlight what needs review before execution.

4. Iterate with Transparency
- After each phase, provide a brief update:
- ✅ What's completed
- 🔄 What's next
- ⏳ Remaining steps

# Code Quality & Efficiency
- Keep functions small but meaningful—don't break logic into fragments just for the sake of it.
- Choose the simplest working solution, not the most "sophisticated."
- If introducing new dependencies, justify why and evaluate trade-offs.
