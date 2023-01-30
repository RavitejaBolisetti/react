import { withLayout } from './withLayout';
import { Header } from 'components/Common/Header';
import { Footer } from 'components/Common/Footer';
import { LeftMenu } from 'components/Common/LeftMenu';

export const withLayoutMaster = (InputComponent) => withLayout(Header, LeftMenu, Footer, InputComponent);
