import React, { act } from 'react';
import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LanguageProvider } from '../contexts/LanguageContext';

// ---------------------------------------------------------------------------
// Mutable variable — tests update this before each render so we can exercise
// different DEMO_VIDEO_URL values without having to reset the module registry
// (which would also clear the other mocks).
// ---------------------------------------------------------------------------
let mockDemoVideoUrl = '';

// ---------------------------------------------------------------------------
// Mocks — all declared at the top level so vi.mock hoisting applies.
// The LanguageContext is NOT mocked here; the real LanguageProvider is used
// as a wrapper so the hook sees its context without extra set-up.
// ---------------------------------------------------------------------------

vi.mock('../config', () => ({
  get DEMO_VIDEO_URL() {
    return mockDemoVideoUrl;
  },
}));

// framer-motion — avoid animation side-effects in jsdom
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, style, className }: React.HTMLAttributes<HTMLDivElement>) =>
      React.createElement('div', { style, className }, children),
  },
  useScroll: () => ({ scrollYProgress: { value: 0 } }),
  useTransform: () => '0%',
}));

// PhoneMockup / Lightbox — irrelevant to the video fallback logic
vi.mock('../components/ui/phone-mockup', () => ({
  PhoneMockup: ({ children }: { children: React.ReactNode }) =>
    React.createElement('div', { 'data-testid': 'phone-mockup' }, children),
}));

vi.mock('../components/ui/lightbox', () => ({
  Lightbox: () => null,
}));

// ---------------------------------------------------------------------------
// Import the component AFTER all mocks are in place
// ---------------------------------------------------------------------------
import { ShowcaseDemo } from '../components/sections/ShowcaseDemo';

// ---------------------------------------------------------------------------
// Helper — wrap component with the LanguageProvider it requires
// ---------------------------------------------------------------------------
function renderShowcase() {
  return render(
    React.createElement(LanguageProvider, null, React.createElement(ShowcaseDemo)),
  );
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------
describe('ShowcaseDemo — video error fallback', () => {
  beforeEach(() => {
    mockDemoVideoUrl = '';
  });

  it('shows the <video> element when DEMO_VIDEO_URL points to an mp4', () => {
    mockDemoVideoUrl = 'https://example.com/demo.mp4';
    const { container } = renderShowcase();

    expect(container.querySelector('video')).not.toBeNull();
    expect(container.querySelector('iframe')).toBeNull();
  });

  it('shows "Video unavailable" after <video> fires an error event', () => {
    mockDemoVideoUrl = 'https://example.com/demo.mp4';
    const { container, getByText } = renderShowcase();

    const video = container.querySelector('video');
    expect(video).not.toBeNull();

    // Simulate a native load error
    fireEvent.error(video!);

    expect(getByText('Video unavailable')).toBeInTheDocument();
    expect(container.querySelector('video')).toBeNull();
  });

  it('shows the <iframe> element when DEMO_VIDEO_URL is a non-video URL', () => {
    mockDemoVideoUrl = 'https://www.youtube-nocookie.com/embed/abc123';
    const { container } = renderShowcase();

    expect(container.querySelector('iframe')).not.toBeNull();
    expect(container.querySelector('video')).toBeNull();
  });

  it('shows "Video unavailable" after <iframe> fires an error event', () => {
    mockDemoVideoUrl = 'https://www.youtube-nocookie.com/embed/abc123';
    const { container, getByText } = renderShowcase();

    const iframe = container.querySelector('iframe');
    expect(iframe).not.toBeNull();

    // In jsdom, error events on <iframe> don't propagate through React's
    // synthetic event system the way they do for media elements. Invoke the
    // onError prop directly via the React internal props attached to the node,
    // wrapped in act() so React flushes the resulting state update.
    const propsKey = Object.keys(iframe!).find((k) =>
      k.startsWith('__reactProps'),
    );
    expect(propsKey, 'React props key not found on iframe').toBeTruthy();
    act(() => {
      (iframe as any)[propsKey!].onError?.();
    });

    expect(getByText('Video unavailable')).toBeInTheDocument();
    expect(container.querySelector('iframe')).toBeNull();
  });

  it('hides the Demo Video section entirely when DEMO_VIDEO_URL is empty', () => {
    mockDemoVideoUrl = '';
    const { container } = renderShowcase();

    expect(container.querySelector('video')).toBeNull();
    expect(container.querySelector('iframe')).toBeNull();
  });

  it('recognises .webm and .mov extensions as direct video URLs', () => {
    for (const ext of ['webm', 'mov']) {
      mockDemoVideoUrl = `https://cdn.example.com/clip.${ext}`;
      const { container, unmount } = renderShowcase();
      expect(container.querySelector('video')).not.toBeNull();
      unmount();
    }
  });
});
