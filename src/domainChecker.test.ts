import { describe, it, expect, beforeEach, vi } from 'vitest';
import { DomainChecker } from './domainChecker';

// Mock the global fetch function
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('DomainChecker', () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  describe('checkSingleDomain', () => {
    it('should return true for available domain', async () => {
      mockFetch.mockResolvedValueOnce({
        status: 200,
        text: () => Promise.resolve('some content')
      });

      const result = await DomainChecker.checkSingleDomain('https://test.com');
      expect(result).toBe(true);
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('https://test.com/p/index.php?v=')
      );
    });

    it('should return false for unavailable domain', async () => {
      mockFetch.mockResolvedValueOnce({
        status: 404,
        text: () => Promise.resolve('')
      });

      const result = await DomainChecker.checkSingleDomain('https://test.com');
      expect(result).toBe(false);
    });

    it('should return false when fetch fails', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      const result = await DomainChecker.checkSingleDomain('https://test.com');
      expect(result).toBe(false);
    });
  });

  describe('checkDomains', () => {
    it('should check multiple domains and return results', async () => {
      mockFetch
        .mockResolvedValueOnce({
          status: 200,
          text: () => Promise.resolve('content')
        })
        .mockResolvedValueOnce({
          status: 404,
          text: () => Promise.resolve('')
        });

      const domains = ['https://test1.com', 'https://test2.com'];
      const results = await DomainChecker.checkDomains(domains);

      expect(results).toEqual([
        { domain: 'https://test1.com', available: true },
        { domain: 'https://test2.com', available: false }
      ]);
    });
  });

  describe('findFirstAvailable', () => {
    it('should return first available domain', async () => {
      mockFetch
        .mockResolvedValueOnce({
          status: 404,
          text: () => Promise.resolve('')
        })
        .mockResolvedValueOnce({
          status: 200,
          text: () => Promise.resolve('content')
        });

      const domains = ['https://test1.com', 'https://test2.com'];
      const result = await DomainChecker.findFirstAvailable(domains);

      expect(result).toBe('https://test2.com');
    });

    it('should return null when no domains available', async () => {
      mockFetch.mockResolvedValue({
        status: 404,
        text: () => Promise.resolve('')
      });

      const domains = ['https://test1.com', 'https://test2.com'];
      const result = await DomainChecker.findFirstAvailable(domains);

      expect(result).toBeNull();
    });

    it('should handle fetch errors gracefully', async () => {
      mockFetch.mockRejectedValue(new Error('Network error'));

      const domains = ['https://test1.com', 'https://test2.com'];
      const result = await DomainChecker.findFirstAvailable(domains);

      expect(result).toBeNull();
    });
  });
});