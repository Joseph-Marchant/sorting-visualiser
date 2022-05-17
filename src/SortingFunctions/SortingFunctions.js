export const mergeSort = array => {
    const animations = [];
    if (array.length <= 1) return array;
    const arrayCopy = array.slice();
    mergeSortHelper(array, arrayCopy, 0, array.length - 1, animations);
    return animations;
}

function mergeSortHelper(mainArray, copyArray, startIdx, endIdx, animations) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(copyArray, mainArray, startIdx, middleIdx, animations);
    mergeSortHelper(copyArray, mainArray, middleIdx + 1, endIdx, animations);
    merge(mainArray, copyArray, startIdx, middleIdx, endIdx, animations);
}

function merge(mainArray, copyArray, startIdx, middleIdx, endIdx, animations) {
    let i = startIdx, j = middleIdx + 1, k = startIdx;
    while (i <= middleIdx && j <= endIdx) {
        animations.push([i, j], [i, j]);
        if (copyArray[i] <= copyArray[j]) {
            animations.push([k, copyArray[i]]);
            mainArray[k++] = copyArray[i++];
        } else {
            animations.push([k, copyArray[j]]);
            mainArray[k++] = copyArray[j++];
        }
    }
    while (i <= middleIdx) {
        animations.push([i, i], [i, i], [k, copyArray[i]]);
        mainArray[k++] = copyArray[i++];
    }
    while (j <= endIdx) {
        animations.push([j, j], [j, j], [k, copyArray[j]]);
        mainArray[k++] = copyArray[j++];
    }
}

export const quickSort = array => {
    const animations= [];
    quickSortRecursion(array, 0, array.length - 1, animations)
    return animations;
}

function quickSortRecursion(array, startIdx, endIdx, animations) {
    if (startIdx >= endIdx) return;
    let pIdx = startIdx, lIdx = startIdx + 1, rIdx = endIdx;
    while (lIdx <= rIdx) {
        animations.push([true, true, lIdx, pIdx, rIdx]);
        if (array[lIdx] > array[pIdx] && array[rIdx] < array[pIdx]) {
            animations.push([false, false, lIdx, rIdx]);
            swap(array, lIdx, rIdx);
        }
        animations.push([true, false, lIdx, pIdx, rIdx]);
        if (array[lIdx] <= array[pIdx]) lIdx++;
        if (array[rIdx] >= array[pIdx]) rIdx--;
    }
    animations.push([false, false, rIdx, pIdx]);
    swap(array, rIdx, pIdx);
    if (rIdx - 1 - startIdx < endIdx - (rIdx + 1)) {
        quickSortRecursion(array, startIdx, rIdx - 1, animations);
        quickSortRecursion(array, rIdx + 1, endIdx, animations);
    } else {
        quickSortRecursion(array, rIdx + 1, endIdx, animations);
        quickSortRecursion(array, startIdx, rIdx - 1, animations);
    }
}

export const selectionSort = array => {
    const animations = [];
    let idx = 0, minIdx = 0;
    while (idx < array.length) {
        minIdx = idx;
        for (let i = idx + 1; i < array.length; i++) {
            animations.push([minIdx, i, true, true], [minIdx, i, true, false]);
            if (array[minIdx] > array[i]) {
                minIdx = i;
            }
        }
        animations.push([minIdx, idx, false, false]);
        swap(array, minIdx, idx);
        idx ++;
    }
    return animations;
}

export const bubbleSort = array => {
    const animations = [];
    let sorted = false;
        let count = 0;
        while (!sorted) {
            sorted = true;
            for (let idx = 0; idx < array.length - 1 - count; idx++) {
                animations.push([idx, idx+1, true, true]);
                if (array[idx] > array[idx + 1]) {
                    animations.push([idx, idx+1, false, false]);
                    swap(array, idx, idx + 1);
                    sorted = false;
                }
                animations.push([idx, idx+1, true, false]);
            }
            animations.push([array.length - 1 - count]);
            count++;
        }
        if (count !== array.length) {
            for (let i = array.length - count; i >= 0; i--) {
                animations.push([i]);
            }
        }
    return animations;
}

export const insertionSort = array => {
    const animations = [];
    for (let i = 1; i < array.length; i++) {
        let j = i;
        while (j > 0 && array[j] < array[j - 1]) {
            animations.push([j, j-1, true, true], [j, j-1, false, false], [j, j-1, true, false]);
            swap(array, j - 1, j);
            j -= 1;
        }
    }
    return animations;
}

function swap(array, i, j) {
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}