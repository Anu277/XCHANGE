from fastapi import FastAPI, Request
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.prompts import PromptTemplate
import re
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()
gemini_api_key = os.getenv("GOOGLE_API_KEY")

# Initialize FastAPI app
app = FastAPI()

def extract_hsn_code(response_text):
    match = re.search(r"\b\d{4}(?:\.\d{2})?(?:\.\d{2})?\b", response_text)  # Matches HSN code (4-8 digits)
    if match:
        return match.group(0)
    return "not_found"

def get_query_chain(query):
    print("Query:",query)
    prompt_template = """
    Respond to the query with the relevant details, including the HSN code if applicable.
    Query: {query}
    Response:
    """
    
    # Ensure API key is passed to the model
    model = ChatGoogleGenerativeAI(model="gemini-pro", temperature=0.1, api_key=gemini_api_key)
    prompt = PromptTemplate(template=prompt_template, input_variables=["query"])
    prompt_input = prompt.format_prompt(query=query).to_string()
    response = model.predict(prompt_input)
    return response

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/get-hsn-code/")
async def get_hsn_code(request: Request):
    print("in response : /get-hsn-code ")
    data = await request.json()
    query = data.get("query")
    if not query:
        return {"hsn_code": "not_found", "error": "Invalid query"}
    
    # Get response from Gemini API
    response = get_query_chain(query)
    hsn_code = extract_hsn_code(response)
    print(hsn_code)
    return {"hsn_code": hsn_code}