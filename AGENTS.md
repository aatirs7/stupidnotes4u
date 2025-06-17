# Repo Guidelines

This repository hosts a simple static website. When updating the site:

- Use 2-space indentation for HTML, CSS, and JavaScript files.
- Ensure files end with a newline.
- After making changes, run `npx prettier --check .` to verify formatting.
- There are no automated tests beyond the prettier check.
- When resolving merge conflicts (e.g., from pull requests created by the Codex agent), prefer the **Codex branch's changes**:
  - Use `git merge -X theirs <branch-name>` to resolve conflicts in favor of the incoming branch.
  - This ensures that outdated content in `main` is replaced with updated changes from the Codex-generated branch.
