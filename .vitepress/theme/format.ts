const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

/** Format `YYYY-MM-DD` like Jekyll's `date_to_string` → `03 Aug 2019`. */
export function dateToString(date: string): string {
  const [y, m, d] = date.split('-')
  return `${d} ${MONTHS[Number(m) - 1]} ${y}`
}

const MONTHS_LONG = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

/** Format `YYYY-MM-DD` like Jekyll's `date: "%B %-d, %Y"` → `August 3, 2019`. */
export function dateToLong(date: string): string {
  const [y, m, d] = date.split('-')
  return `${MONTHS_LONG[Number(m) - 1]} ${Number(d)}, ${y}`
}
