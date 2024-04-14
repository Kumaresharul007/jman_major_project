# importing csv
import csv
 
# Data
data = [
    ['firstname', 'lastname', 'email', 'designation', 'training_name', 'score'],
    ['Kumaresh', 'Arul', 'kumaresharul2003@gmail.com', 'Intern', 'Full Stack Development', 91],
    ['lokesh', 'Arul', 'lokesharul2003@gmail.com', 'Employee', 'Data Science', 90],
    ['lokesh', 'Arul', 'lokesharul2003@gmail.com', 'Employee', 'Full Stack Development', 80],
    ['Karthick', 'Ashwin', 'rajasekaranashwin423@gmail.com', 'Employee', 'Full Stack Development', 80],
    ['Karthick', 'Ashwin', 'rajasekaranashwin423@gmail.com', 'Employee', 'Data Science', 83],
    ['Kumaresh', 'Arul', 'kumaresharul2003@gmail.com' ,'Intern', 'Data Science',86],
    ['Ruthvik', 'Surya', 'ruthviksurya2002@gmail.com' ,'Intern', 'Full Stack Development',85],
    ['Ruthvik', 'Surya', 'ruthviksurya2002@gmail.com' ,'Intern', 'Data Science',87],
    ['Kumaresh', 'Arul', 'kumaresharul2003@gmail.com' ,'Intern', 'JS',90],
    ['Karthick', 'Ashwin', 'rajasekaranashwin423@gmail.com', 'Employee', 'Web 3.0', 78],
    ['lokesh', 'Arul', 'lokesharul2003@gmail.com', 'Employee', 'HTML', 89],
    ['Ruthvik', 'Surya', 'ruthviksurya2002@gmail.com' ,'Intern', 'PHP',80]
]
 
# File path for the CSV file
csv_file_path = 'assessment_data.csv'
 
# Open the file in write mode
with open(csv_file_path, mode='w', newline='') as file:
    # Create a csv.writer object
    writer = csv.writer(file)
    # Write data to the CSV file
    writer.writerows(data)
 
# Print a confirmation message
print(f"CSV file '{csv_file_path}' created successfully.")