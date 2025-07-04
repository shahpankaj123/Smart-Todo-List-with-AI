from todo import models as tmd
from accounts import models as md
from config.common_function import message

from open_ai_app.module.al_module import OpenAI

class TaskModule:

    def __init__(self ,data):
        self.data = data

    def create_task(self):
        try:
            title = self.data['title']
            desc = self.data['description']
            category_id = self.data['category']
            context = self.data['context']

            category = tmd.Category.objects.get(CategoryID = category_id)

            res , st= OpenAI().generate_task_suggestions(context_text=context ,task_data=self.data)

            tmd.ContextEntry.objects.create(Content = context)

            tmd.Task.objects.create(
                Title = title,
                Desc = desc,
                Category = category,
                PriorityScore = res['priority_score'] ,
                DeadLine = res['suggested_deadline'],
                AIDesc = res['enhanced_description'],
            )
            return res ,201
        except KeyError as k:
            return message(f'{k} is Missing') ,404
        except tmd.Category.DoesNotExist:
            return message('Category Not Found') ,400
        except Exception as e:
            print(e)
            return message('Something Went Wrong') ,500     

    def get_all_task(self):
        try:
            return tmd.Task.objects.all().values().order_by('-PriorityScore') ,200
        except Exception as e:
            print(e)
            return message('Something Went Wrong') ,500
        
    def get_task_by_id(self):  
        try:
            task_id = self.data['taskId']
            return tmd.Task.objects.values().get(TaskID = task_id) ,200
        except KeyError as k:
            return message(f'{k} is Missing') ,404
        except tmd.Task.DoesNotExist:
            return message('Task Not Found') ,400
        except Exception as e:
            print(e)
            return message('Something Went Wrong') ,500 
        
    def update_task(self):
        try:
            task_id = self.data['TaskID']
            title = self.data.get('Title')
            desc = self.data.get('Desc')
            status = self.data.get('Status')

            task = tmd.Task.objects.get(TaskID = task_id)
            
            task.Title = title
            task.Desc = desc
            task.Status = status   
            task.save()
            return message('Task Updated Successfully') ,200
        except KeyError as k:
            return message(f'{k} is Missing') ,404
        except tmd.Task.DoesNotExist:
            return message('Task Not Found') ,400
        except Exception as e:
            print(e)
            return message('Something Went Wrong') ,500 
        
    def del_task(self):  
        try:
            task_id = self.data['taskId']
            tmd.Task.objects.get(TaskID = task_id).delete()
            return message('Task Deleted Successfully') ,200
        except KeyError as k:
            return message(f'{k} is Missing') ,404
        except tmd.Task.DoesNotExist:
            return message('Task Not Found') ,400
        except Exception as e:
            print(e)
            return message('Something Went Wrong') ,500     



