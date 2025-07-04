from django.urls import path 

from open_ai_app import views as v

urlpatterns = [
    path('GetSuggestion', v.AISuggedtionView.as_view()),

]
