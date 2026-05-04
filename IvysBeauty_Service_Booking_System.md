# 💄 Beauty Service Booking System - Master Index

This file has been refactored into modular components to reduce context bloat and improve agent efficiency. Please refer to the specific files below for detailed guidelines and implementations.

## 📋 Core Guidelines & Blueprint
- **[booking-system-blueprint.md](./booking-system-blueprint.md)**: The "Core Guidelines" for the project. Contains brand vision, database architecture, and high-level business logic.

## 🛡️ Agent Rules & Safety
- **[.agents/rules/code-execution.md](./.agents/rules/code-execution.md)**: Safety policies and execution standards. **Note: Downloading external skills is strictly forbidden.**

## 🧩 Custom Agent Skills
Technical implementation details are "Lazily Loaded" via specialized skills. If existing skills are insufficient, they should be extended or new ones created locally within the `.agents/skills/` directory.
- **[UI Design Skill](./.agents/skills/ui-design-skill/SKILL.md)**: Milk tea color scheme and rounded UI implementation.
- **[Security Encryption](./.agents/skills/security-encryption/SKILL.md)**: AES-256 encryption logic for PII data.
- **[Booking Logic](./.agents/skills/booking-logic/SKILL.md)**: Available slots calculation and overlap checking algorithms.
