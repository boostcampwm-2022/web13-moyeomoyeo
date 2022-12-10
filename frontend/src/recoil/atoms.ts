import { atom } from 'recoil';

const categoryAtom = atom({
  key: 'categoryAtom',
  default: null,
});

const locationAtom = atom({
  key: 'locationAtom',
  default: null,
});

const progressCheckedAtom = atom({
  key: 'progressCheckedAtom',
  default: false,
});

const scrollYAtom = atom({
  key: 'scrollYAtom',
  default: 0,
});

export { categoryAtom, locationAtom, progressCheckedAtom, scrollYAtom };
