export const testIfItExists = (arrayOfExisting, nameOf, tested) => {
  for (let i = 0; i < arrayOfExisting.length; i++) {
    if (arrayOfExisting[i][nameOf] == tested) {
      return 'Such name of item is already in the list'
    }
  }
  return 'Required input'
}
