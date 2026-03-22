type ModeCardProps = {
  title: string;
  subtitle: string;
  description: string;
  countLabel: string;
  badge: string;
  onStart: () => void;
  disabled?: boolean;
};

const ModeCard = ({
  title,
  subtitle,
  description,
  countLabel,
  badge,
  onStart,
  disabled = false
}: ModeCardProps) => {
  return (
    <div className="glass-card relative overflow-hidden p-6 sm:p-7">
      <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-mauve/10 blur-2xl" />
      <div className="pill mb-5">{badge}</div>
      <div className="font-display text-3xl text-ink">{title}</div>
      <div className="mt-2 text-base text-rosewood/78">{subtitle}</div>
      <div className="mt-5 text-sm leading-7 text-rosewood/72">{description}</div>
      <div className="mt-6 flex items-center justify-between">
        <span className="text-sm text-rosewood/70">{countLabel}</span>
        <button
          type="button"
          onClick={onStart}
          disabled={disabled}
          className="rounded-full bg-ink px-5 py-3 text-sm font-medium text-white transition duration-300 hover:-translate-y-0.5 hover:shadow-soft disabled:cursor-not-allowed disabled:bg-rosewood/35"
        >
          {disabled ? '次数已用完' : '开始测试'}
        </button>
      </div>
    </div>
  );
};

export default ModeCard;
