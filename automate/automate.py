import os

def list_files(directory, extensions):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith(extensions):
                yield os.path.join(root, file)

def read_file_content(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        return file.read()

def create_note(directory):
    extensions = ('.js', '.css', '.json')  # Add or remove file extensions as needed
    files = list_files(directory, extensions)
    
    note = "My app is made in node.js it have files like\n"
    
    file_list = []
    file_contents = []
    
    for file_path in files:
        file_name = os.path.basename(file_path)
        file_list.append(file_name)
        content = read_file_content(file_path)
        file_contents.append(f"My {file_name} looks like this\n```\n{content}\n```\n")
    
    note += '\n'.join(file_list) + '\n\n'
    note += '\n'.join(file_contents)
    
    return note

# Path to the 'task-manager-frontend' directory
# Update this path to where your 'task-manager-frontend/src' directory is located on your system
path_to_directory = 'E:\\source_code\\apis\\task-manager-frontend\\src'  # Use an absolute path

# Generate the note
formatted_note = create_note(path_to_directory)

# Replace this with the path to the directory where you want to save the note.txt file
output_file_path = 'E:\\source_code\\apis\\automate\\note.txt'  # Use an absolute path

# Save the note to a file
with open(output_file_path, 'w', encoding='utf-8') as file:
    file.write(formatted_note)

print(f"Note has been created and saved to {output_file_path}.")
