import { atom } from 'recoil';
import { v4 as uuid } from 'uuid';

const categoryAtom = atom({
  key: `categoryAtom/${uuid()}`,
  default: null,
});

const locationAtom = atom({
  key: `locationAtom/${uuid()}`,
  default: null,
});

const progressCheckedAtom = atom({
  key: `progressCheckedAtom/${uuid()}`,
  default: false,
});

const scrollYAtom = atom({
  key: `scrollYAtom/${uuid()}`,
  default: 0,
});

export { categoryAtom, locationAtom, progressCheckedAtom, scrollYAtom };
