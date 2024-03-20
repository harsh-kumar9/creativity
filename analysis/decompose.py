import pandas as pd
import requests
import json

# Originality Calculation functions
def call_llm_api(prompt, inputs):
    """
    Args:
    - prompt (str): The prompt to use with the API.
    - inputs (list): The inputs to send to the API.

    Returns:
    Originality Score (float) from 1-5 using Large Language Models
    1 is minimally original, and 5 is maximally original
    """
    # Define the API endpoint
    api_endpoint = "https://openscoring.du.edu/llm"

    # Set the default parameters
    params = {
        "model": "ocsai-1.5", 
        "prompt": prompt,
        "input": inputs, 
        "input_type": "csv",  
        "elab_method": "none",  
        "language": "English",  
        "task": "uses",  
    }
    
    # handle NULL values
    if inputs[0] == "":
        return -1.0

    # Make the API call
    response = requests.get(api_endpoint, params=params)
    
    # Check if the API call was successful
    if response.status_code == 200:
        # Return the JSON response if the call was successful
        data = response.json()
        originality_score = data["scores"][0]["originality"]
        return originality_score
    else:
        # Return an error message if the call failed
        return {"error": "API call failed with status code {}".format(response.status_code)}
    
def call_score_api(prompt, inputs):
    """
    Args:
    - prompt (str): The prompt to use with the API.
    - inputs (list): The inputs to send to the API.

    Returns:
    Originality Score (float) using Semantic Models
    """
    # Define the API endpoint
    api_endpoint = "https://openscoring.du.edu/score"

    # Set the default parameters
    params = {
        "model": "glove_840B", 
        "prompt": prompt,
        "input": inputs,  
        "input_type": "csv", 

        "elab_method": "stoplist", 
        "stopword": "true",
        "term_weighting": "true",
        "normalize": "false",
        "exclude_target": "true" 
    }

    # handle NULL values
    if inputs[0] == "":
        return -1.0

    # Make the API call
    response = requests.get(api_endpoint, params=params)
    
    # Check if the API call was successful
    if response.status_code == 200:
        # Parse the JSON response
        data = response.json()
        # Assuming there is only one score, directly return the 'originality' float
        originality_score = data["scores"][0]["originality"]
        return originality_score
    else:
        # If the call fails, raise an error with the status code
        # raise Exception(f"API call failed with status code {response.status_code}")
        print("prompt:" + prompt)
        print("response:" + inputs[0])

# Load the CSV file
file_path = 'analysis/data_31YWE12TFJ2YJU9MF0GSJ7F9IRV7XE.csv'
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
    item_two = data_dict['3']
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
    item_three = data_dict['4']
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
    item_four = data_dict['5']
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


responses_df.to_csv("responses_{}.csv".format(hit_id), index=False)
# participants_df.to_csv("participants_{}.csv".format(hit_id), index=False)