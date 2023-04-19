import dotenv from "dotenv";
import FormData from "form-data";
import fetch from "node-fetch";

dotenv.config();

/**
 * Login
 * @returns {Promise<string>} access token
 */
export const login = async () => {
  const params = new URLSearchParams();

  params.append("grant_type", "client_credentials");
  params.append("client_id", process.env.MINHON_API_KEY);
  params.append("client_secret", process.env.MINHON_API_SECRET);
  params.append("urlAccessToken", "https://mt-auto-minhon-mlt.ucri.jgn-x.jp/oauth2/token.php");

  try {
    const res = await fetch("https://mt-auto-minhon-mlt.ucri.jgn-x.jp/oauth2/token.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
    });

    if (400 <= res.status) {
      throw new Error(`HTTP Status ${res.status} / response:\n${JSON.stringify(await res.json(), null, 2)}`);
    }

    const json = await res.json();
    const accessToken = json.access_token;

    if (!accessToken) {
      console.log(json);
    }

    return accessToken;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

/**
 * Create a glossary.
 * @param {string} src - source language. "en" or "ja".
 * @param {string} target - target language. "en" or "ja".
 * @param {string} accessToken - API access token
 * @returns {Promise<number>} - glossary ID
 */
export const createGlossary = async (src, target, { accessToken }) => {
  if (!process.env.NODE_ENV) {
    throw new Error("NODE_ENV is required to create glossary.");
  }

  if (
    (src !== "en" && src !== "ja") ||
    (target !== "en" && target !== "ja")
  ) {
    throw new Error(`Only "en" and "ja" are allowed as a source/target language code. Currently set src is "${src}" and target is "${target}".`);
  }

  const params = new URLSearchParams();

  params.append("type", "json");
  params.append("access_token", accessToken);
  params.append("key", process.env.MINHON_API_KEY);
  params.append("name", process.env.MINHON_LOGIN_ID);
  params.append("api_name", "term_root");
  params.append("api_param", "set");
  params.append("title", `genshin-${src}-${target}-${process.env.NODE_ENV}`);
  params.append("lang_s", src); // source language
  params.append("lang_t", target); // target language
  params.append("provide", process.env.NODE_ENV === "production" ? 1 : 0); // only allow to use production glossary in academic research

  try {
    const res = await fetch("https://mt-auto-minhon-mlt.ucri.jgn-x.jp/api/", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
    });

    if (400 <= res.status) {
      throw new Error(`HTTP Status ${res.status} / response:\n${JSON.stringify(await res.json(), null, 2)}`);
    }

    const { resultset } = await res.json();

    if (resultset.code !== 0) {
      throw new Error(`Error code ${resultset.code} / response:\n${JSON.stringify(resultset, null, 2)}`);
    }

    return resultset.result.pid;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const listGlossaries = async ({ accessToken }) => {
  const params = new URLSearchParams();

  params.append("type", "json");
  params.append("access_token", accessToken);
  params.append("key", process.env.MINHON_API_KEY);
  params.append("name", process.env.MINHON_LOGIN_ID);
  params.append("api_name", "term_root");
  params.append("api_param", "get");

  try {
    const res = await fetch("https://mt-auto-minhon-mlt.ucri.jgn-x.jp/api/", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
    });

    if (400 <= res.status) {
      throw new Error(`HTTP Status ${res.status} / response:\n${JSON.stringify(await res.json(), null, 2)}`);
    }

    return (await res.json()).resultset.result.list;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const deleteGlossary = async (glossaryID, { accessToken }) => {
  const params = new URLSearchParams();

  params.append("type", "json");
  params.append("access_token", accessToken);
  params.append("key", process.env.MINHON_API_KEY);
  params.append("name", process.env.MINHON_LOGIN_ID);
  params.append("api_name", "term_root");
  params.append("api_param", "delete");
  params.append("pid", glossaryID);

  try {
    const res = await fetch("https://mt-auto-minhon-mlt.ucri.jgn-x.jp/api/", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
    });

    if (400 <= res.status) {
      throw new Error(`HTTP Status ${res.status} / response:\n${await res.text()}`);
    }

    const { resultset } = await res.json();

    if (resultset.code !== 0) {
      throw new Error(`Error code ${resultset.code} / response:\n${JSON.stringify(resultset, null, 2)}`);
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const uploadGlossaryItems = async (tsvText, glossaryID, { accessToken }) => {
  console.info("Uploading a MinHon glossary...");

  const form = new FormData();

  form.append("type", "json");
  form.append("access_token", accessToken);
  form.append("key", process.env.MINHON_API_KEY);
  form.append("name", process.env.MINHON_LOGIN_ID);
  form.append("api_name", "term");
  form.append("api_param", "set_file");
  form.append("pid", glossaryID);
  form.append("file", tsvText, {
    contentType: "text/plain",
    name: "file",
    filename: "MinHonGlossary.tsv",
  });

  const res = await fetch("https://mt-auto-minhon-mlt.ucri.jgn-x.jp/api/", {
    method: "POST",
    body: form,
  });

  const { resultset } = await res.json();

  if (resultset.code === 0) {
    console.info("Finished Uploading a MinHon glossary.");
  } else {
    throw new Error(`[Error] Failed to upload MinHon glossary. (code: ${resultset.code})` + "\n" + JSON.stringify(resultset, null, 2));
  }
};

export const listCustomTranslations = async ({ accessToken }) => {
  const params = new URLSearchParams();

  params.append("type", "json");
  params.append("access_token", accessToken);
  params.append("key", process.env.MINHON_API_KEY);
  params.append("name", process.env.MINHON_LOGIN_ID);
  params.append("api_name", "mt_custom");
  params.append("api_param", "get");

  try {
    const res = await fetch("https://mt-auto-minhon-mlt.ucri.jgn-x.jp/api/", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
    });

    if (400 <= res.status) {
      throw new Error(`HTTP Status ${res.status} / response:\n${JSON.stringify(await res.json(), null, 2)}`);
    }

    return (await res.json()).resultset.result.list;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const updateGlossariesInCustomTranslation = async ({ id, srcLang, destLang, glossaryID, reverseGlossaryID, accessToken }) => {
  console.info("Updating glossary in the custom translations...");

  const params = new URLSearchParams();

  params.append("type", "json");
  params.append("access_token", accessToken);
  params.append("key", process.env.MINHON_API_KEY);
  params.append("name", process.env.MINHON_LOGIN_ID);
  params.append("api_name", "mt_custom");
  params.append("api_param", "update");
  params.append("id", id);
  params.append("title", `原神 自動翻訳 (${srcLang} → ${destLang} / ${ process.env.NODE_ENV === "production" ? "プロダクション" : "ステージング" })`);
  params.append(
    "description",
    "ゲーム「原神」の固有名詞をサポートしたカスタム自動翻訳です。"
      + (process.env.NODE_ENV !== "production" ? "このカスタム自動翻訳はステージング環境用です。" : "")
  );
  params.append("lang_s", srcLang);
  params.append("lang_t", destLang);
  params.append("mt_id", srcLang === "ja" ? "generalNT_ja_en" : "generalNT_en_ja");
  params.append("nolookup", 0);
  params.append("xml", 0);
  params.append("trans_n", glossaryID);
  params.append("trans_r", reverseGlossaryID);
  params.append("log_use", 0);
  params.append("public", 0);
  params.append("public_detail", 0);

  const res = await fetch("https://mt-auto-minhon-mlt.ucri.jgn-x.jp/api/", {
    method: "POST",
    body: params,
  });

  const { resultset } = await res.json();

  if (resultset.code === 0) {
    console.info("Finished Updating glossary in the custom translations.");
  } else {
    console.error(`[Error] Failed to upload MinHon glossary. (code: ${resultset.code})`);
    console.error(JSON.stringify(resultset, null, 2));
  }
};
