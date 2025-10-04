import React from 'react';
import PlayIcon from './icons/PhotoIcon';
import Loader from './Loader';

interface ExecutionOutputProps {
  onExecute: () => void;
  result: string | null;
  isLoading: boolean;
  error: string | null;
}

const ExecutionOutput: React.FC<ExecutionOutputProps> = ({ onExecute, result, isLoading, error }) => {
  return (
    <div className="bg-slate-800/50 rounded-xl p-6 shadow-lg border border-slate-700">
      <h2 className="text-lg font-medium text-slate-300 mb-3">
        3. 프롬프트 실행 결과
      </h2>
      <div className="mt-4 space-y-4">
        {!result && !isLoading && (
          <button
            onClick={onExecute}
            disabled={isLoading}
            className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 disabled:bg-slate-600 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-teal-500 transition-all duration-300 transform hover:scale-105 disabled:scale-100"
          >
            <PlayIcon className="w-5 h-5 mr-2" />
            {isLoading ? '실행 중...' : '프롬프트 실행하기'}
          </button>
        )}
        {error && (
            <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg text-center">
              {error}
            </div>
        )}
        {isLoading && <Loader />}
        {result && (
          <div className="flex flex-col items-stretch gap-4">
            <div className="bg-slate-900 p-4 rounded-lg border border-slate-600">
                <pre className="whitespace-pre-wrap text-slate-200 text-sm sm:text-base leading-relaxed font-mono">
                  {result}
                </pre>
            </div>
             <button
              onClick={onExecute}
              disabled={isLoading}
              className="w-full sm:w-auto flex items-center justify-center px-6 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 disabled:bg-slate-600 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-teal-500 transition-all duration-300"
            >
              <PlayIcon className="w-5 h-5 mr-2" />
              {isLoading ? '재실행 중...' : '다시 실행하기'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExecutionOutput;