import React from 'react';
import { screen, fireEvent, act, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import createMockStore from '__mocks__/store';
import customRender from '@utils/test-utils';
import { ListStateMaster } from 'components/common/Geo';

jest.mock('store/actions/data/geo/states', () => ({
    geoStateDataActions: {}
}));

const countryData = [{"countryCode":"IND","countryName":"INDIA","continentName":"ASIA","status":true}, {"countryCode":"KAI","countryName":"KAI","continentName":"ASIA","status":true}];
const stateData = [{"code":"106","name":"TestState","countryCode":"IND","status":true,"countryName":"INDIA","gstStateCode":"106"}];

describe('List State Master Component', () => {

    it('should render list state master component', async () => {
        customRender(<ListStateMaster />);
    });

    it('view and close button should work', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                Geo: {
                    Country: { isLoaded: true, data: countryData },
                    State: { isLoaded: true, data: stateData },
                },
            },
        });
        customRender(
            <Provider store={mockStore}>
                <ListStateMaster />
            </Provider>
        );
        
        await waitFor(() => { expect(screen.getByText('TestState')).toBeInTheDocument() });

        const viewBtn=screen.getByTestId('view');
        fireEvent.click(viewBtn);

        const closeBtn=screen.getAllByRole('button', { name: 'Close' });
        fireEvent.click(closeBtn[0]);

    });

    it('refresh, add and close button should work', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                Geo: {
                    Country: { isLoaded: true, data: countryData },
                    State: { isLoaded: true, data: stateData },
                },
            },
        });

        customRender(
            <Provider store={mockStore}>
                <ListStateMaster fetchList={jest.fn()}/>
            </Provider>
        );
        const refreshBtn=screen.getByTestId(/refreshBtn/i);
        fireEvent.click(refreshBtn);

    });

    it('search should work with remove filter', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                Geo: {
                    Country: { isLoaded: true, data: countryData },
                    State: { isLoaded: true, data: stateData },
                },
            },
        });
        customRender(
            <Provider store={mockStore}>
                <ListStateMaster />
            </Provider>
        );

        const searchBox=screen.getByRole('textbox', { name: /State Name/i });
        fireEvent.change(searchBox, { target: { value: 'TestState' } });

        const searchBtn=screen.getByRole('button', { name: /search/i });
        fireEvent.click(searchBtn);

        const removeFilter=screen.getAllByTestId('removeFilter');
        fireEvent.click(removeFilter[0]);
        fireEvent.click(removeFilter[1]);

    });

    it('search should work', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                Geo: {
                    Country: { isLoaded: true, data: countryData },
                    State: { isLoaded: true, data: stateData },
                },
            },
        });
        customRender(
            <Provider store={mockStore}>
                <ListStateMaster />
            </Provider>
        );

        const searchBox=screen.getByRole('textbox', { name: /State Name/i });
        fireEvent.change(searchBox, { target: { value: 'TestState' } });

        const closeCircle=screen.getByRole('img', { name: 'close-circle' });
        fireEvent.click(closeCircle);

        fireEvent.change(searchBox, { target: { value: 'TestState' } });

        const searchBtn=screen.getByRole('button', { name: /search/i });
        fireEvent.click(searchBtn);
    });

    it('search should work with clear button', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                Geo: {
                    Country: { isLoaded: true, data: countryData },
                    State: { isLoaded: true, data: stateData },
                },
            },
        });
        customRender(
            <Provider store={mockStore}>
                <ListStateMaster />
            </Provider>
        );

        const searchBox=screen.getByRole('textbox', { name: /State Name/i });
        fireEvent.change(searchBox, { target: { value: 'TestState' } });

        const searchBtn=screen.getByRole('button', { name: /search/i });
        fireEvent.click(searchBtn);

        const clearBtn=screen.getByRole('button', { name: /Clear/i });
        fireEvent.click(clearBtn);
    });

    it('Advance Filters and close button should work', async () => {
        customRender(<ListStateMaster />);
        
        const advancedFilters=screen.getByRole('button', { name: /Advance Filters/i });
        fireEvent.click(advancedFilters);
        const closeBtn=screen.getByRole('button', { name: /Close/i });
        fireEvent.click(closeBtn);
    });

    it('advanced search should return error on empty form fields', async () => {
        customRender(<ListStateMaster />);
        
        const advancedFilters=screen.getByRole('button', { name: /Advance Filters/i });
        fireEvent.click(advancedFilters);
        
        const searchBtn=screen.getAllByRole('button', { name: /Search/i });
        fireEvent.click(searchBtn[1]);
    });

    it('Advance Filters should work', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                Geo: {
                    Country: { isLoaded: false, data: countryData },
                    State: { isLoaded: true, filteredListData: stateData },
                },
            },
        });

        const fetchList=jest.fn();

        customRender(
            <Provider store={mockStore}>
                <ListStateMaster fetchList={fetchList} />
            </Provider>
        );

        fetchList.mock.calls[0][0].onSuccessAction();
    });

    it('Advance Filters should work with country', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                Geo: {
                    Country: { isLoaded: true, data: countryData },
                    State: { isLoaded: true, filteredListData: stateData },
                },
            },
        });
        customRender(
            <Provider store={mockStore}>
                <ListStateMaster />
            </Provider>
        );
        
        const advancedFilters=screen.getByRole('button', { name: /Advance Filters/i });
        fireEvent.click(advancedFilters);

        const countrySelect=screen.getByRole('combobox', { name: 'Country' });
        fireEvent.change(countrySelect, { target: { value: 'KAI' } });
        await waitFor(() => { expect(screen.getAllByText('KAI')[1]).toBeInTheDocument() });
        fireEvent.click(screen.getAllByText('KAI')[1]);

        const searchBtn=screen.getAllByRole('button', { name: /Search/i });
        fireEvent.click(searchBtn[1]);
    });

});