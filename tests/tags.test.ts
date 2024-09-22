import { expect, test } from "vitest";
import tags from "../dist/tags.json" with { type: "json" };

test("property values of tag JSON complies the format.", async () => {
  for (const [ tag, { en, ja, title }] of Object.entries(tags)) {
    expect(typeof en).toBe("string");
    expect(typeof ja).toBe("string");
    expect(typeof title).toBe("object");
    expect(typeof title.en).toBe("string");
    expect(typeof title.ja).toBe("string");

    expect(tag).toMatch(/^[a-z0-9-]+$/);
    expect(en).toMatch(/^[A-Za-z0-9-& /()']+$/);
  }
});
