import React from 'react';
import styles from './Card.module.css';

// ===== Types =====

export interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outlined';
  hoverable?: boolean;
  selectable?: boolean;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

export interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

export interface CardMediaProps {
  children?: React.ReactNode;
  image?: string;
  alt?: string;
  height?: string | number;
  className?: string;
}

export interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

// ===== Card Header =====

const CardHeader: React.FC<CardHeaderProps> = ({ children, className = '' }) => {
  return <div className={`${styles.cardHeader} ${className}`}>{children}</div>;
};

// ===== Card Title =====

const CardTitle: React.FC<CardTitleProps> = ({ children, className = '' }) => {
  return <h3 className={`${styles.cardTitle} ${className}`}>{children}</h3>;
};

// ===== Card Media =====

const CardMedia: React.FC<CardMediaProps> = ({
  children,
  image,
  alt = '',
  height = '160px',
  className = '',
}) => {
  const mediaStyle = {
    height: typeof height === 'number' ? `${height}px` : height,
  };

  return (
    <div className={`${styles.cardMedia} ${className}`} style={mediaStyle}>
      {image ? <img src={image} alt={alt} /> : children}
    </div>
  );
};

// ===== Card Content =====

const CardContent: React.FC<CardContentProps> = ({ children, className = '' }) => {
  return <div className={`${styles.cardContent} ${className}`}>{children}</div>;
};

// ===== Card Footer =====

const CardFooter: React.FC<CardFooterProps> = ({ children, className = '' }) => {
  return <div className={`${styles.cardFooter} ${className}`}>{children}</div>;
};

// ===== Main Card Component =====

const Card: React.FC<CardProps> & {
  Header: typeof CardHeader;
  Title: typeof CardTitle;
  Media: typeof CardMedia;
  Content: typeof CardContent;
  Footer: typeof CardFooter;
} = ({
  children,
  variant = 'default',
  hoverable = false,
  selectable = false,
  selected = false,
  onClick,
  className = '',
}) => {
  const cardClasses = [
    styles.card,
    variant === 'elevated' && styles.cardElevated,
    variant === 'outlined' && styles.cardOutlined,
    hoverable && styles.cardHoverable,
    selectable && styles.cardSelectable,
    selected && styles.cardSelected,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const handleClick = () => {
    if ((selectable || hoverable) && onClick) {
      onClick();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((selectable || hoverable) && onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      className={cardClasses}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={(selectable || hoverable) && onClick ? 0 : undefined}
      role={(selectable || hoverable) && onClick ? 'button' : undefined}
      aria-pressed={selectable ? selected : undefined}
    >
      {children}
    </div>
  );
};

// Attach sub-components
Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Media = CardMedia;
Card.Content = CardContent;
Card.Footer = CardFooter;

export { Card };
