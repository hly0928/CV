---
title: 'Tracing a macOS Photos EXIF Date Failure'
summary: 'A controlled investigation that traced incorrect Photos dates past valid EXIF data to user-level date-format state, then verified a reversible fix.'
kind: 'troubleshooting'
role: 'Investigator and technical writer'
period: '2026-07'
stack:
  - 'macOS Photos'
  - 'Lightroom Classic'
  - 'ExifTool'
  - 'osxphotos'
  - 'Shortcuts'
artefacts:
  - label: 'Original troubleshooting article'
    href: 'https://blog.hly0928.com/posts/2026/macos-photos-exif-date-bug/'
  - label: 'ExifTool tag reference'
    href: 'https://exiftool.org/TagNames/Shortcuts.html'
  - label: 'osxphotos timewarp documentation'
    href: 'https://rhettbull.github.io/osxphotos/cli.html'
authorship: 'ai-assisted-prose'
order: 3
draft: false
---

## Context

My Lightroom Classic to Photos workflow had produced incorrect timeline placement for years: Photos used the JPEG export time instead of the original capture time. The decisive result was unexpectedly small but reproducible. The same file imported correctly in a clean macOS user account, and toggling the original account's 24-hour time setting restored correct imports even after returning to the preferred 12-hour display.

## Problem

Several layers exposed plausible dates: EXIF capture and digitisation fields, XMP metadata, file-system timestamps, and Photos database values. The investigation needed to separate a damaged export from a library fault, iCloud behaviour, an import-path problem, and account-level state. It also needed a recovery method that would correct Photos without rewriting legitimate export timestamps in the JPEG.

## What I did

I first preserved the original file bytes by transferring the JPEG inside a ZIP; a direct chat upload had resized the image and stripped its metadata. With `exiftool -a -G1 -s -Time:All`, I compared `DateTimeOriginal`, `CreateDate`, `ModifyDate`, XMP values, offsets, and file-system timestamps. The capture fields were internally consistent, while the export and modification fields formed a separate, later group.

I tested both Photos import paths, a new library, iCloud and cache hypotheses, safe mode, and a separate macOS user. The new user was the turning point because it held the file constant while changing account state. A community report then suggested a date-format interaction. I toggled the 24-hour setting, restarted Photos, and used previously unimported images for each comparison; correct EXIF selection persisted after switching back.

For existing incorrect library records, I tested `osxphotos timewarp --compare-exif` before `--pull-exif`, which updated Photos from EXIF without rewriting the JPEG. I wrapped that recovery command in a macOS Shortcut. GPT helped enumerate hypotheses and locate leads, but I checked modifying commands against the installed tool's help and project documentation after an initially suggested option proved invalid.

## Artefacts and evidence

The original article retains the sample metadata, control sequence, failed hypotheses, comparison table, exact commands, source documentation, and risk warnings. Evidence converged at three levels: the file contained coherent capture metadata; the problem followed one macOS user rather than the file or library; and changing the time-format setting changed import behaviour. The recovery comparison also demonstrated that the Photos record could be repaired without altering the source JPEG.

## Limits and what I'd change

Apple does not publish Photos' complete date-selection path, so the responsible component and mechanism remain unverified. The toggle is an observed fix in this environment, not proof that 12-hour display itself is faulty. `osxphotos timewarp` modifies the Photos library through unsupported mechanisms and requires backups and small-scale tests. A stronger future investigation would retain a compact fixture set and record exact macOS, Photos, Lightroom, ExifTool, and osxphotos versions for every import.
