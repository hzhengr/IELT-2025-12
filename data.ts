import { IeltsPart, Topic } from './types';

export const TOPICS: Topic[] = [
  // --- PART 1 ---
  {
    id: 'p1-hometown',
    part: IeltsPart.Part1,
    title: 'Hometown',
    tags: ['Old'],
    questions: [
      'Where is your hometown?',
      'Is that a big city or a small place?',
      'Please describe your hometown a little.',
      'How long have you been living there?',
      'Do you like your hometown?',
      'What is your hometown famous for?',
      'Is your hometown a good place for young people to pursue their careers?'
    ]
  },
  {
    id: 'p1-work-study',
    part: IeltsPart.Part1,
    title: 'Work or Studies',
    tags: ['Old'],
    questions: [
      'Do you work or are you a student?',
      'Why did you choose to do that type of work (or that job)?',
      'Do you like your job/subject?',
      'Do you have any plans for your work/study in the next five years?',
      'What technology do you use at work/study?'
    ]
  },
  {
    id: 'p1-museum',
    part: IeltsPart.Part1,
    title: 'Museum',
    tags: ['New'],
    questions: [
      'Do you think museums are important?',
      'Are there many museums in your hometown?',
      'Do you often visit a museum?',
      'When was the last time you visited a museum?'
    ]
  },
  {
    id: 'p1-shoes',
    part: IeltsPart.Part1,
    title: 'Shoes',
    tags: ['New'],
    questions: [
      'Do you like buying shoes? How often?',
      'Have you ever bought shoes online?',
      'How much money do you usually spend on shoes?',
      'Which do you prefer, fashionable shoes or comfortable shoes?'
    ]
  },
  {
    id: 'p1-sharing',
    part: IeltsPart.Part1,
    title: 'Sharing',
    tags: ['New'],
    questions: [
      'Did your parents teach you to share when you were a child?',
      'What kind of things do you like to share with others?',
      'What kind of things are not suitable for sharing?',
      'Who is the first person you would like to share good news with?'
    ]
  },

  // --- PART 2 (Includes Part 3 follow-ups implicitly linked in UI logic) ---
  {
    id: 'p2-place-trees',
    part: IeltsPart.Part2,
    title: 'Describe a place with a lot of trees',
    tags: ['New'],
    cues: [
      'Where it is',
      'How you knew this place',
      'What it is like',
      'And explain why you would like to visit it'
    ],
    questions: [] // Part 3 questions handled in separate topics or linked
  },
  {
    id: 'p2-sportsperson',
    part: IeltsPart.Part2,
    title: 'Describe a successful sportsperson',
    tags: ['New'],
    cues: [
      'Who he/she is',
      'What you know about him/her',
      'What he/she is like in real life',
      'What achievement he/she has made',
      'And explain why you admire him/her'
    ],
    questions: []
  },
  {
    id: 'p2-creative-person',
    part: IeltsPart.Part2,
    title: 'Describe a creative person',
    tags: ['New'],
    cues: [
      'Who he/she is',
      'How you knew him/her',
      'What his/her greatest achievement is',
      'And explain why you think he/she is creative'
    ],
    questions: []
  },
  {
    id: 'p2-lost-way',
    part: IeltsPart.Part2,
    title: 'Describe an occasion when you lost your way',
    tags: ['New'],
    cues: [
      'Where you were',
      'What happened',
      'How you felt',
      'And explain how you found your way'
    ],
    questions: []
  },

  // --- PART 3 (Explicit Topics from PDF) ---
  {
    id: 'p3-trees-nature',
    part: IeltsPart.Part3,
    title: 'Nature & Environment',
    tags: ['Linked to Place with Trees'],
    questions: [
      'Why do people like visiting places with trees or forests?',
      'Are natural views better than city views?',
      'Do all people need some nature?',
      'Are people hard-wired to protect the environment?'
    ]
  },
  {
    id: 'p3-sports',
    part: IeltsPart.Part3,
    title: 'Sports & Talent',
    tags: ['Linked to Sportsperson'],
    questions: [
      'Should students have physical education and do sports at school?',
      'What qualities should an athlete have?',
      'Is talent important in sports?',
      'Why are there so few athletes?'
    ]
  },
  {
    id: 'p3-creativity',
    part: IeltsPart.Part3,
    title: 'Creativity & Arts',
    tags: ['Linked to Creative Person'],
    questions: [
      'Do you think children should learn to play musical instruments?',
      'How do artists acquire inspiration?',
      'Do you think pictures and videos in news reports are important?',
      'What can we do to help children keep creative?'
    ]
  }
];