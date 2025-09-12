import { ConditionEvaluator } from '../../src/utils/conditionEvaluator';

// 简单测试表达式处理
const testGameState = {
  attributes: {
    health: 85,
    hunger: 80,
    sanity: 85,
    intelligence: 70,
    strength: 60,
    speed: 75,
    luck: 50,
    profession: '学生'
  },
  inventory: ['golden_key', 'food'],
  flags: { rule1_broken: false, rule2_followed: true },
  day: 1,
  time: 100,
  location: 'dormitory'
};

describe('表达式处理调试测试', () => {
  test('基本属性表达式处理', () => {
    const conditions = [{
      id: 'test1',
      type: 'win' as const,
      level: 'S' as const,
      expression: 'sanity > 60 && hunger > 50',
      priority: 1,
      description: '测试条件',
      message: '测试消息'
    }];

    const evaluator = new ConditionEvaluator(conditions, true);
    const result = evaluator.evaluateConditions(testGameState);
    
    console.log('测试结果:', result);
    console.log('触发的条件:', result.triggeredConditions);
    console.log('Win等级:', result.winLevel);
  });

  test('复杂表达式处理', () => {
    const conditions = [{
      id: 'test2',
      type: 'win' as const,
      level: 'A' as const,
      expression: 'sanity > 80 && hunger > 70 && day >= 7',
      priority: 1,
      description: '复杂测试条件',
      message: '复杂测试消息'
    }];

    const evaluator = new ConditionEvaluator(conditions, true);
    const result = evaluator.evaluateConditions(testGameState);
    
    console.log('复杂表达式测试结果:', result);
  });
});