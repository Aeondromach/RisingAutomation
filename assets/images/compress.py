from PIL import Image
import os

RESIZE = True
REMOVE = True
IMAGE_EXTENSIONS_TO_COMPRESS = [".jpeg", ".jpg", ".png", ".webp"]

directory = os.path.dirname(__file__)
os.chdir(directory)
# files = os.listdir()
images = []

def file_allowed(file: str) -> bool:
    for extension in IMAGE_EXTENSIONS_TO_COMPRESS:
        if file.endswith(extension):
            return True
    return False

for root, dirs, files in os.walk("."):
    path = root.split(os.sep)
    for file in files:
        if file_allowed(file):
            images.append(os.path.join(*path, file))

print(images)
# exit()

for image_path in images:
    save_path = "".join(image_path.split(".")[:-1]) + ".webp"
    
    print(save_path)
    
    image = Image.open(image_path)
    image = image.convert('RGB')
    
    if RESIZE: image.thumbnail((1920, 1080), Image.LANCZOS)

    image.save(save_path, 'webp', optimize = True, quality = 70)

    if REMOVE: os.remove(image_path)