# Claude Code Advanced User Guide

> A comprehensive guide to mastering Claude Code at an advanced level

## Table of Contents

- [1. Advanced Features & Capabilities](#1-advanced-features--capabilities)
  - [1.1 Extended Thinking](#11-extended-thinking-思考模式)
  - [1.2 Plan Mode](#12-plan-mode-计划模式)
  - [1.3 Headless Mode](#13-headless-mode-自动化模式)
  - [1.4 Parallel Sessions](#14-parallel-sessions)
- [2. Productivity Tips & Best Practices](#2-productivity-tips--best-practices)
  - [2.1 The Core Constraint: Context Management](#21-the-core-constraint-context-management)
  - [2.2 The 4-Phase Workflow](#22-the-4-phase-workflow)
  - [2.3 Give Claude a Verification Method](#23-give-claude-a-verification-method)
  - [2.4 Write Effective Prompts](#24-write-effective-prompts)
  - [2.5 Session Management](#25-session-management)
  - [2.6 When to Course-Correct](#26-when-to-course-correct)
- [3. Configuration & Customization](#3-configuration--customization)
  - [3.1 CLAUDE.md](#31-claudemd-persistent-project-context)
  - [3.2 Permission Modes](#32-permission-modes)
  - [3.3 Sandboxing](#33-sandboxing)
  - [3.4 Memory System](#34-memory-system-clauderules)
- [4. Integrations & Extensions](#4-integrations--extensions)
  - [4.1 MCP Servers](#41-mcp-servers-model-context-protocol)
  - [4.2 IDE Integrations](#42-ide-integrations)
- [5. Advanced Workflows & Techniques](#5-advanced-workflows--techniques)
  - [5.1 Skills](#51-skills-可重用工作流)
  - [5.2 Hooks](#52-hooks-自动化触发器)
  - [5.3 Subagents](#53-subagents-专用代理)
  - [5.4 Fan-out for Batch Operations](#54-fan-out-for-batch-operations)
  - [5.5 Git Worktrees](#55-git-worktrees-for-parallel-work)
- [6. MCP Servers & Advanced Integration](#6-mcp-servers--advanced-integration)
  - [6.1 Popular MCP Integrations](#61-popular-mcp-integrations)
  - [6.2 Managed MCP Configuration](#62-managed-mcp-configuration-enterprise)
- [7. Skills & Slash Commands](#7-skills--slash-commands)
  - [7.1 Skill Location Hierarchy](#71-skill-location-hierarchy)
  - [7.2 Advanced Skill Patterns](#72-advanced-skill-patterns)
- [8. Hooks & Automation](#8-hooks--automation)
  - [8.1 Common Hook Patterns](#81-common-hook-patterns)
  - [8.2 Hook Input/Output](#82-hook-inputoutput)
- [9. Configuration Files & Locations](#9-configuration-files--locations)
  - [9.1 Key Configuration Directories](#91-key-configuration-directories)
  - [9.2 Key Configuration Files](#92-key-configuration-files)
- [10. Advanced Commands & Shortcuts](#10-advanced-commands--shortcuts)
  - [10.1 Essential Keyboard Shortcuts](#101-essential-keyboard-shortcuts)
  - [10.2 Built-in Commands](#102-built-in-commands)
  - [10.3 Bash Mode](#103-bash-mode)
- [11. Cost Optimization](#11-cost-optimization)
  - [11.1 Token Usage Reduction Strategies](#111-token-usage-reduction-strategies)
  - [11.2 Track Costs](#112-track-costs)
- [12. Advanced Deployment Options](#12-advanced-deployment-options)
  - [12.1 Enterprise Deployment](#121-enterprise-deployment)
  - [12.2 CI/CD Integration](#122-cicd-integration)
- [13. Power User Checklist](#13-power-user-checklist)
- [14. Common Anti-Patterns to Avoid](#14-common-anti-patterns-to-avoid)
- [15. Key Resources](#15-key-resources)

---

## 1. Advanced Features & Capabilities

### 1.1 Extended Thinking (思考模式)

**What it does**: Claude reserves tokens for internal reasoning to solve complex problems step-by-step

**How to use**:
- **Enable/Disable**: Press `Alt+T` (Windows/Linux) or `Option+T` (macOS)
- **View thinking**: Press `Ctrl+O` to toggle verbose mode and see reasoning
- **Configure**: Use `/config` to set global default, or set `MAX_THINKING_TOKENS` environment variable

**Best for**:
- Complex architectural decisions
- Challenging bugs
- Multi-step planning

### 1.2 Plan Mode (计划模式)

**Purpose**: Read-only analysis before implementing changes

**Activate**:
- Press `Shift+Tab` to cycle through modes
- Or start with `claude --permission-mode plan`

**Features**:
- Explore codebase safely without making changes
- Use `AskUserQuestion` to gather requirements
- Press `Ctrl+G` to edit plans in text editor
- Create detailed migration plans before execution

### 1.3 Headless Mode (自动化模式)

**Basic command**:
```bash
claude -p "your prompt"
```

**Output formats**:
- `text` (default): Plain text response
- `json`: Structured JSON with session metadata
- `stream-json`: Real-time streaming output

**Auto-approve tools**:
```bash
claude -p "fix linting errors" --allowedTools "Read,Edit,Bash"
```

**Perfect for**:
- CI/CD integration
- Pre-commit hooks
- Automation scripts

### 1.4 Parallel Sessions

**Desktop App**: Visual management of multiple local sessions, each with isolated worktrees

**Web Version**: Run on cloud infrastructure in isolated VMs

**Use cases**:
- Writer/Reviewer pattern (one session writes, another reviews)
- Run exploration and implementation in separate contexts
- Parallel debugging of independent issues

---

## 2. Productivity Tips & Best Practices

### 2.1 The Core Constraint: Context Management

> 🎯 **The single most important optimization**: Claude's context window fills fast. Performance degrades as it fills.

**Strategies**:
1. Use `/clear` between unrelated tasks
2. Use subagents for verbose operations (tests, logs, exploration)
3. Run `/compact <instructions>` to summarize conversation while preserving key context
4. Manage CLAUDE.md aggressively - every line should prevent mistakes if removed

### 2.2 The 4-Phase Workflow

```mermaid
graph LR
    A[1. Explore] --> B[2. Plan]
    B --> C[3. Implement]
    C --> D[4. Commit]
```

1. **Explore** (Plan Mode): Read files, understand architecture, ask questions
2. **Plan**: Create detailed implementation plan with file changes
3. **Implement**: Switch to Normal Mode, let Claude code with verification
4. **Commit**: Create descriptive commits and PRs

### 2.3 Give Claude a Verification Method

> 🚀 **This is the highest-leverage optimization**

Provide:
- Test cases or unit tests
- Screenshots of expected UI
- Exact success criteria
- Let Claude verify its own work repeatedly

**Examples**:

❌ **Instead of**: "implement email validation"

✅ **Better**: "implement validateEmail(). Test: user@example.com → true, invalid → false. Run tests after."

### 2.4 Write Effective Prompts

- **Be specific**: Reference exact files, mention constraints, point to examples
- **Scope clearly**: Which file? What scenario? Testing preferences?
- **Point to sources**: "Check git history for why X was designed this way"
- **Describe symptoms**: "Users report login fails after timeout. Check auth flow in src/auth/"

### 2.5 Session Management

```bash
# Rename current session
/rename

# Quick resume of last session
claude --continue

# Browse and select sessions
claude --resume

# Open checkpoint menu (undo/restore)
/rewind
```

**Tips**:
- Use `/rename` to give sessions descriptive names
- Create separate sessions for different workstreams

### 2.6 When to Course-Correct

- Stop Claude with `Esc` to preserve context and redirect
- After 2 failed corrections, use `/clear` and rewrite prompt with what you learned
- Press `Esc` twice for `/rewind` to restore previous conversation state
- **Better**: tight feedback loops beat perfect initial prompts

---

## 3. Configuration & Customization

### 3.1 CLAUDE.md (Persistent Project Context)

**File locations**:
- `~/.claude/CLAUDE.md` - Applied to all sessions
- `./CLAUDE.md` - Project-specific, check into git
- `./CLAUDE.local.md` - Project-specific, local only (add to .gitignore)

**What to include**:
- ✅ Bash commands Claude can't guess (build commands, environment setup)
- ✅ Code style rules that differ from defaults
- ✅ Testing instructions and preferred test runners
- ✅ Repository etiquette (branch naming, PR conventions)
- ✅ Architectural decisions specific to your project
- ✅ Common gotchas or non-obvious behaviors

**What NOT to include**:
- ❌ Anything Claude can figure out by reading code
- ❌ Standard language conventions
- ❌ Detailed API documentation (link instead)
- ❌ Information that changes frequently
- ❌ Long explanations or tutorials

**Import syntax**:
```markdown
See @README.md for project overview
Git workflow: @docs/git-instructions.md
```

> 💡 **Golden rule**: If Claude keeps doing something wrong despite instructions, your CLAUDE.md is too long and the rule is getting lost.

### 3.2 Permission Modes

| Mode | Command | Behavior |
|------|---------|----------|
| **Default** | `Shift+Tab` | Permission prompts on each action |
| **Auto-Accept** | `Shift+Tab` → again | Auto-approve file edits |
| **Plan Mode** | `Shift+Tab` → again | Read-only exploration |
| **Script Mode** | `--dangerously-skip-permissions` | Skip all checks (use in containers!) |

**Advanced**: Use `/permissions` to allowlist safe commands like `npm run lint` or `git commit`

### 3.3 Sandboxing

- Enable with `/sandbox` for OS-level isolation
- Restricts filesystem and network access
- Allows Claude more autonomy within defined boundaries
- More secure than `--dangerously-skip-permissions`
- See documentation: https://code.claude.com/docs/en/sandboxing.md

### 3.4 Memory System (.claude/rules/)

**Modular rules with path-specific context**:

```
.claude/
├── rules/
│   ├── RULES.md              # Global rules
│   ├── frontend/RULES.md     # Apply to frontend/** files
│   └── api/RULES.md          # Apply to api/** files
└── CLAUDE.md
```

**Features**:
- Glob pattern matching
- Subdirectory auto-discovery
- Symlink support
- User-level rules in `~/.claude/rules/`

---

## 4. Integrations & Extensions

### 4.1 MCP Servers (Model Context Protocol)

**What they enable**: Connect Claude to external tools, databases, APIs, issue trackers, Figma, etc.

**Installation**:

```bash
# Remote HTTP server
claude mcp add --transport http github https://api.githubcopilot.com/mcp/

# Local stdio server with env vars
claude mcp add --transport stdio db \
  --env DB_URL=postgres://... \
  -- npx db-mcp-server

# Authenticate with /mcp
```

**Scope options**:
- `--scope local` (default): Personal, this project only
- `--scope project`: Team-shared via `.mcp.json` file (check into git)
- `--scope user`: Cross-project personal tools

**Popular servers**:
- 🔧 GitHub: Code reviews, PRs, issues
- 🐛 Sentry: Error monitoring
- 🗄️ PostgreSQL: Database queries
- 📝 Notion, Figma: Design and documentation
- 🛠️ Custom: Build your own with MCP SDK

**Advanced features**:
- **Tool Search**: Auto-enables when MCP tools exceed 10% of context
- **MCP Resources**: Reference with `@github:issue://123` format
- **MCP Prompts**: MCP servers expose commands like `/mcp__github__review_pr`

### 4.2 IDE Integrations

#### VS Code
- Claude Code extension available on marketplace
- Use `@file` to reference files
- Resume past conversations
- Switch between terminal and extension mode
- Create commits and PRs from editor

#### JetBrains IDEs (IntelliJ, PyCharm, WebStorm)
- Available on IDE marketplace
- Integration with external terminals
- Configurable ESC key behavior
- Support for remote development and WSL

#### Chrome Extension
- Test local web applications
- Debug with console logs
- Automate form filling
- Extract data from web pages
- Record demo GIFs

#### Desktop App (Preview)
- Manage multiple local sessions visually
- Use Git worktrees for isolation
- Custom environment variables
- Bundled Claude Code version

---

## 5. Advanced Workflows & Techniques

### 5.1 Skills (可重用工作流)

**What they are**: Reusable prompts and workflows that Claude applies automatically or you invoke with `/skill-name`

**Create a skill**:

```bash
mkdir -p ~/.claude/skills/explain-code
```

Create `~/.claude/skills/explain-code/SKILL.md`:

```yaml
---
name: explain-code
description: Explain code with visual diagrams. Use when explaining how code works
---

When explaining code:
1. Start with an analogy
2. Draw ASCII diagram
3. Walk through step-by-step
4. Highlight gotchas
```

**Frontmatter options**:
- `disable-model-invocation: true` - Manual invocation only
- `user-invocable: false` - Claude only, hidden from menu
- `allowed-tools: Read, Grep` - Restrict tool access
- `context: fork` - Run in isolated subagent
- `agent: Explore` - Specify agent type

**Advanced**:
- **Dynamic context**: Use `` !`command` `` for shell execution before skill runs
- **Arguments**: Access with `$ARGUMENTS` or `$0`, `$1`, etc.
- **Supporting files**: Add templates, examples, scripts in skill directory
- **Subagent execution**: Set `context: fork` to run isolated

### 5.2 Hooks (自动化触发器)

**What they are**: Shell commands that execute automatically at workflow points

**Hook events**:

| Event | When it fires | Use for |
|-------|--------------|---------|
| `PreToolUse` | Before tool calls | Validate, block risky operations |
| `PostToolUse` | After tool executes | Auto-format, run linters |
| `PermissionRequest` | Permission prompt shown | Allow/deny based on rules |
| `UserPromptSubmit` | User submits prompt | Add context, validate input |
| `SessionStart`/`SessionEnd` | Session lifecycle | Setup/cleanup |
| `SubagentStart`/`SubagentStop` | Subagent lifecycle | Setup/cleanup per agent |

**Create a hook** (interactive):
```bash
/hooks
```

**Example: Auto-format TypeScript after edits**:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit",
        "hooks": [
          {
            "type": "command",
            "command": "jq -r '.tool_input.file_path' | { read f; if [[ $f == *.ts ]]; then npx prettier --write \"$f\"; fi; }"
          }
        ]
      }
    ]
  }
}
```

**Example: Block writes to sensitive files**:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "python3 -c \"import json, sys; data=json.load(sys.stdin); path=data.get('tool_input',{}).get('file_path',''); sys.exit(2 if any(p in path for p in ['.env', '.git/']) else 0)\""
          }
        ]
      }
    ]
  }
}
```

### 5.3 Subagents (专用代理)

**What they are**: Specialized AI assistants with own context, tools, and permissions

**Built-in subagents**:
- **Explore**: Fast, read-only Haiku agent for codebase exploration
- **Plan**: Research agent used during plan mode
- **General-purpose**: Capable agent for complex multi-step tasks

**Create custom subagent** (interactive):
```bash
/agents
```

**Example: Code reviewer subagent**:

```yaml
---
name: code-reviewer
description: Expert code reviewer. Use proactively after code changes.
tools: Read, Glob, Grep
model: sonnet
permissionMode: default
---

You are a senior code reviewer. Focus on:
- Code quality and readability
- Security vulnerabilities
- Performance issues
- Test coverage
- Following team conventions
```

**Advanced patterns**:
- **Isolate high-volume operations**: Use subagents for tests, logs, docs
- **Parallel research**: Multiple subagents explore simultaneously
- **Chain subagents**: Code reviewer → optimizer subagent sequence
- **Preload skills**: Inject domain knowledge into subagent context

### 5.4 Fan-out for Batch Operations

**Use case**: Migrate 2,000 files or process many items in parallel

```bash
# Generate task list
claude -p "list all Python files that need migrating" > files.txt

# Loop through and process
for file in $(cat files.txt); do
  claude -p "Migrate $file from React to Vue. Return OK or FAIL." \
    --allowedTools "Edit,Bash(git commit *)"
done
```

**Tips**:
- Test on 2-3 files first to refine prompt
- Use `--allowedTools` to scope permissions
- Capture session IDs if you need to resume

### 5.5 Git Worktrees for Parallel Work

```bash
# Create isolated worktree
git worktree add ../project-feature-a -b feature-a

# Run Claude in each
cd ../project-feature-a && claude
cd ../project-bugfix && claude

# Clean up
git worktree remove ../project-feature-a
```

**Benefits**:
- Complete code isolation
- Independent file states
- Parallel Claude Code sessions
- No cross-contamination between tasks

---

## 6. MCP Servers & Advanced Integration

### 6.1 Popular MCP Integrations

#### Code Reviews & GitHub

```bash
claude mcp add --transport http github https://api.githubcopilot.com/mcp/
```

Usage:
- "Review PR #456 and suggest improvements"
- "Create a GitHub issue for the bug we found"

#### Error Monitoring (Sentry)

```bash
claude mcp add --transport http sentry https://mcp.sentry.dev/mcp
```

Usage:
- "What are the most common errors in the last 24 hours?"
- "Show me the stack trace for error ID abc123"

#### Database Queries

```bash
claude mcp add --transport stdio db \
  -- npx @bytebase/dbhub --dsn "postgresql://user:pass@host/db"
```

Usage:
- "What's our total revenue this month?"
- "Find customers who haven't purchased in 90 days"

### 6.2 Managed MCP Configuration (Enterprise)

**Exclusive control** (Option 1):
- Deploy `managed-mcp.json` to system-wide directory
- Users cannot add or modify servers
- Complete IT control

**Policy-based** (Option 2):
- Use allowlists/denylists in managed settings
- Allow users to add servers within policy
- Restrict by name, command, or URL pattern

---

## 7. Skills & Slash Commands

### 7.1 Skill Location Hierarchy

Higher priority wins when names conflict:

1. **Enterprise** (`managed-mcp.json`): All organization
2. **Personal** (`~/.claude/skills/`): All your projects
3. **Project** (`.claude/skills/`): This project only
4. **Plugin**: Where plugin is enabled

### 7.2 Advanced Skill Patterns

#### Visual Output Skill (Generate interactive HTML)

```yaml
---
name: codebase-visualizer
description: Generate interactive tree visualization of codebase structure
allowed-tools: Bash(python *)
---

Run the visualization script:
```bash
python ~/.claude/skills/codebase-visualizer/scripts/visualize.py .
```

This creates `codebase-map.html` with:
- Collapsible directory tree
- File sizes and types
- Summary statistics
```

#### Research Skill with Subagent

```yaml
---
name: deep-research
description: Research a topic thoroughly in isolated context
context: fork
agent: Explore
---

Research $ARGUMENTS thoroughly:
1. Find relevant files with Glob/Grep
2. Read and analyze code
3. Summarize findings with specific file references
```

---

## 8. Hooks & Automation

### 8.1 Common Hook Patterns

#### File formatting

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit",
        "hooks": [
          {
            "type": "command",
            "command": "./scripts/markdown-formatter.py"
          }
        ]
      }
    ]
  }
}
```

#### Database validation

```bash
#!/bin/bash
# Blocks SQL write operations

INPUT=$(cat)
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // empty')

if echo "$COMMAND" | grep -iE '\b(INSERT|UPDATE|DELETE|DROP)\b'; then
  echo "Blocked: Read-only access only" >&2
  exit 2
fi
exit 0
```

#### Custom notifications

```bash
notify-send 'Claude Code' 'Awaiting your input'
```

### 8.2 Hook Input/Output

**PreToolUse receives**:

```json
{
  "tool": "Bash",
  "tool_input": {
    "command": "npm test",
    "description": "Run test suite"
  }
}
```

**Exit codes**:
- `0` = Allow/proceed
- `1` = Generic error
- `2` = Block operation with error message

---

## 9. Configuration Files & Locations

### 9.1 Key Configuration Directories

#### User level (`~/.claude/`)

```
~/.claude/
├── settings.json          # Global settings
├── keybindings.json       # Custom keyboard shortcuts
├── CLAUDE.md              # Global memory
├── rules/RULES.md         # Global rules
├── skills/                # Personal skills
├── agents/                # Personal subagents
└── projects/              # Session storage
```

#### Project level (`./.claude/`)

```
.claude/
├── settings.json          # Project settings (check into git)
├── settings.local.json    # Local-only settings (.gitignore)
├── CLAUDE.md              # Project memory
├── rules/                 # Path-specific rules
├── skills/                # Project skills
├── agents/                # Project subagents
├── hooks/                 # Hook scripts
└── plugins/               # Plugin configuration
```

### 9.2 Key Configuration Files

**settings.json structure**:

```json
{
  "permissions": {
    "defaultMode": "default",
    "allow": ["Bash(npm *)"],
    "deny": ["Write(.env)"],
    "Tool(name)": "allow"
  },
  "environment": {
    "VAR_NAME": "value"
  },
  "hooks": {},
  "plugins": {
    "enabledPlugins": [],
    "extraKnownMarketplaces": []
  }
}
```

---

## 10. Advanced Commands & Shortcuts

### 10.1 Essential Keyboard Shortcuts

```
Ctrl+G     Open plan in text editor
Ctrl+B     Background current task
Ctrl+O     Toggle verbose mode (show thinking)
Alt+T      Toggle thinking mode
Shift+Tab  Cycle permission modes
Esc        Stop Claude mid-action
Esc Esc    Open rewind menu
Ctrl+R     Reverse command history search
```

### 10.2 Built-in Commands

```bash
/init              # Generate CLAUDE.md from codebase
/agents            # Manage subagents
/hooks             # Configure hooks
/permissions       # Configure permissions
/mcp               # Manage MCP servers
/cost              # View session costs
/context           # Check context usage
/clear             # Reset context between tasks
/compact           # Manually compact conversation
/rename            # Name current session
/resume            # Resume previous session
/rewind            # Restore previous state
/config            # Global configuration
/memory            # Edit memories
/plugin            # Install/manage plugins
/statusline        # Configure status line UI
```

### 10.3 Bash Mode

Type `!` prefix to enter bash mode:

```bash
! npm test          # Run bash command in background
! git status        # Keep terminal interactive
```

---

## 11. Cost Optimization

### 11.1 Token Usage Reduction Strategies

1. **Manage context aggressively**: Use `/clear` between tasks
2. **Choose right model**: Use Haiku for exploration, Sonnet for complex tasks
3. **Reduce MCP overhead**: Only add servers you use
4. **Install code intelligence plugins**: Typed languages get precise navigation
5. **Offload to hooks and skills**: Move verbose instructions there
6. **Adjust thinking**: Limit with `MAX_THINKING_TOKENS`
7. **Delegate to subagents**: Isolate verbose operations

### 11.2 Track Costs

```bash
/cost
```

Shows:
- Current session token usage
- Estimated cost
- Cost per 1M tokens

---

## 12. Advanced Deployment Options

### 12.1 Enterprise Deployment

- **Amazon Bedrock**: Use `claude mcp add-from-bedrock`
- **Google Vertex AI**: Use Workload Identity Federation
- **Microsoft Foundry**: Azure RBAC integration
- **LiteLLM Gateway**: Route through custom gateway

### 12.2 CI/CD Integration

#### GitHub Actions

```yaml
uses: anthropics/claude-code@main
with:
  prompt: "Fix all lint errors"
```

#### GitLab CI/CD

```yaml
script:
  - claude -p "Run tests and fix failures"
```

#### Local Pre-commit Hooks

```bash
claude -p "Check code style" --allowedTools "Read,Bash(npm run lint *)"
```

---

## 13. Power User Checklist

- [ ] Configured CLAUDE.md with project-specific context
- [ ] Set up custom keyboard shortcuts in keybindings.json
- [ ] Created personal skills for recurring workflows
- [ ] Created project subagents for specialized tasks
- [ ] Connected MCP servers for key integrations (GitHub, databases, etc.)
- [ ] Configured hooks for auto-formatting and validation
- [ ] Set permission allowlists for safe auto-approval
- [ ] Enabled sandboxing for high-risk workflows
- [ ] Installed code intelligence plugin for your language
- [ ] Set up Git worktrees for parallel work
- [ ] Configured status line with custom scripts
- [ ] Named sessions for easy resumption
- [ ] Created modular rules in .claude/rules/ for complex projects

---

## 14. Common Anti-Patterns to Avoid

| Anti-pattern | Problem | Solution |
|--------------|---------|----------|
| **Kitchen sink session** | Too many unrelated tasks pollute context | Use `/clear` between different tasks |
| **Over-specified CLAUDE.md** | Important rules get lost in noise | Prune ruthlessly; one line = prevents mistakes |
| **Correcting repeatedly** | Context fills with failed approaches | After 2 corrections, `/clear` and rewrite |
| **Infinite exploration** | Subagent reads hundreds of files | Scope narrowly or use subagents for exploration |
| **No verification** | Plausible-looking but broken code | Always provide tests, screenshots, or success criteria |
| **Trust without testing** | Code looks right but doesn't work | Auto-approve only safe tools |

---

## 15. Key Resources

**Official Documentation**:
- [Claude Code Docs](https://code.claude.com/docs)
- [Agent SDK](https://platform.claude.com/docs/en/agent-sdk/overview)
- [MCP Registry](https://api.anthropic.com/mcp-registry/docs)

**Useful Custom Skills** (you can create these):
- `/keybindings-help`: Customize keyboard shortcuts
- `/review`: Review pull requests
- `/security-review`: Security audit
- `/pr-comments`: Get GitHub PR comments

---

## Summary: Keys to Mastery

The key to mastering Claude Code:

1. 🎯 **Manage context aggressively** (the core constraint)
2. ✅ **Always provide verification** (highest-leverage optimization)
3. 🤖 **Automate with hooks and skills** (scale your work)
4. 🔀 **Use subagents for isolation** (preserve main context)
5. 🔗 **Chain workflows together** (handle complex tasks)

Start with the features most relevant to your workflow, and gradually adopt more advanced patterns as you become comfortable!

---

**Generated with Claude Code** | Last Updated: 2026-01-29
