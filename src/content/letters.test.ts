import { describe, it, expect } from "vitest";
import { LETTERS, getLetter } from "./letters";

describe("letters content", () => {
  it("has at least one letter", () => {
    expect(LETTERS.length).toBeGreaterThan(0);
  });

  it("getLetter resolves a known slug and rejects an unknown one", () => {
    const first = LETTERS[0];
    expect(getLetter(first.slug)?.slug).toBe(first.slug);
    expect(getLetter("does-not-exist")).toBeUndefined();
  });

  it("every letter has the required non-empty fields", () => {
    for (const l of LETTERS) {
      expect(l.slug, `slug missing for "${l.title}"`).toBeTruthy();
      expect(l.path).toBe(`/letters/${l.slug}`);
      expect(l.title.trim().length).toBeGreaterThan(0);
      expect(l.standfirst.trim().length).toBeGreaterThan(0);
      expect(l.readingTime.trim().length).toBeGreaterThan(0);
      expect(l.seoTitle.trim().length).toBeGreaterThan(0);
      expect(l.seoDescription.trim().length).toBeGreaterThan(0);
      expect(l.closing.trim().length).toBeGreaterThan(0);
      expect(Array.isArray(l.body)).toBe(true);
      expect(l.body.length).toBeGreaterThan(0);
      for (const para of l.body) {
        expect(para.text.trim().length).toBeGreaterThan(0);
      }
    }
  });

  it("has unique slugs", () => {
    const slugs = LETTERS.map((l) => l.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});
