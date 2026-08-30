---
title: 'Documentation for a High-Integrity Workflow Template'
summary: 'Documentation that makes a high-integrity workflow''s sources of truth, lifecycle states, approval checks, privacy boundaries, and recovery steps explicit.'
kind: 'documentation'
role: 'Documentation designer and maintainer'
period: '2026-08 – present'
stack:
  - 'Markdown'
  - 'Git'
  - 'Python'
  - 'TOML'
artefacts:
  - label: 'Template documentation'
    href: 'https://github.com/hly0928/jobseek-template'
  - label: 'Original system article'
    href: 'https://blog.hly0928.com/posts/2026/i-built-an-automated-job-search-system/'
authorship: 'ai-assisted-prose'
order: 2
draft: false
---

## Context

After building the private JobSeek workspace, I extracted its reusable structure into a public template. The central documentation task was to explain not only how to run commands, but why particular files are authoritative and why the workflow refuses to continue in certain states. The published template deliberately excludes real candidate profiles, advertisements, batch data, application history, and private evidence.

## Problem

The implementation encoded important invariants that were easy to miss when reading individual commands: one active batch, immutable snapshots, advisory rather than decisive scores, approval bound to current hashes, no blind retry after an unclear submission, and minimal archiving. If these ideas drifted between the README, setup guide, role instructions, configuration comments, and controller behaviour, a user could follow a technically valid command in the wrong state.

## What I did

I divided the material by reader need. The repository README defines the source-of-truth hierarchy, map, lifecycle, integrity boundaries, approval identity, privacy model, tests, and command surface. The first-run guide converts that model into an ordered setup and operating sequence. Role documents bound the responsibilities of discovery, audit, material preparation, and submission work. Configuration comments and placeholder files show the expected shape without introducing fictional candidate data.

I used AI-assisted prose drafting, then checked each operational claim against the repository tree, controller, tests, and configuration. I also repeated workflow invariants only where the reader needed to act on them, keeping their wording aligned with the controller rather than expanding them into unsupported promises.

## Artefacts and evidence

The public repository places documentation beside the implementation and tests, allowing every command, state, and safeguard to be checked. Its history records iterative changes to workflow terminology, agent boundaries, materials inputs, batch completion, and end-state definitions during August 2026. The original system article provides the private workflow context without exposing its personal data.

## Limits and what I'd change

The documentation describes a specialised personal workflow and cannot make an incorrectly configured copy safe by itself. Structural checks cannot determine whether a profile is complete or truthful. I would add a compact lifecycle diagram and generate the command reference from the controller, reducing the chance that manually maintained examples drift from executable behaviour.
