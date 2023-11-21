import '@testing-library/jest-dom/extend-expect';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import BranchMapping from 'components/common/UserManagement/Dealer/BranchMapping/BranchMapping';
import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

const props = {
    setButtonData: jest.fn(),
    resetUsrDlrBranchLocationsList: jest.fn(),
    resetDlrBranchLocationsList: jest.fn(),
};

const dealerDataList = [
    {
        dealerCode: 106,
        dealerParentGroupCode: 106,
    },
];

const dlrBranchLocationDataList = [{ name: 'Kai', id: 106, dealerLocationName: 'Agra' }];
const usrdlrBranchLocationDataList = [{ locationCode: 106 }];
const formData = { employeeCode: 106 };

const data = {
    userId: 106,
    dealerDataList: dealerDataList,
    usrdlrBranchLocationDataList: usrdlrBranchLocationDataList,
    isdlrBrLocationsLoaded: false,
    selectedDealerCode: 106,
    fetchDlrBranchLocationsList: jest.fn(),
    fetchUsrDlrBranchLocationsList: jest.fn(),
    formData: formData,
};

describe('Branch Mapping Component', () => {
    it('should render branch mapping component', () => {
        customRender(<BranchMapping {...data} {...props} isUsrdlrBrLocationsLoaded={false} />);
    });

    it('should set button data on loading', () => {
        const setButtonData = jest.fn();
        const formActionType={
            viewMode: true
        };
        customRender(<BranchMapping formActionType={formActionType} {...data} setButtonData={setButtonData} dlrBranchLocationDataList={dlrBranchLocationDataList} resetUsrDlrBranchLocationsList={jest.fn()} resetDlrBranchLocationsList={jest.fn()} isUsrdlrBrLocationsLoaded={true} />);
        const callback = setButtonData.mock.calls[0][0];
        callback('Button Data');
    });

    it('form fields should work with save button and should show success and error', async () => {
        const buttonData = {
            formBtnActive: true,
            saveBtn: true,
        };

        const formActionType={
            viewMode: false
        };

        const saveUsrDlrBrLoactionRoleDataList = jest.fn();
        customRender(<BranchMapping formActionType={formActionType} {...data} {...props} buttonData={buttonData} saveUsrDlrBrLoactionRoleDataList={saveUsrDlrBrLoactionRoleDataList} dlrBranchLocationDataList={[{ name: 'Kai', id: 107 }]} isUsrdlrBrLocationsLoaded={true} handleButtonClick={jest.fn()} showGlobalNotification={jest.fn()} />);

        const accessbile = screen.getByRole('checkbox', { name: 'Accessible' });
        fireEvent.click(accessbile);

        const defaultCheckbox = screen.getByRole('checkbox', { name: 'Default' });
        fireEvent.click(defaultCheckbox);

        const saveBtn = screen.getByRole('button', { name: 'Save & Next' });
        fireEvent.click(saveBtn);

        await waitFor(() => expect(saveUsrDlrBrLoactionRoleDataList).toHaveBeenCalled());

        saveUsrDlrBrLoactionRoleDataList.mock.calls[0][0].onSuccess();
        saveUsrDlrBrLoactionRoleDataList.mock.calls[0][0].onError();
    });
});
