import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import createMockStore from '__mocks__/store';
import { fireEvent, screen, waitFor} from "@testing-library/react";
import { MacIdMaster } from '@components/common/UserManagement/Dealer/MacIdComponent/MacIdMaster';
import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

jest.mock('store/actions/data/userManagement/macid', () => ({
    MacIdDataActions: {
        innerDataActions: {
            fetchList: jest.fn(),
            saveData: jest.fn(),
        },
    },
}));

describe('MacIdMain components', () => {

    it('should render MacIdMain components', () => {
        customRender(<MacIdMaster />)
    });

    it('collapse and edit element should work', () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                UserManagement: {
                    MacId: { isLoaded: true, data: [{MacId: 106}] },
                },
            },
        });
        customRender(
            <Provider store={mockStore}>
                <MacIdMaster setButtonData={jest.fn()} fetchMacIdList={jest.fn()} />
            </Provider>
        );
        
        const plus=screen.getAllByRole('img', { name: 'plus' });
        fireEvent.click(plus[1]);

        const editBtn=screen.getByRole('button', { name: 'Edit' });
        fireEvent.click(editBtn);
    });

    it('add and cancel button should work', () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                UserManagement: {
                    MacId: { isLoaded: true },
                },
            },
        });
        const setButtonData=jest.fn();
        const fetchMacIdList=jest.fn();
        customRender(
            <Provider store={mockStore}>
                <MacIdMaster setButtonData={setButtonData} fetchMacIdList={fetchMacIdList}  />
            </Provider>
        );
        // setButtonData.mock.calls[0][0]();
        fetchMacIdList.mock.calls[0][0].onSuccessAction();

        const plusAdd=screen.getByRole('button', { name: 'plus Add' });
        fireEvent.click(plusAdd);

        const cancelBtn=screen.getByRole('button', { name: 'Cancel' });
        fireEvent.click(cancelBtn);
    });

    it('form should work with save', () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                UserManagement: {
                    MacId: { isLoaded: true },
                },
            },
        });
        const setButtonData=jest.fn();
        const fetchMacIdList=jest.fn();
        customRender(
            <Provider store={mockStore}>
                <MacIdMaster setButtonData={setButtonData} fetchMacIdList={fetchMacIdList}  />
            </Provider>
        );

        const plusAdd=screen.getByRole('button', { name: 'plus Add' });
        fireEvent.click(plusAdd);

        const deviceType=screen.getByRole('combobox', { name: 'Device Type' });
        fireEvent.change(deviceType, { target: { value: 'Mobile' } });

        const deviceId=screen.getByRole('textbox', { name: 'Device Id' });
        fireEvent.change(deviceId, { target: { value: 'Kai' } });

        const saveBtn=screen.getByRole('button', { name: 'Save' });
        fireEvent.click(saveBtn);
    });

    it('save & close button should work with success and error', async () => {
        const buttonData={
            formBtnActive: true,
            saveBtn: true
        };

        const saveData=jest.fn();

        customRender(<MacIdMaster buttonData={buttonData} setButtonData={jest.fn()} saveData={saveData} setIsFormVisible={jest.fn()} />);

        const saveBtn=screen.getByRole('button', { name: 'Save & Close' });
        fireEvent.click(saveBtn);

        await waitFor(() => expect(saveData).toHaveBeenCalled());

        saveData.mock.calls[0][0].onSuccess();
        saveData.mock.calls[0][0].onError();

    });

});