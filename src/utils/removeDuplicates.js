const removeDuplicates = (arr) => {
  const reducedArray = arr.filter((current, index, self) => {
    return index === self.findIndex((element) => element.id === current.id);
  });
  // console.log(`Reduced to ${reducedArray.length} items`);
  return reducedArray;
};

export default removeDuplicates;
