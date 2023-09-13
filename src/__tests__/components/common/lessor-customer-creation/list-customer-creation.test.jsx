import '@testing-library/jest-dom/extend-expect';
import { ListCustomerCreation } from '@components/common/LessorCustomerCreation/ListCustomerCreation';
import customRender from '@utils/test-utils';
import { fireEvent, screen } from '@testing-library/react';
import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { rootReducer } from 'store/reducers';
// import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';
// import createMockStore from 'redux-mock-store';


// jest.mock('ListCustomerCreation', () => {
//     return Object.assing({}, jest.requireActual('ListCustomerCreation'), {
//       __esModule: true,
//       ListCustomerCreation: jest.fn(),
//     })
// });

export const AvailableThemesContext = React.createContext();
export const createMockStore = (initialState) => {
    const mockStore = configureStore({
        reducer: rootReducer,
        preloadedState: initialState,
        middleware: [thunk],
    });

    return mockStore;
};

afterEach(() => {
    jest.restoreAllMocks();
});


describe('ListCustomerCreation components', () => {
    const defaultBtnVisiblity = { editBtn: false, saveBtn: false, saveAndNewBtn: false, saveAndNewBtnClicked: false, closeBtn: false, cancelBtn: false, formBtnActive: false };

    it('should render fetchStateLovList func',()=>{
        const mockStore = createMockStore({
            auth: { userId: 123 },
            data:{
                ConfigurableParameterEditing:{typeData:[]},
                SupportingDocument:{isSupportingDataLoaded:false},
                Geo:{State:{isStateDataLoaded:false}}
            },
        });

        customRender(
            // <AvailableThemesContext.Provider value={mockStore}>
            //     <ListCustomerCreation fetchStateLovList={jest.fn()} />
            // </AvailableThemesContext.Provider>

            <Provider store={mockStore}>
              <ListCustomerCreation fetchStateLovList={jest.fn()} />
            </Provider>
        );
    })

    it('should render upload button', () => {
        const props = {
            handleOnClick:jest.fn(),
            setButtonData:jest.fn({ ...defaultBtnVisiblity, saveAndNewBtn: false, cancelBtn: true, saveBtn: true }),
            setDownLoadForm:jest.fn(false),
            setIsFormVisible:jest.fn(true),
            onCloseAction:jest.fn(),
            resetData:jest.fn(),
            resetViewData:jest.fn(),
            setFileList:jest.fn([]),
        }
        customRender(<ListCustomerCreation {...props} />);

        const uploadBtn = screen.getByRole('button', {name:'Upload'});
        fireEvent.click(uploadBtn);

        const headingUpload = screen.getByRole('heading', {name:'Click or drop your file here to upload'});
        expect(headingUpload).toBeTruthy();

        const cancelBtn = screen.getByRole('button', {name:'Cancel'});
        fireEvent.click(cancelBtn)
    });

    it('should render download template button', () => {
        const props = {
            handleOnClick:jest.fn(),
            // setButtonData:jest.fn({ ...defaultBtnVisiblity, saveAndNewBtn: false, cancelBtn: true, saveBtn: true }),
            setDownLoadForm:jest.fn(),
            setIsFormVisible:jest.fn(),
            handleTemplateDownLoad:jest.fn(),
            // onSuccessAction:jest.fn(),
            // onErrorAction:jest.fn(),
            // showGlobalNotification:jest.fn(),
            // downloadFile:jest.fn(),
            // resetData:jest.fn(),
            // onFinish:jest.fn(),
            // onSuccess:jest.fn(),
            // onError:jest.fn(),
        }

        const typeData = [{
            FILE_DOWNLOAD_TMPLT:[{
                id: "123",
                key: "ADMINAUTHTMPLT",
                parentKey: "FILE_DOWNLOAD_TMPLT"}]
        }]

        customRender(<ListCustomerCreation {...props} typeData={typeData}/>);

        const uploadBtn = screen.getByRole('button', {name:'Upload'});
        fireEvent.click(uploadBtn);

        

        // const saveBtn = screen.getByRole('button', {name:'Save'});
        // fireEvent.click(saveBtn)

        

        // const downloadTemplateBtn = screen.getByRole('button', {name:'Download Template'});
        // fireEvent.click(downloadTemplateBtn)
    });

    it('should render download button', () => {
        const props = {
            handleDownload:jest.fn(),
            setButtonData:jest.fn({ ...defaultBtnVisiblity, cancelBtn: true, saveAndNewBtn: false, saveBtn: false }),
            setDownLoadForm:jest.fn(true),
            setIsFormVisible:jest.fn(true)
        }
        customRender(<ListCustomerCreation {...props} />);

        const downloadBtn = screen.getByRole('button', {name:'Download'});
        fireEvent.click(downloadBtn);
    });
});