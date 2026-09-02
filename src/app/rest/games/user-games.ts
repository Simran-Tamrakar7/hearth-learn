import { ARCADIA_GAMES, type ArcadiaGame } from "@/app/rest/games/_content";
import { readHiddenIds, readUserList, slugifyId, writeHiddenIds, writeUserList } from "@/lib/userCatalog";

export type UserArcadiaGame = ArcadiaGame & { id: string };

const GAMES_KEY = "hearth_user_games";
const HIDDEN_KEY = "hearth_user_games_hidden";

export function gameKey(g: ArcadiaGame) {
  return `${g.t}::${g.u}`;
}

export function getUserGames(): UserArcadiaGame[] {
  return readUserList<UserArcadiaGame>(GAMES_KEY);
}

export function saveUserGame(game: UserArcadiaGame) {
  const list = getUserGames();
  const idx = list.findIndex((g) => g.id === game.id);
  if (idx >= 0) list[idx] = game;
  else list.push(game);
  writeUserList(GAMES_KEY, list);
}

export function removeGame(game: ArcadiaGame | UserArcadiaGame) {
  if ("id" in game && game.id.startsWith("user-")) {
    writeUserList(
      GAMES_KEY,
      getUserGames().filter((g) => g.id !== game.id),
    );
    return;
  }
  const hidden = readHiddenIds(HIDDEN_KEY);
  hidden.add(gameKey(game));
  writeHiddenIds(HIDDEN_KEY, hidden);
}

export function mergeGames(): (ArcadiaGame | UserArcadiaGame)[] {
  const hidden = readHiddenIds(HIDDEN_KEY);
  const builtin = ARCADIA_GAMES.filter((g) => !hidden.has(gameKey(g)));
  return [...getUserGames(), ...builtin];
}

export function emptyUserGame(title: string): UserArcadiaGame {
  return {
    id: `user-${slugifyId(title)}-${Date.now().toString(36)}`,
    cat: "arcade",
    tag: "Custom",
    genre: "Arcade",
    t: title.trim() || "Untitled game",
    d: "",
    u: "",
    e: "🎮",
    c: "#D97706",
  };
}
