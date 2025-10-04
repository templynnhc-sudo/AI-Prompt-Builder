
import React from 'react';
import SparklesIcon from './icons/SparklesIcon';

interface PromptInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const PromptInput: React.FC<PromptInputProps> = ({ value, onChange, onSubmit, isLoading }) => {
  return (
    <div className="bg-slate-800/50 rounded-xl p-6 shadow-lg border border-slate-700">
      <label htmlFor="prompt-input" className="block text-lg font-medium text-slate-300 mb-3">
        1. 아이디어를 입력하세요
      </label>
      <textarea
        id="prompt-input"
        value={value}
        onChange={onChange}
        placeholder="예: 우주를 여행하는 고양이에 대한 동화"
        className="w-full h-36 p-4 bg-slate-900 border border-slate-600 rounded-lg text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 resize-none"
        disabled={isLoading}
      />
      <button
        onClick={onSubmit}
        disabled={isLoading}
        className="mt-4 w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 disabled:bg-slate-600 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-purple-500 transition-all duration-300 transform hover:scale-105 disabled:scale-100"
      >
        <SparklesIcon className="w-5 h-5 mr-2" />
        {isLoading ? '생성 중...' : '완벽한 프롬프트로 변환'}
      </button>
    </div>
  );
};

export default PromptInput;
