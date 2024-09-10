import pandas as pd
import requests

# Originality Calculation functions
def test_llm_api(prompt, inputs):
    # Define the API endpoint
    api_endpoint = "https://openscoring.du.edu/llm"

    # Set header
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

    # Make API call
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

originality = test_llm_api(prompt="Shoe", inputs=['a battering ram'])
print(originality)