import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { Dashboard } from '@components/Dashboard/Dashboard';
import { DashboardSkelton } from '@components/Dashboard/DashboardSkelton';
import { PieChart } from 'components/Dashboard/PieChart';
import LatestNews from 'components/Dashboard/LatestNews';
import BirthDayCalender from 'components/Dashboard/BirthDayCalender';
import WidgetDrawer from 'components/Dashboard/WidgetDrawer';

jest.mock('@ant-design/plots', () => {
    const Bar = () => <div>Bar</div>;
    const Pie = () => <div>Pie</div>;
    const measureTextWidth = () => <div>measureTextWidth</div>;
    return {
        __esModule: true,
        Bar,
        Pie,
        measureTextWidth,
    };
});

afterEach(() => {
    jest.restoreAllMocks();
});

describe('dashboard component render', () => {
    it('should render dashboard component', () => {
        customRender(<Dashboard measureTextWidth={jest.fn()} />);
        const prevNextButton = screen.getAllByRole('button', { name: '' });
        fireEvent.click(prevNextButton[0]);
        fireEvent.click(prevNextButton[1]);

        const container = {
            getBoundingClientRect: () => ({ width: 100, height: 100 }),
        };

        const config = PieChart().props;
        const titleCustomHtml = config.statistic.title.customHtml;
        let result = titleCustomHtml(container, null, { type: 'Test' });
        expect(result).toContain('Test');

        const contentCustomHtml = config.statistic.content.customHtml;
        result = contentCustomHtml(container, null, { value: 50 }, [{ value: 50 }]);
        expect(result).toContain('50');
    });
});

describe('DashboardSkelton component render', () => {
    it('should render DashboardSkelton component', () => {
        customRender(<DashboardSkelton />);
    });
});

describe('Latest News component render', () => {
    it('should render latest news component', () => {
        const newsData = [{ shortDescription: 'Kai', longDescription: 'Kai', date: '01/01/2001' }];
        customRender(<LatestNews newsData={newsData} />);
    });
});

describe('BirthDay Calender component render', () => {
    it('should render birthday calender component', () => {
        const birthDayData = { birthDaytoday: [{ name: 'Kai', date: '01/01/2001' }], upcomingBirthDay: [{ name: 'Kai', date: '01/01/2001' }] };
        customRender(<BirthDayCalender birthDayData={birthDayData} />);
    });
});

describe('Widget Drawer component render', () => {
    it('should render widget drawer component', () => {
        customRender(<WidgetDrawer isVisible={true} />);
    });
});
