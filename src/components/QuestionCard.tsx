import { useEffect, useState } from 'react';
import { Question } from '../lib/types';

type QuestionCardProps = {
  question: Question;
  current: number;
  total: number;
  selectedIndex: number | null;
  onSelect: (optionIndex: number) => void;
  onPrev: () => void;
};

const QuestionCard = ({
  question,
  current,
  total,
  selectedIndex,
  onSelect,
  onPrev
}: QuestionCardProps) => {
  const [localSelected, setLocalSelected] = useState<number | null>(selectedIndex);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    setLocalSelected(selectedIndex);
    setIsLeaving(false);
  }, [question.id, selectedIndex]);

  const handleSelect = (optionIndex: number) => {
    if (isLeaving) return;
    setLocalSelected(optionIndex);
    setIsLeaving(true);
    window.setTimeout(() => onSelect(optionIndex), 260);
  };

  return (
    <div className={isLeaving ? 'animate-fadeSlideOut' : 'animate-fadeSlideIn'}>
      <div className="glass-card p-6 sm:p-8">
        <div className="mb-5 flex items-center justify-between">
          <div className="pill">第 {current} / {total} 题</div>
          <button
            type="button"
            onClick={onPrev}
            disabled={current === 1 || isLeaving}
            className="rounded-full border border-rosewood/15 px-4 py-2 text-sm text-rosewood transition hover:border-rosewood/30 hover:bg-white/60 disabled:cursor-not-allowed disabled:opacity-40"
          >
            返回上一题
          </button>
        </div>

        <h2 className="font-display text-[28px] leading-[1.35] text-ink sm:text-[34px]">
          {question.prompt}
        </h2>

        <div className="mt-8 space-y-4">
          {question.options.map((option, index) => {
            const active = localSelected === index;
            return (
              <button
                key={option.label}
                type="button"
                onClick={() => handleSelect(index)}
                className={`group flex w-full items-start gap-4 rounded-[24px] border px-5 py-5 text-left transition duration-300 ${
                  active
                    ? 'scale-[0.985] border-rosewood/35 bg-gradient-to-r from-white to-haze shadow-soft'
                    : 'border-white/70 bg-white/70 hover:-translate-y-0.5 hover:border-mauve/30 hover:bg-white'
                }`}
              >
                <div
                  className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition ${
                    active
                      ? 'bg-ink text-white'
                      : 'bg-haze text-rosewood group-hover:bg-mauve/15'
                  }`}
                >
                  {option.label}
                </div>
                <div className="flex-1">
                  <div className="text-base leading-7 text-ink sm:text-[17px]">{option.text}</div>
                  <div className="mt-3 text-xs uppercase tracking-[0.28em] text-rosewood/45">
                    点击后自动切换下一题
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
