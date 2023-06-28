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
describe('Icons Components', () => {
    it('should render AdminIcon components', () => {
        render(<AdminIcon />);
    });
    it('should render ChangePasswordIcon components', () => {
        render(<ChangePasswordIcon />);
    });
    it('should render CrmIcon components', () => {
        render(<CrmIcon />);
    });
    it('should render EditIcon components', () => {
        render(<EditIcon />);
    });
    it('should render FilterIcon components', () => {
        render(<FilterIcon />);
    });
    it('should render HeadPhone components', () => {
        render(<HeadPhone />);
    });
    it('should render HomeIcon components', () => {
        render(<HomeIcon />);
    });
    it('should render HrIcon components', () => {
        render(<HrIcon />);
    });
    it('should render LinearTrash components', () => {
        render(<LinearTrash />);
    });
    it('should render LogoutIcon components', () => {
        render(<LogoutIcon />);
    });
    it('should render HomeIcon components', () => {
        render(<MenuArrow />);
    });
    it('should render HomeIcon components', () => {
        render(<MinusBorderedIcon />);
    });
    it('should render HomeIcon components', () => {
        render(<PlusBorderedIcon />);
    });
    it('should render HomeIcon components', () => {
        render(<ProfileIcon />);
    });
    it('should render HomeIcon components', () => {
        render(<ServiceIcon />);
    });
    it('should render HomeIcon components', () => {
        render(<SettingsIcon />);
    });
    it('should render HomeIcon components', () => {
        render(<SparesIcon />);
    });
    it('should render HomeIcon components', () => {
        render(<ViewEyeIcon />);
    });
});
