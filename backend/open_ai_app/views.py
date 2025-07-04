from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response

from open_ai_app.module.al_module import OpenAI
from config.common_function import message


class AISuggedtionView(APIView):
    
    def post(self, request, *args, **kwargs):
        data = request.data
        try:
            res_data , res_status = OpenAI().generate_task_suggestions(context_text=data['context'],task_data=data['task'])
            return Response(res_data,res_status)
        except Exception as e:
            print(e)
            return Response(message('Something Went Wrong'),status=500)
