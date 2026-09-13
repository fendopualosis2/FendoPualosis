from PIL import Image, ImageDraw
import sys

img = Image.open('public/assets/Screenshot 2026-09-13 151746.png')
img = img.convert("RGBA")
width, height = img.size
pixels = img.load()

# Get background color from corners
corners = [(0, 0), (width-1, 0), (0, height-1), (width-1, height-1)]
bg_colors = [pixels[x, y] for x, y in corners]
# assuming corners are background
bg_color = bg_colors[0] 

print(f"Background color: {bg_color}")

# Perform flood fill from edges
to_visit = set()
for x in range(width):
    to_visit.add((x, 0))
    to_visit.add((x, height-1))
for y in range(height):
    to_visit.add((0, y))
    to_visit.add((width-1, y))

visited = set()
threshold = 15

while to_visit:
    x, y = to_visit.pop()
    if (x, y) in visited:
        continue
    visited.add((x, y))
    
    if x < 0 or x >= width or y < 0 or y >= height:
        continue
        
    p = pixels[x, y]
    if abs(p[0] - bg_color[0]) <= threshold and abs(p[1] - bg_color[1]) <= threshold and abs(p[2] - bg_color[2]) <= threshold:
        pixels[x, y] = (255, 255, 255, 0)
        to_visit.add((x+1, y))
        to_visit.add((x-1, y))
        to_visit.add((x, y+1))
        to_visit.add((x, y-1))

# Crop
bbox = img.getbbox()
print(f"Bounding box: {bbox}")
if bbox:
    img = img.crop(bbox)

img.save('public/assets/character-perfect-flood.png')
print("Saved character-perfect-flood.png")
