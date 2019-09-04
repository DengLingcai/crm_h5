export function convert (val, deno, fractionDigits) {
  return (val / deno).toFixed(fractionDigits)
}
