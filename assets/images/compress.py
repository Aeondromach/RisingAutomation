from PIL import Image
import os

RESIZE = True
REMOVE = False
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
            images.append(file)

print(images)
# exit()

for image in images:
    save_path = "".join(image.split(".")[:-1]) + ".webp"
    
    print(save_path)
    
    image = Image.open(image)
    image = image.convert('RGB')
    
    if RESIZE: image.thumbnail((1920, 1080), Image.LANCZOS)
    if REMOVE: os.remove(image)

    image.save(save_path, 'webp', optimize = True, quality = 70)