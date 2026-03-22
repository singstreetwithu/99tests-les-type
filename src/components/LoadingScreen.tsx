type LoadingScreenProps = {
  progress: number;
  steps: string[];
  activeStep: number;
};

const LoadingScreen = ({ progress, steps, activeStep }: LoadingScreenProps) => {
  return (
    <div className="mx-auto max-w-2xl animate-fadeSlideIn px-4 py-14 sm:px-6 sm:py-24">
      <div className="glass-card relative overflow-hidden px-6 py-10 text-center sm:px-10 sm:py-14">
        <div className="absolute left-1/2 top-24 h-32 w-32 -translate-x-1/2 rounded-full border border-mauve/25" />
        <div className="absolute left-1/2 top-24 h-32 w-32 -translate-x-1/2 rounded-full border border-mauve/30 animate-pulseRing" />
        <div className="mx-auto mt-8 flex h-32 w-32 items-center justify-center rounded-full bg-white/80 shadow-soft">
          <div className="h-14 w-14 rounded-[20px] bg-gradient-to-br from-blush via-white to-mauve shadow-soft" />
        </div>
        <div className="mt-8 font-display text-4xl text-ink">分析中...</div>
        <div className="mt-3 text-base text-rosewood/78">建模中、校准中、正在把你的隐藏属性拉出来。</div>

        <div className="mt-10 overflow-hidden rounded-full bg-haze">
          <div
            className="h-3 rounded-full bg-[linear-gradient(90deg,#e8c9cf,#a08ba7,#6e5566)] transition-all duration-700"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mt-8 space-y-3 text-left">
          {steps.map((step, index) => {
            const active = index <= activeStep;
            return (
              <div
                key={step}
                className={`rounded-2xl border px-4 py-4 text-sm transition ${
                  active
                    ? 'border-white/70 bg-white/75 text-ink shadow-soft'
                    : 'border-transparent bg-white/35 text-rosewood/55'
                }`}
              >
                {step}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
