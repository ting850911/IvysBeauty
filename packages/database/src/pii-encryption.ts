import crypto from "node:crypto";

const ENCRYPTION_PREFIX = "enc:v1";
const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 12;
const AUTH_TAG_LENGTH = 16;

let cachedKey: Buffer | null = null;
let cachedRawKey: string | undefined;

const parseKey = (): Buffer => {
  const rawKey = process.env.PII_ENCRYPTION_KEY;

  if (!rawKey) {
    throw new Error("Missing PII_ENCRYPTION_KEY environment variable");
  }

  if (cachedKey && cachedRawKey === rawKey) {
    return cachedKey;
  }

  if (!/^[a-fA-F0-9]{64}$/.test(rawKey)) {
    throw new Error("PII_ENCRYPTION_KEY must be 64 hex chars (32 bytes)");
  }

  cachedRawKey = rawKey;
  cachedKey = Buffer.from(rawKey, "hex");
  return cachedKey;
};

const toBase64Url = (buffer: Buffer) => buffer.toString("base64url");

const fromBase64Url = (value: string) => Buffer.from(value, "base64url");

export const isEncryptedField = (value: string) => value.startsWith(`${ENCRYPTION_PREFIX}:`);

export const encryptField = (value?: string | null): string | null => {
  if (value === null || value === undefined) {
    return null;
  }

  const iv = crypto.randomBytes(IV_LENGTH);
  const key = parseKey();
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
  const encrypted = Buffer.concat([cipher.update(value, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();

  return `${ENCRYPTION_PREFIX}:${toBase64Url(iv)}:${toBase64Url(tag)}:${toBase64Url(encrypted)}`;
};

export const decryptField = (value?: string | null): string | null => {
  if (value === null || value === undefined) {
    return null;
  }

  if (!isEncryptedField(value)) {
    return value;
  }

  const payload = value.slice(`${ENCRYPTION_PREFIX}:`.length);
  const [ivPart, tagPart, encryptedPart] = payload.split(":");
  if (!ivPart || !tagPart || !encryptedPart) {
    throw new Error("Encrypted field format is invalid");
  }

  const key = parseKey();
  const decipher = crypto.createDecipheriv(ALGORITHM, key, fromBase64Url(ivPart), {
    authTagLength: AUTH_TAG_LENGTH,
  });
  decipher.setAuthTag(fromBase64Url(tagPart));
  const decrypted = Buffer.concat([decipher.update(fromBase64Url(encryptedPart)), decipher.final()]);

  return decrypted.toString("utf8");
};