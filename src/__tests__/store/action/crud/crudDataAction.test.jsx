import { renderHook } from '@testing-library/react-hooks';
import { useDispatch } from 'react-redux';
import { dataActions } from '@store/actions/crud/dataAction';

// Mock external dependencies and useDispatch
jest.mock('utils/axiosAPICall', () => ({
    axiosAPICall: jest.fn(),
}));

jest.mock('antd', () => ({
    message: {
        error: jest.fn(),
    },
}));

jest.mock('utils/withAuthToken', () => ({
    withAuthToken: (fn) => fn,
}));

jest.mock('@store/actions/auth/index', () => ({
    doLogout: jest.fn(),
    unAuthenticateUser: jest.fn(),
}));

jest.mock('react-redux', () => ({
    useDispatch: jest.fn(),
}));

describe('dataActions', () => {
    let dispatchMock;

    beforeEach(() => {
        dispatchMock = jest.fn();
        useDispatch.mockReturnValue(dispatchMock);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should dispatch RECEIVE_DATA_LOADING_ACTION_CONSTANT with true', () => {
        // Replace 'RECEIVE_DATA_LOADING_ACTION_CONSTANT' with the actual value of your constant
        const actionConstants = {
            RECEIVE_DATA_LOADING_ACTION_CONSTANT: 'YOUR_RECEIVE_DATA_LOADING_ACTION_CONSTANT',
        };

        const { result } = renderHook(() => dataActions(actionConstants));
        const { listShowLoading } = result.current;

        listShowLoading(true);

        expect(dispatchMock).toHaveBeenCalledWith({
            type: actionConstants.RECEIVE_DATA_LOADING_ACTION_CONSTANT,
            isLoading: true,
        });
    });
});
