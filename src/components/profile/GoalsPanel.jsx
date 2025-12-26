// src/components/profile/GoalsPanel.jsx
import React, { useState } from 'react';
import { useApp } from '../../context/AppProvider';
import { PlusCircle, CheckCircle2, Circle, ChevronUp, ChevronDown } from 'lucide-react';

export default function GoalsPanel() {
  const app = useApp();
  const user = app?.user;
  const addGoal = app?.addGoal || (() => {});
  const updateGoal = app?.updateGoal || (() => {});

  const [title, setTitle] = useState('');
  const [target, setTarget] = useState(3);

  const goals = user?.goals || [];

  function handleAdd(e) {
    e.preventDefault();
    if (!title.trim()) return;
    const g = {
      id: `g-${Date.now()}`,
      title: title.trim(),
      description: '',
      progress: 0,
      target: Number(target) || 1,
      completed: false,
    };
    addGoal(g);
    setTitle('');
    setTarget(3);
  }

  function toggleComplete(g) {
    const next = {
      ...g,
      completed: !g.completed,
      progress: !g.completed ? g.target : Math.min(g.progress, g.target),
    };
    updateGoal(next);
  }

  function incProgress(g) {
    const nextProgress = Math.min(g.target, (g.progress || 0) + 1);
    const next = {
      ...g,
      progress: nextProgress,
      completed: nextProgress >= g.target,
    };
    updateGoal(next);
  }

  function decProgress(g) {
    const nextProgress = Math.max(0, (g.progress || 0) - 1);
    const next = {
      ...g,
      progress: nextProgress,
      completed: nextProgress >= g.target && nextProgress > 0,
    };
    updateGoal(next);
  }

  return (
    <div className="space-y-3 text-[11px]">
      {/* Create goal form */}
      <form
        onSubmit={handleAdd}
        className="rounded-2xl border border-slate-800 bg-slate-950/80 p-3 space-y-2"
      >
        <p className="text-slate-300">
          Create quick goals for this session; progress is stored locally in the browser only.
        </p>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Example: Play 3 ranked matches"
            className="flex-1 rounded-lg bg-slate-950/80 border border-slate-800 px-3 py-1.5 text-xs outline-none placeholder:text-slate-500"
          />
          <div className="flex items-center gap-2">
            <label className="text-slate-400 flex items-center gap-1">
              Target
              <input
                type="number"
                min={1}
                max={99}
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                className="w-16 rounded-lg bg-slate-950/80 border border-slate-800 px-2 py-1 text-xs outline-none"
              />
            </label>
            <button
              type="submit"
              className="inline-flex items-center gap-1 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1 text-xs font-medium"
            >
              <PlusCircle className="h-3.5 w-3.5" />
              Add
            </button>
          </div>
        </div>
      </form>

      {/* Goals list */}
      {goals.length === 0 ? (
        <p className="text-slate-400">
          No goals configured yet. Add one above to start tracking a small objective for this demo.
        </p>
      ) : (
        <div className="space-y-2">
          {goals.map((g) => {
            const ratio = g.target ? (g.progress || 0) / g.target : 0;
            const pct = Math.round(ratio * 100);

            return (
              <div
                key={g.id}
                className="rounded-2xl border border-slate-800 bg-slate-950/80 px-3 py-2 flex flex-col gap-2"
              >
                <div className="flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => toggleComplete(g)}
                    className="flex items-center gap-2 text-left"
                  >
                    {g.completed ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    ) : (
                      <Circle className="h-4 w-4 text-slate-500" />
                    )}
                    <span className="text-slate-100 text-[12px] font-medium">
                      {g.title}
                    </span>
                  </button>
                  <span className="text-[10px] text-slate-400">
                    {g.progress}/{g.target}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className={
                        'h-full rounded-full ' +
                        (g.completed
                          ? 'bg-gradient-to-r from-emerald-400 to-sky-400'
                          : 'bg-gradient-to-r from-sky-500 to-emerald-400')
                      }
                      style={{ width: `${Math.min(100, pct)}%` }}
                    />
                  </div>
                  <span className="w-10 text-right text-[10px] text-slate-400">
                    {pct}%
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => decProgress(g)}
                      className="p-1 rounded-full bg-slate-900/80 border border-slate-700 hover:bg-slate-800"
                      title="Decrease progress"
                    >
                      <ChevronDown className="h-3 w-3 text-slate-300" />
                    </button>
                    <button
                      type="button"
                      onClick={() => incProgress(g)}
                      className="p-1 rounded-full bg-slate-900/80 border border-slate-700 hover:bg-slate-800"
                      title="Increase progress"
                    >
                      <ChevronUp className="h-3 w-3 text-slate-300" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
