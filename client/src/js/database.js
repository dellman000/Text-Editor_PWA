import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  
  const db = await openDB('jate',1)
  const transaction= db.transaction('jate','readwrite').objectStore('jate')
  
  await transaction.put({id:1,jate:content})

};

// TODO: Add logic for a method that gets all the content from the database
// grabe  the doc fronm the store with the id of 1 
//return the text value you have stored to that document
export const getDb = async () => {
  const db = await openDB('jate',1)
  const store = db.transaction('jate').objectStore('jate')
  const data = await store.get(1)
  console.log(`data`,data)
  return data ? data.jate : null

};

initdb();
