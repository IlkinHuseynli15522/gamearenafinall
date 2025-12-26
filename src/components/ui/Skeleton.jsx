// src/components/ui/Skeleton.jsx
import React from 'react';

export default function Skeleton({ className = '' }) {
  return (
    <div
      className={
        'animate-pulse rounded-md bg-slate-800/70 ' +
        className
      }
    />
  );
}
