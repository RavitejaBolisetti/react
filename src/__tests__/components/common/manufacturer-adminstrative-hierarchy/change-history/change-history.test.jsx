import '@testing-library/jest-dom/extend-expect';
import ChangeHistory from '@components/common/ManufacturerAdminstrativeHierarchy/ChangeHistory/ChangeHistory';
import customRender from '@utils/test-utils';
import { screen, fireEvent, act } from '@testing-library/react';

describe('Manufacturer Adminstrative Hierarchy Change History components', () => {
    it('Should render Change History components', () => {
        customRender(<ChangeHistory isVisible={true} />);
    });

    it('Should render Change History view components', () => {
        const MANUFACTURER_HIERARCHY_TYPE = {
            ADMINISTRATIVE: {
                id: 1,
                key: 'ADMINISTRATIVE',
                title: 'Administrative',
            },
            AUTHORITY: {
                id: 2,
                key: 'AUTHORITY',
                title: 'Authority',
            },
        };

        customRender(<ChangeHistory isVisible={true} setActiveKey={jest.fn()} handleTabChange={jest.fn()} MANUFACTURER_HIERARCHY_TYPE={MANUFACTURER_HIERARCHY_TYPE} />);

        const button = screen.getAllByRole('button');
        act(() => {
            fireEvent.click(button[0]);
            fireEvent.click(button[1]);
            fireEvent.click(button[2]);
            fireEvent.click(button[3]);
        });

        const administrativeBtn = screen.getByRole('button', { name: 'Administrative', exact: false });
        act(() => {
            fireEvent.click(administrativeBtn);
        });

        const authorityBtn = screen.getByRole('button', { name: 'Authority', exact: false });
        act(() => {
            fireEvent.click(authorityBtn);
        });

        const closeImg = screen.getByRole('img', { name: 'close', exact: false });
        act(() => {
            fireEvent.click(closeImg);
        });
    });
});
