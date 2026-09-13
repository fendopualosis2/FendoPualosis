from PIL import Image

img = Image.open('public/assets/Screenshot 2026-09-13 151746.png').convert("RGBA")
width, height = img.size
pixels = img.load()

bg_color = (0, 0, 0)
threshold = 15

# Get the bounding box of the non-background parts first
visited = set()
to_visit = []

# Start from edges
for x in range(width):
    to_visit.append((x, 0))
    to_visit.append((x, height - 1))
for y in range(height):
    to_visit.append((0, y))
    to_visit.append((width - 1, y))

# Flood fill
while to_visit:
    x, y = to_visit.pop()
    if (x, y) in visited:
        continue
    visited.add((x, y))
    
    r, g, b, a = pixels[x, y]
    dist = ((r - bg_color[0])**2 + (g - bg_color[1])**2 + (b - bg_color[2])**2)**0.5
    if dist < threshold:
        pixels[x, y] = (255, 255, 255, 0)
        
        # Add neighbors
        if x > 0: to_visit.append((x - 1, y))
        if x < width - 1: to_visit.append((x + 1, y))
        if y > 0: to_visit.append((x, y - 1))
        if y < height - 1: to_visit.append((x, y + 1))

# Now crop to the bounding box
bbox = img.getbbox()
if bbox:
    img = img.crop(bbox)

img.save('public/assets/character-safecut.png')
print("Saved character-safecut.png")
