
import React from 'react';
import { AIInsight } from '../types';

interface AIInsightPanelProps {
  insight: AIInsight | null;
  loading: boolean;
  onAnalyze: () => void;
}

const AIInsightPanel: React.FC<AIInsightPanelProps> = ({ insight, loading, onAnalyze }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-8">
      <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-indigo-50/30">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-indigo-100 rounded-lg">
            <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-slate-800">BA Intelligence Analysis</h2>
        </div>
        <button
          onClick={onAnalyze}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white rounded-lg transition-all shadow-md shadow-indigo-100 font-medium text-sm"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing...
            </>
          ) : (
            'Run AI Audit'
          )}
        </button>
      </div>
      
      {insight ? (
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in duration-700">
          <div className="col-span-1">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Executive Summary</h3>
            <p className="text-slate-700 leading-relaxed text-sm">{insight.summary}</p>
          </div>
          <div className="col-span-1">
            <h3 className="text-sm font-bold text-rose-400 uppercase tracking-wider mb-2">Identified Risks</h3>
            <ul className="space-y-2">
              {insight.risks.map((risk, idx) => (
                <li key={idx} className="flex gap-2 text-sm text-slate-700">
                  <span className="text-rose-500">•</span>
                  {risk}
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-1">
            <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider mb-2">Strategic Recommendations</h3>
            <ul className="space-y-2">
              {insight.recommendations.map((rec, idx) => (
                <li key={idx} className="flex gap-2 text-sm text-slate-700">
                  <span className="text-emerald-500">✓</span>
                  {rec}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className="p-12 text-center text-slate-400 italic text-sm">
          Click "Run AI Audit" to identify bottlenecks and project delays across your dev teams.
        </div>
      )}
    </div>
  );
};

export default AIInsightPanel;
