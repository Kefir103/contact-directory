export const initialState = {
    filter: {
        mapSort: new Map([]),
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
