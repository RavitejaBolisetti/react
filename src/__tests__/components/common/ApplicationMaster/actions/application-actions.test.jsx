import React from "react";
import { fireEvent, render, screen, act } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import customRender from "@utils/test-utils";
import ApplicationActions from "components/common/ApplicationMaster/actions/ApplicationActions";

const finalFormdata={ applicationAction: [{id:1, name:"test"},{id:2, name:"test"}], }

afterEach(() => {
   jest.restoreAllMocks();
});

describe('Application Actions Component', () => {
     it('should render application actions component', async () => {
        customRender(<ApplicationActions onFinishFailed={jest.fn()} />);
     });

     it('application name input should work', async () => {
        const actions=[ {id:1, actionName:"test"},{id:2, actionName:"test1"},{id:3, actionName:"hello"} ]

        customRender(<ApplicationActions finalFormdata={finalFormdata} actions={actions}/>);
        const inputBox = screen.getByRole('combobox', { name: 'Action', exact: false});
        act(() => {
         fireEvent.change(inputBox, { target: { value: 1 } });
        })
     });

     it('status switch should work', async () => {
        customRender(<ApplicationActions setCanFormSave={jest.fn()} />);
        const inputBox = screen.getByRole('switch', { name: 'Status', exact: false});
        act(() => {
         fireEvent.click(inputBox);
        })
     });

     it('submit button should work', async () => {
        customRender(<ApplicationActions setCanFormSave={jest.fn()} />);
        const inputBox = screen.getByRole('button', { name: 'plus Add', exact: false});
        act(() => {
         fireEvent.click(inputBox);
        });
     });

     it('cancel button should work', async () => {
        customRender(<ApplicationActions forceUpdate={jest.fn()} setCanFormSave={jest.fn()} setIsBtnDisabled={jest.fn()} finalFormdata={finalFormdata} status={"Active"} actionName={"Test"} actionId={123} />);
        const buttons = screen.getAllByRole('button', { name: '', exact: false});
        act(() => {
         fireEvent.click(buttons[0]);
        });
        const cancelButton=screen.getByRole('button', { name: 'Cancel', exact:false });
        act(() => {
         fireEvent.click(cancelButton);
        });
     });

     it('edit icon and save button should work', async () => {
        const setFinalFormdata=jest.fn();
        jest.spyOn(React, 'useState').mockReturnValue([null,setFinalFormdata]);
        render(<ApplicationActions forceUpdate={jest.fn()} setFinalFormdata={setFinalFormdata} setCanFormSave={jest.fn()} setIsBtnDisabled={jest.fn()} finalFormdata={finalFormdata} status={"Active"} actionName={"Test"} actionId={123} />);
        const buttons = screen.getAllByRole('button', { name: '', exact: false});
        act(() => {
         fireEvent.click(buttons[0]);
        });
        const saveButton=screen.getByRole('button', { name: 'Save', exact:false });
        act(() => {
         fireEvent.click(saveButton);
        });
        
        expect(setFinalFormdata).toHaveBeenCalledWith(expect.any(Function));
        const setFinalFormdataFunction=setFinalFormdata.mock.calls[0][0];
        const prev={
            applicationAction: [
                {actionId: 1, actionName:'Action 1', status:'Active'},
                {actionId: 2, actionName:'Action 2', status:'Inactive'}
            ]
        }
        setFinalFormdataFunction(prev);
     });

});