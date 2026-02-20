import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { auth, db } from '../firebase.config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [firebaseError, setFirebaseError] = useState<string | null>(null);

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

  const loginSchema = Yup.object().shape({
    login: Yup.string().required('Логин обязателен'),
    password: Yup.string().required('Пароль обязателен'),
  });

  const registerSchema = Yup.object().shape({
    fullName: Yup.string().required('Фамилия и Имя обязательны'),
    login: Yup.string().required('Логин обязателен'),
    password: Yup.string().min(6, 'Пароль должен быть не менее 6 символов').required('Пароль обязателен'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Пароли должны совпадать')
      .required('Подтверждение пароля обязательно'),
    role: Yup.string().required('Выберите вашу роль'),
  });

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 flex justify-center items-center">
      <div className="w-full max-w-md bg-brand-surface-light/80 dark:bg-brand-surface-dark/70 backdrop-blur-md rounded-xl shadow-lg p-8">
                {firebaseError && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{firebaseError}</div>}
        <h2 className="text-3xl font-bold text-center text-brand-text-light dark:text-brand-text-dark mb-6">
          {isLogin ? 'Вход' : 'Регистрация'}
        </h2>

        {isLogin ? (
          <Formik
            initialValues={{ login: '', password: '' }}
            validationSchema={loginSchema}
            onSubmit={async (values, { setSubmitting }) => {
              if (!auth) {
                setFirebaseError('Сервис аутентификации временно недоступен.');
                setSubmitting(false);
                return;
              }
              setFirebaseError(null);
              try {
                await signInWithEmailAndPassword(auth, `${values.login}@clearway.studying`, values.password);
                // Navigate home on success, App.tsx will handle it
                window.location.href = '/';
              } catch (error: any) {
                setFirebaseError(error.message);
              }
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-6">
                <div>
                  <label htmlFor="login" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Логин</label>
                  <Field type="text" name="login" className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-primary focus:border-brand-primary" />
                  <ErrorMessage name="login" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Пароль</label>
                  <Field type="password" name="password" className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-primary focus:border-brand-primary" />
                  <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                <button type="submit" disabled={isSubmitting} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-primary hover:bg-brand-primary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary-dark transition-colors duration-300">
                  Войти
                </button>
              </Form>
            )}
          </Formik>
        ) : (
          <Formik
            initialValues={{ fullName: '', login: '', password: '', confirmPassword: '', role: '' }}
            validationSchema={registerSchema}
            onSubmit={async (values, { setSubmitting }) => {
              if (!auth || !db) {
                setFirebaseError('Сервис аутентификации временно недоступен.');
                setSubmitting(false);
                return;
              }
              setFirebaseError(null);
              try {
                const userCredential = await createUserWithEmailAndPassword(auth, `${values.login}@clearway.studying`, values.password);
                const user = userCredential.user;
                await setDoc(doc(db, 'users', user.uid), {
                  fullName: values.fullName,
                  login: values.login,
                  role: values.role,
                });
                // Navigate home on success, App.tsx will handle it
                window.location.href = '/';
              } catch (error: any) {
                setFirebaseError(error.message);
              }
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                 <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Фамилия и Имя</label>
                  <Field type="text" name="fullName" className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-primary focus:border-brand-primary" />
                  <ErrorMessage name="fullName" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                <div>
                  <label htmlFor="login" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Логин</label>
                  <Field type="text" name="login" className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-primary focus:border-brand-primary" />
                  <ErrorMessage name="login" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Пароль</label>
                  <Field type="password" name="password" className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-primary focus:border-brand-primary" />
                  <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Подтвердите Пароль</label>
                  <Field type="password" name="confirmPassword" className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-primary focus:border-brand-primary" />
                  <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                <div role="group" aria-labelledby="role-group" className="pt-2">
                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Роль на нашем сайте</label>
                   <div className="flex justify-between gap-2">
                    <label className="flex-1">
                        <Field type="radio" name="role" value="student" className="sr-only peer" />
                        <div className="w-full text-center py-2 px-4 rounded-md cursor-pointer border border-gray-300 dark:border-gray-600 peer-checked:bg-brand-primary peer-checked:text-white peer-checked:border-brand-primary transition-colors">Школьник</div>
                    </label>
                    <label className="flex-1">
                        <Field type="radio" name="role" value="undergraduate" className="sr-only peer" />
                        <div className="w-full text-center py-2 px-4 rounded-md cursor-pointer border border-gray-300 dark:border-gray-600 peer-checked:bg-brand-primary peer-checked:text-white peer-checked:border-brand-primary transition-colors">Студент</div>
                    </label>
                    <label className="flex-1">
                        <Field type="radio" name="role" value="organizer" className="sr-only peer" />
                        <div className="w-full text-center py-2 px-4 rounded-md cursor-pointer border border-gray-300 dark:border-gray-600 peer-checked:bg-brand-primary peer-checked:text-white peer-checked:border-brand-primary transition-colors">Организатор</div>
                    </label>
                   </div>
                   <ErrorMessage name="role" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                <button type="submit" disabled={isSubmitting} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-primary hover:bg-brand-primary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary-dark transition-colors duration-300">
                  Зарегистрироваться
                </button>
              </Form>
            )}
          </Formik>
        )}

        <div className="mt-6 text-center">
          <button onClick={toggleAuthMode} className="text-sm text-brand-primary hover:underline">
            {isLogin ? 'Нет аккаунта? Зарегистрироваться' : 'Уже есть аккаунт? Войти'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;

