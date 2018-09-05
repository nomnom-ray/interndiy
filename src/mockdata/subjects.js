export default [
  {
    id: 1,
    column: 1,
    length: 0,
    summary: 'blank',
    concepts: [],
  },
  {
    id: 2,
    column: 2,
    length: 5,
    summary: 'summary1',
    concepts: [
      {
        id: 1,
        type: 'trigger',
        behavior: 'behavior1',
      },
      {
        id: 2,
        type: 'result',
        behavior: 'behavior5',
      },
      {
        id: 3,
        type: 'step',
        behavior: 'behavior2',
      },
      {
        id: 4,
        type: 'step',
        behavior: 'behavior3',
      },
      {
        id: 5,
        type: 'step',
        behavior: 'behavior4',
      },
    ],
  },
  {
    id: 3,
    column: 3,
    length: 3,
    summary: 'summary2',
    concepts: [
      {
        id: 6,
        type: 'step',
        behavior: 'behavior5',
      },
      {
        id: 7,
        type: 'step',
        behavior: 'behavior6',
      },
      {
        id: 8,
        type: 'step',
        behavior: 'behavior7',
      },
    ],
  },
  {
    id: 4,
    column: 4,
    length: 1,
    summary: 'summary3',
    concepts: [
      {
        id: 1,
        type: 'step',
        behavior: 'behavior8',
      },
    ],
  },
];
