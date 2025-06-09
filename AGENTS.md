# AGENTS.md – Production Code Generation Guidelines

## General Principles

- **Write production-quality code**: All code must be robust, efficient, and ready for use in real-world systems.
- **Prioritize clarity and readability**: Favor simple, clear code over clever or “hacky” solutions. Use clear naming, comments where needed, and logical structure.
- **Ensure testability**: Code should be easy to unit test. Prefer pure functions, minimize side effects, and avoid hard-coding dependencies.
- **Prefer the simplest working solution**: Avoid unnecessary abstraction, indirection, or premature optimization. Write the minimal code necessary to solve the problem *well*.

## Formatting and Documentation

- **Follow industry-standard formatting** for the programming language being used. Adhere to established conventions (e.g., C#/.NET, Python PEP 8, JavaScript Standard/Prettier, etc.).
- **Keep documentation brief and simple**. Use short summaries and clear parameter/return annotations where needed. If further context or debate exists, refer to authoritative online resources, articles, or ongoing discussions (provide URLs or references).

## Application-Specific Best Practices

- Always apply best practices relevant to the type of application (e.g., web, desktop, API, CLI, etc.).
    - For web apps: Ensure proper separation of concerns (controllers, services, repositories), use dependency injection, validate user input, protect against common vulnerabilities (XSS, CSRF, etc.), and follow RESTful conventions for APIs.
    - For desktop: Use MVVM/MVC where appropriate, separate UI and logic, handle errors gracefully.
    - For libraries: Provide clear interfaces, minimize breaking changes, write good public documentation.
- If unsure about the best practice, explain options and reference established community guidelines.

## When Implementing Features or Fixes

- Always choose the most straightforward solution that meets the requirements.
- If the solution requires major refactoring or introduces significant complexity:
    - **Pause** and clearly warn in your response.
    - **Explain** why a simpler solution isn’t feasible in this case.
    - **Outline** the risks or trade-offs if complexity is unavoidable.

## Code Style

- Follow idiomatic style and formatting for the language and framework.
- Use descriptive names and concise comments where code isn’t self-explanatory.
- Organize code for maintainability: break up large functions, keep classes focused.

## Testing

- Where relevant, provide or update unit tests.
- Ensure that logic is decoupled from external dependencies so it can be tested in isolation.

## How to Respond

- Always include code that is copy-paste ready and will compile.
- Prefer returning a **single, self-contained code block** unless multiple files are necessary.
- When major changes are needed for quality or maintainability, explain your reasoning before proceeding.

## Example Output Notice

> If your requested feature or bug fix requires a substantial refactor, or if the only solution involves complex logic, I will alert you before making changes. I will always try to find the simplest, most maintainable approach.

## Summary Checklist

- [ ] Is the code production-ready and robust?
- [ ] Is it clear and simple to read?
- [ ] Is it easy to test?
- [ ] Does it follow industry-standard formatting and style?
- [ ] Is the documentation brief and, if needed, does it reference further resources?
- [ ] Does it follow best practices for the app type?
- [ ] Is it as simple as possible?
- [ ] If not, have you warned the user and explained why?

## Sample Prompt for Agent Usage

> Please write production-quality, clear, and testable code. Use industry-standard formatting and brief documentation, with references to online resources if needed. Follow best practices for the specific type of application. Prefer the simplest solution that meets requirements. If the answer would require major refactoring or complicated logic, warn me first and explain why a simpler solution isn’t possible.
