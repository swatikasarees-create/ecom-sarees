export default function SvgIcons() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}>
      <defs>
        <symbol xmlns="http://www.w3.org/2000/svg" id="gift" viewBox="0 0 24 24">
          <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
            <rect width="18" height="14" x="3" y="8" rx="2" />
            <path d="M12 5a3 3 0 1 0-3 3m6 0a3 3 0 1 0-3-3m0 0v17m9-7H3" />
          </g>
        </symbol>
        <symbol xmlns="http://www.w3.org/2000/svg" id="arrow-cycle" viewBox="0 0 24 24">
          <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
            <path
              d="M22 12c0 6-4.39 10-9.806 10C7.792 22 4.24 19.665 3 16m-1-4C2 6 6.39 2 11.806 2C16.209 2 19.76 4.335 21 8" />
            <path d="m7 17l-4-1l-1 4M17 7l4 1l1-4" />
          </g>
        </symbol>
        <symbol xmlns="http://www.w3.org/2000/svg" id="arrow-left" viewBox="0 0 24 24">
          <path fill="currentColor"
            d="M17 11H9.41l3.3-3.29a1 1 0 1 0-1.42-1.42l-5 5a1 1 0 0 0-.21.33a1 1 0 0 0 0 .76a1 1 0 0 0 .21.33l5 5a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42L9.41 13H17a1 1 0 0 0 0-2Z" />
        </symbol>
        <symbol xmlns="http://www.w3.org/2000/svg" id="arrow-right" viewBox="0 0 24 24">
          <path fill="currentColor"
            d="M17.92 11.62a1 1 0 0 0-.21-.33l-5-5a1 1 0 0 0-1.42 1.42l3.3 3.29H7a1 1 0 0 0 0 2h7.59l-3.3 3.29a1 1 0 0 0 0 1.42a1 1 0 0 0 1.42 0l5-5a1 1 0 0 0 .21-.33a1 1 0 0 0 0-.76Z" />
        </symbol>
      </defs>
    </svg>
  );
}
