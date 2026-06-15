#!/usr/bin/env python3
"""
Добавляет фото в src/assets/gallery/ с дедупликацией по sha256.

Использование:
  python3 scripts/add-gallery-photos.py <папка-с-исходниками> [--preset premium]

Логика:
1. Считает sha256 каждого исходного файла.
2. Сравнивает с .hashes.json (хеши исходников и обработанных webp).
3. Пропускает дубли, обрабатывает новые премиум-пресетом, аплоадит в CDN,
   создаёт work-NNN.webp.asset.json и обновляет манифест.
"""
import argparse, hashlib, json, os, subprocess, sys, tempfile, re
from pathlib import Path
from PIL import Image, ImageEnhance, ImageFilter, ImageOps

ROOT = Path(__file__).resolve().parent.parent
GAL  = ROOT / "src/assets/gallery"
MANIFEST = GAL / ".hashes.json"

def sha256(path):
    h=hashlib.sha256()
    with open(path,'rb') as f:
        for ch in iter(lambda:f.read(1<<16),b''): h.update(ch)
    return h.hexdigest()

def load_manifest():
    if MANIFEST.exists():
        return json.loads(MANIFEST.read_text())
    return {"by_source": {}, "by_output": {}}  # hash -> work-NNN.webp

def save_manifest(m):
    MANIFEST.write_text(json.dumps(m, indent=2, sort_keys=True) + "\n")

def next_index():
    nums=[int(m.group(1)) for p in GAL.glob("work-*.webp.asset.json")
          if (m:=re.match(r"work-(\d+)\.webp\.asset\.json", p.name))]
    return (max(nums) if nums else 0) + 1

def premium(src, dst):
    im=Image.open(src).convert('RGB')
    w,h=im.size; s=min(w,h)
    im=im.crop(((w-s)//2,(h-s)//2,(w+s)//2,(h+s)//2)).resize((1200,1200), Image.LANCZOS)
    im=ImageOps.autocontrast(im, cutoff=1)
    r,g,b=im.split()
    r=r.point(lambda x: min(255,int(x*1.03)))
    b=b.point(lambda x: max(0,int(x*0.98)))
    im=Image.merge('RGB',(r,g,b))
    im=ImageEnhance.Color(im).enhance(1.18)
    im=ImageEnhance.Contrast(im).enhance(1.08)
    im=ImageEnhance.Brightness(im).enhance(1.02)
    im=im.filter(ImageFilter.UnsharpMask(radius=1.2, percent=130, threshold=2))
    im.save(dst,'WEBP', quality=86, method=6)

def main():
    ap=argparse.ArgumentParser()
    ap.add_argument("src_dir")
    args=ap.parse_args()
    src_dir=Path(args.src_dir)
    files=sorted([p for p in src_dir.iterdir()
                  if p.suffix.lower() in {".jpg",".jpeg",".png",".webp"}])
    if not files:
        print("Нет файлов для обработки"); return
    m=load_manifest()
    idx=next_index()
    added=skipped=0
    with tempfile.TemporaryDirectory() as tmp:
        for src in files:
            sh=sha256(src)
            if sh in m["by_source"]:
                print(f"[skip src-dup] {src.name} == {m['by_source'][sh]}")
                skipped+=1; continue
            out=Path(tmp)/f"work-{idx:03d}.webp"
            premium(src, out)
            oh=sha256(out)
            if oh in m["by_output"]:
                print(f"[skip out-dup] {src.name} -> {m['by_output'][oh]}")
                m["by_source"][sh]=m["by_output"][oh]
                skipped+=1; continue
            name=f"work-{idx:03d}.webp"
            asset_json=GAL/f"{name}.asset.json"
            r=subprocess.run(["lovable-assets","create","--file",str(out),"--filename",name],
                             capture_output=True, text=True, check=True)
            asset_json.write_text(r.stdout)
            m["by_source"][sh]=name
            m["by_output"][oh]=name
            print(f"[added] {src.name} -> {name}")
            idx+=1; added+=1
            save_manifest(m)
    print(f"\nГотово: добавлено {added}, пропущено дублей {skipped}")

if __name__=="__main__":
    main()
