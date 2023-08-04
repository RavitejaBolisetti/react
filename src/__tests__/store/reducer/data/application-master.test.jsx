import { ApplicationMaster } from '@store/reducers/data/applicationMaster';

describe('ApplicationMaster reducer', () => {
    const initialState = {
        isLoaded: false,
        isLoading: false,
        applicationDetailsData: [],
        isApplicationDeatilsLoading: false,
        applicationCriticalityGroupData: [],
        isApplicatinoOnSaveLoading: false,
        isLocationsLoading: false,
        isActionsLoading: false,
        isConfigParamsLoading: false,
    };

    it('should handle APPLICATION_MASTER_APPLICATION_DETAILS_DATA_LOADED action', () => {
        const action = {
            type: 'APPLICATION_MASTER_APPLICATION_DETAILS_DATA_LOADED',
            isLoaded: true,
            data: [
                { id: 1, name: 'Application1' },
                { id: 2, name: 'Application2' },
            ],
        };

        const newState = ApplicationMaster(initialState, action);

        expect(newState.isApplicationDeatilsLoading).toEqual(true);
        expect(newState.applicationDetailsData).toEqual([
            { id: 1, name: 'Application1' },
            { id: 2, name: 'Application2' },
        ]);
    });

    it('should return the current state for an unknown action', () => {
        const currentState = {
            isLoaded: true,
            isLoading: false,
            applicationDetailsData: [],
            isApplicationDeatilsLoading: false,
            applicationCriticalityGroupData: [],
            isApplicatinoOnSaveLoading: false,
            isLocationsLoading: false,
            isActionsLoading: false,
            isConfigParamsLoading: false,
        };

        const action = {
            type: 'UNKNOWN_ACTION',
        };

        const newState = ApplicationMaster(currentState, action);

        expect(newState).toEqual(currentState);
    });
});
