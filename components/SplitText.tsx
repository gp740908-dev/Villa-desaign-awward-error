import React from 'react';

interface SplitTextProps {
  children: string;
  className?: string;
  type?: 'chars' | 'words';
}

export const SplitText: React.FC<SplitTextProps> = ({ children, className = '', type = 'chars' }) => {
  if (type === 'chars') {
    return (
      <span className={`inline-block ${className}`} aria-label={children}>
        {children.split('').map((char, index) => (
          <span 
            key={index} 
            className="split-char inline-block" 
            style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
          >
            {char}
          </span>
        ))}
      </span>
    );
  }

  return (
    <span className={`inline-block ${className}`} aria-label={children}>
      {children.split(' ').map((word, index) => (
        <span key={index} className="split-word inline-block overflow-hidden align-top">
            <span className="inline-block">
                {word}&nbsp;
            </span>
        </span>
      ))}
    </span>
  );
};