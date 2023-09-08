import '@testing-library/jest-dom/extend-expect';
import { VehicleDetailsMaster } from '@components/Sales/VehicleReceipt/VehicleDetails/VehicleDetailMaster';
import customRender from '@utils/test-utils';
import { render, screen, fireEvent } from '@testing-library/react';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Term Condition Manufacturer vehicle master components', () => {
    it('should render components', () => {
        customRender(<VehicleDetailsMaster setButtonData={jest.fn()} />);
    });

    it('should render components when viewmode is true', () => {
        const props = { formActionType: { viewMode: true } };
        customRender(<VehicleDetailsMaster setButtonData={jest.fn()} {...props} />);
    });
});
