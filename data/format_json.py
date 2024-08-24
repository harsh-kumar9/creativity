import csv
import ast

def process_csv(input_csv, output_csv):
    with open(input_csv, mode='r') as infile, open(output_csv, mode='w', newline='') as outfile:
        reader = csv.DictReader(infile)
        fieldnames = reader.fieldnames
        writer = csv.DictWriter(outfile, fieldnames=fieldnames)
        
        writer.writeheader()
        
        for row in reader:
            raw_json_str = row['raw_json']
            
            try:
                # Use ast.literal_eval to safely evaluate the string as a Python dictionary
                raw_json_dict = ast.literal_eval(raw_json_str)
                row['raw_json'] = raw_json_dict
            except (ValueError, SyntaxError) as e:
                print(f"Error decoding JSON for row {row}: {e}")
                row['raw_json'] = None  # or handle the error as needed

            writer.writerow(row)

# Example usage
input_csv = 'your_output_file.csv'
output_csv = 'data_66c51ff206a3b2ebed449186.csv'
process_csv(input_csv, output_csv)


