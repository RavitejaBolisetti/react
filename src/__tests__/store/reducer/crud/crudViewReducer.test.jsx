import { renderHook } from '@testing-library/react-hooks';
import { crudViewReducer, initialState } from '@store/reducers/crud/crudView';

describe('crudViewReducer', () => {
    it('should handle SHOW_MODAL action', () => {
        const viewActionConstants = {
            SHOW_MODAL: 'VIEW_SHOW_MODAL',
            HIDE_MODAL: 'VIEW_HIDE_MODAL',
        };

        const { result } = renderHook(() => crudViewReducer(viewActionConstants));

        // Simulate the SHOW_MODAL action
        const showModalAction = {
            type: viewActionConstants.SHOW_MODAL,
            id: 123, // Replace with your desired ID value
        };
        const updatedState = result.current(initialState, showModalAction);

        // Assert the expected state changes
        expect(updatedState.isVisible).toBe(true);
        expect(updatedState.id).toBe(123);
    });

    it('should handle HIDE_MODAL action', () => {
        const viewActionConstants = {
            SHOW_MODAL: 'VIEW_SHOW_MODAL',
            HIDE_MODAL: 'VIEW_HIDE_MODAL',
        };

        const { result } = renderHook(() => crudViewReducer(viewActionConstants));

        // Set the initial state to have isVisible as true and id as some value
        const initialVisibleState = { ...initialState, isVisible: true, id: 123 };

        // Simulate the HIDE_MODAL action
        const hideModalAction = {
            type: viewActionConstants.HIDE_MODAL,
        };
        const updatedState = result.current(initialVisibleState, hideModalAction);

        // Assert the expected state changes
        expect(updatedState.isVisible).toBe(false);
        // The id should not be changed when hiding the modal
        expect(updatedState.id).toBe(123);
    });
});
