import requests

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

    # Set header with API Key
    headers = {"X-API-KEY": "ocs-ln4dSzTUVDmyr6R-qlIr8FLw5hQjjeL1RB-YfoD9wlA"}

    # Set the default parameters
    params = {
        "model": "ocsai-1.5", 
        "prompt": prompt,
        "input": inputs, 
        "input_type": "csv",  
        "elab_method": "none",  
        "language": "English",  
        "question": None,
        "prompt_in_input": False,
        "question_in_input": False,
        "task": "uses",  
    }
    
    # handle NULL values
    if inputs[0] == "" or len(inputs) == 0:
        return -1.0

    # Make the API call
    response = requests.get(api_endpoint, params=params, headers=headers, verify=False)
    
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
    response = requests.get(api_endpoint, params=params, verify=False)
    
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

# Example call to the function with prompt 'pants' and input ['makeshift flag']
# print(call_llm_api(prompt="mason jar", inputs=["store strawberry jam"]))

from sentence_transformers import SentenceTransformer
from scipy.spatial.distance import cosine
response1 = ["musical instrument with water filled to various levels"]
response2 = ["use for paint"]
model = SentenceTransformer('sentence-transformers/bert-base-nli-max-tokens')
embedding1 = model.encode(response1)
embedding2 = model.encode(response2)
print(cosine(embedding1[0], embedding2[0]))

