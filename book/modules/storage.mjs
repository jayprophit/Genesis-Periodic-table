/* MAT Reader: IndexedDB storage abstraction. */
const DB_NAME = "MATReaderDB";
const DB_VERSION = 1;

const STORES = [
  { name: "preferences", keyPath: "name" },
  { name: "readingPositions", keyPath: "chapterId" },
  { name: "history", keyPath: "id", indexes: [{ name: "timestamp", keyPath: "timestamp" }] },
  { name: "bookmarks", keyPath: "id", indexes: [{ name: "chapterId", keyPath: "chapterId" }, { name: "timestamp", keyPath: "timestamp" }] },
  { name: "notes", keyPath: "id", indexes: [{ name: "chapterId", keyPath: "chapterId" }, { name: "timestamp", keyPath: "timestamp" }] },
  { name: "highlights", keyPath: "id", indexes: [{ name: "chapterId", keyPath: "chapterId" }] },
  { name: "favorites", keyPath: "recordNumber" },
  { name: "searchHistory", keyPath: "id", indexes: [{ name: "timestamp", keyPath: "timestamp" }] },
  { name: "translations", keyPath: "contentHash" },
  { name: "cacheMetadata", keyPath: "buildId" },
  { name: "uiState", keyPath: "name" }
];

let dbInstance = null;

function openDB() {
  if (dbInstance) return Promise.resolve(dbInstance);
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = (e) => {
      const db = e.target.result;
      for (const s of STORES) {
        if (!db.objectStoreNames.contains(s.name)) {
          const store = db.createObjectStore(s.name, { keyPath: s.keyPath });
          for (const idx of s.indexes || []) {
            store.createIndex(idx.name, idx.keyPath, { unique: false });
          }
        }
      }
    };
    req.onsuccess = (e) => { dbInstance = e.target.result; resolve(dbInstance); };
    req.onerror = (e) => reject(e.target.error);
  });
}

async function get(storeName, key) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, "readonly");
    const req = tx.objectStore(storeName).get(key);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function put(storeName, value) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, "readwrite");
    const req = tx.objectStore(storeName).put(value);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function del(storeName, key) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, "readwrite");
    const req = tx.objectStore(storeName).delete(key);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

async function getAll(storeName) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, "readonly");
    const req = tx.objectStore(storeName).getAll();
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function clear(storeName) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, "readwrite");
    const req = tx.objectStore(storeName).clear();
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

async function clearAll() {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORES.map(s => s.name), "readwrite");
    for (const s of STORES) {
      tx.objectStore(s.name).clear();
    }
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export const storage = { openDB, get, put, del, getAll, clear, clearAll, STORES };
