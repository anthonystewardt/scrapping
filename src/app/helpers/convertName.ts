export const separateName = (name: string) => {
  const nameArray = name.split(" ");
  if (nameArray.length === 1) {
    return nameArray[0];
  } else {
    // const namePositionUrl = namePosition.split(" ").join("+");
    return nameArray.join("+");
  }
};
