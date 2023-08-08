import '@testing-library/jest-dom/extend-expect';
import customRender from "@utils/test-utils";
import { ChangeHistory } from '@components/common/ProductHierarchy/ChangeHistory';
import { render, fireEvent, screen } from "@testing-library/react";
import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';

const props = {
    fetchChangeHistoryList: jest.fn(),
    changeHistoryShowLoading: true,
    isLoadinge: true,
    userId: 'testid',
    isHistoryLoading: true,
    organizationId: "testdmaid",
    isHistoryLoaded: true
};

const changeHistoryData = [
    { title: 'testId', value: 'testValue' },
    { title: 'testId1', value: 'testValue1' },
    { title: 'testId2', value: 'testValue2' }];

const tableProps = {
    isLoading: true,
    tableColumn: jest.fn(),
    tableData: changeHistoryData,
};

beforeEach(() => {
    jest.clearAllMocks();
});


describe("ChangeHistory Components", () => {
    it("should render ChangeHistory components", () => {

        const mockStore = createMockStore({
            auth: { userId: 123 },
            data: {
                ProductHierarchy: {
                    isHistoryLoading: false,
                    isHistoryLoaded: false,
                    historyData: [],
                    changeHistoryData: changeHistoryData,
                    changeHistoryVisible: true,
                    isVisible: true,
                    organizationId: 'testid'
                }
            },
        });


        const { getByRole } = customRender(
            <Provider store={mockStore}>
                <ChangeHistory
                    isVisible={true}
                    fetchChangeHistoryList={jest.fn()}
                    changeHistoryData={changeHistoryData}
                    {...props}
                    tableProps={tableProps}
                />
            </Provider>
        );

        const srl = getByRole('columnheader', { name: 'Srl.', exact: false });
        fireEvent.click(srl);

        const changed = getByRole('columnheader', { name: 'Changed/Modified Date', exact: false });
        fireEvent.click(changed);

        const changedBy = getByRole('columnheader', { name: 'Changed By', exact: false });
        fireEvent.click(changedBy);

        const attribute = getByRole('columnheader', { name: 'Attribute', exact: false });
        fireEvent.click(attribute);

        const code = getByRole('columnheader', { name: 'Code', exact: false });
        fireEvent.click(code);

        const parent = getByRole('columnheader', { name: 'Parent', exact: false });
        fireEvent.click(parent);

        const stortD = getByRole('columnheader', { name: 'Short Description', exact: false });
        fireEvent.click(stortD);

        const longD = getByRole('columnheader', { name: 'Long Description', exact: false });
        fireEvent.click(longD);

        const status = getByRole('columnheader', { name: 'Status', exact: false });
        fireEvent.click(status);
    });
});