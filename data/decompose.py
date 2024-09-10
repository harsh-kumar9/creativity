import pandas as pd
import requests
import ast
import json
import statistics 

from api import call_llm_api, call_score_api

from sentence_transformers import SentenceTransformer
from scipy.spatial.distance import cosine

model = SentenceTransformer('sentence-transformers/bert-base-nli-max-tokens')

# Load the CSV file
file_path = 'p1.csv'
data_rows = pd.read_csv(file_path, encoding='ISO-8859-1')

# # Filter the DataFrame to keep only the rows with the 'data' variable  
# data_rows = df[df['variable'] == 'data']  

# Define responses dataframe (missing originality)
response_columns = ['assignment_id', 'hit_id', 'worker_id', 'start_time', 'condition', 'phase', 'item_order', 'item_name', 'response', 'response_order']
responses_df = pd.DataFrame(columns=response_columns)

# Define participants dataframe
participants_columns = ['assignment_id', 'hit_id', 'worker_id', 'condition']
participants_df = pd.DataFrame(columns=participants_columns)

for row_id in data_rows.index:
    hit_id = data_rows['hitid'][row_id]
    worker_id = data_rows['workerid'][row_id]

    data_value = data_rows['raw_json'][row_id]

    # Convert the provided JSON string into a Python dictionary
    # print(data_value)
    try:
        data_dict = ast.literal_eval(data_value)
    except (ValueError, SyntaxError) as e:
        print(f"Error decoding JSON for row {row_id}: {e}")
        data_dict = None

    condition = data_dict['1']
    assignment_id = data_dict['assignmentId']

    # Practice Round 1
    item_one = data_dict['3']
    item_name_one = item_one['Prompt']
    responses_one = item_one['Response']

    start_time = 'N/A'
    if len(responses_one) > 0:
        start_time = responses_one[0]['time']

    for r in responses_one:
        response_order = r['iid']
        response = r['name']

        originality_one = call_llm_api(prompt=item_name_one, inputs=[response])

        if originality_one != -1.0:
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
                'originality': originality_one,
                'response_order': response_order
            }
            
            df_dictionary = pd.DataFrame([d])
            responses_df = pd.concat([responses_df, df_dictionary], ignore_index=True)
    
    # Practice Round 2
    item_two = data_dict['4']
    item_name_two = item_two['Prompt']
    responses_two = item_two['Response']
    for r in responses_two:
        response_order = r['iid']
        response = r['name']

        originality_two = call_llm_api(prompt=item_name_two, inputs=[response])

        if originality_two != -1.0:
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
                'originality': originality_two,
                'response_order': response_order
            }

            df_dictionary = pd.DataFrame([d])
            responses_df = pd.concat([responses_df, df_dictionary], ignore_index=True)

    # Practice Round 3
    item_three = data_dict['5']
    item_name_three = item_three['Prompt']
    responses_three = item_three['Response']
    for r in responses_three:
        response_order = r['iid']
        response = r['name']

        originality_three = call_llm_api(prompt=item_name_three, inputs=[response])

        if originality_three != -1.0:
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
                'originality': originality_three,
                'response_order': response_order
            }
            
            df_dictionary = pd.DataFrame([d])
            responses_df = pd.concat([responses_df, df_dictionary], ignore_index=True)

    # Test Round 
    print(data_dict)
    item_four = data_dict['6']
    item_name_four = item_four['Prompt']
    responses_four = item_four['Response']
    for r in responses_four:
        response_order = r['iid']
        response = r['name']

        originality_four = call_llm_api(prompt=item_name_four, inputs=[response])

        if originality_four != -1.0:
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
                'originality': originality_four,
                'response_order': response_order
            }

            df_dictionary = pd.DataFrame([d])
            responses_df = pd.concat([responses_df, df_dictionary], ignore_index=True)

    # Miscellaneous Data
    page_load = data_dict['2']
    hide_time = data_dict['7']

    # Survey & Feedback Answers, Idea Diversity
    survey_answers = data_dict['0']
    feedback_answers = data_dict['feedback']

    # Create embeddings for practise round responses
    practice_embeddings = []
    for r in responses_one:
        embedding = model.encode(r['name'])
        practice_embeddings.append(embedding)
    for r in responses_two:
        embedding = model.encode(r['name'])
        practice_embeddings.append(embedding)
    for r in responses_three:
        embedding = model.encode(r['name'])
        practice_embeddings.append(embedding)

    # Find maximum cosine distance for each test round response
    distances = []
    for r in responses_four:
        max_distance = 0
        embedding = model.encode(r['name'])
        for p in practice_embeddings:
            distance = abs(cosine(embedding, p))
            if distance > max_distance:
                max_distance = distance
        distances.append(max_distance)

    if len(distances) != 0:
        median_distance = statistics.median(distances)
    else: 
        median_distance = "n/a"
    
    q = {
            'assignment_id' : assignment_id, 
            'hit_id': hit_id,
            'worker_id': worker_id,
            'condition' : condition, 
            'diversity': median_distance,
            'I am more creative than \% of humans (before)': survey_answers['How Creative?'],
            'Increased use of AI computer programs in daily life makes you feel (before)': survey_answers['Increased AI use makes you feel'],
            'How difficult was it to come up with uses for the last object?': feedback_answers['q1'],
            'Increased use of AI computer programs in daily life makes you feel (after)': feedback_answers['q2'],
            'How many total objects encountered?': feedback_answers['q3'],
            'I am more creative than \% of humans (after)': feedback_answers['q4'],
            'Hide Time': hide_time['HideTime'],
            'Page Load': page_load['PageLoad'],
            'Strategy for last object': feedback_answers['q5'],
            'Technical Issues?': feedback_answers['q6']
    }

    q_dictionary = pd.DataFrame([q])
    participants_df = pd.concat([participants_df, q_dictionary], ignore_index=True)


# responses_df.to_csv("responses_{}.csv".format(hit_id), index=False)
# participants_df.to_csv("participants_{}.csv".format(hit_id), index=False)

responses_df.to_csv("responses_p.csv".format(hit_id), index=False)
participants_df.to_csv("participants_p.csv".format(hit_id), index=False)