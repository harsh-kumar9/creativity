import pandas as pd
import json

# Load the CSV file
file_path = 'pilot.csv'
df = pd.read_csv(file_path)

# Filter the DataFrame to keep only the rows with the 'data' variable  
data_rows = df[df['variable'] == 'data']  

# Define responses dataframe (missing originality)
response_columns = ['assignment_id', 'hit_id', 'worker_id', 'start_time', 'condition', 'phase', 'item_order', 'item_name', 'response', 'response_order']
responses_df = pd.DataFrame(columns=response_columns)

# Define participants dataframe
participants_columns = ['assignment_id', 'hit_id', 'worker_id', 'condition']
participants_df = pd.DataFrame(columns=participants_columns)

for row_id in data_rows.index:
    hit_id = data_rows['hit_id'][row_id]
    assignment_id = data_rows['assignment_id'][row_id]
    worker_id = data_rows['worker_id'][row_id]

    data_value = data_rows['value'][row_id]

    # Convert the provided JSON string into a Python dictionary
    data_dict = json.loads(data_value)

    condition = data_dict['0']
    pre_survey = data_dict['1']
    post_survey = data_dict['feedback']

    # Practice Round 1
    item_one = data_dict['2']
    item_name_one = item_one['Prompt']
    responses_one = item_one['Response']

    start_time = 'N/A'
    if len(responses_one) > 0:
        start_time = responses_one[0]['time']

    for r in responses_one:
        response_order = r['iid']
        response = r['name']

        d = {
            'assignment_id' : assignment_id, 
            'hit_id': hit_id,
            'worker_id': worker_id,
            'start_time': start_time,
            'condition' : condition, 
            'phase': 'Practice', 
            'item_order': '1', 
            'item_name': item_name_one, 
            'response': response, 
            'response_order': response_order
        }

        df_dictionary = pd.DataFrame([d])
        responses_df = pd.concat([responses_df, df_dictionary], ignore_index=True)
    
    # Practice Round 2
    item_two = data_dict['3']
    item_name_two = item_two['Prompt']
    responses_two = item_two['Response']
    for r in responses_two:
        response_order = r['iid']
        response = r['name']

        d = {
            'assignment_id' : assignment_id, 
            'hit_id': hit_id,
            'worker_id': worker_id,
            'start_time': start_time,
            'condition' : condition, 
            'phase': 'Practice', 
            'item_order': '2', 
            'item_name': item_name_two, 
            'response': response, 
            'response_order': response_order
        }

        df_dictionary = pd.DataFrame([d])
        responses_df = pd.concat([responses_df, df_dictionary], ignore_index=True)

    # Practice Round 3
    item_three = data_dict['4']
    item_name_three = item_three['Prompt']
    responses_three = item_three['Response']
    for r in responses_three:
        response_order = r['iid']
        response = r['name']

        d = {
            'assignment_id' : assignment_id, 
            'hit_id': hit_id,
            'worker_id': worker_id,
            'start_time': start_time,
            'condition' : condition, 
            'phase': 'Practice', 
            'item_order': '3', 
            'item_name': item_name_three, 
            'response': response, 
            'response_order': response_order
        }

        df_dictionary = pd.DataFrame([d])
        responses_df = pd.concat([responses_df, df_dictionary], ignore_index=True)

    # Test Round 
    item_four = data_dict['5']
    item_name_four = item_four['Prompt']
    responses_four = item_four['Response']
    for r in responses_four:
        response_order = r['iid']
        response = r['name']

        d = {
            'assignment_id' : assignment_id, 
            'hit_id': hit_id,
            'worker_id': worker_id,
            'start_time': start_time,
            'condition' : condition, 
            'phase': 'Test', 
            'item_order': '4', 
            'item_name': item_name_four, 
            'response': response, 
            'response_order': response_order
        }

        df_dictionary = pd.DataFrame([d])
        responses_df = pd.concat([responses_df, df_dictionary], ignore_index=True)

    # Survey & Feedback Answers
    survey_answers = data_dict['1']
    feedback_answers = data_dict['feedback']

    q = {
            'assignment_id' : assignment_id, 
            'hit_id': hit_id,
            'worker_id': worker_id,
            'condition' : condition, 
            'I am more creative than \% of humans (before)': survey_answers['How Creative?'],
            'Increased use of AI computer programs in daily life makes you feel (before)': survey_answers['Increased AI use makes you feel'],
            'How difficult was it to come up with uses for the last object?': feedback_answers['q1'],
            'Increased use of AI computer programs in daily life makes you feel (after)': feedback_answers['q2'],
            'How many total objects encountered?': feedback_answers['q3'],
            'I am more creative than \% of humans (after)': feedback_answers['q4'],
            'Technical Issues?': feedback_answers['q5']
    }

    q_dictionary = pd.DataFrame([q])
    participants_df = pd.concat([participants_df, q_dictionary], ignore_index=True)


# responses_df.to_csv('responses.csv', index=False)
participants_df.to_csv('participants.csv', index=False)