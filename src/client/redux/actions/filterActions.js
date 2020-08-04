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

export function setSortingDirections(directions) {
    return {
        type: Types.FILTER.SET_SORTING_DIRECTIONS,
        payload: directions,
    };
}

export function setSortingFields(fields) {
    return {
        type: Types.FILTER.SET_SORTING_FIELDS,
        payload: fields,
    };
}

export function addSortingField(field) {
    return {
        type: Types.FILTER.ADD_SORTING_FIELD,
        payload: {
            field: field,
            direction: 'asc',
        },
    };
}
