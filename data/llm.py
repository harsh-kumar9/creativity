import pandas as pd
import ast

from api import call_llm_api

from sentence_transformers import SentenceTransformer
from scipy.spatial.distance import cosine

model = SentenceTransformer('sentence-transformers/bert-base-nli-max-tokens')

# Load the CSV file
file_path = 'data_66dd0f5d2d96edbedcf4a80b.csv'
data_rows = pd.read_csv(file_path, encoding='ISO-8859-1')

# Define responses dataframe (missing originality)
llm_response_columns = ['assignment_id', 'hit_id', 'worker_id', 'item_order', 'item_name', 'llm_idea', 'originality']
llm_df = pd.DataFrame(columns=llm_response_columns)

for row_id in data_rows.index:
    hit_id = data_rows['hitid'][row_id]
    worker_id = data_rows['workerid'][row_id]

    data_value = data_rows['raw_json'][row_id]

    try:
        data_dict = ast.literal_eval(data_value)
    except (ValueError, SyntaxError) as e:
        print(f"Error decoding JSON for row {row_id}: {e}")
        data_dict = None

    condition = data_dict['1']
    if condition == 'Generate':
        assignment_id = data_dict['assignmentId']

        # Practice Round 1
        item_one = data_dict['3']
        item_name_one = item_one['Prompt']
        item_aid_one = item_one['Aid']

        split_llm_ideas = item_aid_one.split('\n\n')
        for idea in split_llm_ideas:
            originality = call_llm_api(prompt=item_name_one, inputs=[idea])

            if originality != -1.0:
                d = {
                    'assignment_id' : assignment_id, 
                    'hit_id': hit_id,
                    'worker_id': worker_id,
                    'item_order': '1',
                    'item_name': item_name_one, 
                    'llm_idea': str(idea),
                    'originality': originality
                }

                df_dictionary = pd.DataFrame([d])
                llm_df = pd.concat([llm_df, df_dictionary], ignore_index=True)
    
        # Practice Round 2
        item_two = data_dict['4']
        item_name_two = item_two['Prompt']
        item_aid_two = item_two['Aid']

        split_llm_ideas = item_aid_two.split('\n\n')
        for idea in split_llm_ideas:
            originality = call_llm_api(prompt=item_name_two, inputs=[idea])

            if originality != -1.0:
                d = {
                    'assignment_id' : assignment_id, 
                    'hit_id': hit_id,
                    'worker_id': worker_id,
                    'item_order': '2',
                    'item_name': item_name_two, 
                    'llm_idea': str(idea),
                    'originality': originality
                }

                df_dictionary = pd.DataFrame([d])
                llm_df = pd.concat([llm_df, df_dictionary], ignore_index=True)

        # Practice Round 3
        item_three = data_dict['5']
        item_name_three = item_three['Prompt']
        item_aid_three = item_three['Aid']

        split_llm_ideas = item_aid_three.split('\n\n')
        for idea in split_llm_ideas:
            originality = call_llm_api(prompt=item_name_three, inputs=[idea])

            if originality != -1.0:
                d = {
                    'assignment_id' : assignment_id, 
                    'hit_id': hit_id,
                    'worker_id': worker_id,
                    'item_order': '3',
                    'item_name': item_name_three, 
                    'llm_idea': str(idea),
                    'originality': originality
                }

                df_dictionary = pd.DataFrame([d])
                llm_df = pd.concat([llm_df, df_dictionary], ignore_index=True)
    
llm_df.to_csv("llm_{}.csv".format(hit_id), index=False)