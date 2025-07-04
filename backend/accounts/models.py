import uuid
import random

from django.contrib.auth.models import AbstractBaseUser, BaseUserManager,PermissionsMixin
from django.db import models
from django.utils import timezone

import datetime

class UserManager(BaseUserManager):
    def create_superuser(self, Email ,FirstName, LastName, UserName, password , PhoneNumber,  **other_fields):
        other_fields.setdefault('is_staff', True)
        other_fields.setdefault('is_superuser', True)
        other_fields.setdefault('IsActive', True)

        if other_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')
        return self.create_user(username = UserName, email = Email, password = password, first_name = FirstName, last_name= LastName, phone_number=PhoneNumber, **other_fields )

    def create_user(self, username, email, password, first_name, last_name,phone_number, **other_fields):
        if not email:
            raise ValueError('Users must have an email daddress.')

        email = self.normalize_email(email)
        user = self.model(Email = email, FirstName = first_name, LastName = last_name, UserName = username, PhoneNumber = phone_number, **other_fields)
        user.set_password(password)
        user.save()
        return user    

class Users(AbstractBaseUser, PermissionsMixin):

    class Meta:
        db_table = 'Users'

    UserID = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    FirstName = models.CharField(max_length=150)
    LastName = models.CharField(max_length=50, default='')
    Email = models.EmailField(max_length=200, unique=True, editable=True)
    UserName = models.CharField(max_length=100, unique=True)
    PhoneNumber = models.CharField(max_length=15, null=True)
    StartDate = models.DateTimeField(default=timezone.now)
    LastLogin = models.DateTimeField(auto_now=True)
    LastLogout = models.DateTimeField(auto_now=True)
    IsActive = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    LoginTry = models.IntegerField(null=True, default=0)
    LoginStatus = models.CharField(max_length=40 , default='')


    objects = UserManager()

    USERNAME_FIELD = 'Email'
    REQUIRED_FIELDS = ['FirstName','LastName','UserName','PhoneNumber']

    def __str__(self):
        return self.Email
    
class OTPData(models.Model):
    class Meta:
        db_table = "OTPData"

    OTPDataID = models.UUIDField(primary_key = True, default = uuid.uuid4, editable = False)
    OTP = models.CharField(max_length = 6, null = False)
    OTPUser = models.ForeignKey(Users,on_delete=models.SET_NULL, null=True)
    IsValid = models.BooleanField(default = True)
    ValidDateTill = models.DateField()
    ValidTimeTill = models.TimeField() 

    def __str__(self):
        return self.OTPUser.Email + self.OTP    
