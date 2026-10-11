import { SECTIONS_DATA, POPULAR_SEARCHES, CATEGORIES } from "@/src/data/mockData";

export const LegalService = {
  async getPopularSearches() {
    return POPULAR_SEARCHES;
  },

  async getCategories() {
    return CATEGORIES;
  },

  async getAllSections(filterType = "all") {
    if (filterType === "all") return SECTIONS_DATA;
    return SECTIONS_DATA.filter(
      (sec) => sec.lawType.toLowerCase() === filterType.toLowerCase()
    );
  },

  async searchSections({ query = "", filterType = "all", category = "" }) {
    let results = SECTIONS_DATA;

    if (filterType && filterType !== "all") {
      results = results.filter(
        (sec) => sec.lawType.toLowerCase() === filterType.toLowerCase()
      );
    }

    if (category) {
      results = results.filter((sec) => sec.category === category);
    }

    if (query && query.trim() !== "") {
      const q = query.trim().toLowerCase();
      const tokens = q.split(/\s+/).filter((t) => t.length > 2);

      const matched = results.filter((sec) => {
        const textToSearch = `${sec.code} ${sec.title} ${sec.titleHi || ''} ${sec.shortDesc} ${sec.category}`.toLowerCase();
        // exact match or any token match
        if (textToSearch.includes(q)) return true;
        return tokens.some((token) => textToSearch.includes(token));
      });

      if (matched.length > 0) {
        results = matched;
      }
    }

    return results;
  },

  async getSectionById(id) {
    const section = SECTIONS_DATA.find(
      (sec) =>
        sec.id.toLowerCase() === id.toLowerCase() ||
        sec.code.toLowerCase().replace(/\s+/g, "").includes(id.toLowerCase().replace(/\s+/g, ""))
    );
    return section || null;
  },
};
