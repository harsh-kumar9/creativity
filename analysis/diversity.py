import pandas as pd
import requests
import json
import statistics 

from api import call_llm_api, call_score_api

from sentence_transformers import SentenceTransformer
from scipy.spatial.distance import cosine

model = SentenceTransformer('sentence-transformers/bert-base-nli-max-tokens')

# Load the CSV file
file_path = 'responses_3RTFSSG7URWI9FTY9PLG0TJ350ALW7.csv'
df = pd.read_csv(file_path)

practice_absent = []
practice_generate = []
practice_coach = []
test_absent = []
test_generate = []
test_coach = []

# Looping through each row in the DataFrame
for index, row in df.iterrows():
    
    if row['phase'] == 'Practice':
        if row['condition'] == 'absent':
            practice_absent.append(row['response'])
        elif row['condition'] == 'generate':
            practice_generate.append(row['response'])
        else: # row['condition'] == 'coach':
            practice_coach.append(row['response'])

    else: # row['phase'] == 'Test':
        if row['condition'] == 'absent':
            test_absent.append(row['response'])
        elif row['condition'] == 'generate':
            test_generate.append(row['response'])
        else: # row['condition'] == 'coach':
            test_coach.append(row['response'])

practice_absent_cos = []
practice_generate_cos = []
practice_coach_cos = []
test_absent_cos = []
test_generate_cos = []
test_coach_cos = []

def cosine_permutations(responses, cosine_distances):
    """
    Calculates the cosine distances between all possible pair
    permutations in <responses> and adds them to <cosine_distances>
    """
    for i in range(0, len(responses)):
        for j in range(i+1, len(responses)):
            response1 = responses[i]
            response2 = responses[j]

            model = SentenceTransformer('sentence-transformers/bert-base-nli-max-tokens')

            if response1 != 'nan' and response2 != 'nan' and (not isinstance(response1, float)) and (not isinstance(response2, float)):
                embedding1 = model.encode(response1)
                embedding2 = model.encode(response2)
                cosine_distance = cosine(embedding1, embedding2)
                cosine_distances.append(cosine_distance)


cosine_permutations(practice_absent, practice_absent_cos)
cosine_permutations(practice_generate, practice_generate_cos)
cosine_permutations(practice_coach, practice_coach_cos)

cosine_permutations(test_absent, test_absent_cos)
cosine_permutations(test_generate, test_generate_cos)
cosine_permutations(test_coach, test_coach_cos)

print("practice absent median: " + str(statistics.median(practice_absent_cos)) + "\n")
print("practice absent mean: " + str(statistics.mean(practice_absent_cos)) + "\n")
print("practice absent SEM: " + str(statistics.mean(practice_absent_cos) / (len(practice_absent_cos) ** 0.5)) + "\n")
print("practice generate median: " + str(statistics.median(practice_generate_cos)) + "\n")
print("practice generate mean: " + str(statistics.mean(practice_generate_cos)) + "\n")
print("practice generate SEM: " + str(statistics.mean(practice_generate_cos) / (len(practice_generate_cos) ** 0.5)) + "\n")
print("practice coach median: " + str(statistics.median(practice_coach_cos)) + "\n")
print("practice coach mean: " + str(statistics.mean(practice_coach_cos)) + "\n")
print("practice coach SEM: " + str(statistics.mean(practice_coach_cos) / (len(practice_coach_cos) ** 0.5)) + "\n")

print("test absent median: " + str(statistics.median(test_absent_cos)) + "\n")
print("test absent mean: " + str(statistics.mean(test_absent_cos)) + "\n")
print("test absent SEM: " + str(statistics.mean(test_absent_cos) / (len(test_absent_cos) ** 0.5)) + "\n")
print("test generate median: " + str(statistics.median(test_generate_cos)) + "\n")
print("test generate mean: " + str(statistics.mean(test_generate_cos)) + "\n")
print("test generate SEM: " + str(statistics.mean(test_generate_cos) / (len(test_generate_cos) ** 0.5)) + "\n")
print("test coach median: " + str(statistics.median(test_coach_cos)) + "\n")
print("test coach mean: " + str(statistics.mean(test_coach_cos)) + "\n")
print("test coach SEM: " + str(statistics.mean(test_coach_cos) / (len(test_coach_cos) ** 0.5)) + "\n")