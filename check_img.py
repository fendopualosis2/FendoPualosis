from PIL import Image
import sys

img = Image.open('public/assets/Screenshot 2026-09-13 151746.png')
print(f"Mode: {img.mode}, Size: {img.size}")
if img.mode == 'RGBA':
    data = img.getdata()
    alphas = [a for r,g,b,a in data]
    print(f"Min alpha: {min(alphas)}, Max alpha: {max(alphas)}")
