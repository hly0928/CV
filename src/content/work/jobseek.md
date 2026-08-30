---
title: 'An Approval-Bound Job Application Workflow'
summary: 'A file-driven system that reviewed 539 listings across 13 batches while tying every approval and archive to an exact set of source files.'
kind: 'system'
role: 'System designer and maintainer'
period: '2026-08 – present'
stack:
  - 'Python'
  - 'Markdown'
  - 'JSON'
  - 'JSONL'
  - 'Git'
artefacts:
  - label: 'Original project article'
    href: 'https://blog.hly0928.com/posts/2026/i-built-an-automated-job-search-system/'
  - label: 'Public template repository'
    href: 'https://github.com/hly0928/jobseek-template'
authorship: 'ai-assisted-prose'
order: 1
draft: false
---

## Context

By the publication of the original project article in August 2026, my personal JobSeek workspace had completed 13 batches, reviewed 539 job listings, and archived the exact materials used for 30 confirmed applications. The controller was approximately 1,300 lines, supported by nearly 1,000 lines of tests and 79 passing test cases. These figures describe the recorded workflow at that point; they are not claims about hiring outcomes or market impact.

The system is human-supervised and file-driven. It keeps verified candidate facts, job advertisements, writing guidance, working outputs, approvals, private evidence, and submission archives in distinct locations rather than treating every piece of text as equally authoritative.

## Problem

The difficult part was not generating prose. It was proving which facts and document bytes were used at each irreversible step. Source profiles could change mid-batch, the same advertisement could appear under several URLs, an edited attachment could invalidate an earlier review, and an unclear browser result could make a retry create a duplicate application.

## What I did

I made the batch snapshot the first boundary. Required inputs are copied into an immutable snapshot with their roles, sources, and SHA-256 hashes before discovery begins. URLs are canonicalised and compared with batch and long-term history. Generated assessments remain advisory, while hard exclusions and unresolved fact conflicts stop the workflow.

The Python standard-library controller then enforces the mechanical parts of the lifecycle: preflight, batch creation, snapshot integrity, required files, duplicate detection, candidate-email conflicts, materials inputs, approval identity, submitted-material hashes, archive provenance, index rebuilding, and batch completion. Approval is scoped to one job, its current review, and the hashes of the current attachments. Any material change invalidates that approval. An ambiguous submission result is recorded for review instead of being retried automatically.

## Artefacts and evidence

The original article records the operational snapshot and explains why the system stops at human judgement and final submission. The public template exposes the controller, tests, configuration, role definitions, setup guide, placeholder profiles, history structures, and privacy boundaries without publishing personal application data. Repository tests cover cases including tampered snapshots, duplicate work across workers, approval invalidation, ambiguous submission state, and archive consistency.

## Limits and what I'd change

This is a personal workflow, not a commercial recruitment platform or an unattended application bot. Its counts demonstrate traceability, not effectiveness in securing work. The controller can check structure and provenance but cannot prove the truth of free-form prose or decide whether an opportunity is worthwhile. The next useful improvement would be a clearer diff between the reviewed and currently approved material, plus broader interrupted-session tests, without weakening the exact-version boundary.
