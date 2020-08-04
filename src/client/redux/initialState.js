export const initialState = {
    filter: {
        sortingMap: new Map([
            ['id', 'asc'],
            ['firstName', 'asc'],
            ['lastName', 'asc'],
            ['email', 'asc'],
            ['phone', 'asc'],
        ]),
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
