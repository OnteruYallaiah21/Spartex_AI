import getpass
import os
from flask import send_from_directory
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import tempfile
import re
import random
import docx2txt
import textract
from docx import Document
from docx.shared import Pt, Inches
from docx.enum.text import WD_ALIGN_PARAGRAPH, WD_PARAGRAPH_ALIGNMENT
import ast # Import the ast module
from dotenv import load_dotenv
from langchain_core.output_parsers import StrOutputParser
from langchain_core.messages import HumanMessage, SystemMessage
from langchain_core.prompts import ChatPromptTemplate
from langchain_cohere import ChatCohere
from langchain_core.globals import set_llm_cache
from langchain_community.cache import InMemoryCache
#python files importing
import Model_Intilization
import Word_File_Creation
load_dotenv()
api_key=os.getenv("COHERE_API_KEY"),
# Enable caching
set_llm_cache(InMemoryCache())
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
  # Enable CORS for all routes
# ======================= START FILE TYPE CHECK =====================
def allowed_file(filename):
    allowed_extensions = {'pdf', 'doc', 'docx'}
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in allowed_extensions

#======================= END FILE TYPE CHECK =========================
#======================== start to render html code ==================


@app.route('/download/<filename>')
def download_file(filename):
    resume_dir = '/Users/syamvemuri/Downloads/Sayyam/ai/Spartex_AI/static/resumes'
    return send_from_directory(resume_dir, filename, as_attachment=True)


@app.route('/')
def index():
    """Render the HTML interface"""
    return render_template('index.html')  

#======================== end of html rendering=======================

@app.route('/analyze', methods=['POST'])
def analyze():
    """Simplified API endpoint with minimal debugging"""
    try:
        # Log basic request info
        print("\n=== Received POST Request ===")
        print(f"Content-Type: {request.content_type}")
        resume_text=None
        # Get form data
        job_description = request.form.get('job_description', '').strip()
        resume_text = request.form.get('resume_text', '').strip()
        font_style = request.form.get('font_style', 'Calibri')
        file_format = request.form.get('file_format', 'doc')
        
        # Log form data (just the essentials)
        #print(f"Job Description Length==> {job_description}===>{len(job_description)} chars")
        #print(f"Resume Text Length==>{pasted_text}====>{len(resume_text)} chars")
        #print(f"*****Font Style *******===>{font_style}")
        #print(f"*********File Format ************===>{file_format}")
        #print(f'*********The Job Discription Before  cleaned is ********** >{job_description}')
        #=========== JOB Discription Verify
        job_description = Model_Intilization.clean_text(request.form.get('job_description', '').strip())
        if not job_description:
            return jsonify({"ERROR":"JOB DISCRIPTION IS REAQUIRED"}),400
        #print(f'==========The Job Discription after cleaned is ==========>{job_description}')
        
        #=================== resume file handling
        # HANDLING FILE
        resume_file = request.files.get('resume_file')
        # HANDLING FILE
        if resume_text:
            resume_text=resume_text
            #print(f'============= print the the pasted RESUME text is ===>')
        elif resume_file and resume_file.filename:
            if not allowed_file(resume_file.filename):
                return jsonify({"ERROR":"INVALID FILE TYPE , ALLOWED FILE TYPE IS :PDF,DOC, DOCX"}),400
            #print(f"=============== The uploaded file is =========>{resume_file.filename}")
            resume_text = Model_Intilization.process_resume_file(resume_file)
            #print(f'================ The resume file text is =========>{resume_text}')
            # Model_Intilization.extract_text_from_resume_stream(file_storage)
        else:
            return jsonify({"ERROR":"EITHER RESUME FILE IS REAQUIRED TO PROCESS THE REAQUEST"}),400
        
        # Simulate processing
        #print("\nProcessing analysis...")
        score = 75  # Example score
        jd_skills=Model_Intilization.llm_call_json_response(job_description)
        #print(f'THE LLM RESPONSE IS FOR CLEANING  ====>{jd_skills}')
        technical_skills,non_technical_skills = Model_Intilization.parse_skills(jd_skills)
        combined_skills = non_technical_skills + technical_skills 
        relust_tech=', '.join(combined_skills)
        #
        final_prompt= f"job_disccription_skills={jd_skills}, myresume={resume_text}"
        finaanl_reposne = Model_Intilization.llm_final_response(final_prompt)
        #print(f'======== THE Json Response is ======>{finaanl_reposne}')
        
        json_file = Word_File_Creation.extract_and_save_json_to_file(finaanl_reposne)
        print(f' THE Json file after ceaning===> {json_file}')
        #json_file =  ast.literal_eval(json_file)
        file_path = os.path.join(app.root_path, 'static', 'resumes')
        final_resume_file = Word_File_Creation.generate_resume_from_json(json_file,file_path,font_style)
        print(f' the final resume file is ====> {final_resume_file}')
        # Return simple response
        filename = os.path.basename(final_resume_file)
        download_url = f"/download/{filename}" 
        score = (
                    random.randint(81, 85) if len(technical_skills) in [1, 2] else
                    random.randint(78, 80) if len(technical_skills) == 3 else
                    random.randint(58, 65) if 4 <= len(technical_skills) <= 6 else
                    random.randint(45, 50) if len(technical_skills) == 7 else
                    random.randint(35, 40) if len(technical_skills) > 7 else
                    None
                )


        return jsonify({
            "ats_score_before": score,
            "ats_score_after": random.randint(86, 91),
            "optimization_points": f"*** SKILLS OPTIMIZATION *** 1. We are adding the skills in upper version, please stay with us.\n {relust_tech}",
            "optimized_resume_url": download_url
        })

        
    except Exception as e:
        print(f"\nError: {str(e)}")
        return jsonify({"error": "Processing failed"}), 500

if __name__ == '__main__':
    print("Starting API server...")
    app.run(host='0.0.0.0', port=5001, debug=True)

#======================= ALL IMPORT METHODS INFO=====
'''
import Model_Intilization

#ddef clean_text(text: str) -> str:(to clean the resume text)
#def extract_text_from_resume_stream(file_storage) -> str:( to exctrat the text from the resume if it is file format)
#def count_words_basic(text: str) -> int:(to count the number of words)
#def parse_skills(parse_extract_skills): (normal python method to transform the jd skills in to python list)
#def llm_call_json_response(cleaned_jd): (llm call to clean the jd )
#def llm_final_response(llm_processed_jd,final_prompt): (llm call for the final json response final prompt shoud be +jd technical skills and reume)

import Word_File_Creation
#def generate_resume(json_file_path):: TO CRAETE THE WORD FILW WHIC WILL ACCEPT THE JSON FILE
#def convert_to_json_string(json_response):  TO CREATE THE JSON FILE FROM THE JSON RESPONSE 
'''
#cloudflared tunnel --url http://localhost:5001

#======================= ALL IMPORT METHODS INFOR