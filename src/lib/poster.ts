import { TestAnalysis } from './types';

const wrapText = (
  context: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
) => {
  const chars = [...text];
  let line = '';
  let lineY = y;

  chars.forEach((char) => {
    const next = line + char;
    if (context.measureText(next).width > maxWidth && line) {
      context.fillText(line, x, lineY);
      line = char;
      lineY += lineHeight;
    } else {
      line = next;
    }
  });

  if (line) {
    context.fillText(line, x, lineY);
  }

  return lineY;
};

export const exportPoster = async (analysis: TestAnalysis) => {
  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 1920;
  const context = canvas.getContext('2d');

  if (!context) return;

  const gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, '#fffaf7');
  gradient.addColorStop(0.45, '#f7e8ec');
  gradient.addColorStop(1, '#e7d2dc');
  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.fillStyle = 'rgba(255,255,255,0.72)';
  context.beginPath();
  context.roundRect(72, 96, 936, 1728, 40);
  context.fill();

  context.fillStyle = '#6e5566';
  context.font = '600 34px "PingFang SC"';
  context.fillText('姬圈属性隐藏人格测试', 124, 170);

  context.fillStyle = '#b29ab7';
  context.beginPath();
  context.arc(884, 170, 22, 0, Math.PI * 2);
  context.fill();
  context.beginPath();
  context.arc(930, 148, 14, 0, Math.PI * 2);
  context.fill();

  context.fillStyle = '#2d2330';
  context.font = '600 72px "PingFang SC"';
  context.fillText(analysis.profile.name, 124, 320);

  context.fillStyle = '#8c7486';
  context.font = '500 32px "PingFang SC"';
  context.fillText(analysis.profile.code, 124, 378);

  context.fillStyle = '#2d2330';
  context.font = '500 42px "PingFang SC"';
  wrapText(context, analysis.profile.oneLiner, 124, 468, 820, 60);

  context.fillStyle = '#6e5566';
  context.font = '600 30px "PingFang SC"';
  context.fillText(`吸引力评分 ${analysis.attractionScore}`, 124, 650);

  context.fillStyle = 'rgba(178, 154, 183, 0.16)';
  context.beginPath();
  context.roundRect(124, 690, 820, 22, 999);
  context.fill();

  const barGradient = context.createLinearGradient(124, 690, 944, 690);
  barGradient.addColorStop(0, '#e8c9cf');
  barGradient.addColorStop(1, '#96779b');
  context.fillStyle = barGradient;
  context.beginPath();
  context.roundRect(124, 690, 8.2 * analysis.attractionScore, 22, 999);
  context.fill();

  context.fillStyle = '#2d2330';
  context.font = '600 34px "PingFang SC"';
  context.fillText('你的核心气质', 124, 810);

  context.font = '400 30px "PingFang SC"';
  wrapText(context, analysis.summary, 124, 872, 820, 48);

  context.font = '600 34px "PingFang SC"';
  context.fillText('高频标签', 124, 1110);

  let chipX = 124;
  analysis.topTraits.forEach((trait) => {
    const width = context.measureText(trait).width + 56;
    context.fillStyle = 'rgba(255,255,255,0.86)';
    context.beginPath();
    context.roundRect(chipX, 1140, width, 54, 999);
    context.fill();
    context.fillStyle = '#6e5566';
    context.font = '500 26px "PingFang SC"';
    context.fillText(trait, chipX + 28, 1176);
    chipX += width + 18;
  });

  context.fillStyle = '#2d2330';
  context.font = '600 34px "PingFang SC"';
  context.fillText('天生一对', 124, 1318);
  context.font = '400 28px "PingFang SC"';
  wrapText(context, analysis.matchSummary, 124, 1376, 820, 46);

  context.font = '600 34px "PingFang SC"';
  context.fillText('绝对相克', 124, 1600);
  context.font = '400 28px "PingFang SC"';
  wrapText(context, analysis.clashSummary, 124, 1658, 820, 46);

  context.fillStyle = '#8c7486';
  context.font = '500 24px "PingFang SC"';
  context.fillText('长按保存测试海报，发给那个最懂你的人。', 124, 1778);

  const link = document.createElement('a');
  link.download = `${analysis.profile.code.toLowerCase()}-poster.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
};
