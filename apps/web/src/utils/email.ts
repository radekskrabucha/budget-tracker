export const getNameFromEmail = (email: string) => {
  const [name] = email.split('@')

  return name
}
