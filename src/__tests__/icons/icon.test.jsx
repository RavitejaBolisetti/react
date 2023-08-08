import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { SVGComponent as AdminIcon } from '@Icons/AdminIcon';
import { SVGComponent as ChangePasswordIcon } from '@Icons/ChangePasswordIcon';
import { SVGComponent as CrmIcon } from '@Icons/CrmIcon';
import { SVGComponent as EditIcon } from '@Icons/EditIcon';
import { SVGComponent as FilterIcon } from '@Icons/FilterIcon';
import { SVGComponent as HeadPhone } from '@Icons/HeadPhone';
import { SVGComponent as HomeIcon } from '@Icons/HomeIcon';
import { SVGComponent as HrIcon } from '@Icons/HrIcon';
import { SVGComponent as LinearTrash } from '@Icons/LinearTrash';
import { SVGComponent as LogoutIcon } from '@Icons/LogoutIcon';
import { SVGComponent as MenuArrow } from '@Icons/MenuArrow';
import { SVGComponent as MinusBorderedIcon } from '@Icons/MinusBorderedIcon';
import { SVGComponent as PlusBorderedIcon } from '@Icons/PlusBorderedIcon';
import { SVGComponent as ProfileIcon } from '@Icons/ProfileIcon';
import { SVGComponent as ServiceIcon } from '@Icons/ServiceIcon';
import { SVGComponent as SettingsIcon } from '@Icons/SettingsIcon';
import { SVGComponent as SparesIcon } from '@Icons/SparesIcon';
import { SVGComponent as ViewEyeIcon } from '@Icons/ViewEyeIcon';
import { SVGComponent as RupeeIcon } from '@Icons/RupeeIcon';
import { SVGComponent as UploadBoxIcon } from '@Icons/UploadBoxIcon';
describe('Icons Components', () => {
    it('should render AdminIcon components', async() => {
        const adminIcon = render(<AdminIcon />);
        expect(adminIcon).toMatchSnapshot();
    });
    it('should render ChangePasswordIcon components', async() => {
       const changePasswordIcon = render(<ChangePasswordIcon />);
       expect(changePasswordIcon).toMatchSnapshot();
    });
    it('should render CrmIcon components', async() => {
        const crmIcon = render(<CrmIcon />);
        expect(crmIcon).toMatchSnapshot();
    });
    it('should render EditIcon components', async() => {
       const editIcon = render(<EditIcon />);
       expect(editIcon).toMatchSnapshot();
    });
    it('should render FilterIcon components', async() => {
        const filterIcon = render(<FilterIcon />);
        expect(filterIcon).toMatchSnapshot();
    });
    it('should render HeadPhone components', async() => {
        const headPhone =  render(<HeadPhone />);
        expect(headPhone).toMatchSnapshot();
    });
    it('should render HomeIcon components', async() => {
       const homeIcon =  render(<HomeIcon />);
       expect(homeIcon).toMatchSnapshot();
    });
    it('should render HrIcon components', async() => {
       const hrIcon = render(<HrIcon />);
       expect(hrIcon).toMatchSnapshot();
    });
    it('should render LinearTrash components', async() => {
        const linearTrash =  render(<LinearTrash />);
        expect(linearTrash).toMatchSnapshot();
    });
    it('should render LogoutIcon components', async() => {
        const logoutIcon =  render(<LogoutIcon />);
        expect(logoutIcon).toMatchSnapshot();
    });
    it('should render MenuArrow components', async() => {
        const menuArrow = render(<MenuArrow />);
        expect(menuArrow).toMatchSnapshot();
    });
    it('should render MinusBorderedIcon components', async() => {
        const minusBorderedIcon = render(<MinusBorderedIcon />);
        expect(minusBorderedIcon).toMatchSnapshot();
    });
    it('should render PlusBorderedIcon components', async() => {
        const plusBorderedIcon = render(<PlusBorderedIcon />);
        expect(plusBorderedIcon).toMatchSnapshot();
    });
    it('should render ProfileIcon components', async() => {
        const profileIcon = render(<ProfileIcon />);
        expect(profileIcon).toMatchSnapshot();
    });
    it('should render ServiceIcon components', async() => {
        const serviceIcon = render(<ServiceIcon />);
        expect(serviceIcon).toMatchSnapshot();
    });
    it('should render SettingsIcon components', async() => {
        const settingsIcon = render(<SettingsIcon />);
        expect(settingsIcon).toMatchSnapshot();
    });
    it('should render SparesIcon components', async() => {
        const sparesIcon = render(<SparesIcon />);
        expect(sparesIcon).toMatchSnapshot();
    });
    it('should render ViewEyeIcon components', async() => {
        const viewEyeIcon = render(<ViewEyeIcon />);
        expect(viewEyeIcon).toMatchSnapshot();
    });
    it('should render RupeeIcon components', async() => {
        const rupeeIcon =  render(<RupeeIcon />);
        expect(rupeeIcon).toMatchSnapshot();
    }); 
    it('should render UploadBoxIcon icon component', async() =>{
        const uploadBoxIcon = render(<UploadBoxIcon />)
        expect(uploadBoxIcon).toMatchSnapshot();
    })
});
