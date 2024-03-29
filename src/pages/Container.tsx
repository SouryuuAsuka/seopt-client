import { useAppSelector } from "@/hooks";
import { Outlet } from "react-router-dom"
import Loading from '@/pages/Loading';
import { Header, LoginPopup } from "@/components";
import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { getUser, showPopupLogin } from '@/frameworks/redux/sagas';

export default function Container() {
  const dispatch = useDispatch()
  const app = useAppSelector((state) => state.app);
  const isLogin = useAppSelector((state) => state.user.isLogin);

  useEffect(() => {
    if (!isLogin && !app.loading) {
      dispatch(showPopupLogin())
    }
  }, [isLogin, app.loading]);

  useEffect(() => {;
    dispatch(getUser())
    const theme = window.localStorage.getItem('theme');
    if (theme === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.add('light');
    }
  }, []);

  return (
    <>
      {app.popups.login && <LoginPopup />}
      {app.loading
        ?
        <Loading />
        : <>
          <Header />
          <Outlet />
        </>
      }
    </>
  )
}