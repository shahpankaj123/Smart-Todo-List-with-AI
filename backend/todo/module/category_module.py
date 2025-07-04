from todo import models as tmd
from accounts import models as md
from config.common_function import message

class CategoryModule:

    def __init__(self ,data):
        self.data = data

    def create_category(self):
        try:
            category = self.data['category']
            tmd.Category.objects.create(Category = category)
            return message('Category created Successfully') ,201
        except KeyError as k:
            return message(f'{k} is Missing') ,404
        except tmd.Category.DoesNotExist:
            return message('Category Not Found') ,400
        except Exception as e:
            print(e)
            return message('Something Went Wrong') ,500     

    def get_all_category(self):
        try:
            return tmd.Category.objects.all().values() ,200
        except KeyError as k:
            return message(f'{k} is Missing') ,404
        except Exception as e:
            print(e)
            return message('Something Went Wrong') ,500
        
    def get_category_by_id(self):  
        try:
            category_id = self.data['categoryId']
            return tmd.Category.objects.values().get(CategoryID = category_id) ,200
        except KeyError as k:
            return message(f'{k} is Missing') ,404
        except tmd.Category.DoesNotExist:
            return message('Category Not Found') ,400
        except Exception as e:
            print(e)
            return message('Something Went Wrong') ,500 
        
    def update_Category(self):
        try:
            category_id = self.data['categoryId']
            category_nm = self.data['category']

            category = tmd.Category.objects.get(CategoryID = category_id)
            category.Category = category_nm
            category.save()
            return message('Category Updated Successfully') ,200
        except KeyError as k:
            return message(f'{k} is Missing') ,404
        except tmd.Category.DoesNotExist:
            return message('Task Not Found') ,400
        except Exception as e:
            print(e)
            return message('Something Went Wrong') ,500 
        
    def del_category(self):  
        try:
            category_id = self.data['categoryId']
            tmd.Category.objects.get(CategoryID = category_id).delete()
            return message('Category Deleted Successfully') ,200
        except KeyError as k:
            return message(f'{k} is Missing') ,404
        except tmd.Category.DoesNotExist:
            return message('Task Not Found') ,400
        except Exception as e:
            print(e)
            return message('Something Went Wrong') ,500   