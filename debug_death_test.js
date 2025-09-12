// Debug test for death conditions
import { ConditionEvaluator } from './src/utils/conditionEvaluator.ts';

const deathConditions = [
  {
    id: 'death_health',
    type: 'death',
    expression: 'attributes.health <= 0',
    priority: 1000,
    description: '生命值归零死亡',
    message: '你的生命走到了尽头...'
  },
  {
    id: 'death_sanity',
    type: 'death',
    expression: 'attributes.sanity <= 0',
    priority: 1000,
    description: '理智值归零死亡',
    message: '你的精神崩溃了...'
  },
  {
    id: 'death_hunger',
    type: 'death',
    expression: 'attributes.hunger <= 0',
    priority: 1000,
    description: '饥饿死亡',
    message: '你被饿死了...'
  }
];

// Test health death
const healthDeathState = {
  attributes: { 
    health: 0,
    sanity: 50,
    hunger: 60,
    intelligence: 50,
    strength: 50,
    speed: 50,
    luck: 50,
    profession: 'student'
  },
  inventory: [],
  flags: {},
  day: 1,
  time: 0,
  location: 'dormitory'
};

console.log('=== Testing Death Conditions ===');

const evaluator = new ConditionEvaluator(deathConditions, true);

console.log('
--- Testing health death ---');
const result1 = evaluator.evaluateConditions(healthDeathState);
console.log('Result:', result1);

// Test sanity death
const sanityDeathState = {
  attributes: { 
    health: 50,
    sanity: 0,
    hunger: 60,
    intelligence: 50,
    strength: 50,
    speed: 50,
    luck: 50,
    profession: 'student'
  },
  inventory: [],
  flags: {},
  day: 1,
  time: 0,
  location: 'dormitory'
};

console.log('
--- Testing sanity death ---');
const result2 = evaluator.evaluateConditions(sanityDeathState);
console.log('Result:', result2);

// Test hunger death
const hungerDeathState = {
  attributes: { 
    health: 50,
    sanity: 50,
    hunger: 0,
    intelligence: 50,
    strength: 50,
    speed: 50,
    luck: 50,
    profession: 'student'
  },
  inventory: [],
  flags: {},
  day: 1,
  time: 0,
  location: 'dormitory'
};

console.log('
--- Testing hunger death ---');
const result3 = evaluator.evaluateConditions(hungerDeathState);
console.log('Result:', result3);