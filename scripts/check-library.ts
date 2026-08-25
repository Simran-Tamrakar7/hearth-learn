import { libraryBooks, searchBooks, booksOnShelf } from "../src/app/library/_content/_registry.ts";

const romance = booksOnShelf("romance");
if (romance.length < 5) throw new Error("romance shelf too small");
if (!searchBooks("austen").some((b) => b.id === "pride-prejudice")) {
  throw new Error("search missed Pride and Prejudice");
}
if (searchBooks("zzzz-nope").length !== 0) throw new Error("empty search leaked");
if (libraryBooks.length < 30) throw new Error("catalog too small");
console.log(`ok ${libraryBooks.length} books`);
