const express = require('express');
const router = express.Router();

const { validateSchema } = require('../../utils');
const {
  q1,
  q3a,
} = require('./validation');

const {
  questionTest,
  question1,
  question1a,
  question1b,
  question2,
  question2a,
  question2b,
  question3,
  question3a,
  // question3b,
  question3c,
  question3d,
  question3e,
  question4,
  // question4a,
  question5,
  question5a,
  question6,
  question7,
  // question7a,
  question8a,
  question8b,
  question8c,
  // question13,
  // question15,
  question16,
  question17,
  question18,
  question19,
  question20,
  question21,
  question22,
  question23,
  question24,
  question25,
  question26,
  question26b,
  // question26c,
  question27,
  question28,
  question29,
  question30,
  question31,
  question32,
  question33,
  question34,
} = require('./controller');

// router.get('/1', question1);
// router.get('/1a', validateSchema(q1), question1a);
// router.get('/1b', question1b);
// router.get('/2a', question2a);
// router.get('/2b', question2b);
// router.get('/3', question3);
// router.get('/3a', validateSchema(q3a), question3a);
// router.get('/3b', question3b);
// router.get('/3c', question3c);
// router.get('/4', question4);
// router.get('/4a', question4a);
// router.get('/5', question5);
// router.get('/6', question6);
// router.get('/7', question7);
// router.get('/7a', question7a);
// router.get('/8a', question8a);
// router.get('/8b', question8b);
// router.get('/13', question13);
// router.get('/15', question15);
// router.get('/18', question18);
// router.get('/19', question19);
// router.get('/20', question20);
// router.get('/21', question21);
// router.get('/22', question22);
// router.get('/23', question23);
// router.get('/24', question24);
// router.get('/25', question25);
// router.get('/26', question26);
// router.get('/26b', question26b);
// router.get('/26c', question26c);
// router.get('/27', question27);
// router.get('/30', question30);
// router.get('/34', question34);
const routes = [
  {
    path: '/test',
    method: 'get',
    validators: [],
    handlers: [questionTest],
  },
  {
    path: '/1',
    method: 'get',
    validators: [],
    handlers: [question1],
  },
  {
    path: '/1a',
    method: 'get',
    validators: [],
    handlers: [question1a],
  },
  {
    path: '/1b',
    method: 'get',
    validators: [],
    handlers: [question1b],
  },
  {
    path: '/2',
    method: 'get',
    validators: [],
    handlers: [question2],
  },
  {
    path: '/2a',
    method: 'get',
    validators: [],
    handlers: [question2a],
  },
  {
    path: '/2b',
    method: 'get',
    validators: [],
    handlers: [question2b],
  },
  {
    path: '/3',
    method: 'get',
    validators: [],
    handlers: [question3],
  },
  {
    path: '/3a',
    method: 'get',
    validators: [],
    handlers: [question3a],
  },
  {
    path: '/3c',
    method: 'get',
    validators: [],
    handlers: [question3c],
  },
  {
    path: '/3d',
    method: 'get',
    validators: [],
    handlers: [question3d],
  },
  {
    path: '/3e',
    method: 'get',
    validators: [],
    handlers: [question3e],
  },
  {
    path: '/4',
    method: 'get',
    validators: [],
    handlers: [question4],
  },
  {
    path: '/5',
    method: 'get',
    validators: [],
    handlers: [question5],
  },
  {
    path: '/5a',
    method: 'get',
    validators: [],
    handlers: [question5a],
  },
  {
    path: '/6',
    method: 'get',
    validators: [],
    handlers: [question6],
  },
  {
    path: '/7',
    method: 'get',
    validators: [],
    handlers: [question7],
  },
  {
    path: '/8a',
    method: 'get',
    validators: [],
    handlers: [question8a],
  },
  {
    path: '/8b',
    method: 'get',
    validators: [],
    handlers: [question8b],
  },
  {
    path: '/8c',
    method: 'get',
    validators: [],
    handlers: [question8c],
  },
  {
    path: '/16',
    method: 'get',
    validators: [],
    handlers: [question16],
  },
  {
    path: '/17',
    method: 'get',
    validators: [],
    handlers: [question17],
  },
  {
    path: '/18',
    method: 'get',
    validators: [],
    handlers: [question18],
  },
  {
    path: '/19',
    method: 'get',
    validators: [],
    handlers: [question19],
  },
  {
    path: '/20',
    method: 'get',
    validators: [],
    handlers: [question20],
  },
  {
    path: '/21',
    method: 'get',
    validators: [],
    handlers: [question21],
  },
  {
    path: '/22',
    method: 'get',
    validators: [],
    handlers: [question22],
  },
  {
    path: '/23',
    method: 'get',
    validators: [],
    handlers: [question23],
  },
  {
    path: '/24',
    method: 'get',
    validators: [],
    handlers: [question24],
  },
  {
    path: '/25',
    method: 'get',
    validators: [],
    handlers: [question25],
  },
  {
    path: '/26',
    method: 'get',
    validators: [],
    handlers: [question26],
  },
  {
    path: '/26b',
    method: 'get',
    validators: [],
    handlers: [question26b],
  },
  {
    path: '/27',
    method: 'get',
    validators: [],
    handlers: [question27],
  },
  {
    path: '/28',
    method: 'get',
    validators: [],
    handlers: [question28],
  },
  {
    path: '/29',
    method: 'get',
    validators: [],
    handlers: [question29],
  },
  {
    path: '/30',
    method: 'get',
    validators: [],
    handlers: [question30],
  },
  {
    path: '/31',
    method: 'get',
    validators: [],
    handlers: [question31],
  },
  {
    path: '/32',
    method: 'get',
    validators: [],
    handlers: [question32],
  },
  {
    path: '/33',
    method: 'get',
    validators: [],
    handlers: [question33],
  },
  {
    path: '/34',
    method: 'get',
    validators: [],
    handlers: [question34],
  },
];

for (const route of routes) {
  router.route(route.path)[route.method](...route.validators, ...route.handlers)
};

module.exports = router;