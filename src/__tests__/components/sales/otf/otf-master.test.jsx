import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { OtfMaster } from '@components/Sales/OTF/OtfMaster';
import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';
import { screen, fireEvent } from '@testing-library/react';
import { ChangeHistory } from '@components/Sales/OTF/ChangeHistory/otfChangeHistory';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('OtfMaster component render', () => {
    it('should render OtfMaster component', () => {
        customRender(<OtfMaster />);
        expect(screen.getByText('Search Booking')).toBeInTheDocument();
    });

    it('should render OtfMaster component with userId', () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
        });
        customRender(
            <Provider store={mockStore}>
                <OtfMaster />
            </Provider>
        );
    });

    it('clear button should work', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                OTF: {
                    OtfSearchList: {
                        data: {
                            totalRecords: 1,
                            otfDetails: [{ otfNumber: 'OTF1690806027258', model: 'THRNMM8395642778', orderStatus: 'O', customerName: 'Kai', mobileNumber: '8000666345', otfDate: 'null', cpd: null, customerType: 'IND', userProfilePicDocId: '' }],
                        },
                        filter: { searchType: 'customerName', searchParam: 'Kai', advanceFilter: true },
                    },
                },
            },
        });
        customRender(
            <Provider store={mockStore}>
                <OtfMaster />
            </Provider>
        );
        const clearButton = screen.getByRole('button', { name: 'Clear' });
        fireEvent.click(clearButton);
    });

    it('remove button should work', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                ConfigurableParameterEditing: {
                    filteredListData: {
                        OTF_SER: [{ key: 'customerName' }],
                    },
                },
                OTF: {
                    OtfSearchList: {
                        data: {
                            totalRecords: 1,
                            otfDetails: [{ otfNumber: 'OTF1690806027258', model: 'THRNMM8395642778', orderStatus: 'O', customerName: 'Kai', mobileNumber: '8000666345', otfDate: 'null', cpd: null, customerType: 'IND', userProfilePicDocId: '' }],
                        },
                        filter: { searchType: 'customerName', searchParam: 'Kai', advanceFilter: true, key: 'hello' },
                    },
                },
            },
        });
        customRender(
            <Provider store={mockStore}>
                <OtfMaster />
            </Provider>
        );

        const removeButton = screen.getByTestId('removeBtn');
        fireEvent.click(removeButton);
    });
    it('should render ChangeHistory', () => {
        customRender(<ChangeHistory />);
    });
});

