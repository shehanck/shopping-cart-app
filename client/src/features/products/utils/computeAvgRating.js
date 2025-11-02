// Returns average rating from an array like [{ value: number }, ...]
// Falls back to 0 when not available or invalid
export const computeAvgRating = (ratings) => {
  if (!Array.isArray(ratings) || ratings.length === 0) return 0;
  const sum = ratings.reduce((acc, r) => acc + Number(r?.value || 0), 0);
  const avg = sum / ratings.length;
  // clamp to [0, 5] if you use 5-star scale
  return Math.max(0, Math.min(5, Number.isFinite(avg) ? avg : 0));
};