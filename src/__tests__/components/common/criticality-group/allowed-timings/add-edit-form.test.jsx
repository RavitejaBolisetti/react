import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import AddEditForm from '@components/common/CriticalityGroup/AllowedTimings/AddEditForm';
const formActionType = {
    viewMode: true,
};
const viewProps = {
    isVisible: true,
    formData: true,
    style: true,
    timeData: true,
};
const buttonData = {
    closeBtn: true,
    cancelBtn: true,
    saveBtn: true,
    saveAndNewBtn: true,
    editBtn: true,
    formBtnActive: true,
};
afterEach(() => {
    jest.restoreAllMocks();
});
describe('Allowed timings AddEditForm Components', () => {
    it('should render AddEditForm components', () => {
        customRender(<AddEditForm formData={{}} formActionType={formActionType} onCloseAction={jest.fn()} viewProps={viewProps} buttonData={buttonData} setButtonData={jest.fn()} handleButtonClick={jest.fn()} />);
    });
});
