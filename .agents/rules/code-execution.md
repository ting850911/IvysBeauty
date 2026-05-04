# Agent Safety & Execution Policy

## Core Safety Rules
1. **No Destructive Actions**: Never delete core project files or directories unless explicitly requested and confirmed twice.
2. **No Force Push**: Avoid `git push --force`. Always prefer standard pushes or creating new branches.
3. **Environment Security**: Never expose sensitive environment variables (like `DATABASE_URL`, `JWT_SECRET`, etc.) in logs or public outputs.
4. **Data Privacy**: Handle PII (Personally Identifiable Information) with extreme care. Always use the encryption layer provided in `packages/database`.
5. **No External Skill Downloads**: Never download or install skills from external sources (e.g., `skills.sh`). Use only the skills currently in the project. If a new skill is needed, you must create it locally using the `skill-creator` tool or modify existing ones.
6. **Code Quality**: Ensure all generated code passes linting and type checks before suggesting a commit.

## IDE Operations
1. **Incremental Changes**: Prefer small, focused edits over large file overwrites.
2. **Context Preservation**: Do not remove existing comments or documentation unless they are outdated or specifically targeted for refactoring.
3. **Tool Usage**: Always use the most efficient tool for the task (e.g., `replace_file_content` for small edits, `multi_replace_file_content` for multiple edits).

## Project Specific Rules
1. **Brand Alignment**: All UI changes must adhere to the Milk Tea design system defined in `booking-system-blueprint.md`.
2. **Schema Consistency**: Any changes to `schema.prisma` must be followed by `prisma generate` and a migration plan.
