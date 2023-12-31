// for searching if item with such name exist in the array list
export const testIfItExists = (arrayOfExisting, nameOf, tested) => {
  for (let i = 0; i < arrayOfExisting.length; i++) {
    if (arrayOfExisting[i][nameOf] == tested) {
      return 'Such name of item is already in the list'
    }
  }

  return 'Required input'
}

// if such item exist in the array list, the item will be deleted
export const ifExistDeleteFromArrayOfObjects = (arrayOfExisting, nameOfTestedValue, testedOnExistence) => {
  const newArray = []
  let newIndex = 0

  for (let i = 0; i < arrayOfExisting.length; i++) {
    if (arrayOfExisting[i][nameOfTestedValue] != testedOnExistence) {
      newArray[newIndex] = arrayOfExisting[i]
      newIndex = newIndex + 1
    }
  }

  newIndex = 0
  return newArray
}
