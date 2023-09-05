import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';
import { VehicleDetailMaster } from 'components/Sales/VehicleDetail/VehicleDetailMaster';
import customRender from '@utils/test-utils';

describe('Vehicle Detail Master Component', () => {

    it('should render vehicle detail master component', () => {
        customRender(<VehicleDetailMaster />)
    });

    it('clear button should work', () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                ConfigurableParameterEditing: { filteredListData: {VH_DTLS_SER: [{name: 'test'}]} },
                Vehicle: {
                    VehicleDetail: { filter: {advanceFilter: true, searchParam: 'Test', fromDate: 'Test'} },
                },
            },
        });

        customRender(
            <Provider store={mockStore}>
                <VehicleDetailMaster />
            </Provider>
        );
        
        const clearBtn=screen.getByRole('button', { name: 'Clear' });
        fireEvent.click(clearBtn);
    });

});