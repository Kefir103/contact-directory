import * as Types from './actionTypes';

export function setFilterText(filterText) {
    return {
        type: Types.FILTER.SET_FILTER_TEXT,
        payload: filterText,
    };
}

export function setCurrentPage(page) {
    return {
        type: Types.FILTER.SET_CURRENT_PAGE,
        payload: page,
    };
}

export function setSortingMap(entries) {
    return {
        type: Types.FILTER.SET_SORTING_MAP,
        payload: entries,
    };
}
