function omit<T>(obj: T, prop: keyof T | (keyof T)[]) {
  if (Array.isArray(prop)) {
    const entries = Object.entries(obj).filter(item => {
      const [key] = item
      return !prop.includes(key as keyof T)
    })
    return Object.fromEntries(entries)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { [prop]: unused, ...rest } = obj
  return rest
}

export default omit
