import { UserManagement } from '@store/reducers/data/userManagement';

describe('UserManagement reducer', () => {
    const initialState = {
        isLoaded: false,
        data: [],
        isFormDataLoaded: false,
        formData: undefined,
        isFormVisible: false,
        isLoading: false,
    };

    it('should handle USER_MANAGEMENT_DEALER_DATA_LOADED action', () => {
        const action = {
            type: 'USER_MANAGEMENT_DEALER_DATA_LOADED',
            isLoaded: true,
            data: [
                { id: 1, name: 'User1' },
                { id: 2, name: 'User2' },
            ],
        };

        const newState = UserManagement(initialState, action);

        expect(newState.isLoaded).toEqual(true);
        expect(newState.data).toEqual([
            { id: 1, name: 'User1' },
            { id: 2, name: 'User2' },
        ]);
    });

    it('should handle USER_MANAGEMENT_DEALER_SET_FORM_DATA action', () => {
        const action = {
            type: 'USER_MANAGEMENT_DEALER_SET_FORM_DATA',
            isFormDataLoaded: true,
            formData: { id: 1, name: 'User1' },
        };

        const newState = UserManagement(initialState, action);

        expect(newState.isFormDataLoaded).toEqual(true);
        expect(newState.formData).toEqual({ id: 1, name: 'User1' });
    });

    it('should handle USER_MANAGEMENT_DEALER_SET_FORM_IS_VISIBLE action', () => {
        const action = {
            type: 'USER_MANAGEMENT_DEALER_SET_FORM_IS_VISIBLE',
        };

        const newState = UserManagement(initialState, action);

        expect(newState.isFormVisible).toEqual(true);
    });

    it('should handle USER_MANAGEMENT_DEALER_DATA_SHOW_LOADING action', () => {
        const action = {
            type: 'USER_MANAGEMENT_DEALER_DATA_SHOW_LOADING',
            isLoading: true,
        };

        const newState = UserManagement(initialState, action);

        expect(newState.isLoading).toEqual(true);
    });

    it('should handle USER_MANAGEMENT_MANUFACTURER_DATA_LOADED action', () => {
        const action = {
            type: 'USER_MANAGEMENT_MANUFACTURER_DATA_LOADED',
            isLoaded: true,
            data: [
                { id: 1, name: 'Manufacturer1' },
                { id: 2, name: 'Manufacturer2' },
            ],
        };

        const newState = UserManagement(initialState, action);

        expect(newState.isLoaded).toEqual(true);
        expect(newState.ManufacturerData).toEqual([
            { id: 1, name: 'Manufacturer1' },
            { id: 2, name: 'Manufacturer2' },
        ]);
    });

    it('should return the current state for an unknown action', () => {
        const currentState = {
            isLoaded: true,
            data: [{ id: 1, name: 'User1' }],
            isFormDataLoaded: false,
            formData: undefined,
            isFormVisible: false,
            isLoading: false,
        };

        const action = {
            type: 'UNKNOWN_ACTION',
        };

        const newState = UserManagement(currentState, action);

        expect(newState).toEqual(currentState);
    });
});
