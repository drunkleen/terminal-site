
# 🖥️ DrunkLeen Terminal

An interactive web terminal-style portfolio built with vanilla JS, HTML, and CSS. Inspired by real Linux terminals, it features custom commands, dynamic themes, and easter eggs — all in a retro hacker vibe.


## 🚀 Features

- ✅ Terminal-like CLI interface
- 🎨 Theme switching (`default`, `light`, `hacker`)
- 📜 Custom commands (`neofetch`, `uptime`, `email`, `social`, etc.)
- 📂 Faux filesystem: `ls`, `cat about.txt`
- ⏱ Uptime since April 15, 2025
- 🔗 Links to socials and projects
- 🧠 Fun easter eggs (`sudo`, `clear`, `whois`, etc.)

## 📂 Project Structure

```
.
├── css
│   └── style.css          # Terminal theme and UI styles
├── index.html             # Entry point
└── js
    ├── caret.js           # Cursor movement logic
    ├── commands.js        # All command definitions
    ├── fs.js               # FileSystem logic 
    └── main.js            # Core terminal logic
```

## 🛠 Local Development

```bash
# Clone the repo
git clone https://github.com/drunkleen/terminal-site.git
cd terminal-site

# Just open in browser
open index.html
```

> No build steps, no dependencies — just pure HTML/CSS/JS.

## 📄 License

MIT — free to remix, fork, and customize!
