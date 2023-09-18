import '@testing-library/jest-dom/extend-expect';
import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';
import customRender from "@utils/test-utils";
import { ChangeHistory } from '@components/common/ProductHierarchy/ChangeHistory';

describe("ChangeHistory Components", () => {

    it("should render ChangeHistory components", () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                ProductHierarchy: { changeHistoryVisible: true, organizationId: 106 },
            },
        });

        customRender(
            <Provider store={mockStore}>
                <ChangeHistory />
            </Provider>
        );
    });

});