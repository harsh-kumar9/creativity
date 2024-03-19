import requests

def call_llm_api(prompt, inputs):
    """
    Args:
    - prompt (str): The prompt to use with the API.
    - inputs (list): The inputs to send to the API.
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
        "language": "english",  
        "task": "uses",  
        "question_in_input": False,  
        "question": "question"  
    }

    # Make the API call
    response = requests.get(api_endpoint, params=params)
    
    # Check if the API call was successful
    if response.status_code == 200:
        # Return the JSON response if the call was successful
        return response.json()
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
        raise Exception(f"API call failed with status code {response.status_code}")

# Example call to the function with prompt 'pants' and input ['makeshift flag']
print(call_score_api(prompt="mason jar", inputs=["store strawberry jam"]))

