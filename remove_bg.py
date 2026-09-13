from PIL import Image

def remove_bg(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    width, height = img.size
    pixels = img.load()
    
    # Target color is the top-left pixel
    target_color = pixels[0, 0]
    
    # We want to replace it with transparent
    replacement_color = (0, 0, 0, 0)
    
    # Stack for flood fill
    stack = []
    
    # Add all border pixels to the stack if they match the target color
    for x in range(width):
        if pixels[x, 0] == target_color: stack.append((x, 0))
        if pixels[x, height - 1] == target_color: stack.append((x, height - 1))
    for y in range(height):
        if pixels[0, y] == target_color: stack.append((0, y))
        if pixels[width - 1, y] == target_color: stack.append((width - 1, y))
        
    visited = set(stack)
    
    while stack:
        x, y = stack.pop()
        pixels[x, y] = replacement_color
        
        # Check neighbors
        for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
            nx, ny = x + dx, y + dy
            if 0 <= nx < width and 0 <= ny < height:
                if (nx, ny) not in visited:
                    visited.add((nx, ny))
                    # Check exact match (or very close)
                    r, g, b, a = pixels[nx, ny]
                    tr, tg, tb, ta = target_color
                    # If it's identical black background:
                    if r == tr and g == tg and b == tb:
                        stack.append((nx, ny))

    img.save(output_path)

remove_bg("public/assets/Screenshot 2026-09-13 151746.png", "public/assets/character-transparent.png")
