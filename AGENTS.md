# Codex Agent Instructions

You are operating inside a production React codebase for a trading education website.
Your job is to refactor, organize, and extend the codebase WITHOUT breaking any existing behavior or UI.
You must now treat this as a standard modern React project.


CORE RULES (STRICT - UNLESS ASKED EXPLICITELY)

1. DO NOT change visual output
   - No layout changes
   - No spacing changes
   - No color, font, animation, or copy changes
   - The rendered website must look identical unless explicitly told otherwise

2. DO NOT remove or simplify features
   - No removing sections, components, or logic
   - No “cleanup” that alters behavior

3. NO breaking refactors
   - Preserve all routes, flows, and component contracts
   - If uncertain, leave code untouched

4. Files must stay readable
   - Target max 100–150 LOC per file
   - Split logically when needed


TECH STACK ASSUMPTIONS

- React (modern functional components)
- TypeScript (preferred if already present)
- Vite or similar bundler
- Tailwind / CSS utility classes already in use

If something is ambiguous, infer conservatively.


REQUIRED REFACTOR: CONTENT & STRINGS

All website text, labels, headlines, testimonials, metrics, and UI copy
MUST be moved out of components and placed into centralized const files.

Rules:
- NO hardcoded text inside JSX
- NO inline copy in components
- All text must come from constants

Suggested structure:

src/
  consts/
    site.const.ts        # hero, CTA, footer, global copy
    services.const.ts    # services descriptions
    testimonials.const.ts
    stats.const.ts
    navigation.const.ts
    legal.const.ts

Components may only CONSUME constants — never define copy.


COMPONENT GUIDELINES

- Functional components only
- Clear separation of concerns
- Components should:
  - Receive data via props
  - Import constants when needed
  - Contain minimal logic

Avoid:
- God components
- Unnecessary abstractions
- Inline objects/arrays inside JSX when reusable


STYLING RULES

- Keep existing Tailwind / CSS classes EXACTLY as-is
- Do NOT introduce new design systems
- Do NOT reorder class lists unless required
- Animations and motion must remain untouched


NEW FEATURE DEVELOPMENT (IMPORTANT)


A new feature will be added AFTER refactoring.

Rules for new features:
1. Create new files. Do not overload existing ones
2. Place ALL new text in const files
3. Keep feature isolated and composable
4. Do NOT refactor unrelated code

State management:
- Local state first
- Shared state only if justified
- External libraries → ask before adding


CODE QUALITY EXPECTATIONS

- Clean, predictable React patterns
- Prefer clarity over cleverness
- Consistent naming
- No console.logs in final code


SUCCESS CRITERIA

- Website looks IDENTICAL
- All text lives in const files
- Components are smaller and cleaner
- Codebase is easy to extend safely
- Ready for future features without rewrites

If a change risks altering the current output, SKIP IT.
