import type { LibraryBook } from "@/app/library/_content/_registry";
import { libraryBooks, listedLibraryBooks } from "@/app/library/_content/_registry";
import { readHiddenIds, readUserList, slugifyId, writeHiddenIds, writeUserList } from "@/lib/userCatalog";

const BOOKS_KEY = "hearth_user_library_books";
const HIDDEN_KEY = "hearth_user_library_hidden";

export function getUserLibraryBooks(): LibraryBook[] {
  return readUserList<LibraryBook>(BOOKS_KEY);
}

export function saveUserLibraryBook(book: LibraryBook) {
  const list = getUserLibraryBooks();
  const idx = list.findIndex((b) => b.id === book.id);
  if (idx >= 0) list[idx] = book;
  else list.push(book);
  writeUserList(BOOKS_KEY, list);
}

export function removeLibraryBook(id: string) {
  const user = getUserLibraryBooks();
  if (user.some((b) => b.id === id)) {
    writeUserList(
      BOOKS_KEY,
      user.filter((b) => b.id !== id),
    );
    return;
  }
  const hidden = readHiddenIds(HIDDEN_KEY);
  hidden.add(id);
  writeHiddenIds(HIDDEN_KEY, hidden);
}

export function mergeLibraryBooks(): LibraryBook[] {
  const hidden = readHiddenIds(HIDDEN_KEY);
  const builtin = listedLibraryBooks().filter((b) => !hidden.has(b.id));
  const user = getUserLibraryBooks();
  const userIds = new Set(user.map((b) => b.id));
  return [...user, ...builtin.filter((b) => !userIds.has(b.id))];
}

export function emptyLibraryBook(title: string): LibraryBook {
  const id = `user-${slugifyId(title)}-${Date.now().toString(36)}`;
  return {
    id,
    title: title.trim() || "Untitled",
    author: "",
    shelf: "fiction",
    blurb: "",
    url: "",
    source: "My shelf",
  };
}

export function isBuiltinBook(id: string) {
  return libraryBooks.some((b) => b.id === id);
}
