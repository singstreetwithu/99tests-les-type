const BrandMark = () => {
  return (
    <div className="flex items-center gap-4">
      <div className="relative h-14 w-14 animate-floaty">
        <div className="absolute inset-0 rounded-[20px] bg-gradient-to-br from-blush via-white to-mauve shadow-soft" />
        <div className="absolute left-3 top-3 h-8 w-8 rotate-45 rounded-xl border border-rosewood/20 bg-white/60" />
        <div className="absolute right-2 top-2 h-3 w-3 rounded-full bg-mauve/70" />
        <div className="absolute bottom-2 left-2 h-2.5 w-2.5 rounded-full bg-rosewood/70" />
      </div>
      <div>
        <div className="font-display text-lg tracking-[0.22em] text-rosewood">HIDDEN PERSONA</div>
        <div className="text-sm text-rosewood/70">姬圈属性隐藏人格测试</div>
      </div>
    </div>
  );
};

export default BrandMark;
