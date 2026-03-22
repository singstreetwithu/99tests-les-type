import { Question, TestMode, WeightedScores } from '../lib/types';

type PresetKey =
  | 'comfortVsFix'
  | 'chaseVsHold'
  | 'publicClaimVsPrivate'
  | 'jealousyTalkVsWithdraw'
  | 'planVsSpontaneity'
  | 'socialLeadVsObserve'
  | 'stayUpVsGiveSpace'
  | 'instantTextVsMeasured'
  | 'grandSurpriseVsPractical'
  | 'boundariesVsFusion'
  | 'defendNowVsAftercare'
  | 'leadProjectVsSupport'
  | 'handmadeVsUseful'
  | 'physicalTeaseVsWordplay'
  | 'heartVsLogic'
  | 'repairNowVsCoolDown'
  | 'futurePlanVsPresent'
  | 'highContactVsStableDistance'
  | 'caretakerVsSpoil'
  | 'spotlightVsShadow'
  | 'directNeedVsHint'
  | 'protectRoutineVsAdventure'
  | 'moneyMoveVsMeaning'
  | 'closureVsDelay'
  | 'sensualSlowVsSparkFast';

const score = (
  archetypes: WeightedScores['archetypes'],
  dimensions: WeightedScores['dimensions']
): WeightedScores => ({
  archetypes,
  dimensions
});

const PRESETS: Record<PresetKey, [WeightedScores, WeightedScores, WeightedScores]> = {
  comfortVsFix: [
    score({ gentleSis: 3, sweetP: 2, puppy: 1 }, { warmth: 3, openness: 1 }),
    score({ auraT: 2, wrench: 3 }, { control: 3, intensity: 1 }),
    score({ versatileH: 2, gentleSis: 1 }, { warmth: 2, control: 2, openness: 2 })
  ],
  chaseVsHold: [
    score({ puppy: 3, auraT: 2 }, { intensity: 3, openness: 2 }),
    score({ wrench: 3, sweetP: 1 }, { control: 3, warmth: 1 }),
    score({ versatileH: 2, gentleSis: 1 }, { control: 2, openness: 2 })
  ],
  publicClaimVsPrivate: [
    score({ auraT: 2, gentleSis: 2 }, { intensity: 2, control: 2, warmth: 1 }),
    score({ wrench: 3, sweetP: 1 }, { control: 3, warmth: 1 }),
    score({ versatileH: 3 }, { warmth: 2, openness: 2 })
  ],
  jealousyTalkVsWithdraw: [
    score({ auraT: 2, gentleSis: 2 }, { control: 2, intensity: 2, warmth: 1 }),
    score({ wrench: 3 }, { control: 3, warmth: 1 }),
    score({ sweetP: 1, versatileH: 2 }, { warmth: 2, openness: 2 })
  ],
  planVsSpontaneity: [
    score({ gentleSis: 2, auraT: 2 }, { control: 3, warmth: 1 }),
    score({ puppy: 2, sweetP: 2 }, { intensity: 2, openness: 2, warmth: 1 }),
    score({ versatileH: 3 }, { control: 2, openness: 2 })
  ],
  socialLeadVsObserve: [
    score({ versatileH: 2, puppy: 2 }, { openness: 3, intensity: 1 }),
    score({ wrench: 2, gentleSis: 2 }, { control: 2, warmth: 2 }),
    score({ auraT: 1, sweetP: 1, versatileH: 1 }, { openness: 2, control: 2 })
  ],
  stayUpVsGiveSpace: [
    score({ gentleSis: 3, puppy: 1 }, { warmth: 3, openness: 1 }),
    score({ wrench: 2, auraT: 2 }, { control: 2, warmth: 1 }),
    score({ versatileH: 2, sweetP: 1 }, { warmth: 2, control: 2 })
  ],
  instantTextVsMeasured: [
    score({ puppy: 2, sweetP: 2 }, { warmth: 2, openness: 3 }),
    score({ wrench: 3, auraT: 1 }, { control: 3 }),
    score({ versatileH: 2, gentleSis: 1 }, { warmth: 2, control: 2 })
  ],
  grandSurpriseVsPractical: [
    score({ auraT: 1, gentleSis: 2, sweetP: 1 }, { warmth: 2, intensity: 1, control: 1 }),
    score({ wrench: 3 }, { control: 3 }),
    score({ versatileH: 2, gentleSis: 1 }, { warmth: 2, control: 2 })
  ],
  boundariesVsFusion: [
    score({ wrench: 2, auraT: 2 }, { control: 3 }),
    score({ sweetP: 2, puppy: 2 }, { warmth: 3, openness: 2 }),
    score({ gentleSis: 1, versatileH: 2 }, { warmth: 2, control: 2 })
  ],
  defendNowVsAftercare: [
    score({ auraT: 3, gentleSis: 1 }, { intensity: 3, control: 2 }),
    score({ wrench: 2, sweetP: 2 }, { warmth: 2, control: 2 }),
    score({ versatileH: 2 }, { warmth: 2, openness: 1, control: 1 })
  ],
  leadProjectVsSupport: [
    score({ auraT: 3, versatileH: 1 }, { control: 3, intensity: 2 }),
    score({ gentleSis: 2, wrench: 2 }, { control: 2, warmth: 1 }),
    score({ versatileH: 3 }, { control: 2, openness: 2 })
  ],
  handmadeVsUseful: [
    score({ sweetP: 2, puppy: 1, gentleSis: 1 }, { warmth: 3, openness: 1 }),
    score({ wrench: 2, auraT: 2 }, { control: 3 }),
    score({ versatileH: 2, gentleSis: 1 }, { warmth: 2, control: 2 })
  ],
  physicalTeaseVsWordplay: [
    score({ puppy: 2, sweetP: 1, auraT: 1 }, { intensity: 2, warmth: 2, openness: 1 }),
    score({ wrench: 2, auraT: 2 }, { intensity: 2, control: 2 }),
    score({ versatileH: 2, gentleSis: 1 }, { warmth: 2, openness: 2 })
  ],
  heartVsLogic: [
    score({ sweetP: 2, puppy: 2 }, { intensity: 2, warmth: 2 }),
    score({ wrench: 2, auraT: 2 }, { control: 3 }),
    score({ gentleSis: 1, versatileH: 2 }, { control: 2, warmth: 2 })
  ],
  repairNowVsCoolDown: [
    score({ sweetP: 2, gentleSis: 2 }, { warmth: 3, openness: 1 }),
    score({ wrench: 2, auraT: 2 }, { control: 3 }),
    score({ versatileH: 2 }, { control: 2, warmth: 2 })
  ],
  futurePlanVsPresent: [
    score({ gentleSis: 2, auraT: 2 }, { control: 2, warmth: 1 }),
    score({ puppy: 2, wrench: 1, sweetP: 1 }, { intensity: 2, openness: 2 }),
    score({ versatileH: 2 }, { control: 2, openness: 2 })
  ],
  highContactVsStableDistance: [
    score({ sweetP: 2, puppy: 2 }, { warmth: 3, openness: 2 }),
    score({ wrench: 2, auraT: 2 }, { control: 3 }),
    score({ gentleSis: 1, versatileH: 2 }, { warmth: 2, control: 2 })
  ],
  caretakerVsSpoil: [
    score({ gentleSis: 3 }, { warmth: 3, control: 1 }),
    score({ sweetP: 2, puppy: 1 }, { warmth: 2, openness: 2 }),
    score({ versatileH: 2, wrench: 1 }, { control: 2, warmth: 2 })
  ],
  spotlightVsShadow: [
    score({ auraT: 2, versatileH: 2 }, { intensity: 2, openness: 2 }),
    score({ wrench: 2, sweetP: 1 }, { control: 2, warmth: 1 }),
    score({ gentleSis: 2, puppy: 1 }, { warmth: 2, openness: 2 })
  ],
  directNeedVsHint: [
    score({ auraT: 2, gentleSis: 1 }, { control: 2, openness: 1 }),
    score({ sweetP: 2, wrench: 1 }, { warmth: 2, control: 1 }),
    score({ versatileH: 2, puppy: 1 }, { openness: 2, warmth: 2 })
  ],
  protectRoutineVsAdventure: [
    score({ gentleSis: 2, wrench: 1 }, { control: 2, warmth: 2 }),
    score({ puppy: 2, auraT: 1 }, { intensity: 2, openness: 2 }),
    score({ versatileH: 2, sweetP: 1 }, { control: 1, warmth: 2, openness: 2 })
  ],
  moneyMoveVsMeaning: [
    score({ auraT: 2, wrench: 1 }, { control: 2, intensity: 1 }),
    score({ gentleSis: 2, sweetP: 1 }, { warmth: 2 }),
    score({ versatileH: 2, puppy: 1 }, { openness: 2, warmth: 1, control: 1 })
  ],
  closureVsDelay: [
    score({ auraT: 2, gentleSis: 1 }, { control: 2, intensity: 1 }),
    score({ wrench: 2, sweetP: 1 }, { control: 2, warmth: 1 }),
    score({ versatileH: 2, puppy: 1 }, { openness: 2, warmth: 2 })
  ],
  sensualSlowVsSparkFast: [
    score({ wrench: 2, gentleSis: 1 }, { control: 2, intensity: 1 }),
    score({ puppy: 2, auraT: 1, sweetP: 1 }, { intensity: 3, warmth: 1 }),
    score({ versatileH: 2 }, { intensity: 1, warmth: 2, control: 1 })
  ]
};

const labels = ['A', 'B', 'C'] as const;

const q = (
  id: string,
  preset: PresetKey,
  prompt: string,
  a: string,
  b: string,
  c: string
): Question => ({
  id,
  prompt,
  options: [a, b, c].map((text, index) => ({
    label: labels[index],
    text,
    weights: PRESETS[preset][index]
  })) as Question['options']
});

export const QUICK_TEST_QUESTIONS: Question[] = [
  q(
    'Q01',
    'comfortVsFix',
    '朋友凌晨一点突然哭着给你打电话，说她工作彻底崩了，你第一反应是：',
    '先把她情绪接住，哄她把这口气顺下来，再慢慢陪她熬过去。',
    '立刻帮她把问题拆开，告诉她现在最该做哪三步，先把局面稳住。',
    '一半一半 / 看情况，先听她讲完，再判断是该抱抱还是该出方案。'
  ),
  q(
    'Q02',
    'chaseVsHold',
    '暧昧对象在晚上 11:30 发来一句“出来吹风吗”，你会：',
    '心里一热就出门，边走边补妆也无所谓，气氛到了就先见面再说。',
    '先观察她到底是认真约你，还是一时兴起，不会让自己显得太急。',
    '一半一半 / 看情况，先回几句试探下氛围，再决定去不去。'
  ),
  q(
    'Q03',
    'publicClaimVsPrivate',
    '聚会时她很自然地把手搭在你腰上，周围朋友全都看到了，你会：',
    '顺势接住这个动作，甚至更明显一点，让懂的人都懂你们的气场。',
    '面上不动声色，但会悄悄把这份亲近留在只有你们知道的节奏里。',
    '一半一半 / 看情况，熟人局就松一点，陌生场合还是会收着来。'
  ),
  q(
    'Q04',
    'jealousyTalkVsWithdraw',
    '半夜刷到她给前任点了赞，你心里开始拧巴时，更像你的是：',
    '直接问清楚，不拐弯，宁可短暂尴尬也不要自己乱脑补到天亮。',
    '表面没反应，心里先记一笔，等自己冷静了再看要不要提。',
    '一半一半 / 看情况，如果最近本来就有别扭，我会说；没别的信号就先观察。'
  ),
  q(
    'Q05',
    'planVsSpontaneity',
    '第一次正式约会，你更想把它过成哪种感觉：',
    '提前订好店、路线、结束后的散步点，想让她从头到尾都被稳稳接住。',
    '别排太满，边走边看，最好途中还能临时拐进一家顺眼的小店。',
    '一半一半 / 看情况，主线会准备，但也要给当天的心情留空间。'
  ),
  q(
    'Q06',
    'socialLeadVsObserve',
    '第一次去她的朋友局，现场你一个人都不认识，你通常会：',
    '自己先把场子热起来，和谁都能接上话，不想让她还分心照顾你。',
    '先安静观察一圈，只和真正对味的人说话，不会硬逼自己社交。',
    '一半一半 / 看情况，如果她需要我撑场，我能顶上；不需要就低调一点。'
  ),
  q(
    'Q07',
    'repairNowVsCoolDown',
    '吵完架后，对方丢下一句“先睡吧”，你的下一步更像：',
    '还是想把情绪先软下来，至少确认彼此没有带着误会各自失眠。',
    '会尊重这句“先睡吧”，给彼此一点冷静时间，等第二天再认真聊。',
    '一半一半 / 看情况，如果问题很大我会追一句；只是情绪上头就先停。'
  ),
  q(
    'Q08',
    'instantTextVsMeasured',
    '关系升温期，你发消息的状态通常是：',
    '看到就想回，表情包、碎碎念、照片分享都很自然，存在感拉满。',
    '回复不算慢，但更讲究分寸和信息量，不会把自己全摊开。',
    '一半一半 / 看情况，忙的时候很克制，空下来也会突然变黏。'
  ),
  q(
    'Q09',
    'grandSurpriseVsPractical',
    '她生日快到了，你更想准备：',
    '一个有氛围、有记忆点、让她当场心口一软的惊喜时刻。',
    '一份真正能被长期用到的礼物，不必夸张，但一定要准。',
    '一半一半 / 看情况，礼物和仪式感都会有，只是不会做得太满。'
  ),
  q(
    'Q10',
    'boundariesVsFusion',
    '恋爱之后，你对“彼此边界”的理想状态是：',
    '该分开的还是分开，手机、社交、独处时间都要有清楚边线。',
    '喜欢关系很黏一点，分享生活细节和情绪本来就是亲密感的一部分。',
    '一半一半 / 看情况，底线得有，但好状态下我也不介意靠近很多。'
  ),
  q(
    'Q11',
    'defendNowVsAftercare',
    '有人当面阴阳她一句，你的本能反应是：',
    '先把场面顶回去，让对方知道这句不好笑，也别想轻轻带过。',
    '当下不一定硬碰，但结束后一定会好好安抚她，把委屈接回来。',
    '一半一半 / 看情况，能现场挡就挡，真不适合闹大也会第一时间站她那边。'
  ),
  q(
    'Q12',
    'leadProjectVsSupport',
    '团队里突然掉下来一个很赶的项目，大家都在推责任时，你会：',
    '直接把节奏抓起来，先定目标和分工，不想看局面继续散掉。',
    '把最需要耐心和细节的部分接过去，默默把漏洞补齐。',
    '一半一半 / 看情况，缺主心骨我能带，已经有人带头我就做最稳的配合。'
  ),
  q(
    'Q13',
    'handmadeVsUseful',
    '纪念日礼物，你更容易送出哪一种：',
    '带一点手作感、心意感的小东西，让她一看就知道你真的用过心。',
    '不搞花活，直接送她平时舍不得买但一定会常用的那种。',
    '一半一半 / 看情况，会兼顾情绪价值和实用度，不想只偏一头。'
  ),
  q(
    'Q14',
    'physicalTeaseVsWordplay',
    '暧昧拉扯最容易激发你哪种“上头方式”：',
    '靠近一点点、眼神停久一点、肢体距离有点犯规，那种空气感最要命。',
    '嘴上轻轻逗她、回得恰到好处，让她自己越想越上头。',
    '一半一半 / 看情况，气氛够了我什么路线都能接。'
  ),
  q(
    'Q15',
    'heartVsLogic',
    '如果喜欢的人在外地，而你眼前又有一个更稳妥的工作机会，你通常会：',
    '更在意自己到底想不想留在这段关系里，不太愿意为了“理性”硬切断。',
    '先看现实条件够不够撑住，喜欢归喜欢，生活不能全靠冲动。',
    '一半一半 / 看情况，会给感情留位置，但不会完全不算账。'
  ),
  q(
    'Q16',
    'repairNowVsCoolDown',
    '当你自己说错话伤到对方时，你更像会：',
    '很快低头，先把“我刚刚那句真的不该”说出来，不想让伤口继续发酵。',
    '先自己想明白错在哪里，整理好再去道歉，不想只会情绪化地补救。',
    '一半一半 / 看情况，能马上认的就马上认，复杂的问题会先想清楚。'
  ),
  q(
    'Q17',
    'futurePlanVsPresent',
    '刚在一起两个月，对方突然问你“你觉得我们会走多远”，你会：',
    '认真回答，甚至会聊到生活安排和未来节奏，不怕把关系说清楚。',
    '更想先把现在过好，不太喜欢太早给关系上远期 KPI。',
    '一半一半 / 看情况，能聊愿景，但不会把话说死。'
  ),
  q(
    'Q18',
    'highContactVsStableDistance',
    '如果变成异地，你认为舒服的联系频率更像：',
    '每天都要有稳定存在感，哪怕只是碎碎念，也想确认彼此一直在线。',
    '不用一直黏着，高质量联系比高频联系更重要，信任感不能靠打卡维持。',
    '一半一半 / 看情况，忙的时候松一点，情绪低的时候会更需要连着。'
  ),
  q(
    'Q19',
    'caretakerVsSpoil',
    '她生理期难受到有点炸毛时，你通常更容易：',
    '把热水、止痛、外卖、时间安排都照顾到，像一个稳定的小后勤系统。',
    '先宠着她，顺着她的小脾气来，让她知道今天就是可以被偏心。',
    '一半一半 / 看情况，先看她更需要被照顾还是被哄。'
  ),
  q(
    'Q20',
    'spotlightVsShadow',
    '如果发一张你们的合照到社交平台，你更偏向：',
    '发就发得漂亮一点，大大方方让氛围感和存在感都到位。',
    '更愿意把亲密留在线下，不太想把真正重要的关系摊给所有人看。',
    '一半一半 / 看情况，值得纪念的时刻会发，但不会天天高频营业。'
  ),
  q(
    'Q21',
    'directNeedVsHint',
    '当你开始缺安全感时，你更可能：',
    '直接告诉她“我现在有点需要你”，虽然有点不好意思，但至少不猜。',
    '不会说得太直，只会在细节上变得更敏感，等她自己察觉。',
    '一半一半 / 看情况，真的顶不住时会开口，平时还是想自己消化。'
  ),
  q(
    'Q22',
    'protectRoutineVsAdventure',
    '周末约会，你更容易安排成：',
    '舒服、稳妥、能好好待在一起的一整天，重点是陪伴质量。',
    '临时起意就冲去新的地方，最好有一点未知感和兴奋感。',
    '一半一半 / 看情况，主打不无聊，也不想把彼此搞太累。'
  ),
  q(
    'Q23',
    'moneyMoveVsMeaning',
    '选工作时，如果高薪岗位和更有意义但回报慢的岗位摆在面前，你更像：',
    '优先看结果和资源，先把基本盘做厚，安全感很现实。',
    '更想选自己真正在意的方向，不想只是为了钱把人耗空。',
    '一半一半 / 看情况，会评估成本，但也不愿把自己卖给纯消耗。'
  ),
  q(
    'Q24',
    'closureVsDelay',
    '一段关系明显走不下去了，你处理结束的方式通常是：',
    '宁可难受也会把话说清楚，不喜欢模糊拖着彼此消耗。',
    '会拉长一点距离，让感情自然降温，不太想来一场正面硬碰硬。',
    '一半一半 / 看情况，能和平收尾就和平，实在不行也会给个明确句号。'
  ),
  q(
    'Q25',
    'sensualSlowVsSparkFast',
    '第一次真正靠近到很暧昧的距离时，你更容易：',
    '放慢节奏，靠眼神和停顿拉张力，越克制反而越有感觉。',
    '被当下火花带着走，喜欢那种“再靠近一点就会失控”的刺激感。',
    '一半一半 / 看情况，气氛和人都对的时候，慢和快我都能接。'
  ),
  q(
    'Q26',
    'closureVsDelay',
    '前任忽然发来一句“最近总想起你”，你更像会：',
    '直接问她到底想干嘛，如果没有明确态度就不会陪她玩回忆杀。',
    '先保持距离，哪怕心里有波动，也不想轻易把旧门再打开。',
    '一半一半 / 看情况，得看她现在是不是拿得出真正的改变。'
  ),
  q(
    'Q27',
    'publicClaimVsPrivate',
    '家人突然问你“你最近是不是恋爱了”，你会更倾向：',
    '如果这段关系让我确定，我不太怕承认，至少不会刻意装没这回事。',
    '除非关系很稳，不然我更想自己先消化好，不急着对外解释。',
    '一半一半 / 看情况，信任的家人可以知道，但不会全盘公开。'
  ),
  q(
    'Q28',
    'comfortVsFix',
    '她连续几天被工作压得特别丧，开始怀疑自己什么都做不好，你更可能：',
    '先让她知道自己已经很辛苦了，别急着否定自己，情绪站稳比什么都重要。',
    '帮她把事情重新排优先级，告诉她哪些必须做、哪些其实可以放过。',
    '一半一半 / 看情况，先安抚她，再拉她回到能执行的节奏上。'
  ),
  q(
    'Q29',
    'planVsSpontaneity',
    '一起旅行时，原定计划突然被天气打乱，你会：',
    '立刻改路线和备选安排，不想让这趟行程变成一团乱麻。',
    '算了，索性顺着天气走，说不定会撞见比原计划更好的东西。',
    '一半一半 / 看情况，关键节点会补方案，小插曲就当成旅行彩蛋。'
  ),
  q(
    'Q30',
    'jealousyTalkVsWithdraw',
    '你精心准备了一晚上的约会，她临时放鸽子，你当下更像：',
    '会明确表达失落和不爽，至少让她知道这件事不是一句“抱歉”就过了。',
    '先把情绪收起来，不想在气头上说重话，等自己缓缓再处理。',
    '一半一半 / 看情况，如果她有合理原因我能接住；敷衍的话就会认真不开心。'
  )
];

const FULL_ONLY_QUESTIONS: Question[] = [
  q('Q31', 'spotlightVsShadow', '第一次和她并肩走在熟人很多的地方，你会更自然地：', '不刻意躲闪，气场稳一点，别人看到了也就看到了。', '下意识把亲密感收一收，不是羞于承认，只是不想让旁人参与。', '一半一半 / 看情况，舒服的场域里能放开，不舒服就先保护关系边界。'),
  q('Q32', 'directNeedVsHint', '她发自拍问“我今天怎样”，你通常会：', '给出明确又上头的夸法，让她知道自己在你眼里有多好看。', '不会夸得太满，更多会挑一个很细的点轻轻说中她。', '一半一半 / 看情况，想认真夸的时候会很会夸，平时也不会太浮夸。'),
  q('Q33', 'socialLeadVsObserve', '第一次见她最亲近的朋友，你更像：', '很快切进气氛，让大家都放松，也让她觉得带你来很有面。', '保持礼貌但不过度表现，先看这些人值不值得你打开自己。', '一半一半 / 看情况，需要我暖场我就上，不需要就静静陪着。'),
  q('Q34', 'stayUpVsGiveSpace', '她嘴上说“我没事”，但你听得出她其实在硬撑，这时你更会：', '继续陪着她，不急着追问，但也不会真的让她一个人扛。', '先给她空间，等她自己愿意开口，你不想把安慰做成逼问。', '一半一半 / 看情况，会留在附近，但不会一直往她伤口上按。'),
  q('Q35', 'instantTextVsMeasured', '她最近总是隔很久才回你消息，你的状态更接近：', '会明显多发一点，把存在感提上去，想知道她到底在想什么。', '不会追问太紧，先把自己的节奏守住，不想显得被牵着走。', '一半一半 / 看情况，连续几次异常我会提，不会无止境装没事。'),
  q('Q36', 'grandSurpriseVsPractical', '节日仪式感这件事上，你更认同：', '重要的节日就该认真过，哪怕有点夸张，也比敷衍强。', '形式不重要，真正在乎是在平时做事靠不靠谱。', '一半一半 / 看情况，节日可以有小隆重，但没必要场场像拍电影。'),
  q('Q37', 'moneyMoveVsMeaning', '恋爱后一起消费，你更容易接受：', '账目清楚、责任清楚，很多舒服其实来自秩序感。', '不用算那么细，关系不是合作项目，太计较会消耗温度。', '一半一半 / 看情况，大头会算明白，小事不想过度记账。'),
  q('Q38', 'closureVsDelay', '她在公众场合对你有点冷，你心里不舒服时更像：', '会在合适的时候直接提，想知道这到底是习惯还是态度问题。', '先自己消化一下，不想每次不舒服都立刻拿出来对线。', '一半一半 / 看情况，如果只是她状态差我能理解，长期如此就会问。'),
  q('Q39', 'futurePlanVsPresent', '你们无意中聊到未来想住的城市时，你会：', '顺着把生活方式、通勤、工作甚至养不养宠物都想一遍。', '觉得聊聊就好，别太快把想象写成任务，不然容易给关系上压力。', '一半一半 / 看情况，可以畅想，但我会保留现实修正空间。'),
  q('Q40', 'comfortVsFix', '她喝多了给你打视频，边笑边委屈地说最近好累，你更会：', '先把她安稳住，哄她喝水、回房、别再逞强，情绪优先。', '一边确认她安全，一边安排后续，比如叫车、联系朋友、第二天提醒。', '一半一半 / 看情况，先照顾当下状态，再把收尾做干净。'),
  q('Q41', 'jealousyTalkVsWithdraw', '你发现自己最近因为她和别人太熟而频繁吃醋，你更可能：', '把感受说开，不想让小情绪长成大误会。', '会先往后退一步，观察是不是自己最近太上头了。', '一半一半 / 看情况，真的影响关系了我会说，不然先自我整理。'),
  q('Q42', 'leadProjectVsSupport', '她遇到一个重大决定，问你“你觉得我该不该跳槽”，你更容易：', '直接帮她判断路径，告诉她哪条路更值、更稳、更适合。', '把利弊陪她梳理清楚，但最终选择权还是尽量还给她。', '一半一半 / 看情况，必要时会给方向，但不会强行替她活。'),
  q('Q43', 'caretakerVsSpoil', '朋友悄悄跟你说“她其实很依赖你”，你听到后的第一反应更像：', '会想继续把她照顾稳一点，既然被需要，就尽量别让她失望。', '心里会暗爽，也会更想逗她、宠她，享受这种被偏向的感觉。', '一半一半 / 看情况，能接住依赖，但也不想把关系变成单向供给。'),
  q('Q44', 'closureVsDelay', '你想结束一段反复拉扯的暧昧时，更像会：', '挑一个清楚的时机把话讲明，不再给模糊空间。', '慢慢把回应和投入降下来，让这段关系自然退潮。', '一半一半 / 看情况，先拉开一点距离，必要时再补上明确句号。'),
  q('Q45', 'planVsSpontaneity', '第一次一起旅行前收拾行李，你更像：', '列清单、分区打包，连充电线和常备药都不想漏。', '带上核心物品就行，剩下的到现场缺什么再补。', '一半一半 / 看情况，重要的会准备齐，其它让旅行自己长出来。'),
  q('Q46', 'boundariesVsFusion', '她说“我想一个人静一静”，你本能会：', '尊重这句话，不追着问，边界这件事必须被认真对待。', '会担心是不是自己做错了什么，还是想靠近一点确认她没把你推开。', '一半一半 / 看情况，会给空间，但也会留一句“需要我随时在”。'),
  q('Q47', 'physicalTeaseVsWordplay', '她发来一句“今晚别太想我”，你更可能怎么回：', '回一个带点暧昧温度的反撩，让这句话继续升温。', '嘴上先轻轻怼回去，表面不认，实际把她撩得更乱。', '一半一半 / 看情况，看她今晚是适合甜一点还是欠一点。'),
  q('Q48', 'leadProjectVsSupport', '在工作场合里，别人更容易把你看成：', '那个一站出来就默认会主导节奏的人。', '那个很稳、很好合作、最后总能把事做漂亮的人。', '一半一半 / 看情况，轮到我上我能扛，不轮到我也能托住全局。'),
  q('Q49', 'grandSurpriseVsPractical', '她突然送你一份明显不便宜的礼物，你更可能：', '会认真把这份心意接住，也想尽快回一个足够配得上的惊喜。', '先确认她是不是为这份礼物花了太大代价，不想关系里出现失衡负担。', '一半一半 / 看情况，会开心，但也会顺手把边界和分寸守住。'),
  q('Q50', 'protectRoutineVsAdventure', '你们作息完全不同，一个早睡一个夜猫子，你会更倾向：', '尽量磨出共同节奏，稳定比浪漫更能决定关系走多远。', '接受差异，彼此舒服最重要，不必什么都改成同一套。', '一半一半 / 看情况，关键时段会对齐，其它保留各自习惯。'),
  q('Q51', 'repairNowVsCoolDown', '吵架时她突然开始翻旧账，你的第一反应更像：', '先把眼前这场火压下来，哪怕需要放软一点，也不想继续升级。', '会迅速抽离情绪，把逻辑线拉回来，不接受话题无限散射。', '一半一半 / 看情况，真有旧问题会认，但不会陪着无限循环。'),
  q('Q52', 'comfortVsFix', '她朋友圈发了句有点丧的文案，却没来找你，你更可能：', '主动去问她是不是不开心，不想等她一个人把情绪吞完。', '不会立刻追着问，但会换一种不冒犯的方式试探她现在状态。', '一半一半 / 看情况，如果最近她压力很大，我会更主动一点。'),
  q('Q53', 'highContactVsStableDistance', '关系稳定后，你理想中的日常节奏是：', '生活琐碎也要大量共享，恋爱感就是在这些小事里养出来的。', '各自有节奏但彼此可靠，不用时时在线也知道对方在。', '一半一半 / 看情况，平时松一点，重要阶段会更黏。'),
  q('Q54', 'defendNowVsAftercare', '如果有人一直对你们的关系指手画脚，你更像：', '先把立场摆清楚，不会允许外人反复越界。', '不一定浪费口舌和对方拉扯，但会把自己人照顾好、护在自己这边。', '一半一半 / 看情况，能挡就挡，挡不了也不会让负面情绪直接砸到她。'),
  q('Q55', 'directNeedVsHint', '对方忽然问你“你最怕我什么”，你更会：', '直接说实话，关系要稳，很多话就不能一直避开。', '会说得委婉一点，不想一句话把气氛砸穿。', '一半一半 / 看情况，会诚实，但会挑她能接得住的说法。'),
  q('Q56', 'chaseVsHold', '暧昧对象突然给你发定位，你收到后更像：', '只要手头没大事，直接就去，很多好事都是靠往前一步。', '先确认这是不是只发给你、她到底是什么语气，不会盲冲。', '一半一半 / 看情况，氛围明确就去，模糊得太过分就不陪猜。'),
  q('Q57', 'futurePlanVsPresent', '她认真跟你聊想换城市发展，你更容易：', '立刻开始想两个人的落地方案，不会只把它当随口一说。', '先听她的感受和动机，不急着把未来一下子扣到自己身上。', '一半一半 / 看情况，愿意一起想，但也尊重各自发展节奏。'),
  q('Q58', 'protectRoutineVsAdventure', '第一次一起做饭，你更像：', '提前想好菜单和步骤，把厨房变成一个稳稳运行的小系统。', '一边做一边玩，哪怕最后有点手忙脚乱，也享受那种烟火里的即兴感。', '一半一半 / 看情况，基础步骤控一下，剩下留给气氛。'),
  q('Q59', 'publicClaimVsPrivate', '她把你介绍成“朋友”，你心里一下被刺到时，你会：', '之后找机会直接问她这句话背后的态度，不想装作没感觉。', '先按住反应，想看她是不是出于场合顾虑，而不是关系本身有问题。', '一半一半 / 看情况，能理解的场景我会忍，但不会无限理解。'),
  q('Q60', 'repairNowVsCoolDown', '你想主动结束冷战时，通常会选：', '先递一个软台阶，比如一句好好说话，给彼此下来的入口。', '等自己想清楚再开口，一旦聊就希望一次聊到点上。', '一半一半 / 看情况，先释放一点善意，再决定要不要深聊。'),
  q('Q61', 'heartVsLogic', '你发现自己对一个人越来越上头时，你通常会：', '承认自己心动了，哪怕会冒风险，也不想一直压着。', '先让自己踩刹车，确认这不是短期滤镜和投射。', '一半一半 / 看情况，会观察，但不会假装自己没感觉。'),
  q('Q62', 'closureVsDelay', '约会时她迟到了很久，你心里不舒服，你更容易：', '当面就把这件事说出来，不想以后还反复踩这个点。', '先把眼前这次约会过完，不想一开场就把气氛摁死。', '一半一半 / 看情况，看她态度和原因，再决定要不要立刻提。'),
  q('Q63', 'physicalTeaseVsWordplay', '她笑着说“我想看看你会不会吃醋”，你大概率会：', '用更近一步的动作或眼神回她，让她知道你不是没反应。', '嘴上轻轻反制，把话题玩回去，让她先乱。', '一半一半 / 看情况，情绪稳的时候会逗回去，不爽的时候也会亮态度。'),
  q('Q64', 'defendNowVsAftercare', '她在职场里被人抢功劳，你更像：', '会直接帮她想怎么反击、怎么争回来，不想让委屈白吃。', '先陪她把情绪消化，再一点点把她拉回到更稳的状态。', '一半一半 / 看情况，先止血，再看是打回去还是换打法。'),
  q('Q65', 'spotlightVsShadow', '你最擅长制造的吸引力更像：', '存在感强、气场稳，一出场就让人很难完全忽略你。', '表面没那么张扬，但细节和反差会让人越靠近越上头。', '一半一半 / 看情况，我能压场，也能靠氛围慢慢拿下。'),
  q('Q66', 'jealousyTalkVsWithdraw', '凌晨刷到她和别人互动频繁，你心里有点泛酸时，你更会：', '第二天找个不难看的方式提出来，至少把自己拉回关系里。', '告诉自己先别上头，等更多信息出来再决定要不要说。', '一半一半 / 看情况，如果频率太过分，我不会装看不见。'),
  q('Q67', 'planVsSpontaneity', '她临时改了原本说好的安排，你更像：', '会马上重组计划，尽量把失控感压到最低。', '能改就改，改不了也算了，不想让行程绑架心情。', '一半一半 / 看情况，有底线的事会坚持，别的小变动能接住。'),
  q('Q68', 'directNeedVsHint', '聊到“要不要确定关系”这个节点时，你更像：', '如果想清楚了就会说，不愿让好关系一直卡在猜测里。', '更习惯看行动，不太想把关键节点全押在一句定义上。', '一半一半 / 看情况，时机到了会说，但也要看对方有没有同步靠近。'),
  q('Q69', 'leadProjectVsSupport', '她问你“你觉得我其实最适合做什么”，你更会：', '很明确地告诉她你看见的优势和方向，甚至帮她排序。', '更多陪她把自己真正想要的东西讲出来，让答案从她心里长出来。', '一半一半 / 看情况，我会给判断，也会留她自己选择的空间。'),
  q('Q70', 'moneyMoveVsMeaning', '两个人花钱观明显不同，你更优先在意：', '规则能不能先讲清，不然以后很多矛盾都只是时间问题。', '先看彼此是不是都真心、都愿意互相体谅，规则可以慢慢磨。', '一半一半 / 看情况，原则要有，但不想谈成纯财务合作。'),
  q('Q71', 'leadProjectVsSupport', '一段关系里，如果必须有人更常做决定，你会更自然地：', '把方向感抓在手里，至少关键节点不想一直悬着。', '不一定抢主导，但会把支持、修补和执行做得很稳。', '一半一半 / 看情况，该我决时我会决，不需要时我也不抢。'),
  q('Q72', 'sensualSlowVsSparkFast', '你最容易在哪个瞬间突然心动到发麻：', '她没说太多，但一个停顿、一次注视，就把氛围拉得很满。', '她直接靠近你、逗你、撩你，那种火花感会让你一下失守。', '一半一半 / 看情况，真正让我上头的是人对了，方式反而不是唯一标准。'),
  q('Q73', 'stayUpVsGiveSpace', '她在你面前掉眼泪的时候，你更接近：', '会靠近、递纸、陪着她哭完，不怕自己也被情绪卷进去。', '会先稳住场面，尽量让她感到安全，但不过度追着安慰。', '一半一半 / 看情况，我会在，但会看她当下更想被抱住还是被放轻一点。'),
  q('Q74', 'boundariesVsFusion', '你第一次看见她前任留下的痕迹还在时，你会：', '不一定立刻发作，但会清楚地知道自己边界在哪，迟早要谈。', '会先理解每段关系都有余温，不想一上来就把自己放在审判位。', '一半一半 / 看情况，能理解和能长期接受不是一回事。'),
  q('Q75', 'grandSurpriseVsPractical', '她看着你说“你为什么这么懂我”，你更可能：', '顺势把这种懂做成更具体的浪漫，让她直接沉进去。', '嘴上轻描淡写，但心里会继续记住她每个真正需要的点。', '一半一半 / 看情况，既会让她感受到，也不会把姿态做得太满。'),
  q('Q76', 'boundariesVsFusion', '当你特别想独处的时候，你更希望另一半：', '最好别追着问，给我一点完整、安静、不被打断的空间。', '可以靠近一点，哪怕不说话也行，我不一定是真的想完全一个人。', '一半一半 / 看情况，我会提前说明状态，但不想被彻底放空。'),
  q('Q77', 'leadProjectVsSupport', '如果你们一起创业或搞项目，你更可能成为：', '定方向、拍板、扛压力的那一个。', '把执行、协同、细节和关系都织密的那一个。', '一半一半 / 看情况，哪里缺位我就补哪里。'),
  q('Q78', 'highContactVsStableDistance', '她进入工作爆发期，整个人变得特别忙时，你会：', '更主动制造一些轻量连接，让她再忙也知道你没有掉线。', '不去打扰太多，等她忙完自然回来，信任本身就是一种支持。', '一半一半 / 看情况，会留温度，但不会要求她时刻回应。'),
  q('Q79', 'publicClaimVsPrivate', '她突然说想公开关系，你的第一反应更像：', '如果我认定了，就不怕被看见，甚至会觉得终于可以正大光明。', '我会认真想清楚公开后的现实影响，不会只被当下情绪推着走。', '一半一半 / 看情况，我支持公开，但节奏和方式要对。'),
  q('Q80', 'futurePlanVsPresent', '关系进入平淡期后，你更擅长的续命方式是：', '主动去重建新的共同目标，让关系继续往前长，而不是只靠惯性。', '把眼前每一天过得更舒服，把平淡过稳本身就是很高级的亲密。', '一半一半 / 看情况，既要有未来感，也要有日常里的小热度。')
];

export const FULL_TEST_QUESTIONS: Question[] = [...QUICK_TEST_QUESTIONS, ...FULL_ONLY_QUESTIONS];

export const QUESTION_SET_BY_MODE: Record<TestMode, Question[]> = {
  quick: QUICK_TEST_QUESTIONS,
  full: FULL_TEST_QUESTIONS
};

export const getQuestionsByMode = (mode: TestMode): Question[] => QUESTION_SET_BY_MODE[mode];
