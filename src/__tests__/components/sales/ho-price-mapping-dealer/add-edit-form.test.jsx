import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { AddEditForm }  from 'components/Sales/HoPriceMappingDealer/AddEditForm';
import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Add Edit Form Component', () => {

    it('should render add edit form component', () => {
        const formActionType={
            viewMode: false
        };
        const typeData={
            YES_NO_FLG: [{name: 'Kai'}]
        };
        customRender(<AddEditForm isVisible={true} typeData={typeData} formActionType={formActionType} />);
    });

    it('should render view mode', () => {
        const formActionType={
            viewMode: true
        };
        const typeData={
            YES_NO_FLG: [{name: 'Kai'}]
        }
        customRender(<AddEditForm isVisible={true} typeData={typeData} formActionType={formActionType} setButtonData={jest.fn()} />);
    });

    it('form fields should work', () => {
        const formActionType={
            viewMode: false
        };
        const typeData={
            YES_NO_FLG: [{name: 'Kai'}]
        }
        customRender(<AddEditForm isVisible={true} typeData={typeData} formActionType={formActionType} setButtonData={jest.fn()} />);
        const areaOffice=screen.getByRole('textbox', { name: /Area Office/i });
        fireEvent.change(areaOffice, { target: { value: 'Test' } });

        const state=screen.getByRole('textbox', { name: /State/i });
        fireEvent.change(state, { target: { value: 'Test' } });

        const pricingCityCode=screen.getByRole('textbox', { name: /Pricing City Code/i });
        fireEvent.change(pricingCityCode, { target: { value: 'Test' } });

        const dealerName=screen.getByRole('textbox', { name: /Dealer Name/i });
        fireEvent.change(dealerName, { target: { value: 'Test' } });

        const dealerBranch=screen.getByRole('textbox', { name: /Dealer Branch/i });
        fireEvent.change(dealerBranch, { target: { value: 'Test' } });
        
        const dealerSelected=screen.getByRole('switch', { name: /Dealer Selected for On Road Price?/i });
        fireEvent.click(dealerSelected);
    });

});