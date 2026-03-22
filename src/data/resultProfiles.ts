import { ArchetypeKey, ResultProfile } from '../lib/types';

export const RESULT_PROFILES: Record<ArchetypeKey, ResultProfile> = {
  wrench: {
    key: 'wrench',
    name: '清冷姬圈扳手',
    code: 'ICE-WRENCH',
    oneLiner: '你不是高冷，你是那种越克制越让人想靠近的危险反差。',
    hook: '表面像冰面，真正熟了之后反而是最会稳稳接住人的那种。',
    taglines: ['边界感强', '反差张力重', '慢热但拿捏'],
    bestMatch: 'puppy',
    worstMatch: 'auraT'
  },
  sweetP: {
    key: 'sweetP',
    name: '软萌甜P型',
    code: 'SOFT-PULSE',
    oneLiner: '你身上的甜不是装可爱，是让人想下意识偏爱你的柔软磁场。',
    hook: '你看起来很好哄，其实真正想要的是稳定、偏爱和被认真照顾。',
    taglines: ['情绪价值高', '氛围感强', '柔软但有倔劲'],
    bestMatch: 'gentleSis',
    worstMatch: 'wrench'
  },
  auraT: {
    key: 'auraT',
    name: '帅T气场型',
    code: 'AURA-T',
    oneLiner: '你一靠近，空气里就自动有了“这人很会拿主意”的压迫感和安全感。',
    hook: '你不一定总说很多，但在关键时刻永远像能把局面拉回正轨的人。',
    taglines: ['主导欲在线', '行动力强', '自带压场'],
    bestMatch: 'sweetP',
    worstMatch: 'wrench'
  },
  gentleSis: {
    key: 'gentleSis',
    name: '温柔姐姐型',
    code: 'VELVET-SIS',
    oneLiner: '你最狠的地方，是温柔得让人自己就想把心交出来。',
    hook: '你会照顾人，但不是滥好人，你的温柔里一直有判断和分寸。',
    taglines: ['照顾型稳定感', '情绪容纳高', '细节控'],
    bestMatch: 'sweetP',
    worstMatch: 'puppy'
  },
  versatileH: {
    key: 'versatileH',
    name: '全能百搭H型',
    code: 'SHIFT-H',
    oneLiner: '你最致命的不是某一种属性，而是你太会看气氛、太会切频道。',
    hook: '你可进可退，可甜可稳，最擅长在关系里找到双方都舒服的平衡点。',
    taglines: ['适配力强', '会观察场', '进退有度'],
    bestMatch: 'auraT',
    worstMatch: 'versatileH'
  },
  puppy: {
    key: 'puppy',
    name: '年下小狗型',
    code: 'YOUNG-SPARK',
    oneLiner: '你身上的热烈感很难藏，一上头就像把氛围直接点燃。',
    hook: '你看起来冲得快，其实不是不认真，而是喜欢就会本能地往前跑。',
    taglines: ['热情直接', '表达感强', '黏人但真诚'],
    bestMatch: 'wrench',
    worstMatch: 'gentleSis'
  }
};

export const ARCHETYPE_ORDER: ArchetypeKey[] = [
  'wrench',
  'sweetP',
  'auraT',
  'gentleSis',
  'versatileH',
  'puppy'
];
