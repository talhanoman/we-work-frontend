export function pushUniqueObject(arr, obj) {
    // Check if the object already exists in the array
    const exists = arr.some(item => item.pathname === obj.pathname);

    // If the object doesn't exist, push it to the array
    if (!exists) {
        arr.push(obj);
    }
    return arr;
}

export const removeItemsAfterPathname = (array, pathnameToCheck) => {
    const index = array.findIndex(item => item.pathname === pathnameToCheck);
    if (index !== -1) {
      return array.slice(0, index + 1);
    }
    return array;
};

export function getPreviousIndexItem(array, currentIndex) {
    if (currentIndex <= 0) {
      return null;
    }
    let previousIndex = currentIndex - 1;
    return array[previousIndex].item 
}

