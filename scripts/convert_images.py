import os
from PIL import Image

directory = "public/clients"

for filename in os.listdir(directory):
    if filename.endswith((".png", ".jpg", ".jpeg")):
        filepath = os.path.join(directory, filename)
        img = Image.open(filepath)

        # Construct new filename
        new_filename = os.path.splitext(filename)[0] + ".webp"
        new_filepath = os.path.join(directory, new_filename)

        # Convert and save
        img.save(new_filepath, "WEBP")
        print(f"Converted {filename} to {new_filename}")
