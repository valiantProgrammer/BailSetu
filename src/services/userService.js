import { MOCK_USER } from "@/src/data/mockData";

export const UserService = {
  async getCurrentUser() {
    return MOCK_USER;
  },

  async getSavedSections() {
    return MOCK_USER.savedSections;
  },

  async getRecentSearches() {
    return MOCK_USER.recentSearches;
  },
};
