import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { AddEditForm } from '@components/Sales/OtfBlockMaster/AddEditForm';
import { fireEvent, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import createMockStore from '__mocks__/store';

afterEach(() => {
    jest.restoreAllMocks();
});
const mockStore = createMockStore({
    auth: { userId: 1232 },
    data: {
        ManufacturerAdmin: {
            ManufacturerAdminHierarchy: { isLoaded: false, isLoading: false, data: [{ id: 1, value: 'testValue', key: 1 }] },
        },
    },
});

const fieldNames = {
    title: 'test',
};
const props = {
    fieldNames: fieldNames,
    isVisible: true,
    setSelectedTreeSelectKey: jest.fn(),
    setShowProductAttribute: jest.fn(),
};

describe('AddEditForm Components', () => {
    it('should render AddEditForm components', () => {
        customRender(<AddEditForm {...props} store={mockStore} fetchListHierarchyAttributeName={jest.fn()} userId={106} />);
    });

    it('form fields should work properly', async () => {
        customRender(<AddEditForm {...props} setFormBtnActive={jest.fn()} />);
        const modelGroupCode = screen.getByRole('combobox', { name: 'modelGroupCode', exact: false });
        fireEvent.change(modelGroupCode, { target: { value: 'Dmatest' } });

        const code = screen.getByRole('textbox', { name: 'dealerCode', exact: false });
        fireEvent.change(code, { target: { value: 'Dmatest' } });

        const hierarchyMstId = screen.getByRole('textbox', { name: 'hierarchyMstId' });
        fireEvent.change(hierarchyMstId, { target: { value: 'Dmatest' } });

        const statusBtn = screen.getAllByRole('switch', { name: 'Status', exact: false });
        fireEvent.click(statusBtn[0]);
    });
});
