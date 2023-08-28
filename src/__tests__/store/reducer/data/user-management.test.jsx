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

        expect(newState.isLoaded).toEqual(undefined);
    });
});
