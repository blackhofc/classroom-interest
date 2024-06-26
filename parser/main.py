
import openpyxl, json

GENDERS = {
    'H': 'Hombre',
    'M': 'Mujer',
    'NB': 'No Binario'
}

def output(data):
    # Write the dictionary to a JSON file
    with open('students.json', "w", encoding="utf-8") as json_file:
        json.dump(data, json_file, indent=4, ensure_ascii=False)

if __name__ == '__main__':
    print('Parsing')
    # Replace 'example.xlsx' with the path to your Excel file
    workbook = openpyxl.load_workbook('data.xlsx')

    # Assuming the first sheet is the one you want to read from
    sheet = workbook.active

    students = []
    indx = 0

    # Access cell values
    for row in sheet.iter_rows(min_row=2, values_only=True):
        indx += 1
        
        if row[1] is None:
            continue
        
        name      = row[0]
        age       = int(row[1])
        gender    = row[2]
        genres    = row[3].split(', ')
        sports    = row[4].split(', ')
        languages = row[5].split(', ')
        
        students.append({
            'id':           indx,
            'name':         name,
            'age':          age,
            'gender':       GENDERS[gender],
            'music_genres': genres,
            'fav_sports':   sports,
            'languages':    [lang for lang in languages if lang !='Español']
        })
        
    output(students)
    
        