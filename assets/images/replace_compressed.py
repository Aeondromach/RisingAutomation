from PIL import Image
import os

IMAGE_EXTENSIONS_TO_COMPRESS = [".jpeg", ".jpg", ".png"]
FILES_TO_SEARCH = [".html", ".css", ".js"]

directory = os.getcwd()
# directory = os.path.dirname(__file__)
# os.chdir(directory)
searching_files = []

print(directory)

def file_allowed(file: str) -> bool:
    for extension in FILES_TO_SEARCH:
        if file.endswith(extension):
            return True
    return False

for root, dirs, files in os.walk("."):
    path = root.split(os.sep)
    for file in files:
        if file_allowed(file):
            searching_files.append(directory + "\\" + os.path.join(*(path[1:]), file))

print(searching_files)
# exit()

for file in searching_files:
    f = open(file, "r", encoding="utf-8")
    content = f.read()
    f.close()

    for image_extension in IMAGE_EXTENSIONS_TO_COMPRESS:
        content = content.replace(image_extension, ".webp")
    
    f = open(file, "w", encoding="utf-8")
    f.write(content)
    f.close()
