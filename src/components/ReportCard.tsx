type ReportCardProps = {
  icon?: string;
  title: string;
  content: string;
};

const ReportCard = ({ icon, title, content }: ReportCardProps) => {
  return (
    <div className="soft-card animate-fadeSlideIn p-6 sm:p-7">
      <div className="mb-4 flex items-center gap-3">
        {icon ? <div className="text-xl">{icon}</div> : null}
        <h3 className="font-display text-2xl text-ink">{title}</h3>
      </div>
      <div className="whitespace-pre-line text-[15px] leading-8 text-rosewood/82 sm:text-base">
        {content}
      </div>
    </div>
  );
};

export default ReportCard;
