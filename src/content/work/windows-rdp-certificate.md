---
title: 'Replacing the Default RDP Certificate on Windows Server'
summary: 'An end-to-end certificate workflow that replaced the default Remote Desktop warning with a locally trusted server certificate.'
kind: 'troubleshooting'
role: 'System administrator and technical writer'
period: '2020-05'
stack:
  - 'OpenSSL'
  - 'Windows Server'
  - 'PowerShell'
  - 'macOS Keychain'
artefacts:
  - label: 'Original certificate guide'
    href: 'https://archive.blog.hly0928.com/post/install-self-signed-cert-for-windows-rdp/'
authorship: 'unassisted'
order: 5
draft: false
---

## Context

I temporarily used a Windows cloud server for software required by a university course and connected from macOS with Microsoft Remote Desktop. The service presented its default self-signed certificate, so the client could not verify the connection identity without a warning.

## Problem

Simply accepting the warning would not establish a repeatable trust path. A usable replacement required a trusted root on the client, a server certificate with the correct identity and server-authentication purpose, a Windows-compatible package containing the private key, and an explicit binding between that certificate and Remote Desktop Services.

## What I did

Using OpenSSL, I generated a local certificate-authority key and root certificate, then trusted the root in macOS Keychain. I generated a separate server key and certificate request for the server identity and signed it with SHA-256, `serverAuth` extended key usage, and a subject alternative name matching the domain or IP used for the connection.

I exported the server key and certificate as a password-protected PKCS#12 file, installed it in the Windows local-computer personal certificate store, extracted its fingerprint, and assigned that fingerprint to the Remote Desktop Services configuration. I then disconnected and reconnected to verify that the client no longer displayed the untrusted-certificate warning. The guide also records how to remove the installed certificate and where a certificate from a public authority would enter the same workflow.

## Artefacts and evidence

The original guide preserves the OpenSSL commands, certificate extensions, PKCS#12 export, fingerprint extraction, Windows installation path, service-binding command, screenshots, connection test, and removal procedure. Together they document both certificate creation and the final service configuration rather than treating trust as a client-side checkbox.

## Limits and what I'd change

A private certificate authority is suitable only when its root can be distributed and protected appropriately; it is not a substitute for a publicly trusted certificate on an internet-facing service. The article reflects a 2020 Windows environment, so certificate policy and management commands require current verification before reuse. I would now add explicit private-key permissions, backup and rotation steps, plus a modern PowerShell-based binding check.
