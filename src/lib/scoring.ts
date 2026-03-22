import { ARCHETYPE_ORDER, RESULT_PROFILES } from '../data/resultProfiles';
import { getQuestionsByMode } from '../data/questionBank';
import {
  AnswerRecord,
  ArchetypeKey,
  DimensionKey,
  ReportSection,
  TestAnalysis,
  TestMode
} from './types';

const dimensionNames: Record<DimensionKey, string> = {
  warmth: '情绪温度',
  control: '掌控感',
  intensity: '张力值',
  openness: '表达欲'
};

const compatibilityReasons: Record<
  ArchetypeKey,
  { best: string; worst: string }
> = {
  wrench: {
    best: '你需要一个能把你从克制里拉出来、又不逼你失控的人。年下小狗型会主动给你热度，你反而会因为对方的坦率而慢慢放下防备。',
    worst: '你和帅T气场型都太想稳住局面，两个人都强时，拉扯会很有火花，但也容易谁都不先低头。'
  },
  sweetP: {
    best: '温柔姐姐型最会接你的情绪，也愿意把照顾落在具体行动上。你会被宠得很安心，对方也会因为你的回应感得到满足。',
    worst: '清冷姬圈扳手的边界和慢热，会让你很容易在前期反复怀疑自己是不是没被偏爱。'
  },
  auraT: {
    best: '软萌甜P型会把你的主导力转化成被需要感，让你的强势有温度、有落点，不会只是硬碰硬。',
    worst: '清冷姬圈扳手同样重边界、重掌控，吸引是强的，但长期容易变成互相试探谁先松。'
  },
  gentleSis: {
    best: '软萌甜P型会很吃你这种稳定、温柔、愿意落地照顾的能量，你的付出能被看见，也容易形成高甜高黏的正反馈。',
    worst: '年下小狗型会让你心动，但她的节奏太快、情绪起伏太直接时，你会逐渐感到自己一直在收拾残局。'
  },
  versatileH: {
    best: '帅T气场型能给你明确方向，你则负责把关系里的棱角磨平，这种搭配很容易形成强执行力和高舒适度并存的组合。',
    worst: '全能百搭H型和你太像时，表面什么都能聊、什么都能接，实际上容易因为彼此都太会看场面而缺少真正的推进行为。'
  },
  puppy: {
    best: '清冷姬圈扳手会给你边界和稳感，而你负责提供热度和主动。一个负责把氛围点亮，一个负责让关系落地，反差很上头。',
    worst: '温柔姐姐型前期会很照顾你，但如果你一直太冲、太黏、太情绪化，对方会慢慢感到疲惫。'
  }
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const normalizeDimension = (value: number, questionCount: number) => {
  const maxScore = questionCount * 3;
  return clamp(Math.round((value / maxScore) * 100), 18, 96);
};

const pickTraitLabels = (dimensions: Record<DimensionKey, number>) => {
  const traits: string[] = [];

  traits.push(dimensions.warmth >= 68 ? '会接情绪' : '克制但不冷');
  traits.push(dimensions.control >= 68 ? '掌控感在线' : '不爱硬控');
  traits.push(dimensions.intensity >= 66 ? '张力很强' : '细水长流');
  traits.push(dimensions.openness >= 66 ? '表达欲真诚' : '慢热反差');

  return traits;
};

const getDimensionTone = (dimensions: Record<DimensionKey, number>) => {
  const warmthTone =
    dimensions.warmth >= 70
      ? '你很会接情绪，别人一难过就会本能想找你，因为你不是只会说大道理的人。'
      : '你的温柔是藏着的，不会到处外露，但关键时刻很少真的缺席。';

  const controlTone =
    dimensions.control >= 70
      ? '你对关系和生活都有明显的秩序偏好，不爱失控，也不爱长期模糊。'
      : '你不喜欢把人和关系卡得太死，更相信气氛、感觉和彼此自觉。';

  const intensityTone =
    dimensions.intensity >= 68
      ? '你的张力值偏高，喜欢的时候不会完全装没事，氛围一旦对了，你会很会推着关系往前。'
      : '你不是没有火花，你只是更擅长把喜欢熬成持续而稳定的吸引。';

  const opennessTone =
    dimensions.openness >= 68
      ? '你表达欲并不低，喜欢会给信号，不太能长期待在全靠猜的关系里。'
      : '你更习惯先观察，再决定给多少，这种克制反而构成了你身上的反差感。';

  return [warmthTone, controlTone, intensityTone, opennessTone].join('');
};

const buildOverview = (
  primary: ArchetypeKey,
  secondary: ArchetypeKey,
  dimensions: Record<DimensionKey, number>
) => {
  const profile = RESULT_PROFILES[primary];
  const secondaryProfile = RESULT_PROFILES[secondary];

  return `${profile.hook}${getDimensionTone(dimensions)}你真正厉害的地方，不只是像 ${profile.name}，而是还带着一点 ${secondaryProfile.name} 的底色，所以你不会是单线程的人。别人初看你，可能会先被一种很鲜明的气质抓住；但真正靠近以后，往往会发现你还有第二层、第三层反差，这也是你最容易让人越陷越深的原因。你不一定是全场最吵、最显眼的那个，但你很容易成为那个“后来想起，还是会觉得很有后劲”的人。`;
};

const buildLoveSection = (
  primary: ArchetypeKey,
  dimensions: Record<DimensionKey, number>
) => {
  const ambivalence =
    dimensions.control >= 68
      ? '暧昧期的你，其实很擅长控节奏。你不会毫无保留地扑上去，而是会先观察对方的稳定度、诚意和持续性。一旦发现对方只是嘴上会说、行动不跟，你会迅速降温；但如果对方能给到明确回应，你又会在关键时刻非常会推关系往前。'
      : '暧昧期的你，本质上是靠感觉和火花在识别“这个人值不值得”。你不一定会立刻定义关系，但你会很看重互动的真实感。如果气氛对了、眼神对了、细节对了，你其实很容易上头，而且那种上头藏不太住。';

  const need =
    dimensions.warmth >= 70
      ? '真进入恋爱后，你最真实的需求不是轰轰烈烈，而是被稳定偏爱。你会通过很多看似小的东西来确认关系值不值继续，比如对方是否记得你的情绪周期、会不会在你低落时主动靠近、是不是愿意用行动把嘴上说的喜欢做实。'
      : '真进入恋爱后，你最需要的是尊重和稳定边界。你不是那种一恋爱就完全失去自己的人，反而越认真，越需要确认彼此都能在亲密里保留人格和节奏。你会很吃那种不黏但可靠、不过界但很有分寸的在意。';

  const jealousy =
    dimensions.openness >= 66
      ? '你吃醋的时候，不太适合长期憋着。你可能不会第一秒就翻脸，但只要那根刺扎得够深，你最后还是会想把事情讲出来。因为你很清楚，真正消耗关系的从来不是一次吃醋，而是吃醋以后装没事、然后慢慢长出心结。'
      : '你吃醋时的典型状态，是表面看不出太大波动，心里却已经开始重新评估很多东西。你会观察对方后续的行为、说话的细节、边界感有没有变差。如果这些信号都不对，你会比别人更快撤回投入。';

  const tension =
    dimensions.intensity >= 68
      ? '你的性张力来源，核心不是直白，而是你一旦认真靠近，整个人会带着非常鲜明的推进感。你会让对方感到“她是冲我来的”，这种明确、本能、带一点侵略性的专注感，本身就很容易让人心跳失序。'
      : '你的性张力来源，更像慢慢升温的压迫感。你未必动作很多，但你很会用停顿、眼神、语气和分寸把空气拉紧。越克制、越有余地，反而越容易让人自己在心里把剧情补完整。';

  return `${ambivalence}\n\n${need}\n\n${jealousy}\n\n${tension}\n\n如果把你放进“姬圈恋爱叙事”里，你不是最模板化的那种角色。你可能有照顾欲，也可能有主导欲，甚至在不同人面前会打开不同的频道。但无论外在表现是什么，你真正想要的从来不是表面热闹，而是那种既有拉扯感、又有落地感的亲密。换句话说，你能被撩到，但你不会长期留在一段只有刺激、没有交代的关系里。`;
};

const buildSocialSection = (
  primary: ArchetypeKey,
  dimensions: Record<DimensionKey, number>
) => {
  const socialMask =
    dimensions.openness >= 66
      ? '在朋友眼里，你通常不是最难接近的人，甚至很多时候还挺有存在感。你知道怎么把气氛接起来，也懂什么时候该给别人台阶、什么时候该让场子舒服。很多人会觉得你很会来事，但真正亲近的人才知道，你不是谁都愿意认真放进内圈。'
      : '在朋友眼里，你往往不是靠话多取胜的人。你可能显得克制、慢热，甚至有点不好读，但熟的人会知道你其实很稳，也很讲义气。你不是会把所有情绪都摊开的类型，所以很多人要靠相处久一点，才会发现你其实非常有后劲。';

  const bottomColor =
    primary === 'gentleSis' || primary === 'sweetP'
      ? '你的底色偏软，但这种软不是没边界，而是你真的有把别人放进心里的能力。只不过你一旦确认自己没有被好好珍惜，也会非常清醒地收回。'
      : primary === 'auraT' || primary === 'wrench'
        ? '你的底色偏强，外人容易先记住你的边界感、判断力和距离感。但真正了解你的人会发现，你不是冷，你只是不会把自己随便交出去。'
        : '你的社交底色偏灵活。你能在不同场域里切换状态，看起来像什么都能接，其实真正厉害的是你很会读场，也很会判断谁值得你投入。';

  return `${socialMask}\n\n${bottomColor}\n\n你在人际关系里的面具，通常是一层“我没事、我能接、我会处理”；但你的底色其实比别人以为的更敏感。你会记得谁在你状态差时有没有伸手、谁只是在热闹时靠近、谁在关键时刻能不能站到你这边。所以你的人际系统看起来很松，其实筛选机制一点都不松。`;
};

const buildCareerSection = (dimensions: Record<DimensionKey, number>) => {
  const careerStyle =
    dimensions.control >= 68 && dimensions.intensity >= 66
      ? '你在事业和职场里，天然带一点“把局面拎起来”的能力。团队一乱、目标一散、大家开始互相观望时，你往往会成为那个最先出手、把事情重新推回正轨的人。'
      : dimensions.warmth >= 68
        ? '你在职场里的强项，不一定是最会抢镜，而是很会让合作顺起来。你能看到流程里被忽视的坑，也能照顾到人的感受，所以很多难推进的协作，放到你手里反而能慢慢跑通。'
        : '你在职场里的优势，是判断相对冷静，不容易被一时情绪带跑。你很会看什么值得投入、什么只是短期噪音，所以做决定时往往比别人更能保住底盘。';

  const roleFit =
    dimensions.openness >= 66
      ? '你适合在需要沟通、协调、对外表达和关系推动的岗位里发光，因为你不仅能做事，还能带着气氛把事情做成。'
      : '你适合在需要稳定推进、判断、策略和执行质量的岗位里发力，因为你不太吃纯表演型的工作模式，反而擅长把结果做实。';

  return `${careerStyle}\n\n${roleFit}\n\n如果一定要说你适合的团队角色，你最像那种“既能上前台，也能稳后台”的人，只是侧重会因人格不同而变化。你不适合长期待在边界混乱、责任不清、全靠情绪驱动的团队里，因为那种环境会迅速消耗你对人的信任感和对事的耐心。`;
};

const buildRiskSection = (dimensions: Record<DimensionKey, number>) => {
  const risks = [
    dimensions.control >= 70 ? '容易因为太想稳住局面，而过早进入判断和管理模式，让对方觉得被审视。' : '容易因为太想保持氛围，而把真正的不满往后拖，最后积成一次爆发。',
    dimensions.warmth >= 70 ? '对关系投入很真，一旦对方长期接不住，你会从心软一路耗到心冷。' : '看起来不吵不闹，但心里其实记账，一旦失望攒够会直接后撤。',
    dimensions.intensity >= 68 ? '上头时推进很快，容易把高浓度互动误判成高稳定度关系。' : '太会克制自己，容易让对方误以为你不够在乎，从而错过本来能推进的节点。'
  ];

  return `你的高频雷点主要有这几个：${risks.join('')}真正容易导致分手的，不一定是一次大吵，而是长期的不对齐，比如边界反复被踩、承诺没有兑现、亲密和现实节奏一直错位。你情绪暴走时不一定最吵，但会很有杀伤力：要么讲话突然变得特别锋利，要么整个人一下抽离，冷得让对方意识到你是真的在后退。`;
};

const buildAdviceSection = (
  primary: ArchetypeKey,
  dimensions: Record<DimensionKey, number>
) => {
  const first =
    primary === 'wrench' || primary === 'auraT'
      ? '你的课题不是变得更强，而是学会在确定安全的时候，把真实需求说出来。有人喜欢你，不代表她自动懂你；你不表达，对方就只能猜。'
      : '你的课题不是变得更懂事，而是别把“我能理解”用成对自己感受的长期压缩。能共情别人很好，但一段关系不能总靠你来消化全部波动。';

  const second =
    dimensions.control >= 68
      ? '想提升关系稳定性，关键不是把一切都安排好，而是让对方也参与定义规则。真正稳的关系，不是一个人扛秩序，而是两个人共同维护秩序。'
      : '想提升关系稳定性，关键不是永远顺着感觉走，而是在重要节点学会给关系一个更明确的交代。喜欢、边界、期待、底线，这些都值得被说清。';

  const third =
    dimensions.openness >= 66
      ? '找对的人时，你要看的是对方能不能接住你的真诚，而不是只会被你的热度吸引。能让你上头的人很多，能让你安心的人才值得留下。'
      : '找对的人时，你要看的是对方有没有耐心穿过你的慢热和克制，而不是催你立刻交出全部。愿意理解你的节奏，本身就是筛选器。';

  return `${first}\n\n${second}\n\n${third}\n\n你的人生总体自洽建议其实很简单：别为了被喜欢，放弃自己的节奏；也别为了自保，把真正想要的关系挡在门外。你最适合的是那种既能让你放松，又能让你保有尊严和主体感的连接。`;
};

export const analyzeTest = (mode: TestMode, answers: AnswerRecord[]): TestAnalysis => {
  const questions = getQuestionsByMode(mode);
  const archetypeScores = {
    wrench: 0,
    sweetP: 0,
    auraT: 0,
    gentleSis: 0,
    versatileH: 0,
    puppy: 0
  };
  const rawDimensions = {
    warmth: 0,
    control: 0,
    intensity: 0,
    openness: 0
  };

  answers.forEach(({ questionId, optionIndex }) => {
    const question = questions.find((item) => item.id === questionId);
    const option = question?.options[optionIndex];
    if (!option) return;

    Object.entries(option.weights.archetypes).forEach(([key, value]) => {
      archetypeScores[key as ArchetypeKey] += value ?? 0;
    });

    Object.entries(option.weights.dimensions).forEach(([key, value]) => {
      rawDimensions[key as DimensionKey] += value ?? 0;
    });
  });

  const sorted = [...ARCHETYPE_ORDER].sort((a, b) => archetypeScores[b] - archetypeScores[a]);
  const primary = sorted[0];
  const secondary = sorted[1];

  const dimensions: Record<DimensionKey, number> = {
    warmth: normalizeDimension(rawDimensions.warmth, questions.length),
    control: normalizeDimension(rawDimensions.control, questions.length),
    intensity: normalizeDimension(rawDimensions.intensity, questions.length),
    openness: normalizeDimension(rawDimensions.openness, questions.length)
  };

  const attractionScore = clamp(
    Math.round(
      54 +
        archetypeScores[primary] * 0.7 +
        dimensions.warmth * 0.12 +
        dimensions.intensity * 0.16 +
        dimensions.openness * 0.08
    ),
    62,
    98
  );

  const matchReason = compatibilityReasons[primary];
  const profile = RESULT_PROFILES[primary];
  const secondaryProfile = RESULT_PROFILES[secondary];

  const sections: ReportSection[] = [
    {
      id: 'overview',
      icon: '✨',
      title: '人格大段概述',
      content: buildOverview(primary, secondary, dimensions)
    },
    {
      id: 'love',
      icon: '💞',
      title: '恋爱与情感面',
      content: buildLoveSection(primary, dimensions)
    },
    {
      id: 'social',
      icon: '🤝',
      title: '人际交往面',
      content: buildSocialSection(primary, dimensions)
    },
    {
      id: 'career',
      icon: '💼',
      title: '搞钱 / 职场面',
      content: buildCareerSection(dimensions)
    },
    {
      id: 'risks',
      icon: '⚠️',
      title: '恋爱风险与雷点',
      content: buildRiskSection(dimensions)
    },
    {
      id: 'advice',
      icon: '🧭',
      title: '总体行动建议',
      content: buildAdviceSection(primary, dimensions)
    }
  ];

  return {
    mode,
    profile,
    secondaryProfile,
    attractionScore,
    archetypeScores,
    dimensions,
    summary: `${profile.oneLiner} 你身上最抓人的地方，是 ${profile.name} 的主线气质里，还混着 ${secondaryProfile.name} 的第二层反差。`,
    hookLine: profile.hook,
    topTraits: pickTraitLabels(dimensions),
    matchSummary: `${RESULT_PROFILES[profile.bestMatch].name}：${matchReason.best}`,
    clashSummary: `${RESULT_PROFILES[profile.worstMatch].name}：${matchReason.worst}`,
    sections
  };
};

export const formatDimensionBars = (dimensions: Record<DimensionKey, number>) =>
  (Object.keys(dimensions) as DimensionKey[]).map((key) => ({
    key,
    label: dimensionNames[key],
    value: dimensions[key]
  }));
