export const PORTFOLIO_DATA = {
  name: "Fendo Pualosis",
  roles: [
    {
      title: "VIDEO EDITOR",
      color:
        "bg-cyan-500/20 text-cyan-200 border-cyan-500/50 shadow-cyan-500/20",
    },
    {
      title: "GRAPHIC DESIGNER",
      color:
        "bg-purple-500/20 text-purple-200 border-purple-500/50 shadow-purple-500/20",
    },
    {
      title: "DEVELOPER",
      color:
        "bg-emerald-500/20 text-emerald-200 border-emerald-500/50 shadow-emerald-500/20",
    },
    {
      title: "PROMPT ENGINEER",
      color:
        "bg-amber-500/20 text-amber-200 border-amber-500/50 shadow-amber-500/20",
    },
    {
      title: "SCRIPTWRITER",
      color:
        "bg-rose-500/20 text-rose-200 border-rose-500/50 shadow-rose-500/20",
    },
    {
      title: "YOUTUBER",
      color:
        "bg-blue-500/20 text-blue-200 border-blue-500/50 shadow-blue-500/20",
    },
  ],
  socials: {
    youtube: "https://www.youtube.com/@FendoPualosis",
    instagram: "https://www.instagram.com/fendopualosis",
    email: "mailto:fendopualosis@gmail.com",
  },
  images: {
    character: "/assets/character-safecut.png", // Minecraft Character with precisely removed background
    mrBeast: "/assets/Screenshot 2026-09-13 152232.png", // MrBeast NGO
    townHall: "/assets/taklsdg.jpeg", // Public Speaking / Wojak
    hacker: "/assets/hacking-guy-with-toy-laptor.png", // Hacker kid
    wojak: "/assets/2jowaks.jpeg", // Wojak meme
    blackbeard: "/assets/blackbeard-writing-his-heresy-v0-3ijx4fmucmtb1.webp", // Blackbeard
    davinci: "/assets/davsd.jpg",
    premiere: "/assets/premiereprotimeline.jpeg",
    capcut:
      "https://images.unsplash.com/photo-1629851416393-2782e4e7e651?q=80&w=1000&auto=format&fit=crop", // Temporary high quality editing timeline image representing capcut interface/video editing since real capcut timeline screenshot requires manual upload
  },
  youtubeConfig: {
    YOUTUBE_CHANNEL_URL: "https://www.youtube.com/@FendoPualosis",
  },
  skills: {
    thumbnails: [
      {
        id: "226ev1OynuU",
        title: "Video 1",
        url: "https://youtu.be/226ev1OynuU",
        thumbnail: "https://img.youtube.com/vi/226ev1OynuU/maxresdefault.jpg",
      },
      {
        id: "lgb2bI7EQA4",
        title: "Video 2",
        url: "https://youtu.be/lgb2bI7EQA4",
        thumbnail: "https://img.youtube.com/vi/lgb2bI7EQA4/maxresdefault.jpg",
      },
      {
        id: "NtOSB_qeQSM",
        title: "Video 3",
        url: "https://youtu.be/NtOSB_qeQSM",
        thumbnail: "https://img.youtube.com/vi/NtOSB_qeQSM/maxresdefault.jpg",
      },
      {
        id: "zchH7W_i5mY",
        title: "Video 4",
        url: "https://youtu.be/zchH7W_i5mY",
        thumbnail: "https://img.youtube.com/vi/zchH7W_i5mY/maxresdefault.jpg",
      },
      {
        id: "iN-rQ6n3vpM",
        title: "Video 5",
        url: "https://youtu.be/iN-rQ6n3vpM",
        thumbnail: "https://img.youtube.com/vi/iN-rQ6n3vpM/maxresdefault.jpg",
      },
    ],
    videoEditing: {
      primary: "DaVinci Resolve",
      secondary: ["Premiere Pro", "CapCut"],
      description:
        "Professional color grading, seamless transitions, engaging pacing, and high-retention storytelling workflows.",
    },
    development: {
      languages: [
        {
          name: "JavaScript",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
          desc: "Interactive web applications and dynamic frontends.",
        },
        {
          name: "Python",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
          desc: "Automation, data processing, and backend scripting.",
        },
        {
          name: "Java",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
          desc: "Robust enterprise software and Minecraft modding.",
        },
        {
          name: "C",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
          desc: "Low-level system programming and memory management.",
        },
      ],
      dataStructures: [
        "Arrays",
        "Linked Lists",
        "Stacks",
        "Queues",
        "Trees",
        "Graphs",
        "Hashing",
        "Searching",
        "Sorting",
      ],
    },
    scriptwriting: {
      description:
        "I craft compelling narratives that retain viewership. From high-stakes YouTube hooks to deep lore storytelling, I structure scripts that keep audiences watching until the very last second.",
    },
    promptEngineering: {
      tools: [
        {
          name: "Claude",
          logo: "https://upload.wikimedia.org/wikipedia/commons/4/47/Claude_Ai.svg",
          desc: "Advanced reasoning and creative writing generation.",
        },
        {
          name: "ChatGPT",
          logo: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
          desc: "Versatile brainstorming and code assistance.",
        },
        {
          name: "Gemini",
          logo: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg",
          desc: "Multimodal analysis and rapid information processing.",
        },
        {
          name: "Perplexity",
          logo: "https://cdn.iconscout.com/icon/free/png-256/free-perplexity-ai-logo-icon-download-in-svg-png-gif-file-formats--technology-social-media-company-brand-vol-5-pack-logos-icons-7626189.png",
          desc: "Deep research and fact-checking workflows.",
        },
        {
          name: "Grok",
          logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Grok_logo.svg/512px-Grok_logo.svg.png",
          desc: "Real-time data synthesis and distinct tone generation.",
        },
        {
          name: "DeepSeek",
          logo: "https://upload.wikimedia.org/wikipedia/commons/d/d0/DeepSeek_logo.svg",
          desc: "Efficient coding and logic problem solving.",
        },
      ],
    },
  },
  work: {
    videos: [
      {
        id: "226ev1OynuU",
        title: "Video 1",
        url: "https://youtu.be/226ev1OynuU",
        thumbnail: "https://img.youtube.com/vi/226ev1OynuU/maxresdefault.jpg",
      },
      {
        id: "lgb2bI7EQA4",
        title: "Video 2",
        url: "https://youtu.be/lgb2bI7EQA4",
        thumbnail: "https://img.youtube.com/vi/lgb2bI7EQA4/maxresdefault.jpg",
      },
      {
        id: "NtOSB_qeQSM",
        title: "Video 3",
        url: "https://youtu.be/NtOSB_qeQSM",
        thumbnail: "https://img.youtube.com/vi/NtOSB_qeQSM/maxresdefault.jpg",
      },
      {
        id: "zchH7W_i5mY",
        title: "Video 4",
        url: "https://youtu.be/zchH7W_i5mY",
        thumbnail: "https://img.youtube.com/vi/zchH7W_i5mY/maxresdefault.jpg",
      },
      {
        id: "iN-rQ6n3vpM",
        title: "Video 5",
        url: "https://youtu.be/iN-rQ6n3vpM",
        thumbnail: "https://img.youtube.com/vi/iN-rQ6n3vpM/maxresdefault.jpg",
      },
    ],
    events: [
      {
        id: "mun",
        title: "Model United Nations",
        description:
          "Navigating complex geopolitical debates and diplomatic negotiations with strategic foresight.",
      },
      {
        id: "hackathon",
        title: "Hackathons",
        description:
          "Building innovative software solutions under extreme time pressure.",
      },
      {
        id: "public-speaking",
        title: "Public Speaking",
        description:
          "Delivering engaging presentations to large audiences with confidence.",
      },
    ],
    ngo: {
      description:
        "Dedicated to utilizing creative skills and platform reach to support meaningful causes. Experience in organizing charity streams, creating promotional content for non-profits, and driving community engagement for positive impact.",
    },
  },
};
