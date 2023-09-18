import dayjs from "dayjs";
import { Octokit } from "@octokit/rest";
import { getWordsWithoutSimplifiedChinese } from "../libs/todo.js";

const wordsWithoutSimplifiedChinese = await getWordsWithoutSimplifiedChinese();

if (wordsWithoutSimplifiedChinese.length <= 0) {
  console.info("All words are already translated to Chinese!");
  process.exit(0);
}

const issueBody = "The following words do not have Chinese translations yet. Add Chinese translations for these words.\n\n" +
  "# Words without Simplified Chinese translation\n\n" +
  wordsWithoutSimplifiedChinese.map(file =>
    `## [${file.filename}](https://github.com/xicri/genshin-langdata/blob/main/dataset/dictionary/${file.filename})` + "\n\n" +
    file.words.map(word => `- ${word.en}`).join("\n")
  ).join("\n\n") + `

  @Bill-Haku @SleepyAsh0191 Please assign yourself to this issue **just before** you start working on the translation. The one who assigned himself faster would work on this Issue.
  cc: @xicri`;
const issueTitle = `Chinese Translation (${dayjs().format("YYYY.MM.DD")})`;
const issueLabel = "Simplified Chinese Translation";

const octokit = new Octokit({
  auth: process.env.GITHUB_PAT,
  timeZone: "Asia/Tokyo",
});

const { data: existingAssignedIssues } = await octokit.rest.issues.listForRepo({
  owner: "xicri",
  repo: "genshin-langdata",
  labels: issueLabel,
  assignee: "*",
});
const existingAssignedIssue = existingAssignedIssues[0];

const { data: existingUnassignedIssues } = await octokit.rest.issues.listForRepo({
  owner: "xicri",
  repo: "genshin-langdata",
  labels: issueLabel,
  assignee: "none",
});
const existingUnassignedIssue = existingUnassignedIssues[0];

if (existingAssignedIssue) {
  if (existingAssignedIssue.body !== issueBody) { // if any translations are updated
    await octokit.rest.issues.createComment({
      owner: "xicri",
      repo: "genshin-langdata",
      issue_number: existingAssignedIssue.number,
      body: `${existingAssignedIssue.assignees.map(assignee => `@${assignee.login}`).join(" ") } The \`main\` branch has been updated. You may need to rebase your feature branch.
cc: @xicri`,
    });
  }
} else if (existingUnassignedIssue) {
  await octokit.rest.issues.update({
    owner: "xicri",
    repo: "genshin-langdata",
    issue_number: existingUnassignedIssue.number,
    title: issueTitle,
    body: issueBody,
  });
} else {
  await octokit.rest.issues.create({
    owner: "xicri",
    repo: "genshin-langdata",
    title: issueTitle,
    labels: [ issueLabel ],
    body: issueBody,
  });
}
