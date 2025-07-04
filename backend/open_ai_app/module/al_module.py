from decouple import config

import os
import json

from langchain.chat_models import init_chat_model

class OpenAI:

    def __init__(self):
        os.environ["GOOGLE_API_KEY"] = config('GEMINI_KEY')
        self.llm = init_chat_model("gemini-2.0-flash", model_provider="google_genai")

    def build_prompt(self,task_data, context_text):
        title = task_data.get("title", "")
        description = task_data.get("description", "")
        print(title,description)
        prompt = f"""
                You are a smart task management assistant. Based on the task details and context, suggest:

                1. A better task description
                2. A priority score (0–10)
                3. A suitable deadline (within 3 days unless urgent)
                4. Suggested category/tag
                5. Deadline must be greater than today date

                Task Title: {title}
                Task Description: {description}
                Context: {context_text}

                Return your response in JSON like:
                {{
                "enhanced_description": "...",
                "priority_score": 0-10,
                "suggested_deadline": "YYYY-MM-DDTHH:MM",
                "suggested_category": "..."
                }}
            """
        return prompt  

    def generate_task_suggestions(self ,context_text, task_data):  
        promt = self.build_prompt(task_data=task_data,context_text=context_text)

        res = self.llm.invoke(promt)
        content = res.content
        json_str = content.replace('```json\n', '').replace('\n```', '').strip()
        json_data = json.loads(json_str)

        print(json_data)

        return json_data ,200




