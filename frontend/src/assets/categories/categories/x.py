import os

# Specify the folder path
folder_path = os.getcwd()

# List all files in the folder
try:
    files = os.listdir(folder_path)
    print("Files in the folder:")
    for file in files:
        print(file)
except FileNotFoundError:
    print(f"Folder not found: {folder_path}")
