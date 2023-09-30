import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';
import { OnRoadPriceMaster } from 'components/Sales/OnRoadPriceMaster';
import customRender from '@utils/test-utils';

jest.mock('store/actions/data/vehicle/onRoadPriceMasterAction', () => ({
    onRoadPriceMasterAction: {}
}));

jest.mock('store/actions/data/vehicle/viewOnRoadPriceDetailAction', () => ({
    viewOnRoadPriceDetailAction: {}
}));

jest.mock('utils/Upload', () => {
    const UploadUtil = ({ handleFormValueChange, onFinish }) => {
        function handleButtonClick() {
            handleFormValueChange();
            onFinish();
        }

        return (
            <button onClick={handleButtonClick}>Upload OnRoad Price Master</button>
        );
    };
    return {
        __esModule: true,
        UploadUtil,
    };
});


describe('On Road Price Master Component', () => {

    it('should render on road price master component', () => {
        customRender( <OnRoadPriceMaster /> );
    });

    it('view and edit button should work', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                Vehicle: {
                    OnRoadPriceMasterDetails: { isLoaded: true, data: { paginationData: [{ id: 106, priceType: 'On Road', model: 'GT-100', pricingCity: 'Agra', changeInExShowroomOrg: 'Yes', status: 'Actioned' }]}, filter: {  } },
                },

            },
        });

        const fetchOnRoadPriceList=jest.fn();

        customRender(
            <Provider store={mockStore}>
                <OnRoadPriceMaster fetchOnRoadPriceList={fetchOnRoadPriceList} fetchOnRoadViewPriceDetail={jest.fn()} />
            </Provider>
        );

        fetchOnRoadPriceList.mock.calls[0][0].onErrorAction();
        fetchOnRoadPriceList.mock.calls[0][0].onSuccessAction();

        await waitFor(() => { expect(screen.getByText('GT-100')).toBeInTheDocument() });

        const viewBtn=screen.getByTestId('view');
        fireEvent.click(viewBtn);

        const closeBtn=screen.getAllByRole('button', { name: 'Close' });
        fireEvent.click(closeBtn[1]);

        const editBtn=screen.getByTestId('edit');
        fireEvent.click(editBtn);

    });

    it('advance filter with remove filter should wok', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                ConfigurableParameterEditing: { 
                    filteredListData: {
                        PRICING_TYPE: [{ key: 'On Road', value: 'On Road' }],
                        CHNG_EX_ORG: [{ key: 'Yes', value: 'Yes' }],
                        ON_ROAD_STATUS: [{ key: 'Actioned', value: 'Actioned' }]
                    }
                },
                Vehicle: {
                    OnRoadPriceMasterDetails: { filter: { priceType: 'On Road', pricingCity: 'Agra', changeInExShowroomOrg: 'Yes', status: 'Actioned', advanceFilter: true  } },
                },
                Geo: {
                    City: { isFilteredListLoaded: true, filteredListData: [{ id: 'Agra', value: 'Agra' }] },
                },
            },
        });

        customRender(
            <Provider store={mockStore}>
                <OnRoadPriceMaster fetchOnRoadPriceList={jest.fn()} setFilterString={jest.fn()} />
            </Provider>
        );

        const advanceFilters=screen.getByRole('button', { name: 'Advanced Filters' });
        fireEvent.click(advanceFilters);

        const searchBtn=screen.getByRole('button', { name: 'Search' });
        fireEvent.click(searchBtn);

        const closeBtn=screen.getByRole('button', { name: 'Close' });
        fireEvent.click(closeBtn);

        const removeFilter=screen.getAllByTestId('removeFilter');
        fireEvent.click(removeFilter[0]);

        const clearBtn=screen.getByRole('button', { name: 'Clear' });
        fireEvent.click(clearBtn);
    });

    it('advance filter with reset and close button should work', () => {
        customRender( <OnRoadPriceMaster setFilterString={jest.fn()} /> );

        const advanceFilters=screen.getByRole('button', { name: 'Advanced Filters' });
        fireEvent.click(advanceFilters);

        const resetBtn=screen.getByRole('button', { name: 'Reset' });
        fireEvent.click(resetBtn);

        const closeBtn=screen.getByRole('button', { name: 'Close' });
        fireEvent.click(closeBtn);
    });

    it('search should work', () => {
        customRender( <OnRoadPriceMaster setFilterString={jest.fn()} /> );

        const searchBox=screen.getByRole('textbox', { name: '' });
        fireEvent.change(searchBox, { target: { value: 'Kai' } });

        const searchBtn=screen.getByRole('button', { name: 'search' });
        fireEvent.click(searchBtn);
    });

    jest.setTimeout(20000)
    it('upload should work', async () => {

        const saveData=jest.fn();
        const data={ docId: 106 };
        const res="Error";

        customRender( <OnRoadPriceMaster setFilterString={jest.fn()} saveData={saveData} /> );

        const uploadBtn=screen.getByRole('button', { name: 'Upload' });
        fireEvent.click(uploadBtn);

        const downloadTemplate=screen.getByRole('button', { name: 'Download Template' });
        fireEvent.click(downloadTemplate);

        const uploadFile = screen.getByRole('button', { name: 'Upload OnRoad Price Master' });
        fireEvent.click(uploadFile);

        await waitFor(() => { expect(saveData).toHaveBeenCalled() });
        saveData.mock.calls[0][0].onSuccess();
        saveData.mock.calls[0][0].onError(res, data);

        const saveBtn=screen.getByRole('button', { name: 'Save' });
        fireEvent.click(saveBtn);

    });

    it('upload and cancel button should work', async () => {

        customRender( <OnRoadPriceMaster setFilterString={jest.fn()} /> );

        const uploadBtn=screen.getByRole('button', { name: 'Upload' });
        fireEvent.click(uploadBtn);

        const cancelBtn=screen.getByRole('button', { name: 'Cancel' });
        fireEvent.click(cancelBtn);
    });


});