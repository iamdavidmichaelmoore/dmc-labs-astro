import { describe, expect, it } from 'vitest';
import { getLatestNote, type BlogPost } from '../../src/data/site';

describe('getLatestNote', () => {
  it('returns the first sluggable note when present', () => {
    const noteWithoutSlug: BlogPost = {
      date: '2024-06-28',
      title: 'Annotation Studio Metrics',
      description: 'No slug yet.',
    };
    const latestNote: BlogPost = {
      slug: 'self-correction-in-llms',
      date: '2024-07-15',
      title: 'Self-Correction in LLMs',
      description: 'Sluggable note.',
    };

    expect(getLatestNote([noteWithoutSlug, latestNote])).toBe(latestNote);
  });

  it('throws when no posts exist', () => {
    expect(() => getLatestNote([])).toThrow('getLatestNote requires at least one post');
  });
});
