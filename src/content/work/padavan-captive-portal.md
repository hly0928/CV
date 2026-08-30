---
title: 'Automating Captive-Portal Login on a Padavan Router'
summary: 'A router-side shell workflow that reconstructed a dynamic HTTP login request, detected authentication state, and retried after WAN startup.'
kind: 'system'
role: 'System investigator and script author'
period: '2019-12'
stack:
  - 'Shell'
  - 'curl'
  - 'HTTP'
  - 'Chrome DevTools'
  - 'SSH'
  - 'cron'
  - 'Padavan'
artefacts:
  - label: 'Original automation guide'
    href: 'https://archive.blog.hly0928.com/post/auto-web-login-using-padavan/'
authorship: 'unassisted'
order: 6
draft: false
---

## Context

My university residence's wired network used dynamic addressing and a browser-based login after the router restarted. The connection redirected an unauthenticated HTTP request to a portal where credentials had to be entered manually. I wanted the Padavan router to restore access after WAN startup without requiring another device to open the portal.

## Problem

The login was an HTTP POST rather than a documented router protocol. A captured browser request contained transient values, including the current internal IP address and device MAC address, so replaying it unchanged would not remain valid. The automation also needed to tell an already authenticated connection from a portal redirect and record whether a new login attempt succeeded.

## What I did

I captured a successful login in Chrome DevTools, identified the POST request, and copied it as cURL. I separated stable credentials and request fields from dynamic network values, then derived the current IP and router-interface MAC address from Padavan's `ifconfig` output. During testing from macOS, I also confirmed that the portal's `NextURL` response exposed the values needed to reconstruct the request.

I converted the request into a shell script that first checks for the unauthenticated response marker. Only when that marker is present does it send the login POST, inspect the response for success, and write success or failure details to the router log. I stored the executable script under Padavan's persistent `/etc/storage`, attached it to the WAN up/down startup hook, and documented an optional cron invocation for periodic recovery.

## Artefacts and evidence

The original guide retains the captured-request analysis, dynamic-value extraction, complete shell workflow, SSH deployment steps, WAN hook, optional schedule, screenshots, and a successful test response followed by restored connectivity. It also explains why URL-encoded portal fields had to be interpreted before the browser request could become a reusable router-side script.

## Limits and what I'd change

This was an environment-specific 2019 solution for a portal that used plain HTTP and a Padavan router. The documented script stores credentials locally and depends on response text and interface names that can change. It should not be reused as a modern authentication template without permission from the network operator, encrypted credential handling, tighter request minimisation, failure backoff, and a fresh security review.
