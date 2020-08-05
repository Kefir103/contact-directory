export const initialState = {
    filter: {
        sortingMap: new Map([]),
        filterText: '',
        filterFields: [],
        currentPage: 1,
    },
    data: {
        currentElement: undefined,
        elements: [],
        filteredElements: undefined,
    },
    appStatus: {
        isLoading: undefined,
        error: undefined,
    },
};
