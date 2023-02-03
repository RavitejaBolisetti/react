import { combineReducers } from 'redux';
import { LeftSideBar } from './leftsidebar';
import { Header } from './header';

export const common = combineReducers({
    LeftSideBar,
    Header,
});
