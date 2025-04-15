const aboutMe = `Hey, I’m Reza Darvishifar – but  online, you  might know me as  DrunkLeen.
I’m a backend developer, passionate about Rust,  Go, and Java, with a love
for clean code, Linux systems, and everything open source.
My journey into tech wasn’t easy.  After facing challenges  finishing high
school due to problems, moving countries, health issues, and starting from
scratch in Germany, I refused to give up.
With  no fancy certificates,  I carved my path  through countless hours of
learning, building, and sharing what I know.
I run a small but growing YouTube channel where I teach programming—mostly
in Persian — covering topics  from Rust and Golang tutorials to deep dives
into Linux, Docker, and more.  My goal is to break down  complex  concepts
into digestible, practical lessons that help others  grow—especially those
who feel left out by traditional systems.
This space is for learners, tinkerers, rebels, and  those who believe you
don’t need a traditional degree to be great at what you do.
Welcome to my world. Let’s build cool stuff and learn out loud.`;

const socials = `youtube: https://www.youtube.com/@drunkleen/
twitter:   https://www.x.com/drunkleen/
linkedin:  https://www.linkedin.com/in/drunkleen/
instagram: https://www.instagram.com/drunkleen/
github:    https://github.com/drunkleen/`;

const fs = {
  "/": {
    "about.txt": aboutMe,

    "configs": {
      "theme.json": `{"theme":"hacker","font":"JetBrains Mono"}`,
      "cli.json": `{"shell":"zsh"}`,
      "dotfiles.txt": `download all of my dot files at: https://github.com/drunkleen/my-linux-configs`,
      "vscode_profiles": {
        "_dev.code-profile":`download from github:\nhttps://github.com/drunkleen/my-linux-configs/blob/master/vscode_profiles/_dev.code-profile`,
        "recording_profile_for_YT.code-profile": `download from github:\nhttps://github.com/drunkleen/my-linux-configs/blob/master/vscode_profiles/recording_profile_for_YT.code-profile`,
      }
    },
    
    "contact.txt": "📧 info@drunkleen.com",

    
    "projects": {
      "rustbook.txt": `Read the online version at: https://rustbook.drunkleen.com/`
    },
    
    "README.md": "# Welcome to my virtual terminal. you can use help and bunch of commands to explore",
    "socials.txt": socials,
    
    
} // folders or files inside here

};

let currentDir = "/";


function mkdir(name) {
  const dir = getPath(currentDir);
  if (dir[name]) {
    return addLine(`mkdir: cannot create directory '${name}': File exists`, "error", 80);
  }
  dir[name] = {};
  addLine("", "", 0);
}

function touch(name) {
  const dir = getPath(currentDir);
  if (dir[name]) {
    return;
  } // already exists
  dir[name] = null; // simulate file
  addLine("", "", 0);
}


function lsCmd() {
  const dir = getPath(currentDir);
  const items = Object.keys(dir);
  if (items.length === 0) {
    addLine("(empty)", "color2", 80);
  } else {
    loopLines([items.join("  ")], "color2", 80);
  }
}


function cd(name) {
  if (name === "..") {
    if (currentDir !== "/") {
      currentDir = currentDir.replace(/\/[^/]+\/?$/, "") || "/";
    }
    return;
  }

  const dir = getPath(currentDir);
  if (!dir[name] || typeof dir[name] !== "object") {
    return addLine(`cd: ${name}: No such directory`, "error", 80);
  }

  currentDir = currentDir.endsWith("/") ? currentDir + name : currentDir + "/" + name;
  $("prefix").textContent = "user@drunkleen.com:" + currentDir + " $ ";
}


function getPath(path) {
  const parts = path.split("/").filter(Boolean);
  let dir = fs["/"];
  for (const p of parts) {
    dir = dir[p];
  }
  return dir;
}


function getPathParts(basePath, parts) {
  const baseParts = basePath.split("/").filter(Boolean);
  const fullPath = [...baseParts, ...parts];
  let dir = fs["/"];
  for (const p of fullPath) {
    if (!dir[p] || typeof dir[p] !== "object") {
      return null;
    }
    dir = dir[p];
  }
  return dir;
}


function catFile(path) {
  const parts = path.split("/").filter(Boolean);
  const filename = parts.pop(); // last part is file name
  const targetDir = getPathParts(currentDir, parts);

  if (!targetDir || !Object.prototype.hasOwnProperty.call(targetDir, filename)) {
    return addLine(`cat: ${path}: No such file`, "error", 80);
  }

  if (typeof targetDir[filename] === "object") {
    return addLine(`cat: ${path}: Is a directory`, "error", 80);
  }

  const content = targetDir[filename].split("\n").map(line =>
    line.replace(/</g, "&lt;").replace(/>/g, "&gt;")
  );
  loopLines(content, "color2 margin", 40);
}


function tree(path = "/", indent = "", level = 0) {
  const dir = getPath(path);
  const entries = Object.keys(dir);
  const lines = level === 0 ? ["."] : [];

  entries.forEach((key, index) => {
    const isLast = index === entries.length - 1;
    const connector = isLast ? "└──" : "├──";
    const prefix = indent + connector;
    const isDir = typeof dir[key] === "object";

    lines.push(`${prefix} ${key}`);

    if (isDir) {
      const subIndent = indent + (isLast ? "    " : "│   ");
      lines.push(...tree(path + (path.endsWith("/") ? "" : "/") + key, subIndent, level + 1));
    }
  });

  return lines;
}