export const initialState = {
    filter: {
        sort: 'ASC',
        searchText: '',
        currentPage: 1,
    },
    data: {
        currentElement: undefined,
        elements: [],
    },
    appStatus: {
        isLoading: true,
    },
};
