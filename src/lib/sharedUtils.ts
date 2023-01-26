

/**  Format financial sums into short variant: 1400 -> 1.4k */
export const shortSumFormatter = Intl.NumberFormat('en', {
  notation: 'compact',
  compactDisplay: 'short',
});
