import { describe, expect, it } from 'vitest';

import { TileCode } from './tile-code';
import { TileCodeTranslator } from './tile-code-translator';
import { HonorType, SuitType } from '../tile';

describe('TileCodeTranslator', () => {
  describe('decode', () => {
    it('与えられたコードに対応する牌の種類を返すこと', () => {
      expect(TileCodeTranslator.decode(TileCode.m1)).toBe(SuitType.Character1);
      expect(TileCodeTranslator.decode(TileCode.p5)).toBe(SuitType.Circle5);
      expect(TileCodeTranslator.decode(TileCode.s9)).toBe(SuitType.Bamboo9);
      expect(TileCodeTranslator.decode(TileCode.z2)).toBe(HonorType.South);
    });
  });

  describe('encode', () => {
    it('与えられた牌の種類に対応するコードを返すこと', () => {
      expect(TileCodeTranslator.encode(SuitType.Character1)).toBe(TileCode.m1);
      expect(TileCodeTranslator.encode(SuitType.Circle5)).toBe(TileCode.p5);
      expect(TileCodeTranslator.encode(SuitType.Bamboo9)).toBe(TileCode.s9);
      expect(TileCodeTranslator.encode(HonorType.South)).toBe(TileCode.z2);
    });
  });
});
