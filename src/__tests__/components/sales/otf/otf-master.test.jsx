import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { OtfMaster } from '@components/Sales/OTF/OtfMaster';
import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';
import { screen, fireEvent } from '@testing-library/react';
import { ChangeHistory } from '@components/Sales/OTF/ChangeHistory/otfChangeHistory';

import { OTFMainConatiner } from '@components/Sales/OTF/OTFMainConatiner';
import { AdvancedSearch } from 'components/Sales/OTF/AdvancedSearch';
import { Form } from 'antd';

afterEach(() => {
    jest.restoreAllMocks();
});

const FormWrapper = (props) => {
    const [form] = Form.useForm();
    return <OTFMainConatiner form={form} {...props} />;
};

describe('OtfMaster component render', () => {
    it('should render OtfMaster component', () => {
        customRender(<OTFMainConatiner isVisible={true} />);
    });

    it('should render Otf details master component', () => {
        const typeData = {
            SALE_TYP: ['Diwali', 'Holi'],
        };
        const currentSection = 1;
        customRender(<OTFMainConatiner typeData={typeData} isVisible={true} currentSection={currentSection} />);
    });

    it('should render customer details component', () => {
        const currentSection = 2;
        customRender(<OTFMainConatiner isVisible={true} currentSection={currentSection} />);
    });

    it('should render vehicle details component', () => {
        const typeData = {
            VEHCL_TYPE: [{ name: 'Car' }],
        };
        const currentSection = 3;
        customRender(<OTFMainConatiner typeData={typeData} isVisible={true} currentSection={currentSection} />);
    });

    it('should render scheme and offer details component', () => {
        const currentSection = 4;
        customRender(<FormWrapper isVisible={true} currentSection={currentSection} />);
    });

    it('should render insurance details component', () => {
        const currentSection = 5;
        customRender(<OTFMainConatiner handleFormValueChange={jest.fn()} isVisible={true} currentSection={currentSection} />);
    });

    it('should render finance details component', () => {
        const currentSection = 6;
        customRender(<FormWrapper isVisible={true} currentSection={currentSection} />);
    });

    it('should render exchange vehicle component', () => {
        const currentSection = 7;
        customRender(<OTFMainConatiner isVisible={true} currentSection={currentSection} />);
    });

    it('should render referrals component', () => {
        const currentSection = 8;
        customRender(<FormWrapper handleFormValueChange={jest.fn()} isVisible={true} currentSection={currentSection} />);
    });

    it('should render loyalty scheme component', () => {
        const currentSection = 9;
        customRender(<FormWrapper isVisible={true} currentSection={currentSection} />);
    });

    it('should render invoice information component', () => {
        const currentSection = 10;
        customRender(<OTFMainConatiner isVisible={true} currentSection={currentSection} />);
    });

    it('should render add on details component', () => {
        const currentSection = 11;
        customRender(<OTFMainConatiner isVisible={true} currentSection={currentSection} />);
    });

    it('should render thank you page component', () => {
        const currentSection = 12;
        customRender(<OTFMainConatiner isVisible={true} currentSection={currentSection} />);
    });
});
describe('OtfMaster component render', () => {
    it('should render OtfMaster component', () => {
        customRender(<OtfMaster />);
        expect(screen.getByText('Search Booking')).toBeInTheDocument();
    });

    it('should render OtfMaster component with userId', () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
        });
        customRender(
            <Provider store={mockStore}>
                <OtfMaster />
            </Provider>
        );
    });

    it('clear button should work', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                OTF: {
                    OtfSearchList: {
                        data: {
                            totalRecords: 1,
                            otfDetails: [{ otfNumber: 'OTF1690806027258', model: 'THRNMM8395642778', orderStatus: 'O', customerName: 'Kai', mobileNumber: '8000666345', otfDate: 'null', cpd: null, customerType: 'IND', userProfilePicDocId: '' }],
                        },
                        filter: { searchType: 'customerName', searchParam: 'Kai', advanceFilter: true },
                    },
                },
            },
        });
        customRender(
            <Provider store={mockStore}>
                <OtfMaster />
            </Provider>
        );
        const clearButton = screen.getByRole('button', { name: 'Clear' });
        fireEvent.click(clearButton);
    });

    it('remove button should work', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                ConfigurableParameterEditing: {
                    filteredListData: {
                        OTF_SER: [{ key: 'customerName' }],
                    },
                },
                OTF: {
                    OtfSearchList: {
                        data: {
                            totalRecords: 1,
                            otfDetails: [{ otfNumber: 'OTF1690806027258', model: 'THRNMM8395642778', orderStatus: 'O', customerName: 'Kai', mobileNumber: '8000666345', otfDate: 'null', cpd: null, customerType: 'IND', userProfilePicDocId: '' }],
                        },
                        filter: { searchType: 'customerName', searchParam: 'Kai', advanceFilter: true, key: 'hello' },
                    },
                },
            },
        });
        customRender(
            <Provider store={mockStore}>
                <OtfMaster />
            </Provider>
        );

        const removeButton = screen.getByTestId('removeBtn');
        fireEvent.click(removeButton);
    });
    it('should render ChangeHistory', () => {
        customRender(<ChangeHistory />);
    });
});

const AdvancedSearchFormWrapper = (props) => {
    const [advanceFilterForm] = Form.useForm();
    return <AdvancedSearch advanceFilterForm={advanceFilterForm} {...props} />;
};

describe('advanced search component render', () => {
    it('should render advanced search component', async () => {
        customRender(<AdvancedSearchFormWrapper isVisible={true} />);
    });

    it('reset button should work', async () => {
        customRender(<AdvancedSearchFormWrapper setFilterString={jest.fn()} isVisible={true} />);
        const resetBtn = screen.getByRole('button', { name: 'Reset' });
        fireEvent.click(resetBtn);
    });

    it('apply button with form submitted successfully should work', async () => {
        customRender(<AdvancedSearchFormWrapper setFilterString={jest.fn()} setAdvanceSearchVisible={jest.fn()} isVisible={true} />);
        const calendarBtn = screen.getAllByRole('img', { name: 'calendar' });

        fireEvent.click(calendarBtn[0]);
        const dateTime1 = screen.getByText('28');
        fireEvent.click(dateTime1);

        fireEvent.click(calendarBtn[1]);
        const dateTime2 = screen.getAllByText('29');
        fireEvent.click(dateTime2[1]);

        const applyBtn = screen.getByRole('button', { name: 'Apply' });
        fireEvent.click(applyBtn);
    });

    it('apply button with form finished failed should work', async () => {
        customRender(<AdvancedSearchFormWrapper isVisible={true} />);
        const applyBtn = screen.getByRole('button', { name: 'Apply' });
        fireEvent.click(applyBtn);
    });
});
