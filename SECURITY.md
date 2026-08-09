# Security and disclosure

Do not open a public issue containing customer logs, configurations, credentials, host names, addresses or device identifiers.

If you find sensitive data in this repository, use GitHub private vulnerability reporting when it is available. Otherwise report only that a private disclosure channel is needed; do not paste the sensitive value into an issue.

Every example in this repository must remain synthetic and must pass:

```text
node scripts/check-public-content.mjs .
```
