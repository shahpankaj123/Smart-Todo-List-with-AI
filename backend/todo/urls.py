from django.urls import path 

from todo import views as v

urlpatterns = [
    path('GetTask',v.GetTask.as_view()),
    path('UpdateTask',v.UpdateTask.as_view()),
    path('CreateTask',v.CreateTask.as_view()),
    path('DelTask',v.DelTask.as_view()),

    path('GetCategory',v.GetCategory.as_view()),
    path('CreateCategory',v.CreateCategory.as_view()),
]