
import React, { useState } from 'react';
import {
  HackathonIcon, ScienceIcon, SportsIcon, OlympiadIcon, CoursesIcon,
  MarathonIcon, SummerIcon, UniversityIcon, BackIcon, EmptyStateIcon
} from '../components/icons/Icons';

interface HackathonCell {
  id: string;
  title: string;
  description: string;
  prize: string;
  registrationOpen: boolean;
  timeline: string;
  teamFormat: string[];
  participationFee: string;
  registrationLink: string;
  mandatoryCondition: string[];
  dates: {
    start: string;
    end: string;
    topics: string;
    work: string;
    final: string;
  };
  announcementsChannel: string;
}

const hackathonData: HackathonCell[] = [
  {
    id: 'local-impact-2026',
    title: 'Local Impact Hackathon 2026',
    description: 'Стартап-ориентированный образовательный хакатон для школьников и студентов, направленный на разработку технологических решений реальных проблем Казахстана. Цель хакатона - предоставить участникам практический опыт создания и тестирования инновационных решений (MVP/прототипов), развития предпринимательских навыков и публичной защиты проектов перед экспертным жюри.',
    prize: '100 000 ₸',
    registrationOpen: true,
    timeline: '1 неделя на разработку проекта',
    teamFormat: ['Команды от 1 до 4 человек', 'Участники: 8–11(12) классы'],
    participationFee: '3000 ₸ за команду',
    registrationLink: '#',
    mandatoryCondition: [
      'Подписка на Instagram:',
      '– Local Impact Hackathon',
      '– Powerpuffgirls',
    ],
    dates: {
      start: '5 февраля — старт регистрации',
      end: 'до 16 февраля (23:59) — конец регистрации',
      topics: '17 февраля — анонс тем (в Telegram)',
      work: '17–24 февраля — работа над проектами',
      final: 'Финал — оффлайн / онлайн (будет анонсировано)',
    },
    announcementsChannel: 'Все объявления, темы и форма сдачи проектов будут опубликованы в Telegram-канале',
  },
];

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

const HackathonDetailCard: React.FC<{ cell: HackathonCell }> = ({ cell }) => (
  <div className="bg-brand-surface-light/80 dark:bg-brand-surface-dark/70 backdrop-blur-md rounded-xl shadow-lg p-6 transition-all duration-300">
    <h3 className="text-2xl font-bold text-brand-primary mb-3">{cell.title}</h3>
    <p className="text-gray-600 dark:text-gray-300 mb-4">{cell.description}</p>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-sm">
      <div className="bg-brand-background-light dark:bg-brand-background-dark p-3 rounded-lg">
        <p className="font-semibold">💰 Призовой фонд:</p>
        <p>{cell.prize}</p>
      </div>
      <div className="bg-brand-background-light dark:bg-brand-background-dark p-3 rounded-lg">
        <p className="font-semibold">⏱️ Сроки:</p>
        <p>{cell.timeline}</p>
      </div>
      <div className="bg-brand-background-light dark:bg-brand-background-dark p-3 rounded-lg">
        <p className="font-semibold">👥 Формат команд:</p>
        <ul className="list-disc list-inside">
          {cell.teamFormat.map((item, index) => <li key={index}>{item}</li>)}
        </ul>
      </div>
      <div className="bg-brand-background-light dark:bg-brand-background-dark p-3 rounded-lg">
        <p className="font-semibold">🎟 Участие:</p>
        <p>{cell.participationFee}</p>
      </div>
    </div>

    <div className="border-t border-brand-border-light dark:border-brand-border-dark pt-4">
      <h4 className="font-semibold mb-2">📅 Ключевые даты:</h4>
      <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
        <li>{cell.dates.start}</li>
        <li>{cell.dates.end}</li>
        <li>{cell.dates.topics}</li>
        <li>{cell.dates.work}</li>
        <li>{cell.dates.final}</li>
      </ul>
    </div>

    <div className="border-t border-brand-border-light dark:border-brand-border-dark pt-4 mt-4">
        <h4 className="font-semibold mb-2">❗️ Обязательное условие:</h4>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
             {cell.mandatoryCondition.map((item, index) => <li key={index}>{item}</li>)}
        </ul>
    </div>

    <div className="mt-6 text-center">
      <a href={cell.registrationLink} className="inline-block bg-brand-primary text-white font-bold py-3 px-8 rounded-lg hover:bg-brand-primary-light transition-colors duration-300 shadow-lg">
        {cell.registrationOpen ? 'Зарегистрироваться' : 'Регистрация закрыта'}
      </a>
      <p className="text-xs text-gray-500 mt-2">{cell.announcementsChannel}</p>
    </div>
  </div>
);

const HackathonSummaryCard: React.FC<{ cell: HackathonCell; onClick: () => void }> = ({ cell, onClick }) => (
  <div
    onClick={onClick}
    className="group cursor-pointer bg-brand-surface-light/80 dark:bg-brand-surface-dark/70 backdrop-blur-md rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
  >
    <h3 className="text-xl font-bold text-brand-primary mb-2 group-hover:text-brand-primary-light transition-colors">{cell.title}</h3>
    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">{cell.description}</p>
    <div className="flex justify-between items-center text-sm border-t border-brand-border-light dark:border-brand-border-dark pt-3">
      <div>
        <span className="font-semibold">Приз:</span> {cell.prize}
      </div>
      <div className="text-right">
        <span className="font-semibold">Регистрация до:</span>
        <p>{cell.dates.end.replace('до ', '').replace(' (23:59) — конец регистрации', '')}</p>
      </div>
    </div>
  </div>
);

const HackathonDetailPage: React.FC<{ cell: HackathonCell; onBack: () => void }> = ({ cell, onBack }) => (
  <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <button onClick={onBack} className="flex items-center gap-2 mb-8 text-gray-500 dark:text-gray-400 hover:text-brand-primary dark:hover:text-brand-primary-light transition-colors">
      <BackIcon className="w-5 h-5" />
      <span>Назад к списку хакатонов</span>
    </button>
    <HackathonDetailCard cell={cell} />
  </div>
);

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

const CellsListView: React.FC<{
  category: Category;
  onBack: () => void;
  onSelectHackathon: (hackathon: HackathonCell) => void;
}> = ({ category, onBack, onSelectHackathon }) => {
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
          <div className="space-y-8">
            {category.id === 'hackathons' && hackathonData.length > 0 ? (
              hackathonData.map(cell => <HackathonSummaryCard key={cell.id} cell={cell} onClick={() => onSelectHackathon(cell)} />)
            ) : (
              <div className="bg-brand-surface-light/80 dark:bg-brand-surface-dark/70 backdrop-blur-md rounded-xl shadow-lg p-8 min-h-[400px] flex items-center justify-center">
                <div className="text-center">
                  <EmptyStateIcon className="mx-auto h-16 w-16 text-gray-400 dark:text-gray-500" />
                  <h3 className="mt-4 text-lg font-medium text-brand-text-light dark:text-brand-text-dark">Ой, походу клетки не зародились здесь</h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Попробуйте зайти позже или выберите другую категорию.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const CellsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedHackathon, setSelectedHackathon] = useState<HackathonCell | null>(null);

  if (selectedHackathon) {
    return <HackathonDetailPage cell={selectedHackathon} onBack={() => setSelectedHackathon(null)} />;
  }

  if (selectedCategory) {
    return <CellsListView 
              category={selectedCategory} 
              onBack={() => setSelectedCategory(null)} 
              onSelectHackathon={setSelectedHackathon} 
           />;
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
