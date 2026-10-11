import { isString } from '@sniptt/guards';

export const isSameUniversalIdentifier = ({
  value,
  universalIdentifier,
}: {
  value: unknown;
  universalIdentifier: unknown;
}) =>
  isString(value) &&
  isString(universalIdentifier) &&
  value.toLowerCase() === universalIdentifier.toLowerCase();
