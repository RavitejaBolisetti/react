import { ManufacturerOrgHierarchy } from '@store/reducers/data/manufacturerOrgHierarchy';

describe('ManufacturerOrgHierarchy reducer', () => {
    const initialState = {
        isLoaded: false,
        data: [],
        isFormDataLoaded: false,
        formData: undefined,
        isFormVisible: false,
        isLoading: false,
        changeHistoryVisible: false,
    };

    it('should handle MANUFACTURER_ORG_HIERARCHY_DATA_LOADED action', () => {
        const action = {
            type: 'MANUFACTURER_ORG_HIERARCHY_DATA_LOADED',
            isLoaded: true,
            data: [
                { id: 1, name: 'Manufacturer1' },
                { id: 2, name: 'Manufacturer2' },
            ],
        };

        const newState = ManufacturerOrgHierarchy(initialState, action);

        expect(newState.isLoaded).toEqual(true);
        expect(newState.data).toEqual([
            { id: 1, name: 'Manufacturer1' },
            { id: 2, name: 'Manufacturer2' },
        ]);
    });

    it('should return the current state for an unknown action', () => {
        const currentState = {
            isLoaded: true,
            data: [
                { id: 1, name: 'Manufacturer1' },
                { id: 2, name: 'Manufacturer2' },
            ],
            isFormDataLoaded: false,
            formData: undefined,
            isFormVisible: false,
            isLoading: false,
            changeHistoryVisible: false,
        };

        const action = {
            type: 'UNKNOWN_ACTION',
        };

        const newState = ManufacturerOrgHierarchy(currentState, action);

        expect(newState).toEqual(currentState);
    });

    it('should handle MANUFACTURER_ORG_HIERARCHY_DATA_LOADED action', () => {
        const action = {
            type: 'MANUFACTURER_ORG_HIERARCHY_DATA_LOADED',
            isLoaded: true,
            data: [
                { id: 1, name: 'Manufacturer1' },
                { id: 2, name: 'Manufacturer2' },
            ],
        };

        const newState = ManufacturerOrgHierarchy(initialState, action);

        expect(newState.isLoaded).toEqual(true);
        expect(newState.data).toEqual([
            { id: 1, name: 'Manufacturer1' },
            { id: 2, name: 'Manufacturer2' },
        ]);
    });

    it('should handle MANUFACTURER_ORG_HIERARCHY_SET_FORM_DATA action', () => {
        const action = {
            type: 'MANUFACTURER_ORG_HIERARCHY_SET_FORM_DATA',
            isFormDataLoaded: true,
            formData: { id: 1, name: 'Manufacturer1', location: 'Location1' },
        };

        const newState = ManufacturerOrgHierarchy(initialState, action);

        expect(newState.isFormDataLoaded).toEqual(true);
        expect(newState.formData).toEqual({ id: 1, name: 'Manufacturer1', location: 'Location1' });
    });

    it('should handle MANUFACTURER_ORG_HIERARCHY_SET_FORM_IS_VISIBLE action', () => {
        const action = {
            type: 'MANUFACTURER_ORG_HIERARCHY_SET_FORM_IS_VISIBLE',
        };

        const newState = ManufacturerOrgHierarchy(initialState, action);

        expect(newState.isFormVisible).toEqual(true);
    });

    it('should handle MANUFACTURER_ORG_HIERARCHY_DATA_SHOW_LOADING action', () => {
        const action = {
            type: 'MANUFACTURER_ORG_HIERARCHY_DATA_SHOW_LOADING',
            isLoading: true,
        };

        const newState = ManufacturerOrgHierarchy(initialState, action);

        expect(newState.isLoading).toEqual(true);
    });

    it('should handle MANUFACTURER_ORG_HIERARCHY_CHANGE_HISTORY_SHOW_LOADING action', () => {
        const action = {
            type: 'MANUFACTURER_ORG_HIERARCHY_CHANGE_HISTORY_SHOW_LOADING',
            isLoading: true,
        };

        const newState = ManufacturerOrgHierarchy(initialState, action);

        expect(newState.isHistoryLoading).toEqual(true);
    });

    it('should handle MANUFACTURER_ORG_HIERARCHY_CHANGE_HISTORY_VISIBLE action', () => {
        const action = {
            type: 'MANUFACTURER_ORG_HIERARCHY_CHANGE_HISTORY_VISIBLE',
            visible: true,
        };

        const newState = ManufacturerOrgHierarchy(initialState, action);

        expect(newState.changeHistoryVisible).toEqual(true);
    });

    it('should return the current state for an unknown action', () => {
        const currentState = {
            isLoaded: true,
            data: [
                { id: 1, name: 'Manufacturer1' },
                { id: 2, name: 'Manufacturer2' },
            ],
            isFormDataLoaded: false,
            formData: undefined,
            isFormVisible: false,
            isLoading: false,
            changeHistoryVisible: false,
        };

        const action = {
            type: 'UNKNOWN_ACTION',
        };

        const newState = ManufacturerOrgHierarchy(currentState, action);

        expect(newState).toEqual(currentState);
    });
});
