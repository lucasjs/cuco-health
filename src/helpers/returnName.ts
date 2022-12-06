const returnName = (name: string) => {
  const fullName = name.split(' ')
  const firstName = fullName?.[0]
  const lastName = fullName?.slice(-1)
  return `${firstName} ${lastName}`
}

export default returnName
