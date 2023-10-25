import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { ViewDetail } from '@components/Sales/AMCRegistration/VehicleDetails/ViewDetail';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('View Master Components', () => {
    it('Should render view basic render', () => {
        customRender(<ViewDetail styles={jest.fn()}/>);
    });
});
