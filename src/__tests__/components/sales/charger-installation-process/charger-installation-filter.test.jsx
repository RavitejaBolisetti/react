import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import ChargerInstallationFilter from 'components/Sales/ChargerInstallationProcess/ChargerInstallationFilter';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Charger Installation Filter Component', () => {

    it('should render charger installation filter component', () => {
        customRender(<ChargerInstallationFilter />);
    });

    it('clear button and remove filter should work', () => {
        const filterString={ advanceFilter: true };
        const extraParams=[{ name: 'Kai', value: 'Kai', filter: 'Kai', canRemove: true  }];
        customRender(<ChargerInstallationFilter advanceFilter={true} filterString={filterString} extraParams={extraParams} removeFilter={jest.fn()} handleResetFilter={jest.fn()} />);

        const clearBtn=screen.getByRole('button', { name: 'Clear' });
        fireEvent.click(clearBtn);

        const removeFilter=screen.getByTestId('removeFilter');
        fireEvent.click(removeFilter);
    });

});