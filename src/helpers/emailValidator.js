export function emailValidator(email) {
  const re = /\S+@\S+\.\S+/
  if (!email) return "Mã NĐT không được trống."
  // if (!re.test(email)) return 'Ooops! We need a valid email address.'
  return ''
}
