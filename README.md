# infra2ai Portfolio

Source for [infra2ai.dev](https://infra2ai.dev), a public engineering portfolio spanning Solaris, x86, storage, Oracle, Terraform, cloud and security-solution operations.

## Problem

Career evidence, technical writing and planned learning projects need different publication rules. The site keeps delivered customer work, generalized engineering methods and planned AI-platform labs visibly separate.

## What I wrote and verified

- React and TypeScript portfolio application
- Six long-form engineering articles written in practitioner voice
- Thirty-two resume-backed career project pages grouped by engineering domain
- Planned Kubernetes and AI-platform work labeled as planned rather than production experience
- Public-content and Cloudflare SPA configuration validators

Resume files and customer source documents are not included.

## Architecture

- `src/data` stores typed blog, project, experience and localization content.
- `src/routes` maps list and detail pages through TanStack Router.
- `scripts` checks publication claims, sensitive patterns, project invariants and Cloudflare SPA routing.
- `wrangler.json` contains the public Cloudflare Workers static-site configuration without account identifiers or secrets.

## Main decisions

1. Content stays in typed source files; no CMS is required for the current publishing volume.
2. Korean is the detailed primary language; English copy is concise.
3. Empty project sections are not rendered.
4. Security-sensitive examples use documentation values or symbolic labels.
5. Kubernetes and AI-platform projects stay planned until implemented and verified.

## Run locally

```text
npm clean-install
npm run dev
```

## Verify

```text
npm test
npm run validate:content
npm run lint
npm run build
node scripts/check-public-content.mjs .
```

## Failure and recovery behavior

The Cloudflare configuration routes direct SPA requests to the application entry point. A regression test checks that project and blog detail URLs remain reachable after deployment.

## Limits

This repository contains public source and generalized content only. It does not contain customer configurations, private topology, original career documents or the private repository's Git history.

## Public-data policy

Customer and project names may appear where approved. People, addresses, domains, accounts, hosts, credentials, identifiers and real configuration values are omitted or replaced.
