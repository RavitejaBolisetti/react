import '@testing-library/jest-dom/extend-expect';
import { ChangeHistory } from '@components/common/ChangeHistory';
import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';
import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Change history components', () => {
    it('should render change history components', () => {
        const mockStore=createMockStore({
            auth: { userId: 106 },
            data: {
                ProductHierarchy: { changeHistoryVisible: true, historyData: [{changedDate: '01/01/2001'}] },
            },
        })
        customRender(
        <Provider store={mockStore}>
            <ChangeHistory />
        </Provider>
        );
    });
});