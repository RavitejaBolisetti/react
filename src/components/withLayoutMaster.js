import { withLayout } from 'components/withLayout';
import { Header } from 'components/common/Header';
import { Footer } from 'components/common/Footer';
import { LeftSideBar } from 'components/common/LeftSideBar';

export const withLayoutMaster = (InputComponent) => withLayout(Header, LeftSideBar, Footer, InputComponent);
