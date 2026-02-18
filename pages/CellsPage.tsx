
import React, { useState } from 'react';
import {
  HackathonIcon, ScienceIcon, SportsIcon, OlympiadIcon, CoursesIcon,
  MarathonIcon, SummerIcon, UniversityIcon, BackIcon, EmptyStateIcon
} from '../components/icons/Icons';

interface Category {
  id: string;
  name: string;
  icon: React.ReactElement;
}

const categories: Category[] = [
  { id: 'hackathons', name: 'Хакатоны', icon: <HackathonIcon className="h-12 w-12" /> },
  { id: 'science', name: 'Научные хакатоны', icon: <ScienceIcon className="h-12 w-12" /> },
  { id: 'sports', name: 'Спортивные соревнования', icon: <SportsIcon className="h-12 w-12" /> },
  { id: 'olympiads', name: 'Олимпиады', icon: <OlympiadIcon className="h-12 w-12" /> },
  { id: 'courses', name: 'Курсы', icon: <CoursesIcon className="h-12 w-12" /> },
  { id: 'marathons', name: 'Академические марафоны', icon: <MarathonIcon className="h-12 w-12" /> },
  { id: 'summer', name: 'Летние программы', icon: <SummerIcon className="h-12 w-12" /> },
  { id: 'university', name: 'Колледжи/Университеты', icon: <UniversityIcon className="h-12 w-12" /> },
];

const CategoryCard: React.FC<{ category: Category; onClick: () => void }> = ({ category, onClick }) => (
  <div
    onClick={onClick}
    className="group cursor-pointer p-6 bg-brand-surface-light/80 dark:bg-brand-surface-dark/70 backdrop-blur-md rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-center justify-center text-center"
  >
    <div className="text-brand-primary group-hover:text-brand-primary-light transition-colors duration-300 mb-4">
      {category.icon}
    </div>
    <h3 className="text-lg font-semibold text-brand-text-light dark:text-brand-text-dark">{category.name}</h3>
  </div>
);

const CellsListView: React.FC<{ category: Category; onBack: () => void }> = ({ category, onBack }) => {
  const FilterGroup: React.FC<{ title: string; options: string[] }> = ({ title, options }) => (
    <div>
      <h4 className="font-semibold mb-2 text-brand-text-light dark:text-brand-text-dark">{title}</h4>
      <div className="space-y-2">
        {options.map(opt => (
          <label key={opt} className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
            <input type="checkbox" className="rounded text-brand-primary focus:ring-brand-primary-dark" />
            <span>{opt}</span>
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button onClick={onBack} className="flex items-center gap-2 mb-8 text-gray-500 dark:text-gray-400 hover:text-brand-primary dark:hover:text-brand-primary-light transition-colors">
        <BackIcon className="w-5 h-5" />
        <span>Назад к категориям</span>
      </button>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <aside className="lg:col-span-1 bg-brand-surface-light/80 dark:bg-brand-surface-dark/70 backdrop-blur-md rounded-xl shadow-lg p-6 h-fit">
          <h3 className="text-xl font-bold mb-6 text-brand-text-light dark:text-brand-text-dark">Фильтры</h3>
          <div className="space-y-6">
            <FilterGroup title="Класс" options={['5-7', '8-9', '10-11']} />
            <FilterGroup title="Формат" options={['Онлайн', 'Оффлайн']} />
            <FilterGroup title="Предмет" options={['Математика', 'Физика', 'IT']} />
          </div>
        </aside>

        {/* Cells List */}
        <div className="lg:col-span-3">
          <h2 className="text-3xl font-bold tracking-tight text-brand-text-light dark:text-brand-text-dark sm:text-4xl mb-6 drop-shadow-lg">{category.name}</h2>
          <div className="bg-brand-surface-light/80 dark:bg-brand-surface-dark/70 backdrop-blur-md rounded-xl shadow-lg p-8 min-h-[400px] flex items-center justify-center">
             <div className="text-center">
                <EmptyStateIcon className="mx-auto h-16 w-16 text-gray-400 dark:text-gray-500" />
                <h3 className="mt-4 text-lg font-medium text-brand-text-light dark:text-brand-text-dark">Ой, походу клетки не зародились здесь</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Попробуйте зайти позже или выберите другую категорию.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CellsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  if (selectedCategory) {
    return <CellsListView category={selectedCategory} onBack={() => setSelectedCategory(null)} />;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tight text-brand-text-light dark:text-brand-text-dark sm:text-5xl drop-shadow-lg">
          Найдите свою клетку
        </h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto text-gray-600 dark:text-gray-300 drop-shadow-md">
          Выберите категорию, чтобы начать поиск возможностей для вашего роста.
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        {categories.map(cat => (
          <CategoryCard key={cat.id} category={cat} onClick={() => setSelectedCategory(cat)} />
        ))}
      </div>
    </div>
  );
};

export default CellsPage;
