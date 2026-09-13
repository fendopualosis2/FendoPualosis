from PIL import Image
import sys

try:
    img = Image.open('public/assets/Screenshot 2026-09-13 151746.png')
    img = img.convert("RGBA")
    data = img.getdata()

    bg_color = data[0] # Top-left pixel
    print(f"Top-left pixel color: {bg_color}")
    
    # Process background
    new_data = []
    # threshold for bg removal
    threshold = 10
    for item in data:
        # Check if color is close to bg_color
        if abs(item[0]-bg_color[0]) < threshold and abs(item[1]-bg_color[1]) < threshold and abs(item[2]-bg_color[2]) < threshold:
            new_data.append((255, 255, 255, 0)) # transparent
        else:
            new_data.append(item)
            
    img.putdata(new_data)
    
    # Crop to bounding box
    bbox = img.getbbox()
    print(f"Bounding box: {bbox}")
    if bbox:
        img = img.crop(bbox)
        
    img.save('public/assets/character-perfect.png')
    print("Saved character-perfect.png")
except Exception as e:
    print(f"Error: {e}")
