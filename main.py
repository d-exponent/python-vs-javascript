import os
import time

start = time.time()

# Read the names file and make a list of the names
with open('./Names/invited_names.txt') as names:
    contents = names.read()

    names_list = contents.split('\n')
    
# Read the Starting Letter file
with open('./Letters/starting_letter.txt') as letter:
    letter_content = letter.read()
    

ready_letters_directory = './Output/Ready to send/'

#GOAL=> ENSURE THAT WE HAVE A READY LETTER DIRECTORY
try:
    os.makedirs(ready_letters_directory)
except:
    pass
finally:
    #loop through the names_list and replace [name] in the letter content
    for name in names_list:
        new_letter = letter_content.replace('[name]', name)

        file = f'{ready_letters_directory}letter_to_{name}.txt'

        # Create a dynamic letter file and write the new letter to it 
        with open(file, mode='w') as new_letters:
            new_letters.write(new_letter)

total_time  = (time.time() - start)

print('Duration: ' + str(round(total_time, 3)) + 'sec')

