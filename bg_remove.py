from PIL import Image

img = Image.open('public/assets/Screenshot 2026-09-13 151746.png').convert("RGBA")
width, height = img.size
pixels = img.load()

# Assuming top-left corner is the background color
bg_color = pixels[0, 0]

for y in range(height):
    for x in range(width):
        r, g, b, a = pixels[x, y]
        # Calculate color distance
        dist = ((r - bg_color[0])**2 + (g - bg_color[1])**2 + (b - bg_color[2])**2)**0.5
        if dist < 20: # Threshold
            pixels[x, y] = (255, 255, 255, 0)

bbox = img.getbbox()
if bbox:
    img = img.crop(bbox)

img.save('public/assets/character-cutout.png')
print("Done")
