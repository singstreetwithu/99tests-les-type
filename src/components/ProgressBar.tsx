type ProgressBarProps = {
  current: number;
  total: number;
  label?: string;
};

const ProgressBar = ({ current, total, label }: ProgressBarProps) => {
  const progress = Math.min(100, Math.max(0, Math.round((current / total) * 100)));

  return (
    <div className="soft-card p-4 sm:p-5">
      <div className="mb-3 flex items-center justify-between text-sm text-rosewood/75">
        <span>{label ?? '测试进度'}</span>
        <span>
          {current}/{total}
        </span>
      </div>
      <div className="relative h-3 overflow-hidden rounded-full bg-haze">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-[linear-gradient(90deg,#e8c9cf,#a08ba7,#6e5566)] bg-[length:200%_100%] shadow-soft transition-all duration-500 ease-out animate-shimmer"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
