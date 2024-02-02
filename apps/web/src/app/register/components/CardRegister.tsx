'use client';

import axios, { AxiosError } from 'axios';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import * as yup from 'yup';
import YupPassword from 'yup-password';

YupPassword(yup);

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email cannot be empty'),
  confirmEmail: yup
    .string()
    .oneOf(
      [yup.ref('email') ?? ''],
      'Email addresses do not match. Please try again',
    )
    .required('Email cannot be empty'),
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Your password must be at least 8 characters')
    .minLowercase(1)
    .minUppercase(1),
  role: yup.string().required('Role is required'),
  codeReferral: yup.string().notRequired(),
});

const CardRegister = () => {
  const baseUrl = 'http://localhost:8000/api';
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showFullForm, setShowFullForm] = useState(false);
  const [inputReferral, setInputReferral] = useState('');
  const [success, setSuccess] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      confirmEmail: '',
      firstName: '',
      lastName: '',
      password: '',
      role: '',
      codeReferral: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await axios.post(baseUrl + '/users/register', {
          email: values.email,
          confirmEmail: values.confirmEmail,
          firstName: values.firstName,
          lastName: values.lastName,
          password: values.password,
          role: {
            name: values.role,
          },
          referralCode: inputReferral,
        });
        alert('Register Success');
        router.push('/login');
      } catch (error) {
        if (error instanceof AxiosError) {
          const errorMsg = error.response?.data || error.message;
          alert(errorMsg);
        }
      }
    },
  });

  const handleCheck = async () => {
    try {
      const data = await axios.post(baseUrl + `/users/check-referralcode`, {
        referralCode: inputReferral,
      });
      console.log(data);
      alert('Referral code is found');
    } catch (error) {
      console.log(error);
      alert('Referral code is not found');
    }
  };

  return (
    <div className="flex flex-col items-center h-screen w-full justify-center bg-[url('/festifybro.jpg')]">
      <div className="  p-3 bg-white rounded-md border-4 border-double border-black">
        <h1
          className="text-3xl md:text-4xl lg:text-6xl font-bold mb-6 leading-tight text-lime-900"
          font-style="italic"
        >
          Sign Up ⇣⇣
          <hr className="font-extrabold" />
        </h1>
        <ToastContainer />
        <form onSubmit={formik.handleSubmit}>
          <div className="relative mb-4">
            <input
              id="email"
              name="email"
              type="email"
              aria-describedby="emailHelp"
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-gray-600 focus:outline-none focus:ring-0 focus:border-gray-600 peer"
              placeholder=" "
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              required
            />
            <label
              htmlFor="email"
              className="absolute text-sm text-gray-700 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[#f7f7f7] dark:bg-gray-900 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              Email Address
            </label>
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-xs italic">
                {formik.errors.email}
              </p>
            )}
          </div>

          <>
            <div className="relative mb-4">
              <input
                id="confirmEmail"
                type="email"
                aria-describedby="confirmEmailHelp"
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-gray-600 focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                placeholder=" "
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmEmail}
                required
              />
              <label
                htmlFor="confirmEmail"
                className="absolute text-sm text-gray-700 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[#f7f7f7] dark:bg-gray-900 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
              >
                Confirm Email
              </label>
              {formik.touched.confirmEmail && formik.errors.confirmEmail && (
                <p className="text-red-500 text-xs italic">
                  {formik.errors.confirmEmail}
                </p>
              )}
            </div>
            <div className="relative mb-4">
              <select
                id="role"
                name="role"
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-gray-600 focus:outline-none focus:ring-0 focus:border-gray-600"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.role}
                required
              >
                <option value="">Select Role</option>
                <option value="customer">Customer</option>
                <option value="promoter">Promoter</option>
              </select>
              {formik.touched.role && formik.errors.role && (
                <p className="text-red-500 text-xs italic">
                  {formik.errors.role}
                </p>
              )}
            </div>

            <div className="flex mb-4">
              <div className="relative flex-1 mr-2">
                <input
                  id="firstName"
                  type="text"
                  aria-describedby="firstNameHelp"
                  className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-gray-600 focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                  placeholder=" "
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.firstName}
                  required
                />
                <label
                  htmlFor="firstName"
                  className="absolute text-sm text-gray-700 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[#f7f7f7] dark:bg-gray-900 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                >
                  First Name
                </label>
                {formik.touched.firstName && formik.errors.firstName && (
                  <p id="firstNameHelp" className="mt-2 text-xs text-red-500">
                    {formik.errors.firstName}
                  </p>
                )}
              </div>

              <div className="relative flex-1 ml-2">
                <input
                  id="lastName"
                  type="text"
                  aria-describedby="lastNameHelp"
                  className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-gray-600 focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                  placeholder=" "
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.lastName}
                  required
                />
                <label
                  htmlFor="lastName"
                  className="absolute text-sm text-gray-700 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[#f7f7f7] dark:bg-gray-900 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                >
                  Last Name
                </label>
                {formik.touched.lastName && formik.errors.lastName && (
                  <p className="text-red-500 text-xs italic">
                    {formik.errors.lastName}
                  </p>
                )}
              </div>
            </div>
            <div className=" mb-4">
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  aria-describedby="passwordHelp"
                  className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-gray-600 focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                  placeholder=" "
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '4px',
                  }}
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    cursor: 'pointer',
                  }}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </span>
                <label
                  htmlFor="password"
                  className="absolute text-sm text-gray-700 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[#f7f7f7] dark:bg-gray-900 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                >
                  Password
                </label>
                {formik.touched.password && formik.errors.password && (
                  <p className="text-red-500 text-xs italic">
                    {formik.errors.password}
                  </p>
                )}
              </div>
            </div>
          </>

          <button
            className="text-2xl"
            type="submit"
            font-bold
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#D1A8FF',
              color: 'white',
              borderRadius: '20px',
              border: 'none',
              marginTop: '20px',
            }}
          >
            👌 Submit 👌
          </button>
          <div className="relative flex flex-1 ">
            <input
              id="referralCode"
              type="text"
              aria-describedby="referralCodeHelp"
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-gray-600 focus:outline-none focus:ring-0 focus:border-gray-600 peer"
              placeholder=" "
              onChange={(e) => setInputReferral(e.target.value)}
              value={inputReferral}
            />
            <label
              htmlFor="referralCode"
              className="absolute text-sm text-gray-700 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[#f7f7f7] dark:bg-gray-900 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              Referral Code (optional)
            </label>
          </div>
          <p className=" mt-4">
            Already have an account?{' '}
            <Link href="/login" className="font-bold hover:underline">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default CardRegister;
