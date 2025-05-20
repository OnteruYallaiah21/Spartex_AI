import getpass
import os
from dotenv import load_dotenv
from langchain_core.output_parsers import StrOutputParser
from langchain_core.messages import HumanMessage, SystemMessage
from langchain_core.prompts import ChatPromptTemplate
from langchain_cohere import ChatCohere
from langchain_core.globals import set_llm_cache
from langchain_community.cache import InMemoryCache
import re
import Word_File_Creation
from PyPDF2 import PdfReader 
import tempfile
import docx2txt
import tempfile
import textract
from docx import Document
from docx.shared import Pt, Inches
from docx.enum.text import WD_ALIGN_PARAGRAPH, WD_PARAGRAPH_ALIGNMENT
load_dotenv()
api_key=os.getenv("COHERE_API_KEY")
# Enable caching
set_llm_cache(InMemoryCache())
model = ChatCohere(model="command-r-plus")
parser = StrOutputParser()
# for testiung set up the variables 
jd='java developer'
resume='bi9gdata developer'
#=========  all methods and sysntax============
'''
#ddef clean_text(text: str) -> str:(to clean the resume text)
#def extract_text_from_resume_stream(file_storage) -> str:( to exctrat the text from the resume if it is file format)
#def count_words_basic(text: str) -> int:(to count the number of words)
#def parse_skills(parse_extract_skills): (normal python method to transform the jd skills in to python list)
#def llm_call_json_response(cleaned_jd,final_prompt): ( to call the llm for json response)
'''

#===============Clean Text Method Start==================================================================================
def clean_text(text: str) -> str:
    """
    Clean job description text by removing:
    - URLs/emails
    - Salary/compensation info
    - Visa/benefits phrases
    - Location markers
    - Bullet points/special chars
    
    Preserves all technical skills and requirements.
    
    Args:
        text: Raw job description text
        
    Returns:
        Cleaned text with only relevant job content
    """
    custom_exclude_phrases = [
        "visa sponsorship", "salary range", "pay range",
        "authorization to work", "medical", "dental", "vision", "disability",
        "equity plan", "benefits package", "paid time off", "draper ut", "usd"
    ]
    
    # URL/Email removal
    text = re.sub(r'http\S+|www\S+|https\S+|\S+@\S+', '', text, flags=re.IGNORECASE)
    
    # Compensation info removal
    text = re.sub(
        r'(?:salary|pay|compensation).{0,20}?\$\d+[\d,\.]*\s*-?\s*\$\d+[\d,\.]*',
        '', 
        text,
        flags=re.IGNORECASE
    )
    
    # Custom phrase removal
    for phrase in custom_exclude_phrases:
        text = re.sub(rf'\b{re.escape(phrase)}\b', '', text, flags=re.IGNORECASE)
    
    # Location info removal
    text = re.sub(
        r'[A-Z][a-z]+\s*[A-Z]{2}.*?(?:USD|dollars|compensation|range)',
        '',
        text,
        flags=re.IGNORECASE
    )
    
    # Formatting cleanup
    text = re.sub(r'^\s*[\d\+]+\.?\s*|\s*[•\-*]\s*', ' ', text, flags=re.MULTILINE)
    text = re.sub(r'(?<!\w)[@#%&*\/](?!\w)', '', text)
    text = ' '.join(text.split())
    
    return text.strip()
#======================== END METHOD FOR CLEANED JD===========================
#======================== START METHOD FOR CLEANED RESUME=========================
def process_resume_file(file_storage) -> str:
    """
    Single method to extract and clean text from resumes (PDF/DOC/DOCX)
    Args:
        file_storage: FileStorage object from Flask/Werkzeug
    Returns:
        str: Cleaned and normalized resume text
    """
    filename = file_storage.filename.lower()
    
    try:
        # Text extraction
        if filename.endswith('.pdf'):
            text = ''
            file_storage.stream.seek(0)
            reader = PdfReader(file_storage.stream)
            for page in reader.pages:
                text += page.extract_text() or ''
        
        elif filename.endswith('.docx'):
            with tempfile.NamedTemporaryFile(suffix=".docx", delete=False) as temp:
                file_storage.stream.seek(0)
                temp.write(file_storage.stream.read())
                temp_path = temp.name
            text = docx2txt.process(temp_path)
            os.unlink(temp_path)
        
        elif filename.endswith('.doc'):
            with tempfile.NamedTemporaryFile(suffix=".doc", delete=False) as temp:
                file_storage.stream.seek(0)
                temp.write(file_storage.stream.read())
                temp_path = temp.name
            text = textract.process(temp_path).decode('utf-8')
            os.unlink(temp_path)
        
        else:
            raise ValueError("Unsupported file format. Use PDF, DOC, or DOCX.")

        # Text cleaning
        text = re.sub(r'\s+', ' ', text).strip()  # Normalize whitespace
        text = re.sub(r'(?i)(\b(education|experience|skills|projects?)\b[:]?)', r'\n\n\1\n', text)  # Format sections
        text = re.sub(r'[\u2022•▪➢]', '•', text)  # Standardize bullets
        text = re.sub(r'(?<!\w)[\-*+=~](?!\w)', '', text)  # Remove stray symbols
        text = re.sub(r'\n{3,}', '\n\n', text)  # Reduce excessive newlines
        
        return text.strip()
    
    except Exception as e:
        raise RuntimeError(f"Error processing resume: {str(e)}")
#======================== END METHOD FOR CLEANED RESUME=========================================================
#=============== END Cleaning jd and resume methods Text Method End====================================================
#===================================================== START METHOD: count_words_basic ===========================
def count_words_basic(text: str) -> int:
    """
    Count words using Python's built-in split().
    Fastest for clean English text without edge cases.
    
    Args:
        text: Input string to analyze.
    
    Returns:
        Integer count of space-separated words.
    """
    return len(text.split())
#================================================ END METHOD ===========================================#
#rint(f'number of words in text Before cleaning==>{count_words_basic(jd)}')
#print(f'number of words in text After cleaning==>{count_words_basic(clean_text(jd))} \n defference betwwen the ==>{count_words_basic(clean_text(jd))-count_words_basic(jd)}')
#print(clean_text(jd))# calling the method for clan and store the varible in the  cleaned jd

#cleaned_jd=clean_text(jd)
# model Intilization


#=============================== START Method for The storing technical and non technical SKILLS==============================
def parse_skills(parse_extract_skills):
    # Initialize empty lists
    technical_skills = []
    non_technical_skills = []
    
    # Split lines and process each category
    for line in parse_extract_skills.strip().split('\n'):
        if line.startswith('Technical_Skills:'):
            skills = line.split('Technical_Skills:')[1].strip()
            technical_skills = [skill.strip() for skill in skills.split(',')]
        elif line.startswith('Non_Technical_Skills:'):
            skills = line.split('Non_Technical_Skills:')[1].strip()
            non_technical_skills = [skill.strip() for skill in skills.split(',')]
    
    return technical_skills, non_technical_skills

# Get the lists# calling the method which return the two list of Technical skills and non technical skills
#tech_skills, non_tech_skills = parse_skills(parse_extract_skills)

#print("Technical Skills List:", tech_skills)
#print("Non-Technical Skills List:", non_tech_skills)
#=============================== END Method for The storing technical and non technical SKILLS================================
#jd_skills= parse_extract_skills


#final_prompt= f"job_disccription_skills={jd_skills}, myresume={resume}"
#print(final_prompt)
# ====================Main LLM Call Start Method =================================
def llm_call_json_response(cleaned_jd):
   
    messages_1 = [
        SystemMessage(content=
                    '''Extract EXACT skill phrases from job descriptions for resume matching. Return ONLY:
                        1. Technical skills (tools, technologies, hard skills)
                        2. Non-technical skills (soft skills, behaviors)
                        Format STRICTLY as:
                        Technical_Skills: [comma-separated exact phrases]
                        Non_Technical_Skills: [comma-separated exact phrases'''),
        HumanMessage(content=cleaned_jd),# use the same technical jd varibale names 
    ]
    extract_skills = model.invoke(messages_1)
    parse_extract_skills=parser.invoke(extract_skills)
    #print(f'The Response from the original method {parse_extract_skills}')
    return parse_extract_skills
def llm_final_response(final_prompt):
    messages_2 = [
        SystemMessage(content=''' you are an ats expert how real time companies do ,Compare the given 
                    resume with the provided Technical_Skills and 
                    Non_Technical_Skills lists. Identify skills missing from the resume and store 
                    them as: Missing_Technical_Skills=[] and Missing_Non_Technical_Skills=[]. 
                    For each missing skill, generate one realistic, ATS-optimized bullet point. 
                    If an existing bullet point can be enhanced with the missing skill, replace it 
                    with a hybrid version; otherwise, insert a new bullet point in a relevant job 
                    section. Ensure cloud-specific context (e.g., use AWS-native tools if it's 
                    an AWS project), and embed domain-specific context (e.g., healthcare, MDM) 
                    where applicable. Use job description keywords verbatim when possible.
                    Do not remove existing bullet points, companies, dates, or environments. 
                    Only enhance or append bullet points. Finally, output the optimized resume in 
                    and also return dont not print any missing technical skills and non technical skills
                    this exact JSON format in valiable, becasue I need to send the exact the json reposne to another method:
                    and for "professional_summary" genarate more optimised single point 
                                JSON=
                                {
                                "name": "[Full Name]",
                                "title": "[Role Title]",
                                "contact": {
                                    "email": "example@domain.com",
                                    "phone": "+1(XXX)-XXX-XXXX",
                                    "portfolio": "[URL]",
                                    "linkedin": "[URL]"
                                },
                                "professional_summary": [
                                    "[Bullet Point 1]"
                                ],
                                "technical_skills": {
                                    "[Category 1]": ["Skill1", "Skill2"],
                                    "[Category 2]": ["Skill3", "Skill4"]
                                },
                                "experience": [
                                    {
                                    "role": "[Job Title]",
                                    "client": "[Company]",
                                    "duration": "Jan 2024 - Present|09 2026",
                                    "responsibilities": [
                                        "[Bullet 1]",
                                        "[Bullet 6]"
                                    ],
                                    "environment": ["Tech1", "Tech2"]
                                    }
                                ],
                                "education": [
                                    {
                                    "institution": "[University]",
                                    "degree": "[Degree]",
                                    "field": "[Major]",
                                    "year": YYYY
                                    }
                                ],
                                "certifications": [
                                    "[Cert 1]",
                                    "[Cert 2]"
                                ]
                                }

                                '''),
        HumanMessage(content=final_prompt),# use the same technical jd varibale names 
    ]
    final_json_resume = model.invoke(messages_2)
    parse_json_resume=parser.invoke(final_json_resume)
    #print(f'The response from the original method {parse_json_resume}')
    return parse_json_resume
#=============================== ending of the llm method ===================================================================
#=============================== Comparion Skills with resume using the model ================================================