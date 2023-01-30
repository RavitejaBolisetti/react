import { withLayout } from 'components/withLayout';
import { Header } from 'components/Common/Header';
import { Footer } from 'components/Common/Footer';
import { LeftSideBar } from 'pages/common/LeftSideBar';

export const withLayoutMaster = (InputComponent) => withLayout(Header, LeftSideBar, Footer, InputComponent);
