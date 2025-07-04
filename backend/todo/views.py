from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response

from todo.module.category_module import CategoryModule
from todo.module.context_module import ContextModule
from todo.module.task_module import TaskModule

from config.common_function import message


# Task Views
class GetTask(APIView):

    def get(self, request, *args, **kwargs):
        data = request.GET
        try:
            res_data , res_status = TaskModule(data=data).get_all_task()
            return Response(res_data,res_status)
        except Exception as e:
            print(e)
            return Response(message('Something Went Wrong'),status=500)
    
class GetTaskById(APIView):

    def get(self, request, *args, **kwargs):
        data = request.GET
        try:
            res_data , res_status = TaskModule(data=data).get_task_by_id()
            return Response(res_data,res_status)
        except Exception as e:
            print(e)
            return Response(message('Something Went Wrong'),status=500)  
        
class CreateTask(APIView):

    def post(self, request, *args, **kwargs):
        data = request.data
        print(data)
        try:
            res_data , res_status = TaskModule(data=data).create_task()
            print(res_data ,res_status)
            return Response(res_data,res_status)
        except Exception as e:
            print(e)
            return Response(message('Something Went Wrong'),status=500)  

class UpdateTask(APIView):

    def post(self, request, *args, **kwargs):
        data = request.data
        print(data)
        try:
            res_data , res_status = TaskModule(data=data).update_task()
            print(res_data ,res_status)
            return Response(res_data,res_status)
        except Exception as e:
            print(e)
            return Response(message('Something Went Wrong'),status=500)      

class DelTask(APIView):

    def post(self, request, *args, **kwargs):
        data = request.data
        try:
            res_data , res_status = TaskModule(data=data).del_task()
            return Response(res_data,res_status)
        except Exception as e:
            print(e)
            return Response(message('Something Went Wrong'),status=500)  

#Catehory Views
class GetCategory(APIView):

    def get(self, request, *args, **kwargs):
        data = request.GET
        try:
            res_data , res_status = CategoryModule(data=data).get_all_category()
            return Response(res_data,res_status)
        except Exception as e:
            print(e)
            return Response(message('Something Went Wrong'),status=500)
    
class GetCategoryById(APIView):

    def get(self, request, *args, **kwargs):
        data = request.GET
        try:
            res_data , res_status = CategoryModule(data=data).get_category_by_id()
            return Response(res_data,res_status)
        except Exception as e:
            print(e)
            return Response(message('Something Went Wrong'),status=500)  
        
class CreateCategory(APIView):

    def post(self, request, *args, **kwargs):
        data = request.data
        try:
            res_data , res_status = CategoryModule(data=data).create_category()
            return Response(res_data,res_status)
        except Exception as e:
            print(e)
            return Response(message('Something Went Wrong'),status=500)  

class UpdateCategory(APIView):

    def post(self, request, *args, **kwargs):
        data = request.data
        try:
            res_data , res_status = CategoryModule(data=data).update_Category()
            return Response(res_data,res_status)
        except Exception as e:
            print(e)
            return Response(message('Something Went Wrong'),status=500)      

class DelCategory(APIView):

    def post(self, request, *args, **kwargs):
        data = request.data
        try:
            res_data , res_status = CategoryModule(data=data).del_category()
            return Response(res_data,res_status)
        except Exception as e:
            print(e)
            return Response(message('Something Went Wrong'),status=500) 

#Context Views
class GetContext(APIView):

    def get(self, request, *args, **kwargs):
        data = request.GET
        try:
            res_data , res_status = CategoryModule(data=data).get_all_category()
            return Response(res_data,res_status)
        except Exception as e:
            print(e)
            return Response(message('Something Went Wrong'),status=500)
    
class GetContextById(APIView):

    def get(self, request, *args, **kwargs):
        data = request.GET
        try:
            res_data , res_status = CategoryModule(data=data).get_category_by_id()
            return Response(res_data,res_status)
        except Exception as e:
            print(e)
            return Response(message('Something Went Wrong'),status=500)  
        
class CreateContext(APIView):

    def post(self, request, *args, **kwargs):
        data = request.data
        try:
            res_data , res_status = CategoryModule(data=data).create_category()
            return Response(res_data,res_status)
        except Exception as e:
            print(e)
            return Response(message('Something Went Wrong'),status=500)  

class UpdateContext(APIView):

    def post(self, request, *args, **kwargs):
        data = request.data
        try:
            res_data , res_status = CategoryModule(data=data).update_Category()
            return Response(res_data,res_status)
        except Exception as e:
            print(e)
            return Response(message('Something Went Wrong'),status=500)      

class DelContext(APIView):

    def post(self, request, *args, **kwargs):
        data = request.data
        try:
            res_data , res_status = CategoryModule(data=data).del_category()
            return Response(res_data,res_status)
        except Exception as e:
            print(e)
            return Response(message('Something Went Wrong'),status=500)                                     
