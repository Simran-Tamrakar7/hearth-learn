export type CatalogStatus = "active" | "archived" | "deleted";

export type CatalogEntry = {
  id: string;
  title: string;
  tool: string;
  status: CatalogStatus;
  order: number;
  tags: string[];
};

/** Default lists skip archived/deleted. Omitted status counts as active. */
export function isListed(status?: CatalogStatus) {
  return (status ?? "active") === "active";
}
