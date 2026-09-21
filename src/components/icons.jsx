const paths = {
  sale: 'M4 5h16v14H4z M4 9h16 M8 14h3',
  stock: 'm4 7 8-4 8 4-8 4z M4 7v10l8 4 8-4V7 M12 11v10',
  cart: 'M3 4h2l2 11h10l3-8H6 M9 20h.01 M17 20h.01',
  users: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8 M22 21v-2a4 4 0 0 0-3-3.87',
  supplier: 'M3 21h18 M5 21V7l7-4v18 M19 21V11l-7-4 M8 9h1 M8 13h1 M8 17h1 M15 13h1 M15 17h1',
  credit: 'M3 7h18v12H3z M3 11h18 M7 15h4',
  truck: 'M3 6h11v11H3z M14 10h4l3 3v4h-7z M7 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4 M18 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4',
  report: 'M4 20V10 M10 20V4 M16 20v-7 M22 20V7',
  search: 'm21 21-4.35-4.35 M11 18a7 7 0 1 1 0-14 7 7 0 0 1 0 14',
  cloud: 'M17.5 19H7a5 5 0 1 1 1.4-9.8A6 6 0 0 1 20 11a4 4 0 0 1-2.5 8',
  local: 'M4 4h16v12H4z M8 20h8 M12 16v4',
  check: 'm5 12 4 4L19 6',
}

export function Icon({ name, size = 22, className = '' }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={paths[name] || paths.check} />
    </svg>
  )
}
