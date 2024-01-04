export function sanitizeForApi(data) {
  // Ensure data is a string
  if (typeof data !== 'string') {
    throw new Error('Input must be a string')
  }

  // Replace potentially dangerous characters with safe equivalents
  const sanitizedData = data
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

  return sanitizedData
}
