---
sidebar_position: 1
title: SMTP Server Setup
---

# DNS Setup

## jablonowski.dev

- A: 164.30.69.174
- MX: mail.jablonowski.dev
- TXT-Entries:
  1. `v=spf1 ip4:164.30.69.174 -all`
  2. `v=DMARC1; p=quarantine; rua=mailto:alexander.jablo@gmail.com`

## mail.jablonowski.dev

- A: 164.30.69.174

# TODO

- add [opendkim](http://www.opendkim.org/) and dkim entry to `jablonowski.dev`
- setup PTR (reverse DNS)
