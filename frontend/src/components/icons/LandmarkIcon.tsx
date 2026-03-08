interface LandmarkIconProps {
  type: string
  className?: string
}

export const LandmarkIcon = ({ type, className = "" }: LandmarkIconProps) => {
  const icons = {
    tower: (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M12 2L10 8H14L12 2Z" fill="currentColor" opacity="0.4"/>
        <rect x="11" y="8" width="2" height="8" fill="currentColor"/>
        <path d="M9 16H15V18H9V16Z" fill="currentColor"/>
        <path d="M8 18H16V20H8V18Z" fill="currentColor" opacity="0.6"/>
      </svg>
    ),
    mountain: (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M3 20L12 4L21 20H3Z" fill="currentColor" opacity="0.4"/>
        <path d="M8 20L14 8L20 20H8Z" fill="currentColor" opacity="0.3"/>
      </svg>
    ),
    temple: (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M4 20H20V22H4V20Z" fill="currentColor"/>
        <rect x="7" y="12" width="10" height="8" fill="currentColor" opacity="0.4"/>
        <path d="M6 10L12 6L18 10H6Z" fill="currentColor"/>
      </svg>
    ),
    bridge: (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M2 16C2 16 6 12 12 12C18 12 22 16 22 16" stroke="currentColor" strokeWidth="2" opacity="0.4"/>
        <rect x="4" y="16" width="2" height="6" fill="currentColor"/>
        <rect x="18" y="16" width="2" height="6" fill="currentColor"/>
      </svg>
    ),
    castle: (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <rect x="6" y="10" width="12" height="12" fill="currentColor" opacity="0.4"/>
        <path d="M4 8H8V10H4V8Z M16 8H20V10H16V8Z" fill="currentColor"/>
        <rect x="10" y="14" width="4" height="8" fill="currentColor" opacity="0.5"/>
      </svg>
    ),
  }
  return icons[type as keyof typeof icons] || icons.tower
}
