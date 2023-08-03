import { ManufacturerAdminHierarchy } from '@store/reducers/data/ManufacturerAdmin/manufacturerAdminHierarchy';

describe('ManufacturerAdminHierarchy reducer', () => {
    const initialState = {
        isLoaded: false,
        data: [],
        isLoading: false,
        isDetailLoaded: false,
        detailData: [],
        isDetailLoading: false,
        isHistoryLoaded: false,
        historyData: [],
        isHistoryLoading: false,
        changeHistoryVisible: false,
        changeHistoryAuthorityVisible: false,
        uploadVisible: false,
        authorityVisible: true,
        recordId: '',
    };

    it('should handle MANUFACTURER_ADMIN_HIERARCHY_DATA_LOADED action', () => {
        const action = {
            type: 'MANUFACTURER_ADMIN_HIERARCHY_DATA_LOADED',
            isLoaded: true,
            data: [
                { id: 1, name: 'Manufacturer1' },
                { id: 2, name: 'Manufacturer2' },
            ],
        };

        const newState = ManufacturerAdminHierarchy(initialState, action);

        expect(newState.isLoaded).toEqual(false);
        expect(newState.data).toEqual([]);
    });

    it('should handle MANUFACTURER_ADMIN_HIERARCHY_DATA_SHOW_LOADING action', () => {
        const action = {
            type: 'MANUFACTURER_ADMIN_HIERARCHY_DATA_SHOW_LOADING',
            isLoading: true,
        };

        const newState = ManufacturerAdminHierarchy(initialState, action);

        expect(newState.isLoading).toEqual(false);
    });

    it('should handle MANUFACTURER_ADMIN_HIERARCHY_DETAIL_DATA_LOADED action', () => {
        const action = {
            type: 'MANUFACTURER_ADMIN_HIERARCHY_DETAIL_DATA_LOADED',
            isDetailLoaded: true,
            data: [
                { id: 1, name: 'Detail1' },
                { id: 2, name: 'Detail2' },
            ],
        };

        const newState = ManufacturerAdminHierarchy(initialState, action);

        expect(newState.isDetailLoaded).toEqual(false);
        expect(newState.detailData).toEqual([]);
    });

    it('should handle MANUFACTURER_ADMIN_HIERARCHY_DETAIL_DATA_SHOW_LOADING action', () => {
        const action = {
            type: 'MANUFACTURER_ADMIN_HIERARCHY_DETAIL_DATA_SHOW_LOADING',
            isLoading: true,
        };

        const newState = ManufacturerAdminHierarchy(initialState, action);

        expect(newState.isDetailLoading).toEqual(false);
    });


    it('should return the current state for an unknown action', () => {
        const currentState = {
            isLoaded: true,
            data: [
                { id: 1, name: 'Manufacturer1' },
                { id: 2, name: 'Manufacturer2' },
            ],
            isLoading: false,
            isDetailLoaded: false,
            detailData: [],
            isDetailLoading: false,
            isHistoryLoaded: false,
            historyData: [],
            isHistoryLoading: false,
            changeHistoryVisible: false,
            changeHistoryAuthorityVisible: false,
            uploadVisible: false,
            authorityVisible: true,
            recordId: '',
        };

        const action = {
            type: 'UNKNOWN_ACTION',
        };

        const newState = ManufacturerAdminHierarchy(currentState, action);

        expect(newState).toEqual(currentState);
    });
});
