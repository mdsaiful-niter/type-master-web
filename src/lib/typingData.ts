// Finger mapping for each key
export type FingerType = 
  | 'pinky-left' | 'ring-left' | 'middle-left' | 'index-left' 
  | 'thumb' 
  | 'index-right' | 'middle-right' | 'ring-right' | 'pinky-right';

export type Hand = 'left' | 'right';

export interface KeyMapping {
  key: string;
  finger: FingerType;
  hand: Hand;
  row: number;
  position: number;
}

// QWERTY keyboard layout with finger mappings
export const keyboardLayout: KeyMapping[][] = [
  // Row 1 - Number row
  [
    { key: '`', finger: 'pinky-left', hand: 'left', row: 0, position: 0 },
    { key: '1', finger: 'pinky-left', hand: 'left', row: 0, position: 1 },
    { key: '2', finger: 'ring-left', hand: 'left', row: 0, position: 2 },
    { key: '3', finger: 'middle-left', hand: 'left', row: 0, position: 3 },
    { key: '4', finger: 'index-left', hand: 'left', row: 0, position: 4 },
    { key: '5', finger: 'index-left', hand: 'left', row: 0, position: 5 },
    { key: '6', finger: 'index-right', hand: 'right', row: 0, position: 6 },
    { key: '7', finger: 'index-right', hand: 'right', row: 0, position: 7 },
    { key: '8', finger: 'middle-right', hand: 'right', row: 0, position: 8 },
    { key: '9', finger: 'ring-right', hand: 'right', row: 0, position: 9 },
    { key: '0', finger: 'pinky-right', hand: 'right', row: 0, position: 10 },
    { key: '-', finger: 'pinky-right', hand: 'right', row: 0, position: 11 },
    { key: '=', finger: 'pinky-right', hand: 'right', row: 0, position: 12 },
  ],
  // Row 2 - QWERTY row
  [
    { key: 'Q', finger: 'pinky-left', hand: 'left', row: 1, position: 0 },
    { key: 'W', finger: 'ring-left', hand: 'left', row: 1, position: 1 },
    { key: 'E', finger: 'middle-left', hand: 'left', row: 1, position: 2 },
    { key: 'R', finger: 'index-left', hand: 'left', row: 1, position: 3 },
    { key: 'T', finger: 'index-left', hand: 'left', row: 1, position: 4 },
    { key: 'Y', finger: 'index-right', hand: 'right', row: 1, position: 5 },
    { key: 'U', finger: 'index-right', hand: 'right', row: 1, position: 6 },
    { key: 'I', finger: 'middle-right', hand: 'right', row: 1, position: 7 },
    { key: 'O', finger: 'ring-right', hand: 'right', row: 1, position: 8 },
    { key: 'P', finger: 'pinky-right', hand: 'right', row: 1, position: 9 },
    { key: '[', finger: 'pinky-right', hand: 'right', row: 1, position: 10 },
    { key: ']', finger: 'pinky-right', hand: 'right', row: 1, position: 11 },
    { key: '\\', finger: 'pinky-right', hand: 'right', row: 1, position: 12 },
  ],
  // Row 3 - Home row (ASDF)
  [
    { key: 'A', finger: 'pinky-left', hand: 'left', row: 2, position: 0 },
    { key: 'S', finger: 'ring-left', hand: 'left', row: 2, position: 1 },
    { key: 'D', finger: 'middle-left', hand: 'left', row: 2, position: 2 },
    { key: 'F', finger: 'index-left', hand: 'left', row: 2, position: 3 },
    { key: 'G', finger: 'index-left', hand: 'left', row: 2, position: 4 },
    { key: 'H', finger: 'index-right', hand: 'right', row: 2, position: 5 },
    { key: 'J', finger: 'index-right', hand: 'right', row: 2, position: 6 },
    { key: 'K', finger: 'middle-right', hand: 'right', row: 2, position: 7 },
    { key: 'L', finger: 'ring-right', hand: 'right', row: 2, position: 8 },
    { key: ';', finger: 'pinky-right', hand: 'right', row: 2, position: 9 },
    { key: "'", finger: 'pinky-right', hand: 'right', row: 2, position: 10 },
  ],
  // Row 4 - ZXCV row
  [
    { key: 'Z', finger: 'pinky-left', hand: 'left', row: 3, position: 0 },
    { key: 'X', finger: 'ring-left', hand: 'left', row: 3, position: 1 },
    { key: 'C', finger: 'middle-left', hand: 'left', row: 3, position: 2 },
    { key: 'V', finger: 'index-left', hand: 'left', row: 3, position: 3 },
    { key: 'B', finger: 'index-left', hand: 'left', row: 3, position: 4 },
    { key: 'N', finger: 'index-right', hand: 'right', row: 3, position: 5 },
    { key: 'M', finger: 'index-right', hand: 'right', row: 3, position: 6 },
    { key: ',', finger: 'middle-right', hand: 'right', row: 3, position: 7 },
    { key: '.', finger: 'ring-right', hand: 'right', row: 3, position: 8 },
    { key: '/', finger: 'pinky-right', hand: 'right', row: 3, position: 9 },
  ],
  // Row 5 - Space bar row
  [
    { key: ' ', finger: 'thumb', hand: 'right', row: 4, position: 0 },
  ],
];

// Flatten keyboard for easy lookup
export const keyToFingerMap: Record<string, { finger: FingerType; hand: Hand }> = {};
keyboardLayout.flat().forEach(key => {
  keyToFingerMap[key.key.toLowerCase()] = { finger: key.finger, hand: key.hand };
  keyToFingerMap[key.key.toUpperCase()] = { finger: key.finger, hand: key.hand };
});

// Course structure
export interface Lesson {
  id: string;
  title: string;
  description: string;
  keys: string[];
  exercises: string[];
  completed: boolean;
  wpm?: number;
  accuracy?: number;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  lessons: Lesson[];
}

export const courses: Course[] = [
  {
    id: 'beginner',
    title: 'Beginner Course',
    description: 'Learn the home row keys and basic finger positioning',
    level: 'beginner',
    lessons: [
      {
        id: 'home-row-1',
        title: 'Home Row: F and J',
        description: 'Start with the index finger home keys',
        keys: ['F', 'J'],
        exercises: [
          'fff jjj fff jjj fjf jfj fjfj',
          'fj fj fj fj jf jf jf jf fjfj jfjf',
          'fff jjj fjf jfj ffjj jjff fjfjfj',
        ],
        completed: false,
      },
      {
        id: 'home-row-2',
        title: 'Home Row: D and K',
        description: 'Add the middle finger keys',
        keys: ['F', 'J', 'D', 'K'],
        exercises: [
          'ddd kkk ddd kkk dkd kdk dkdk',
          'fd fd jk jk fdk jdk dfk kjf',
          'dfjk dfjk kjfd kjfd fdkj dkfj',
        ],
        completed: false,
      },
      {
        id: 'home-row-3',
        title: 'Home Row: S and L',
        description: 'Add the ring finger keys',
        keys: ['F', 'J', 'D', 'K', 'S', 'L'],
        exercises: [
          'sss lll sss lll sls lsl slsl',
          'asd jkl fds lkj sdfl jkds',
          'sdf jkl dfs lkj sdfj klsd',
        ],
        completed: false,
      },
      {
        id: 'home-row-4',
        title: 'Home Row: A and ;',
        description: 'Complete the home row with pinky keys',
        keys: ['F', 'J', 'D', 'K', 'S', 'L', 'A', ';'],
        exercises: [
          'aaa ;;; aaa ;;; a;a ;a; a;a;',
          'asdf jkl; asdf jkl; fdsa ;lkj',
          'asdf ;lkj fdsa jkl; asdf jkl;',
        ],
        completed: false,
      },
      {
        id: 'home-row-5',
        title: 'Home Row: G and H',
        description: 'Master the inner index finger keys',
        keys: ['F', 'J', 'D', 'K', 'S', 'L', 'A', ';', 'G', 'H'],
        exercises: [
          'ggg hhh ggg hhh ghg hgh ghgh',
          'fg hj fg hj fgh jhg asdg hjkl',
          'ghj fgh jgh asd;lkjhgfdsa',
        ],
        completed: false,
      },
    ],
  },
  {
    id: 'intermediate',
    title: 'Intermediate Course',
    description: 'Expand to top and bottom rows',
    level: 'intermediate',
    lessons: [
      {
        id: 'top-row-1',
        title: 'Top Row: E and I',
        description: 'Learn the middle finger reach keys',
        keys: ['E', 'I'],
        exercises: [
          'eee iii eee iii eie iei eiei',
          'ded kik ded kik deik deki',
          'the die tie lei fie hie',
        ],
        completed: false,
      },
      {
        id: 'top-row-2',
        title: 'Top Row: R and U',
        description: 'Add the index finger top row keys',
        keys: ['R', 'U', 'E', 'I'],
        exercises: [
          'rrr uuu rrr uuu rur uru ruru',
          'frf juj frf juj rfuj fruj',
          'true rude fire hire sure lure',
        ],
        completed: false,
      },
      {
        id: 'top-row-3',
        title: 'Top Row: W and O',
        description: 'Learn the ring finger top row keys',
        keys: ['W', 'O', 'E', 'I', 'R', 'U'],
        exercises: [
          'www ooo www ooo wow owo wowo',
          'sws lol sws lol wero oiue',
          'work flow grow slow show',
        ],
        completed: false,
      },
      {
        id: 'bottom-row-1',
        title: 'Bottom Row: C and M',
        description: 'Start the bottom row with index and middle fingers',
        keys: ['C', 'M'],
        exercises: [
          'ccc mmm ccc mmm cmc mcm cmcm',
          'dcd jmj dcd jmj dcmj mcjd',
          'come calm much each such',
        ],
        completed: false,
      },
      {
        id: 'bottom-row-2',
        title: 'Bottom Row: V and N',
        description: 'Add more bottom row keys',
        keys: ['V', 'N', 'C', 'M'],
        exercises: [
          'vvv nnn vvv nnn vnv nvn vnvn',
          'fvf jnj fvf jnj vnmc nmcv',
          'even never given seven',
        ],
        completed: false,
      },
    ],
  },
  {
    id: 'advanced',
    title: 'Advanced Course',
    description: 'Master all keys and build speed',
    level: 'advanced',
    lessons: [
      {
        id: 'full-keyboard-1',
        title: 'Full Keyboard Practice',
        description: 'Practice using all letter keys',
        keys: [],
        exercises: [
          'the quick brown fox jumps over the lazy dog',
          'pack my box with five dozen liquor jugs',
          'how vexingly quick daft zebras jump',
        ],
        completed: false,
      },
      {
        id: 'numbers-1',
        title: 'Number Row',
        description: 'Learn the number keys',
        keys: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
        exercises: [
          '111 222 333 444 555 666 777 888 999 000',
          '12 34 56 78 90 21 43 65 87 09',
          'I have 123 apples and 456 oranges',
        ],
        completed: false,
      },
      {
        id: 'punctuation-1',
        title: 'Punctuation',
        description: 'Master common punctuation marks',
        keys: ['.', ',', '!', '?', "'", '"'],
        exercises: [
          "Hello, world! How are you? I am fine.",
          "Yes, no, maybe. Stop! Go? Wait...",
          "Hello, she said. How are you today?",
        ],
        completed: false,
      },
      {
        id: 'speed-1',
        title: 'Speed Building',
        description: 'Build typing speed with common words',
        keys: [],
        exercises: [
          'the and for are but not you all can had her was one our out day',
          'have from they been have what were there when your some them',
          'would these other could their about first which after people',
        ],
        completed: false,
      },
      {
        id: 'speed-2',
        title: 'Advanced Speed',
        description: 'Challenge yourself with longer passages',
        keys: [],
        exercises: [
          'typing is an essential skill for modern communication and productivity',
          'practice makes perfect and consistent daily practice yields the best results',
          'focus on accuracy first and speed will naturally follow with time',
        ],
        completed: false,
      },
    ],
  },
];

// Practice texts for free typing
export const practiceTexts = {
  words: [
    'the quick brown fox jumps over the lazy dog',
    'pack my box with five dozen liquor jugs',
    'how vexingly quick daft zebras jump',
    'sphinx of black quartz judge my vow',
    'two driven jocks help fax my big quiz',
  ],
  sentences: [
    'The early bird catches the worm but the second mouse gets the cheese.',
    'A journey of a thousand miles begins with a single step.',
    'Practice makes perfect and patience is a virtue.',
    'Actions speak louder than words in most situations.',
    'Knowledge is power but enthusiasm pulls the switch.',
  ],
  paragraphs: [
    'Typing is an essential skill in the modern digital world. Whether you are writing emails, coding software, or simply browsing the internet, the ability to type quickly and accurately can significantly improve your productivity.',
    'Learning to touch type takes time and practice, but the rewards are well worth the effort. Once you master the keyboard, you will find that your thoughts flow more freely onto the screen.',
    'The key to becoming a proficient typist is consistent practice. Set aside a few minutes each day to practice, and you will see steady improvement in both your speed and accuracy.',
  ],
};
