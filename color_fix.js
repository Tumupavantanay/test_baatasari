const fs = require('fs');
const file = 'src/app/recruitment/page.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/#FAFAFA/gi, '#F8F6F0');
content = content.replace(/#F8F9FB/gi, '#F8F6F0');
content = content.replace(/#111827|#374151|#1F2937/gi, '#0C1E3C');
content = content.replace(/#6B7280|#9CA3AF/gi, '#828894');
content = content.replace(/#E5E8EF|#F0F2F5/gi, '#E5E7EB');
content = content.replace(/#F97316/gi, '#A1BCE6');

const oldChevron = '{open ? <ChevronDown size={13} className="text-[#828894]" /> : <ChevronLeft size={13} className="text-[#828894] -rotate-90" />}';
const newChevron = '<ChevronDown size={13} className={cn("text-[#828894] transition-transform duration-200", open ? "rotate-180" : "")} />';
content = content.replace(oldChevron, newChevron);

fs.writeFileSync(file, content);
console.log('Done');
