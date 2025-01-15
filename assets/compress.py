from PIL import Image
import os

RESIZE = True
REMOVE = False

directory = os.path.dirname(__file__)
os.chdir(directory)
files = os.listdir()
images = []

image_extensions_to_compress = [".jpeg", ".jpg", ".png", ".webp"]

for file in files:
    for extension in image_extensions_to_compress:
        if file.endswith(extension):
            images.append(file)
            break

for image in images:
    save_path = "".join(image.split(".")[:-1]) + ".webp"
    
    print(save_path)
    
    image = Image.open(image)
    image = image.convert('RGB')
    
    if RESIZE: image.thumbnail((1920, 1080), Image.LANCZOS)
    if REMOVE: os.remove(image)

    image.save(save_path, 'webp', optimize = True, quality = 70)