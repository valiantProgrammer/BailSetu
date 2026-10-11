import { ADVOCATES_DATA } from "@/src/data/mockData";

export const AdvocateService = {
  async getAdvocates(filters = {}) {
    let list = [...ADVOCATES_DATA];
    const { city, practiceArea, language, search } = filters;

    if (city && city !== "all" && city !== "All") {
      list = list.filter((adv) =>
        adv.location.toLowerCase().includes(city.toLowerCase())
      );
    }

    if (practiceArea && practiceArea !== "all" && practiceArea !== "All Practice Areas") {
      list = list.filter((adv) =>
        adv.specialisation.toLowerCase().includes(practiceArea.toLowerCase())
      );
    }

    if (language && language !== "all") {
      list = list.filter((adv) =>
        adv.languages.toLowerCase().includes(language.toLowerCase())
      );
    }

    if (search && search.trim() !== "") {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (adv) =>
          adv.name.toLowerCase().includes(q) ||
          adv.specialisation.toLowerCase().includes(q) ||
          adv.location.toLowerCase().includes(q)
      );
    }

    return list;
  },

  async getAdvocateById(id) {
    return ADVOCATES_DATA.find((adv) => adv.id === id) || null;
  },
};
