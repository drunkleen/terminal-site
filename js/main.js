let before = document.getElementById("before");
let liner = document.getElementById("liner");
let command = document.getElementById("typer"); 
let textarea = document.getElementById("texter"); 
let terminal = document.getElementById("terminal");

let git = 0;
let pw = false;
let pwd = false;
let commands = [];

try {
  const saved = localStorage.getItem("cmdHistory");
  if (saved) {
    commands = JSON.parse(saved);
  }
} catch (e) {
  console.warn("Failed to load history:", e);
}

function setTheme(themeName) {
  document.documentElement.setAttribute('data-theme', themeName);
  localStorage.setItem('theme', themeName);
}

function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'default';
  setTheme(savedTheme);
}

function toggleTheme() {
  const current = localStorage.getItem('theme') || 'default';
  const next = current === 'default' ? 'light' : current === 'light' ? 'hacker' : 'default';
  setTheme(next);
}

initTheme();



window.addEventListener("keyup", enterKey);

console.log(
  "%cCongratulations, You Hacked Me! ",
  "color: #04ff00; font-weight: bold; font-size: 24px;"
);

//init
textarea.value = "";
command.innerHTML = textarea.value;

function enterKey(e) {
  const {key} = e;

  if (e.ctrlKey && key === "c") {
    addLine(`^C`, "error", 0);
    textarea.value = "";
    command.innerHTML = "";
    return;
  }
  if (key === "µ") {
    location.reload();
  } // keyCode 181 (rare usage)
  
  if (key === "Enter") {
    const input = command.innerHTML.trim();
    if (input) {
      localStorage.setItem("cmdHistory", JSON.stringify(commands));
      commands.push(input);
      git = commands.length;
      addLine(`user@drunkleen.com:${currentDir} $ ${input}`, "no-animation", 0);
      commander(input);
      command.innerHTML = textarea.value = "";
    } else {
      addLine(`user@drunkleen.com:${currentDir} $ ${input}`, "no-animation", 0);
    }
    typeIt(textarea);
  }

  
  if (key === "ArrowUp" && git > 0) {
    textarea.value = commands[--git];
    command.innerHTML = textarea.value;
  }
  if (key === "ArrowDown" && git < commands.length) {
    textarea.value = commands[++git] || "";
    command.innerHTML = textarea.value;
  }
}



const commandMap = {
  help: () => loopLines(help, "color2 margin", 80),

  pwd: () => addLine(currentDir, "color2", 80),

  theme: () => {
    toggleTheme();
    addLine("Theme changed!", "color2", 80);
  },
  themes: () => {
    addLine("Available themes: default, light, hacker", "color2", 80);
  },

  cat: () => loopLines(cat, "color2 margin", 80),

  tree: () => loopLines(tree(currentDir), "color2 margin", 40),

  whois: () => loopLines(whois, "color2 margin", 80),

  whoami: () => loopLines(whoami, "color2 margin", 80),

  rustbook: () => {
    loopLines(rustbook, "color2 margin", 80);
    newTab(rust);
  },

  rust: () => {
    loopLines(rustbook, "color2 margin", 80);
    newTab(rust);
  },

  youtube: () => {
    addLine("Opening YouTube...", "color2", 80);
    newTab(youtube);
  },
  yt: () => commandMap.youtube(),
  video: () => commandMap.youtube(),

  twitter: () => {
    addLine("Opening Twitter...", "color2", 0);
    newTab(twitter);
  },
  x: () => commandMap.twitter(),

  linkedin: () => {
    addLine("Opening LinkedIn...", "color2", 0);
    newTab(linkedin);
  },

  instagram: () => {
    addLine("Opening Instagram...", "color2", 0);
    newTab(instagram);
  },

  github: () => {
    addLine("Opening GitHub...", "color2", 0);
    newTab(github);
  },

  social: () => loopLines(social, "color2 margin", 80),

  sudo: () => loopLines(sudo, "color2 margin", 80),

  projects: () => loopLines(projects, "color2 margin", 80),
  history: () => {
    loopLines(commands, "color2", 80);
    addLine("<br>", "command", 80 * commands.length + 50);
  },
  clearhistory: () => {
    localStorage.removeItem("cmdHistory");
    commands = [];
    addLine("Command history cleared!", "color2", 80);
  },

  email: () => {
    addLine(`Opening mailto:<a href="${email}">${email}</a>...`, "color2", 80);
    newTab(email);
  },

  clear: () =>
    setTimeout(() => {
      terminal.innerHTML = '<a id="before"></a>';
      before = document.getElementById("before");
    }, 1),
  cls: () => commandMap.clear(),

  uptime: () => {
    addLine(`Uptime: ${getUptime()}`, "color2", 80);
  },

  date: () => {
    addLine(`Date: ${getDateTime()}`, "color2", 80);
  },


  neofetch: () => loopLines(banner, "", 80),
};


function commander(input) {


  const [cmd, ...args] = input.trim().split(" ");
  const arg = args.join(" ");
  
  if (cmd === "cd") {
    return cd(arg);
  }
  if (cmd === "ls") {
    return lsCmd();
  }
  if (cmd === "pwd") {
    return addLine(currentDir, "color2", 80);
  }
  if (cmd === "cat") {
    return catFile(arg);
  }
  
  const fn = commandMap[cmd.toLowerCase()];
  fn ? fn() : addLine(`Command not found. Type <span class="command">'help'</span>.`, "error", 100);
}




function newTab(link) {
  setTimeout(function() {
    window.open(link, "_blank");
  }, 500);
}

function addLine(text, style, time) {
  var t = "";
  for (let i = 0; i < text.length; i++) {
    if (text.charAt(i) == " " && text.charAt(i + 1) == " ") {
      t += "&nbsp;&nbsp;";
      i++;
    } else {
      t += text.charAt(i);
    }
  }
  setTimeout(function() {
    var next = document.createElement("p");
    next.innerHTML = t;
    next.className = style;

    before.parentNode.insertBefore(next, before);

    window.scrollTo(0, document.body.offsetHeight);
  }, time);
}

function loopLines(name, style, time) {
  name.forEach(function(item, index) {
    addLine(item, style, index * time);
  });
}

