const fs = require('fs');

let skills = fs.readFileSync('src/components/SkillsSection.tsx', 'utf8');
skills = skills.replace(/import \{ useYouTubeVideos \} from "\.\.\/hooks\/useYouTubeVideos";\n/, '');
skills = skills.replace(/const \{ videos, loading, error \} = useYouTubeVideos\(\);\n/, 'const videos = PORTFOLIO_DATA.skills.thumbnails;\nconst loading = false;\nconst error = null;\n');
fs.writeFileSync('src/components/SkillsSection.tsx', skills);

let work = fs.readFileSync('src/components/WorkSection.tsx', 'utf8');
work = work.replace(/import \{ useYouTubeVideos \} from "\.\.\/hooks\/useYouTubeVideos";\n/, '');
work = work.replace(/const \{ videos, loading, error \} = useYouTubeVideos\(\);\n/, 'const videos = PORTFOLIO_DATA.work.videos;\nconst loading = false;\nconst error = null;\n');
fs.writeFileSync('src/components/WorkSection.tsx', work);
