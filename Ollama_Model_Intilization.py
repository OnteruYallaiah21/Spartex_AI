import ollama

def ollma_bullet_points(tech_skills, non_tech_skills):
    user_prompt = f"here I am going to give {tech_skills}. generate bullet points?"

    messages = [
    {'role': 'system', 'content': '''You are a ats optimiser,genarate the bullet points by use the those skills real time project.like below
                                     Developed and optimized scalable data pipelines using PySpark to process over 100 million records daily, improving ETL performance by 40%.'''},
    {'role': 'user', 'content': user_prompt}
    ]

    response = ollama.chat(model='tinyllama', messages=messages)
    print(response['message']['content'])
    return response['message']['content']
    
technical_skills = [
    "Python",
    "SQL",
    "Apache Spark",
    "Databricks",
    "Azure Data Factory",
    "Snowflake",
    "Git",
    "Docker",
    "ETL Pipelines",
    "Kafka"
]
non_technical_skills = [
    "Communication",
    "Problem Solving",
    "Team Collaboration",
    "Time Management",
    "Leadership",
    "Adaptability",
    "Critical Thinking",
    "Project Management",
    "Stakeholder Engagement",
    "Decision Making"
]
ollama_reponse=ollma_bullet_points(technical_skills, non_technical_skills)