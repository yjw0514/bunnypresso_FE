import firebasedb from './firebase';
import { getStorage } from 'firebase/storage';

const storage = getStorage(firebasedb);
export default storage;
