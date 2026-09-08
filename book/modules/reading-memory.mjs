/* MAT Reader: Reading memory — positions, history, bookmarks, notes. */
import { storage } from "./storage.mjs";

const MAX_HISTORY = 50;
const MAX_SEARCH_HISTORY = 20;

function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 8); }

/* --- Reading Positions --- */
export async function savePosition(chapterId, scrollPct, anchor) {
  await storage.put("readingPositions", {
    chapterId,
    scrollPct: Math.round(scrollPct),
    anchor: anchor || null,
    updatedAt: new Date().toISOString()
  });
}

export async function getPosition(chapterId) {
  return storage.get("readingPositions", chapterId);
}

/* --- Reading History --- */
export async function addToHistory(chapterId, title, record) {
  const all = await storage.getAll("history");
  const existing = all.find(h => h.chapterId === chapterId);
  if (existing) {
    existing.openedAt = new Date().toISOString();
    existing.title = title;
    existing.record = record || null;
    await storage.put("history", existing);
  } else {
    const entry = { id: uid(), chapterId, title, record: record || null, openedAt: new Date().toISOString() };
    await storage.put("history", entry);
    const updated = await storage.getAll("history");
    if (updated.length > MAX_HISTORY) {
      const sorted = updated.sort((a, b) => new Date(a.openedAt) - new Date(b.openedAt));
      for (let i = 0; i < sorted.length - MAX_HISTORY; i++) {
        await storage.del("history", sorted[i].id);
      }
    }
  }
}

export async function getHistory() {
  const all = await storage.getAll("history");
  return all.sort((a, b) => new Date(b.openedAt) - new Date(a.openedAt));
}

export async function getLastChapter() {
  const hist = await getHistory();
  return hist[0] || null;
}

export async function clearHistory() {
  await storage.clear("history");
}

/* --- Bookmarks --- */
export async function addBookmark(chapterId, heading, record) {
  const all = await storage.getAll("bookmarks");
  const exists = all.find(b => b.chapterId === chapterId && b.heading === (heading || null));
  if (exists) return exists;
  const bm = { id: uid(), chapterId, heading: heading || null, record: record || null, createdAt: new Date().toISOString() };
  await storage.put("bookmarks", bm);
  return bm;
}

export async function removeBookmark(id) {
  await storage.del("bookmarks", id);
}

export async function getBookmarks() {
  const all = await storage.getAll("bookmarks");
  return all.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export async function isBookmarked(chapterId, heading) {
  const all = await storage.getAll("bookmarks");
  return all.find(b => b.chapterId === chapterId && b.heading === (heading || null)) || null;
}

/* --- Notes --- */
export async function addNote(chapterId, text, heading, record) {
  const note = {
    id: uid(), chapterId, text, heading: heading || null, record: record || null,
    createdAt: new Date().toISOString(), updatedAt: new Date().toISOString()
  };
  await storage.put("notes", note);
  return note;
}

export async function updateNote(id, text) {
  const note = await storage.get("notes", id);
  if (!note) return null;
  note.text = text;
  note.updatedAt = new Date().toISOString();
  await storage.put("notes", note);
  return note;
}

export async function deleteNote(id) {
  await storage.del("notes", id);
}

export async function getNotes(chapterId) {
  const all = await storage.getAll("notes");
  const filtered = chapterId ? all.filter(n => n.chapterId === chapterId) : all;
  return filtered.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
}

/* --- Highlights --- */
export async function addHighlight(chapterId, text, range, color) {
  const hl = { id: uid(), chapterId, text, range, color: color || "#f0d887", createdAt: new Date().toISOString() };
  await storage.put("highlights", hl);
  return hl;
}

export async function removeHighlight(id) {
  await storage.del("highlights", id);
}

export async function getHighlights(chapterId) {
  const all = await storage.getAll("highlights");
  return chapterId ? all.filter(h => h.chapterId === chapterId) : all;
}

/* --- Search History --- */
export async function addSearchHistory(query) {
  const entry = { id: uid(), query, timestamp: new Date().toISOString() };
  await storage.put("searchHistory", entry);
  const all = await storage.getAll("searchHistory");
  if (all.length > MAX_SEARCH_HISTORY) {
    const sorted = all.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    for (let i = 0; i < sorted.length - MAX_SEARCH_HISTORY; i++) {
      await storage.del("searchHistory", sorted[i].id);
    }
  }
}

export async function getSearchHistory() {
  const all = await storage.getAll("searchHistory");
  return all.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
}

/* --- Preferences --- */
export async function setPref(name, value) {
  await storage.put("preferences", { name, value });
}

export async function getPref(name, fallback) {
  const p = await storage.get("preferences", name);
  return p ? p.value : fallback;
}

/* --- Favorites --- */
export async function addFavorite(recordNumber) {
  await storage.put("favorites", { recordNumber, addedAt: new Date().toISOString() });
}

export async function removeFavorite(recordNumber) {
  await storage.del("favorites", recordNumber);
}

export async function getFavorites() {
  return storage.getAll("favorites");
}

/* --- Export / Import --- */
export async function exportReaderData() {
  const data = {
    version: 1,
    exportedAt: new Date().toISOString(),
    bookmarks: await getBookmarks(),
    notes: await getNotes(),
    favorites: await getFavorites(),
    readingPositions: await storage.getAll("readingPositions"),
    preferences: await storage.getAll("preferences")
  };
  return JSON.stringify(data, null, 2);
}

export async function importReaderData(jsonStr) {
  const data = JSON.parse(jsonStr);
  if (!data.version || data.version !== 1) throw new Error("Invalid import version");
  if (data.bookmarks) for (const b of data.bookmarks) await storage.put("bookmarks", b);
  if (data.notes) for (const n of data.notes) await storage.put("notes", n);
  if (data.favorites) for (const f of data.favorites) await storage.put("favorites", f);
  if (data.readingPositions) for (const p of data.readingPositions) await storage.put("readingPositions", p);
  if (data.preferences) for (const p of data.preferences) await storage.put("preferences", p);
  return true;
}

/* --- Reset Controls --- */
export async function clearTemporaryCache() { await storage.clear("translations"); await storage.clear("cacheMetadata"); }
export async function clearReadingPreferences() { await storage.clear("preferences"); }
export async function deleteAllData() { await storage.clearAll(); }
