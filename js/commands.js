const youtube = "https://www.youtube.com/@drunkleen/";
const twitter = "https://www.x.com/drunkleen/";
const linkedin = "https://www.linkedin.com/in/drunkleen/";
const instagram = "https://www.instagram.com/drunkleen/";
const github = "https://github.com/drunkleen/";
const email = 'mailto:info@drunkleen.com';
const rust = 'https://rustbook.drunkleen.com';


const ls = [
  "about.txt     github.txt    instagram.txt    linkedin.txt",
  "twitter.txt   youtube.txt",
  "<br>"
];

const cat = [
  "print files on the standard output",
  "<br>"
];

const whois = [
  "Hey, I’m Reza Darvishifar – but  online, you  might know me as  DrunkLeen.",
  "I’m a backend developer, passionate about Rust,  Go, and Java, with a love",
  "for clean code, Linux systems, and everything open source.",
  "My journey into tech wasn’t easy.  After facing challenges  finishing high",
  "school due to problems, moving countries, health issues, and starting from",
  "scratch in Germany, I refused to give up.",
  "With  no fancy certificates,  I carved my path  through countless hours of",
  "learning, building, and sharing what I know.",
  "",
  "I run a small but growing YouTube channel where I teach programming—mostly",
  "in Persian — covering topics  from Rust and Golang tutorials to deep dives",
  "into Linux, Docker, and more.  My goal is to break down  complex  concepts",
  "into digestible, practical lessons that help others  grow—especially those",
  "who feel left out by traditional systems.",
  "",
  "This space is for learners, tinkerers, rebels, and  those who believe you ",
  "don’t need a traditional degree to be great at what you do.",
  "Welcome to my world. Let’s build cool stuff and learn out loud.",

  "<br>"
];


var whoami = [
  "User",
  "<br>"
];



const rustbook = [
  "is a E-Book translated from the original rust rust book to Persian.",
  "<br>"
];

const social = [
  'youtube        <a href="' + youtube + '" target="_blank">youtube/drunkleen' + "</a>",
  'github         <a href="' + github + '" target="_blank">github/drunkleen' + "</a>",
  'x/twitter      <a href="' + twitter + '" target="_blank">x/twitter/drunkleen' + '</a>',
  'linkedin       <a href="' + linkedin + '" target="_blank">linkedin/drunkleen' + "</a>",
  'instagram      <a href="' + instagram + '" target="_blank">instagram/drunkleen' + '</a>',
  "<br>"
];

const sudo = [
  '<span class="command">sudo</span>           you are not allowed to use root privileges',
  "<br>"
];

const projects = [
  "<br>",
  "Still curating... most projects are offline, on GitHub, or confidential.",
  "<br>"
];

const help = [
  '<span class="command">help</span>           You obviously already know what this does',
  '<span class="command">cat</span>            Print on the standard output',
  '<span class="command">clear</span>          Clear terminal',
  '<span class="command">clearhistory</span>   Clear saved command history',
  '<span class="command">date</span>           Show current date and time',
  '<span class="command">email</span>          Show E-mail',
  '<span class="command">history</span>        View command history',
  '<span class="command">ls</span>             List the FILEs (the current directory).',
  '<span class="command">neofetch</span>       Display system information',
  '<span class="command">projects</span>       View coding projects',
  '<span class="command">rustbook</span>       Persian version of Rust E-Book',
  '<span class="command">social</span>         Display social networks',
  '<span class="command">theme</span>          Toggle between available themes',
  '<span class="command">themes</span>         List all themes',
  '<span class="command">tree</span>           View folder structure recursively',
  '<span class="command">uptime</span>         Show how long you’ve been here',
  '<span class="command">video</span>          View YouTube videos',
  "<br>",
];


const sessionStart = new Date("2025-04-15T00:00:00Z");

function getUptime() {
  const ms = Date.now() - sessionStart.getTime();
  const sec = Math.floor(ms / 1000) % 60;
  const min = Math.floor(ms / (1000 * 60)) % 60;
  const hr = Math.floor(ms / (1000 * 60 * 60)) % 24;
  const days = Math.floor(ms / (1000 * 60 * 60 * 24));
  return `${days}d ${hr}h ${min}m ${sec}s`;
}


function getDateTime() {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "medium",
  }).format(new Date());
}


const banner = [
"  ▄     ▄  ",
" ▄ ▀▄   ▄▀ ▄     • OS:     Web Linux",
" █▄█▀███▀█▄█     • Host:   drunkleen",
" ▀█████████▀     • Theme:  " + (localStorage.getItem("theme") || "default"),
"  ▄▀   ▀▄       • Uptime: " + getUptime(),
  '<span class="color2">Welcome to my interactive web terminal.</span>',
  "<span class=\"color2\">For a list of available commands, type</span> <span class=\"command\">'help'</span><span class=\"color2\">.</span>",
];