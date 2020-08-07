import { orderBy } from 'lodash';

export const getFilteredElements = (elements, filterText, filterFields) => {
    let filteredElements = [...elements];
    filterFields.forEach(
        (field) =>
            (filteredElements = filteredElements.filter((element) =>
                element[field].toString().toLowerCase().includes(filterText.toLowerCase())
            ))
    );
    return filteredElements;
};

export const getSortedElements = (elements, sortingMap) => {
    return orderBy(elements, Array.from(sortingMap.keys()), Array.from(sortingMap.values()));
};

export const getElementsByPage = (elements, page) => {
    const elementsLengthByPage = page * 50;
    const startElementsLengthByPage = (page - 1) * 50;
    const currentElementsArray = [];
    for (let i = startElementsLengthByPage; i < elementsLengthByPage && i < elements.length; ++i) {
        currentElementsArray.push(elements[i]);
    }
    return currentElementsArray;
};

export const getPagesCount = (elements) => {
    return Math.ceil(elements.length / 50);
};

export const getAppElements = (fullData, filter, sortingMap) => {
    let currentElements = [...fullData];
    if (filter) {
        currentElements = getFilteredElements(
            currentElements,
            filter.filterText,
            filter.filterFields
        );
    }
    if (sortingMap.size) {
        currentElements = getSortedElements(currentElements, sortingMap);
    }
    return currentElements;
};
