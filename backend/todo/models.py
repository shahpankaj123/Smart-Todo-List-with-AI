from django.db import models
import uuid

from accounts import models as md

# Create your models here.

class Category(models.Model):
    class Meta:
        db_table = 'Cagegory'

    CategoryID = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False) 
    Category = models.CharField(max_length=100) 

class Task(models.Model):

    class Meta:
        db_table = 'Task'

    status_choice = (
        ('pending' , 'Pending'),
        ('complete' , 'Complete'),
    )    

    TaskID = models.UUIDField(primary_key=True ,default=uuid.uuid4 , editable=False)   
    Title = models.CharField(max_length=250)
    Desc = models.TextField()
    Category = models.ForeignKey(Category ,on_delete=models.SET_NULL ,null=True)
    AIDesc = models.TextField()
    PriorityScore = models.FloatField(default=0.0)
    DeadLine = models.DateTimeField(null=True, blank=True)
    Status = models.CharField(max_length=100 , choices= status_choice ,default='pending')
    CreatedAt = models.DateTimeField(auto_now_add=True)
    UpdatedAt = models.DateTimeField(auto_now=True)

class ContextEntry(models.Model):

    ContextID = models.UUIDField(primary_key=True ,default=uuid.uuid4 , editable=False) 
    Content = models.TextField()
    CreatedAt = models.DateTimeField(auto_now_add=True)
    InSights = models.TextField(blank=True, null=True)  

