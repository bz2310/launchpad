'use client';

import { useState } from 'react';

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="header">
      <h1>{title}</h1>

      <div className="header-actions">
        <input
          type="search"
          placeholder="Search artists, tracks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-box"
        />
      </div>
    </header>
  );
}
