export const initialState = {
    filter: {
        sort: {
            fields: [],
            directions: [],
        },
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
