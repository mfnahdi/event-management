'use client';
import LoginRegisterBox from './LoginRegisterBox';
import SearchBar from './SearchBar';
import { loginAction, logoutAction } from '@/lib/features/userSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const Header = () => {
  const user = useAppSelector((state) => state.user);
  const baseUrl = 'http://localhost:8000/api/';
  const dispatch = useAppDispatch();
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem('token_auth');
    const keepLogin = async () => {
      try {
        const { data } = await axios.get(baseUrl + 'users/keeplogin', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch(loginAction(data.data));
      } catch (error) {
        console.log(error);
      }
    };
    keepLogin();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token_auth');
    dispatch(logoutAction());
    router.push('/login');
  };
  return (
    <nav
      id="header"
      className="w-full z-30 top-0 py-1 sticky bg-white shadow-lg"
    >
      <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-6 py-3">
        <label htmlFor="menu-toggle" className="cursor-pointer md:hidden block">
          <svg
            className="fill-current text-gray-900"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
          >
            <title>menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
          </svg>
        </label>
        <input className="hidden" type="checkbox" id="menu-toggle" />

        <div
          className="hidden md:flex md:items-center md:w-auto w-10/12 order-3 md:order-4"
          id="menu"
        >
          <nav>
            <ul className="md:flex items-center justify-between text-base text-gray-700 pt-4 md:pt-0">
              <li>
                <a
                  className="inline-block no-underline hover:text-black hover:underline py-2 px-4"
                  href="#"
                >
                  Find event
                </a>
              </li>
              <li>
                <a
                  className="inline-block no-underline hover:text-black hover:underline py-2 px-4"
                  href="/add-event"
                >
                  Create event
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="order-1 md:order-2">
          <a
            className="flex items-center tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl "
            href="/"
          >
            FESTIFY
          </a>
        </div>

        <div className="order -2 md:order-3">
          <SearchBar />
        </div>

        <div className="order-4 md:order-5 ml-auto md:ml-0 flex-grow-0 ">
          <LoginRegisterBox />
        </div>
      </div>
    </nav>
  );
};
