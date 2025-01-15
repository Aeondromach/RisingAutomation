from PIL import Image
import os

RESIZE = True
REMOVE = True

directory = os.path.dirname(__file__)
os.chdir(directory)
files = os.listdir()
images = []

img_extension = ".jpeg"

for file in files:
    if file.endswith(img_extension):
        images.append(file)

for thisImage in images:
    image_dir = thisImage
    save_path = thisImage.split(img_extension)[0] + ".webp"
    
    print(save_path)
    
    image = Image.open(image_dir)
    image = image.convert('RGB')
    
    if RESIZE:
        image.thumbnail((1920, 1080), Image.LANCZOS)
    if REMOVE:
        os.remove(image_dir)

    image.save(save_path, 'webp', optimize = True, quality = 70)