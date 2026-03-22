import { useEffect, useMemo, useState } from 'react';
import BrandMark from './components/BrandMark';
import LoadingScreen from './components/LoadingScreen';
import ModeCard from './components/ModeCard';
import ProgressBar from './components/ProgressBar';
import QuestionCard from './components/QuestionCard';
import ReportCard from './components/ReportCard';
import { getQuestionsByMode } from './data/questionBank';
import { exportPoster } from './lib/poster';
import { analyzeTest, formatDimensionBars } from './lib/scoring';
import { AnswerRecord, PersistedSession, TestMode } from './lib/types';

const ATTEMPTS_KEY = 'les-hidden-persona-attempts-v1';
const SESSION_KEY = 'les-hidden-persona-session-v1';
const MAX_ATTEMPTS = 3;
const LOADING_STEPS = ['读取答案倾向...', '比对 6 种人格原型...', '建模恋爱与社交轨迹...', '生成你的专属报告...'];

const defaultSession: PersistedSession = {
  view: 'home',
  mode: null,
  answers: [],
  currentIndex: 0,
  result: null
};

const readAttempts = () => {
  const raw = window.localStorage.getItem(ATTEMPTS_KEY);
  const parsed = raw ? Number(raw) : MAX_ATTEMPTS;
  if (Number.isNaN(parsed)) return MAX_ATTEMPTS;
  return Math.min(MAX_ATTEMPTS, Math.max(0, parsed));
};

const readSession = (): PersistedSession => {
  const raw = window.localStorage.getItem(SESSION_KEY);
  if (!raw) return defaultSession;

  try {
    const parsed = JSON.parse(raw) as PersistedSession;
    return {
      view: parsed.view ?? 'home',
      mode: parsed.mode ?? null,
      answers: parsed.answers ?? [],
      currentIndex: parsed.currentIndex ?? 0,
      result: parsed.result ?? null
    };
  } catch {
    return defaultSession;
  }
};

const buildHash = (session: PersistedSession) => {
  if (session.view === 'quiz' && session.mode) {
    return `#/quiz/${session.mode}/${session.currentIndex + 1}`;
  }
  if (session.view === 'loading' && session.mode) {
    return `#/loading/${session.mode}`;
  }
  if (session.view === 'result' && session.result) {
    return `#/result/${session.result.profile.code.toLowerCase()}`;
  }
  return '#/';
};

const App = () => {
  const [attemptsRemaining, setAttemptsRemaining] = useState<number>(() => readAttempts());
  const [session, setSession] = useState<PersistedSession>(() => readSession());
  const [loadingStep, setLoadingStep] = useState(0);
  const [revealedCards, setRevealedCards] = useState(1);
  const [exporting, setExporting] = useState(false);

  const questions = useMemo(
    () => (session.mode ? getQuestionsByMode(session.mode) : []),
    [session.mode]
  );

  const currentQuestion = session.mode ? questions[session.currentIndex] : null;
  const selectedIndex =
    currentQuestion == null
      ? null
      : session.answers.find((item) => item.questionId === currentQuestion.id)?.optionIndex ?? null;

  useEffect(() => {
    window.localStorage.setItem(ATTEMPTS_KEY, String(attemptsRemaining));
  }, [attemptsRemaining]);

  useEffect(() => {
    if (session.view === 'home') {
      window.localStorage.removeItem(SESSION_KEY);
    } else {
      window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    }
    window.history.replaceState(null, '', buildHash(session));
  }, [session]);

  useEffect(() => {
    if (session.view !== 'loading' || !session.mode) return;

    setLoadingStep(0);
    const timers = LOADING_STEPS.map((_, index) =>
      window.setTimeout(() => setLoadingStep(index), index * 820)
    );

    const finishTimer = window.setTimeout(() => {
      const result = analyzeTest(session.mode as TestMode, session.answers);
      setSession((prev) => ({
        ...prev,
        view: 'result',
        result
      }));
    }, LOADING_STEPS.length * 820 + 680);

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      window.clearTimeout(finishTimer);
    };
  }, [session.view, session.mode, session.answers]);

  useEffect(() => {
    if (session.view !== 'result' || !session.result) return;
    setRevealedCards(1);
    const totalCards = session.result.sections.length + 2;
    const timer = window.setInterval(() => {
      setRevealedCards((prev) => {
        if (prev >= totalCards) {
          window.clearInterval(timer);
          return prev;
        }
        return prev + 1;
      });
    }, 240);

    return () => window.clearInterval(timer);
  }, [session.view, session.result]);

  const resetHome = () => {
    setSession(defaultSession);
    setLoadingStep(0);
    setRevealedCards(1);
  };

  const startTest = (mode: TestMode) => {
    if (attemptsRemaining <= 0) return;
    setAttemptsRemaining((value) => value - 1);
    setSession({
      view: 'quiz',
      mode,
      answers: [],
      currentIndex: 0,
      result: null
    });
  };

  const handleSelect = (optionIndex: number) => {
    if (!session.mode) return;
    const question = questions[session.currentIndex];
    if (!question) return;

    const nextAnswers = [...session.answers];
    const answer: AnswerRecord = {
      questionId: question.id,
      optionIndex
    };

    const existingIndex = nextAnswers.findIndex((item) => item.questionId === question.id);
    if (existingIndex >= 0) {
      nextAnswers[existingIndex] = answer;
    } else {
      nextAnswers.push(answer);
    }

    const isLast = session.currentIndex >= questions.length - 1;

    setSession((prev) => ({
      ...prev,
      answers: nextAnswers,
      currentIndex: isLast ? prev.currentIndex : prev.currentIndex + 1,
      view: isLast ? 'loading' : 'quiz'
    }));
  };

  const handlePrev = () => {
    setSession((prev) => ({
      ...prev,
      currentIndex: Math.max(0, prev.currentIndex - 1)
    }));
  };

  const handleExport = async () => {
    if (!session.result || exporting) return;
    setExporting(true);
    await exportPoster(session.result);
    window.setTimeout(() => setExporting(false), 500);
  };

  return (
    <div className="min-h-screen px-4 py-6 sm:px-6 sm:py-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <BrandMark />
          <div className="pill">
            <span>剩余测试次数</span>
            <span className="text-base font-semibold text-ink">{attemptsRemaining}</span>
          </div>
        </header>

        {session.view === 'home' ? (
          <main className="grid gap-6 lg:grid-cols-[1.2fr_0.9fr]">
            <section className="glass-card relative overflow-hidden px-6 py-8 sm:px-10 sm:py-12">
              <div className="absolute -left-12 top-0 h-40 w-40 rounded-full bg-blush/35 blur-3xl" />
              <div className="absolute bottom-0 right-0 h-48 w-48 rounded-full bg-mauve/20 blur-3xl" />

              <div className="pill">沉浸式互动测试</div>
              <h1 className="mt-6 max-w-3xl font-display text-4xl leading-[1.12] text-ink sm:text-6xl">
                你在姬圈，到底是什么
                <br />
                隐藏人格属性？
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-rosewood/78 sm:text-lg">
                不是教科书式标签，也不是干巴巴的二选一。这里测的是你在暧昧、拉扯、恋爱、社交和搞钱场景里的真实反应，
                看你到底是清冷扳手、软萌甜 P、帅 T 气场，还是那种最会切频道的高适配类型。
              </p>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                <div className="soft-card p-5">
                  <div className="text-sm text-rosewood/65">交互体验</div>
                  <div className="mt-2 text-xl text-ink">返回上一题 + 丝滑切题</div>
                </div>
                <div className="soft-card p-5">
                  <div className="text-sm text-rosewood/65">结果内容</div>
                  <div className="mt-2 text-xl text-ink">上头感强，可直接截图分享</div>
                </div>
                <div className="soft-card p-5">
                  <div className="text-sm text-rosewood/65">限制机制</div>
                  <div className="mt-2 text-xl text-ink">每位用户默认 3 次机会</div>
                </div>
              </div>
            </section>

            <section className="grid gap-6">
              <ModeCard
                title="尝鲜版"
                subtitle="30 题，碎片时间也能快速出结果"
                description="适合先快速测一轮，题量轻、节奏快，几分钟就能拿到你的姬圈核心属性画像。"
                countLabel="快节奏体验 · 30 题"
                badge="QUICK MODE"
                onStart={() => startTest('quick')}
                disabled={attemptsRemaining <= 0}
              />
              <ModeCard
                title="完整版"
                subtitle="80 题，深度拉满，结果更细更准"
                description="包含更多暧昧拉扯、关系边界、人际伪装、搞钱态度和亲密节奏题，适合认真玩一次。"
                countLabel="深度解析 · 80 题"
                badge="FULL MODE"
                onStart={() => startTest('full')}
                disabled={attemptsRemaining <= 0}
              />
            </section>
          </main>
        ) : null}

        {session.view === 'quiz' && currentQuestion ? (
          <main className="mx-auto max-w-4xl animate-fadeSlideIn">
            <div className="mb-5">
              <ProgressBar
                current={session.currentIndex + 1}
                total={questions.length}
                label={session.mode === 'quick' ? '尝鲜版进度' : '完整版进度'}
              />
            </div>
            <QuestionCard
              question={currentQuestion}
              current={session.currentIndex + 1}
              total={questions.length}
              selectedIndex={selectedIndex}
              onSelect={handleSelect}
              onPrev={handlePrev}
            />
            <div className="mt-4 text-center text-sm text-rosewood/65">
              选项点击后将自动切换下一题，支持返回上一题重选。
            </div>
          </main>
        ) : null}

        {session.view === 'loading' ? (
          <LoadingScreen
            progress={Math.round(((loadingStep + 1) / LOADING_STEPS.length) * 100)}
            steps={LOADING_STEPS}
            activeStep={loadingStep}
          />
        ) : null}

        {session.view === 'result' && session.result ? (
          <main className="mx-auto max-w-5xl space-y-6">
            <section className="glass-card overflow-hidden p-6 sm:p-8">
              <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                <div>
                  <div className="pill mb-5">
                    <span>{session.mode === 'quick' ? '尝鲜版报告' : '完整版报告'}</span>
                    <span>{session.result.profile.code}</span>
                  </div>
                  <h1 className="font-display text-4xl leading-tight text-ink sm:text-5xl">
                    {session.result.profile.name}
                  </h1>
                  <p className="mt-4 text-lg leading-8 text-rosewood/82">{session.result.profile.oneLiner}</p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    {session.result.topTraits.map((trait) => (
                      <span key={trait} className="pill">
                        {trait}
                      </span>
                    ))}
                  </div>

                  <div className="mt-8 rounded-[28px] bg-gradient-to-br from-white to-haze p-5 shadow-soft">
                    <div className="flex items-center justify-between text-sm text-rosewood/75">
                      <span>💘 吸引力评分</span>
                      <span>{session.result.attractionScore} / 100</span>
                    </div>
                    <div className="mt-3 h-3 overflow-hidden rounded-full bg-white">
                      <div
                        className="h-full rounded-full bg-[linear-gradient(90deg,#e8c9cf,#a08ba7,#6e5566)] transition-all duration-700"
                        style={{ width: `${session.result.attractionScore}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="soft-card h-full p-5">
                  <div className="text-sm text-rosewood/65">适合截图分享的一句话</div>
                  <div className="mt-4 text-2xl leading-10 text-ink">{session.result.summary}</div>

                  <div className="mt-8 space-y-4">
                    {formatDimensionBars(session.result.dimensions).map((item) => (
                      <div key={item.key}>
                        <div className="mb-2 flex items-center justify-between text-sm text-rosewood/72">
                          <span>{item.label}</span>
                          <span>{item.value}</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-haze">
                          <div
                            className="h-full rounded-full bg-[linear-gradient(90deg,#f0d8dd,#b29ab7,#6e5566)]"
                            style={{ width: `${item.value}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {session.result.sections.slice(0, Math.max(0, revealedCards - 1)).map((section) => (
              <ReportCard
                key={section.id}
                icon={section.icon}
                title={section.title}
                content={section.content}
              />
            ))}

            {revealedCards > session.result.sections.length && (
              <ReportCard
                icon="💘"
                title="姬圈契合度配对"
                content={`天生一对：${session.result.matchSummary}\n\n绝对相克：${session.result.clashSummary}`}
              />
            )}

            {revealedCards > session.result.sections.length + 1 && (
              <section className="grid gap-4 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={handleExport}
                  className="rounded-[24px] bg-ink px-6 py-5 text-base text-white transition hover:-translate-y-0.5 hover:shadow-soft"
                >
                  {exporting ? '正在生成海报...' : '生成分享海报'}
                </button>
                <button
                  type="button"
                  onClick={resetHome}
                  className="rounded-[24px] border border-rosewood/15 bg-white/75 px-6 py-5 text-base text-ink transition hover:-translate-y-0.5 hover:shadow-soft"
                >
                  返回首页
                </button>
              </section>
            )}
          </main>
        ) : null}
      </div>
    </div>
  );
};

export default App;
