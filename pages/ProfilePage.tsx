import React from 'react';

const ProfilePage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold tracking-tight text-brand-text-light dark:text-brand-text-dark sm:text-5xl drop-shadow-lg">
        Профиль пользователя
      </h1>
      <p className="mt-4 text-lg max-w-2xl text-gray-600 dark:text-gray-300 drop-shadow-md">
        Здесь будет отображаться информация о пользователе.
      </p>
    </div>
  );
};

export default ProfilePage;
