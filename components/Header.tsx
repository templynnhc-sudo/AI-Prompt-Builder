import React from 'react';
import NewIcon from './icons/NewIcon';

interface HeaderProps {
  onNew: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNew }) => {
  return (
    <header className="text-center relative py-4">
       <div className="absolute top-4 right-0">
         <button 
            onClick={onNew}
            className="flex items-center gap-2 px-3 py-2 border border-slate-600 text-slate-300 rounded-lg hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-purple-500 text-sm"
            aria-label="Start with a new idea"
          >
            <NewIcon className="w-4 h-4" />
            <span>새 아이디어</span>
          </button>
      </div>
      <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 pt-14 sm:pt-0">
        완벽한 프롬프트 생성기
      </h1>
      <p className="mt-3 text-lg text-slate-400 max-w-xl mx-auto">
        모호한 아이디어를 AI를 위한 명확하고 상세한 지시사항으로 바꿔보세요.
      </p>
    </header>
  );
};

export default Header;