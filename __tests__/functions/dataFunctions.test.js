import {
    getPagesCount,
    getElementsByPage,
    getFilteredElements,
    getSortedElements,
} from '../../src/client/functions/dataFunctions';
import { data } from '../../__mocks__/data';

describe('dataFunctions', () => {
    test('getPagesCount should return correct pagesCount', () => {
        const testArray = [];
        for (let i = 0; i < 234; i++) {
            testArray.push(0);
        }
        const expectedPageCount = 5;
        expect(getPagesCount(testArray)).toEqual(expectedPageCount);
    });
    test('getElementsByPage should return correct array with 50 elements', () => {
        const testArray = [];
        for (let i = 0; i < 234; i++) {
            testArray.push(i);
        }
        const expectedArray = [];
        for (let i = 100; i < 150; i++) {
            expectedArray.push(i);
        }
        const page = 3;
        expect(getElementsByPage(testArray, page)).toEqual(expectedArray);
    });
    test('getElementsByPage should return correct array on last page (34 elements)', () => {
        const testArray = [];
        for (let i = 0; i < 234; i++) {
            testArray.push(i);
        }
        const expectedArray = [];
        for (let i = 200; i < 234; i++) {
            expectedArray.push(i);
        }
        const page = 5;
        expect(getElementsByPage(testArray, page)).toEqual(expectedArray);
    });
    test('getFilteredElements should return correct filtered array', () => {
        const initialData = [...data];
        const expectedArray = [
            {
                id: 115,
                firstName: 'Racquel',
                lastName: 'Herbert',
                email: 'EMarton@placerat.com',
                phone: '(884)101-9065',
            },
        ];
        expect(getFilteredElements(data, '1', ['id', 'phone'])).toEqual(expectedArray);
    });
    test('getSortedElements should return correct sorted array', () => {
        const sortingMap = new Map([
            ['firstName', 'asc'],
            ['id', 'desc'],
        ]);
        const expectedArray = [
            {
                id: 683,
                firstName: 'Chad',
                lastName: 'Robichaud',
                email: 'SDupuy@lacus.ly',
                phone: '(253)555-8927',
            },
            {
                id: 546,
                firstName: 'Puranjay',
                lastName: 'Briley',
                email: 'SCulin@pulvinar.gov',
                phone: '(176)281-2019',
            },
            {
                id: 115,
                firstName: 'Racquel',
                lastName: 'Herbert',
                email: 'EMarton@placerat.com',
                phone: '(884)101-9065',
            },
        ];
        expect(getSortedElements(data, sortingMap)).toEqual(expectedArray);
    });
});
