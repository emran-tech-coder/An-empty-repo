const FILE_PATH = "./data.json";
const simpleGit = require("simple-git");
const jsonfile = require("jsonfile");
const moment = require("moment");
const random = require("random");

// Use the current working directory for the git repository
const git = simpleGit();

const makeCommits = async (n) => {
  if (n === 0) {
    return;
  }

  const x = random.int(0, 54);
  const y = random.int(0, 6);
  const DATE = moment()
    .subtract(1, "y")
    .add(random.int(0, 6), "d")
    .add(x, "w")
    .add(y, "d")
    .format();

  const data = {
    date: DATE,
  };

  console.log(DATE);

  await jsonfile.writeFile(FILE_PATH, data);
  await git.add([FILE_PATH]);
  await git.commit(DATE, { "--date": DATE });

  await makeCommits(n - 1);
};

const run = async () => {
  try {
    await makeCommits(10);
    console.log("Pushing changes to remote repository...");
    await git.push(["-u", "origin", "main"]);
    console.log("Pushed changes to remote repository successfully.");
  } catch (err) {
    console.error("An error occurred:", err);
  }
};

run();