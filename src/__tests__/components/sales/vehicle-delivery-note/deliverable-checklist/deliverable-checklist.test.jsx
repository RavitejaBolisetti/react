import '@testing-library/jest-dom/extend-expect';
import { DeliverableChecklistMaster } from '@components/Sales/VehicleDeliveryNote/DeliverableChecklist/DeliverableChecklistMaster';
import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Deliverable checklist Master components', () => {
    it('should render components', () => {
        customRender(<DeliverableChecklistMaster setButtonData={jest.fn()} />);
    });
    it('should render view components', () => {
        const formActionType = { viewMode: true };
        customRender(<DeliverableChecklistMaster setButtonData={jest.fn()} formActionType={formActionType} />);
    });
});
