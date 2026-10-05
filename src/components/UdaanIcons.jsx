import React from 'react';

/**
 * UDAAN Signature Soaring Dove Emblem (Represents "Flight" / "उड़ान")
 * Replaces generic AI sparkles with an authentic luxury flight motif.
 */
export function UdaanEmblem({ size = 16, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      {/* Dynamic soaring bird in flight towards top-right */}
      <path d="M21.5 2.5c-4.2.8-8.5 2.8-11.8 6-2.5 2.4-4.2 5.5-5.2 8.8-.4 1.3-.6 2.7-.5 4.1.7-.5 1.5-1 2.2-1.4 3-1.6 6.4-2.1 9.8-1.5 2.2.4 4.3 1.2 6.2 2.3-.6-3.8-2.2-7.4-4.8-10.2-1.6-1.7-3.5-3.1-5.6-4.1 3.5-.2 7.1.4 10.3 1.9-.2-2.1-.4-4.1-.6-5.9z" opacity="0.9" />
    </svg>
  );
}

/**
 * Royal Heritage Lotus Emblem
 * Traditional Indian luxury crest for festive galas
 */
export function UdaanLotus({ size = 16, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 4c-1.5 3-4 6-4 9a4 4 0 0 0 8 0c0-3-2.5-6-4-9z" fill="currentColor" fillOpacity="0.2" />
      <path d="M12 13c-2.5 0-5.5-1.5-7.5-4 1 4 4 7 7.5 7.5" />
      <path d="M12 13c2.5 0 5.5-1.5 7.5-4-1 4-4 7-7.5 7.5" />
      <path d="M12 20c-4 0-8-1-9-3 2 4 6 5 9 5s7-1 9-5c-1 2-5 3-9 3z" fill="currentColor" fillOpacity="0.3" />
    </svg>
  );
}

/**
 * High-Fashion Faceted Diamond Pip
 * Replaces generic 4-pointed sparkle stars on eyebrow tags & category headers
 */
export function UdaanDiamond({ size = 11, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="currentColor"
      className={className}
    >
      <path d="M8 1L14 8L8 15L2 8L8 1Z" />
    </svg>
  );
}
