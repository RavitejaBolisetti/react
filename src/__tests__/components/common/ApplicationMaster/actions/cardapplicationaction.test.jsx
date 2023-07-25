import React from "react";
import { fireEvent, logRoles, render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
// import { act } from 'react-dom/test-utils';
import customRender from "@utils/test-utils";
import CardApplicationAction from "components/common/ApplicationMaster/actions/CardApplicationAction";

const finalFormdata={ applicationAction: [{id:1, name:"test"},{id:2, name:"test"}], }

describe('Card Application Action Component', () => {
    it('should render card application action component', async () => {
        customRender(<CardApplicationAction/>);
     });

     it('delete icon button should work', async () => {
        const setFinalFormdata=jest.fn();
        jest.spyOn(React, 'useState').mockReturnValue([null,setFinalFormdata]);
        render(<CardApplicationAction id={null} setCanFormSave={jest.fn()} setFinalFormdata={setFinalFormdata} setIsBtnDisabled={jest.fn()} finalFormdata={finalFormdata} status={"Active"} actionName={"Test"} actionId={123} />);
        const buttons = screen.getAllByRole('button', { name: '', exact: false});
        fireEvent.click(buttons[1]);
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