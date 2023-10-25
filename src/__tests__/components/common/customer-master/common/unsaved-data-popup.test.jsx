import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { UnsavedDataPopup } from '@components/common/CustomerMaster/Common/UnsavedDataPopup';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Unsaved data component', () => {
    it('should render the Unsaved component', () => {
        customRender(<UnsavedDataPopup isVisible={true} />);
    });
});
