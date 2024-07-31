import psycopg2
import sys
import argparse
import csv

# python prolific_download.py your_hit_id --output your_output_file.csv

def fetch_rows_by_hit_id(hit_id, output_file):
    # Define your connection string (make sure to fill in your actual connection details)
    connection_string = "host=c-prolific-db.a7hlpsupw5nhkv.postgres.cosmos.azure.com port=5432 dbname=citus user=citus password=Wonderwall@1 sslmode=require"
    
    try:
        # Connect to your PostgreSQL database
        conn = psycopg2.connect(connection_string)
        cursor = conn.cursor()

        # Define the query to fetch rows by hitId
        query = "SELECT * FROM survey_data WHERE hitId = %s"
        
        # Execute the query
        cursor.execute(query, (hit_id,))
        
        # Fetch all rows
        rows = cursor.fetchall()

        # Get column names
        column_names = [desc[0] for desc in cursor.description]
        
        # Write rows to a CSV file
        with open(output_file, 'w', newline='') as csvfile:
            csvwriter = csv.writer(csvfile)
            # Write column headers
            csvwriter.writerow(column_names)
            # Write rows
            csvwriter.writerows(rows)
        
        print(f"Rows with hitId {hit_id} have been written to {output_file}.")
        
        # Close the cursor and connection
        cursor.close()
        conn.close()
        
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    # Setup argument parser
    parser = argparse.ArgumentParser(description='Fetch rows by hitId from PostgreSQL database and save to CSV.')
    parser.add_argument('hitId', type=str, help='The hitId to fetch rows for.')
    parser.add_argument('--output', type=str, default='output.csv', help='The output CSV file.')
    
    # Parse arguments
    args = parser.parse_args()
    
    # Fetch rows for the provided hitId and save to CSV
    fetch_rows_by_hit_id(args.hitId, args.output)
