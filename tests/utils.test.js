import words from "../dist/words.json";

test("words[].id is properly converted from the English words", () => {
  for (const word of words) {
    if (word.en === "Aether") {
      expect(word.id).toBe("aether");
    } else if (word.en === "Jean Gunnhildr") {
      expect(word.id).toBe("jean-gunnhildr");
    } else if (word.en === "Oceanid / Lochfolk") {
      expect(word.id).toBe("oceanid");
    } else if (word.en === "Khaenri'ah") {
      expect(word.id).toBe("khaenriah");
    } else if (word.en === "Ad astra abyssosque!") {
      expect(word.id).toBe("ad-astra-abyssosque");
    } else if (word.en === "Mt. Hulao") {
      expect(word.id).toBe("mt-hulao");
    } else if (word.en === "Battlefront: Misty Dungeon") {
      expect(word.id).toBe("battlefront-misty-dungeon");
    } else if (word.en === "NRE (Menu 30)") {
      expect(word.id).toBe("nre-menu-30");
    } else if (word.en === "The Great Mountain Survey Ⅱ") {
      expect(word.id).toBe("the-great-mountain-survey-2");
    }
  }
});
