---
title: 'Isolating USB Wake to S3 on an MSI B460 Motherboard'
summary: 'A BIOS configuration investigation that combined wake-event and power-state settings to allow keyboard wake from sleep without enabling it from hibernation or shutdown.'
kind: 'troubleshooting'
role: 'Investigator and technical writer'
period: '2021-03'
stack:
  - 'MSI UEFI/BIOS'
  - 'Windows power states'
  - 'PC hardware'
artefacts:
  - label: 'Original configuration article'
    href: 'https://archive.blog.hly0928.com/post/enable-s3-only-usb-wakeup-on-msi-b460-motherboards/'
authorship: 'unassisted'
order: 4
draft: false
---

## Context

After assembling my first desktop PC with an MSI B460I Gaming Edge WiFi motherboard, I wanted USB keyboard and mouse input to wake the computer from S3 sleep, but not from S4 hibernation or S5 shutdown. The BIOS presented one combined option for USB wake across S3, S4, and S5 rather than separate controls.

## Problem

Disabling the combined wake option prevented the required S3 wake. Enabling it also allowed wake behaviour in a deeper power state. Enabling ErP would remove USB power in S4 and S5, but the normal ErP switch automatically disabled the combined USB-wake option. The task therefore depended on understanding the interaction between two settings rather than finding a missing single-state toggle.

## What I did

I enabled the board's USB wake option, kept the normal ErP control disabled, and then enabled the BIOS D.T.M setting. On this board, D.T.M activated ErP behaviour without clearing the previously enabled USB-wake setting. This left USB wake available in S3 while removing the S4/S5 USB power path that could trigger unwanted wake behaviour.

Because D.T.M changed other firmware settings, I documented the affected integrated-graphics, fast-boot, mining, Intel Speed Shift, CFG Lock, and SGX options so they could be reviewed and restored for a non-Hackintosh configuration. I also recorded the prerequisite that ErP must initially remain disabled so the USB-wake option can be set first.

## Artefacts and evidence

The original article records the exact motherboard model, firmware menu paths, ordered configuration steps, setting interaction, and the power-state reasoning behind the result. It distinguishes observed behaviour from the broader wording shown in the BIOS and explicitly limits the verified result to the MSI B460I Gaming Edge WiFi.

## Limits and what I'd change

This is a model-specific firmware workaround from 2021, not a general rule for all MSI boards or current firmware. D.T.M is an indirect route to the desired state and can modify unrelated options. Before applying it elsewhere, I would capture the original configuration, verify every changed setting, and retest S3, S4, and S5 behaviour after any BIOS update.
