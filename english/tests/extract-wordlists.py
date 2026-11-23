"""Extract only catalogue-matching lexical facts from official OUP word lists."""
import json
import re
import subprocess
from pathlib import Path
from pypdf import PdfReader

ROOT = Path(__file__).resolve().parents[1]
CODE = "['js/catalog','data/families-01','data/families-02','data/curriculum','data/reference','data/evidence'].forEach(f=>require('./'+f+'.js'));console.log(JSON.stringify(Object.values(ETEnglish.entries).map(w=>({id:w.id,word:w.headword,pos:w.pos}))));"
entries = json.loads(subprocess.check_output(["node", "-e", CODE], cwd=ROOT, encoding="utf-8"))
references = {}
for name in ("oxford-3000", "oxford-5000"):
    level = None
    for page_number, page in enumerate(PdfReader(ROOT / "tests" / (name + ".pdf")).pages, 1):
        for raw in page.extract_text().splitlines():
            line = raw.strip()
            if re.fullmatch(r"[ABC][12]", line):
                level = line
                continue
            match = re.match(r"^(.+?)\s+((?:adj|adv|n|v)\..*)$", line)
            if not level or not match:
                continue
            word, pos_text = match.groups()
            for pos in re.findall(r"\b(adj|adv|n|v)\.", pos_text):
                for entry in entries:
                    if entry["word"] == word and entry["pos"] == pos:
                        references.setdefault(entry["id"], []).append({"level": level, "list": name, "page": page_number, "scope": "lexeme-pos"})
output = "/* Selected lexical facts, not a copy of the source word lists. */\nETEnglish.oxfordRatings = " + json.dumps(references, ensure_ascii=False, indent=2) + ";\n"
(ROOT / "data" / "oxford-ratings.js").write_text(output, encoding="utf-8")
print(json.dumps({"matchedEntries": len(references), "catalogueEntries": len(entries), "sample": {key: references[key] for key in references if any(word in key for word in [":formation:", ":comfort:", ":evaluate:", ":interaction:"])}}))
