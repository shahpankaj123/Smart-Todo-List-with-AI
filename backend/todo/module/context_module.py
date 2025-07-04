from todo import models as ctx
from accounts import models as md
from config.common_function import message
import uuid

class ContextModule:

    def __init__(self, data):
        self.data = data

    def create_context_entry(self):
        try:
            content = self.data['content']
            source_type = self.data['sourceType']
            insights = self.data.get('insights', None)  # Optional field
            
            ctx.ContextEntry.objects.create(
                Content=content,
                SourceType=source_type,
                InSights=insights
            )
            return message('Context entry created successfully'), 201
        except KeyError as k:
            return message(f'{k} is missing'), 404
        except Exception as e:
            print(e)
            return message('Something went wrong'), 500

    def get_all_context_entries(self):
        try:
            return ctx.ContextEntry.objects.all().values(), 200
        except Exception as e:
            print(e)
            return message('Something went wrong'), 500

    def get_context_entry_by_id(self):
        try:
            context_id = self.data['contextId']
            return ctx.ContextEntry.objects.values().get(ContextID=context_id), 200
        except KeyError as k:
            return message(f'{k} is missing'), 404
        except ctx.ContextEntry.DoesNotExist:
            return message('Context entry not found'), 400
        except Exception as e:
            print(e)
            return message('Something went wrong'), 500

    def update_context_entry(self):
        try:
            context_id = self.data['contextId']
            content = self.data.get('content')
            source_type = self.data.get('sourceType')
            insights = self.data.get('insights')

            context_entry = ctx.ContextEntry.objects.get(ContextID=context_id)
            
            if content is not None:
                context_entry.Content = content
            if source_type is not None:
                context_entry.SourceType = source_type
            if insights is not None:
                context_entry.InSights = insights
                
            context_entry.save()
            return message('Context entry updated successfully'), 200
        except KeyError as k:
            return message(f'{k} is missing'), 404
        except ctx.ContextEntry.DoesNotExist:
            return message('Context entry not found'), 400
        except Exception as e:
            print(e)
            return message('Something went wrong'), 500

    def delete_context_entry(self):
        try:
            context_id = self.data['contextId']
            ctx.ContextEntry.objects.get(ContextID=context_id).delete()
            return message('Context entry deleted successfully'), 200
        except KeyError as k:
            return message(f'{k} is missing'), 404
        except ctx.ContextEntry.DoesNotExist:
            return message('Context entry not found'), 400
        except Exception as e:
            print(e)
            return message('Something went wrong'), 500