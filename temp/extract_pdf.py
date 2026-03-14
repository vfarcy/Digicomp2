from pathlib import Path
from pypdf import PdfReader

pdf_path = Path("DCII-manual.pdf")
out_path = Path("temp/DCII-manual.extracted.txt")

reader = PdfReader(str(pdf_path))
parts = []
for i, page in enumerate(reader.pages, start=1):
    txt = page.extract_text() or ""
    parts.append(f"\n\n===== PAGE {i} =====\n\n")
    parts.append(txt)

out_path.parent.mkdir(parents=True, exist_ok=True)
out_path.write_text("".join(parts), encoding="utf-8")
print(f"pages={len(reader.pages)}")
print(f"written={out_path}")
