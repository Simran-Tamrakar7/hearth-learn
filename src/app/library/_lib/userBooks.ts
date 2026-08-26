import {
  bookShelves,
  listedLibraryBooks,
  type LibraryBook,
} from "@/app/library/_content/_registry";
import { makeOverlayCatalog, slugId } from "@/lib/localCatalog";

export type UserBook = LibraryBook & { user?: boolean };

const store = makeOverlayCatalog<UserBook>({
  list: "hearth_user_books_v1",
  hidden: "hearth_hidden_book_ids",
  overlay: "hearth_book_overlays_v1",
  event: "hearth_user_books_updated",
});

export function isUserBook(id: string) {
  return id.startsWith("user-");
}

export function emptyBook(opts: {
  title: string;
  author?: string;
  url?: string;
  shelf?: string;
  blurb?: string;
  coverUrl?: string;
}): UserBook {
  const title = opts.title.trim() || "Untitled book";
  return {
    id: `user-${slugId(title)}-${Date.now().toString(36).slice(-4)}`,
    title,
    author: (opts.author || "Unknown").trim() || "Unknown",
    shelf: opts.shelf || "fiction",
    blurb: (opts.blurb || "").trim(),
    url: (opts.url || "").trim() || "#",
    source: "Your shelf",
    coverUrl: opts.coverUrl?.trim() || null,
    user: true,
  };
}

export function listedAllBooks(): UserBook[] {
  return store.merge(listedLibraryBooks());
}

export function searchAllBooks(query: string, shelfId = "all"): UserBook[] {
  const q = query.trim().toLowerCase();
  return listedAllBooks().filter((b) => {
    const onShelf = !shelfId || shelfId === "all" || bookShelves(b).includes(shelfId);
    if (!onShelf) return false;
    if (!q) return true;
    return (
      b.title.toLowerCase().includes(q) ||
      b.author.toLowerCase().includes(q) ||
      b.blurb.toLowerCase().includes(q) ||
      b.source.toLowerCase().includes(q)
    );
  });
}

export function saveBook(book: UserBook) {
  return store.upsert({ ...book, user: true });
}

export function patchBook(id: string, patch: Partial<UserBook>) {
  if (isUserBook(id)) {
    const found = store.list().find((b) => b.id === id);
    if (!found) return;
    store.upsert({ ...found, ...patch, id });
    return;
  }
  store.overlay(id, patch);
}

export function removeBook(id: string) {
  if (isUserBook(id)) store.remove(id);
  else store.hide(id);
}

export function subscribeBooks(onChange: () => void) {
  return store.subscribe(onChange);
}
