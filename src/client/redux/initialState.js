export const initialState = {
    filter: {
        sortingMap: new Map([]),
        filterText: '',
        currentPage: 1,
    },
    data: {
        currentElement: undefined,
        elements: [],
        filteredElements: undefined,
    },
    appStatus: {
        isLoading: true,
        error: undefined,
    },
};
