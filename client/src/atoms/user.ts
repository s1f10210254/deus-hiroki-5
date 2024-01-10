import { Riddle } from '$/api/@types';
import { atom } from 'jotai';

export type UserModel = {
  id: string;
  name: string;
  email: string;
};

export const userAtom = atom<UserModel | null>(null);
