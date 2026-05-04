---
name: security-encryption
description: "PII data protection using AES-256 encryption."
---

# Security & Encryption Skill

This skill defines the requirements for handling Personally Identifiable Information (PII) within the IvysBeauty system.

## Encryption Standard
- **Algorithm**: AES-256-GCM (preferred) or AES-256-CBC.
- **Key**: Managed via `PII_ENCRYPTION_KEY` environment variable.

## Sensitive Fields
The following fields MUST be encrypted before being stored in the database:
- `User.name`
- `User.phone`
- `User.birthday`
- `Booking.paymentProof` (if containing sensitive text/metadata)

## Implementation Details
1. **Database Layer**: Encryption/Decryption should happen in the `packages/database` layer, ideally via Prisma middleware or custom client extensions.
2. **Access Control**: Only authorized services with the correct `PII_ENCRYPTION_KEY` should be able to decrypt the data.
3. **Logs**: Never log decrypted PII.
