import { ARCADIA_GAMES, type ArcadiaGame, gameId } from "@/app/rest/games/_content";
import { makeOverlayCatalog, slugId } from "@/lib/localCatalog";

export type UserGame = ArcadiaGame & { id: string };

const store = makeOverlayCatalog<UserGame>({
  list: "hearth_user_games_v1",
  hidden: "hearth_hidden_game_ids",
  overlay: "hearth_game_overlays_v1",
  event: "hearth_user_games_updated",
});

const builtins: UserGame[] = ARCADIA_GAMES.map((g, i) => ({
  ...g,
  id: gameId(g, i),
}));

export const catalogGames = builtins;

export function isUserGame(id: string) {
  return id.startsWith("user-");
}

export function emptyGame(opts: {
  title: string;
  url?: string;
  cat?: ArcadiaGame["cat"];
  genre?: string;
  description?: string;
  emoji?: string;
  imageUrl?: string;
}): UserGame {
  const title = opts.title.trim() || "Untitled game";
  return {
    id: `user-g-${slugId(title)}-${Date.now().toString(36).slice(-4)}`,
    cat: opts.cat || "arcade",
    tag: "YOURS",
    genre: opts.genre || "Arcade",
    t: title,
    d: (opts.description || "").trim(),
    u: (opts.url || "").trim() || "https://",
    e: opts.emoji?.trim() || "🎮",
    c: "#D97757",
    imageUrl: opts.imageUrl?.trim() || "",
  };
}

export function listedGames(): UserGame[] {
  return store.merge(builtins);
}

export function saveGame(game: UserGame) {
  return store.upsert(game);
}

export function patchGame(id: string, patch: Partial<UserGame>) {
  if (isUserGame(id)) {
    const found = store.list().find((g) => g.id === id);
    if (!found) return;
    store.upsert({ ...found, ...patch, id });
    return;
  }
  store.overlay(id, patch);
}

export function removeGame(id: string) {
  if (isUserGame(id)) store.remove(id);
  else store.hide(id);
}

export function subscribeGames(onChange: () => void) {
  return store.subscribe(onChange);
}
