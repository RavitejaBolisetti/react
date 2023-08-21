import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';
import { screen, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { AddOnDetailsMaster } from 'components/Sales/OTF/AddOnDetails';
afterEach(() => {
    jest.restoreAllMocks();
  }); 
describe('Add On Details Component', () => {
    it('should render add on details components', () => {
        customRender(<AddOnDetailsMaster />);
    });

    it('save and next button should work', () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data:{
                OTF: {
                    AddonDetails: {
                        isLoaded: true,
                        data: [{id:1, name:'Test', partDetailsResponses: 'test'}, {id:2, name:'Test1', partDetailsResponses:'test'}],
                    },
                    AddonParts: {
                        isLoaded: true,
                        data: [{id:1, name:'Test'}, {id:2, name:'Test1'}],
                    }
                },
            },
        });
        const buttonData = { saveBtn: true, formBtnActive: false };
        customRender(<Provider store={mockStore}><AddOnDetailsMaster buttonData={buttonData} onSearchPart={jest.fn()} handleFormValueChange={jest.fn()} onFinishFailed={jest.fn()} onFinish={jest.fn()} selectedOrderId={true} /></Provider>);
        const addButton=screen.getByRole('button', { name: 'Save & Next', exact: false });
        fireEvent.click(addButton);
    });
});