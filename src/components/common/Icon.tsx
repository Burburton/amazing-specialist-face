import type { SVGProps } from 'react';

export type IconName =
  | 'home'
  | 'skills'
  | 'roles'
  | 'contracts'
  | 'commands'
  | 'execution'
  | 'back'
  | 'search'
  | 'add'
  | 'sun'
  | 'moon'
  | 'system'
  | 'architect'
  | 'developer'
  | 'tester'
  | 'reviewer'
  | 'docs'
  | 'security'
  | 'common'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'mvp'
  | 'm4'
  | 'arrow-down'
  | 'arrow-right'
  | 'arrow-left'
  | 'arrow-up'
  | 'close'
  | 'external'
  | 'github'
  | 'menu'
  | 'spec'
  | 'plan'
  | 'task';

export interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
  size?: 16 | 18 | 20 | 24 | 32;
  label?: string;
}

const sizeMap = {
  16: 16,
  18: 18,
  20: 20,
  24: 24,
  32: 32,
};

export default function Icon({ 
  name, 
  size = 24, 
  label, 
  className = '',
  ...props 
}: IconProps) {
  const base = import.meta.env.BASE_URL || '/';
  const iconRef = `${base}icons.svg#icon-${name}`;
  const dimension = sizeMap[size];
  
  const combinedClassName = ['icon', `icon-${name}`, className].filter(Boolean).join(' ');
  
  return (
    <svg
      width={dimension}
      height={dimension}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={combinedClassName}
      aria-hidden={!label}
      aria-label={label}
      role={label ? 'img' : undefined}
      {...props}
    >
      <use href={iconRef} />
    </svg>
  );
}

export const roleIconMap: Record<string, IconName> = {
  architect: 'architect',
  developer: 'developer',
  tester: 'tester',
  reviewer: 'reviewer',
  docs: 'docs',
  security: 'security',
  common: 'common',
};

export const categoryIconMap: Record<string, IconName> = {
  MVP: 'mvp',
  M4: 'm4',
};