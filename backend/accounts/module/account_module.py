from rest_framework.authtoken.models import Token
from config.common_function import message

from accounts import models as md

from django.db.models import Q,F

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from config.email_services import send_reset_password_email ,send_activation_email

from django.http import HttpResponseRedirect

import random
from django.utils import timezone 
from datetime import timedelta

class AccountSetupModule:

    def __init__(self,data):
        self.data = data
        self.now = timezone.now()
        self.date = timezone.now().date()
        self.time = timezone.now().time()

    def create_account(self):
        try:
            first_name = self.data['firstName']
            last_name = self.data['lastName']
            email = self.data['email']
            phone_number = self.data['phoneNumber']
            user_name = self.data['userName']
            password = self.data['password']

            if md.Users.objects.filter(Email = email).exists():
                return message('Email Already Exists') ,400
            
            if md.Users.objects.filter(PhoneNumber = phone_number).exists():
                return message('Phone Number Already Exists') ,400
            
            if md.Users.objects.filter(UserName = user_name).exists():
                return message('UserName Already Exists') ,400
            
            user = md.Users(FirstName = first_name , LastName = last_name , UserName = user_name ,Email = email ,PhoneNumber = phone_number , IsActive = False)
            user.set_password(password)
            user.IsActive = True
            user.save()
            return message('Account Created Successfully') ,201
        
        except KeyError as key:
            return message(f'{key} is Missing') , 404
        except Exception as e:
            print(e)
            return message('Something Went Wrong') ,500      

    def user_login(self,request):
        try:
            print(self.data)
            email = self.data['email']
            password = self.data['password']

            user = md.Users.objects.get(Email = email) 
            if authenticate(request, username=email, password=password):
                print(user.IsActive)
                if user.IsActive:
                    login(request,user)
                    token, created = Token.objects.get_or_create(user=user)  
                    user_details = {
                        'token' : token.key,
                        'email' : user.Email,
                        'userName' : user.UserName ,
                        'fullName' : user.FirstName + ' ' + user.LastName ,
                        'phoneNumber' : user.PhoneNumber,
                        'userId': user.UserID
                    }
                    user.LoginStatus = 'Login'
                    user.LoginTry = user.LoginTry + 1
                    user.save()
                    return user_details , 200
                return message('User Account is InActive.') , 402 
            return message('Invalid Email or Password') ,400
        except KeyError as key:
            return message(f'{key} is Missing') ,404
        except md.Users.DoesNotExist:
            return message(f'User Not Found') ,404
        except Exception as e:
            print(e)
            return message('Something Went Wrong') ,500  
        
    def send_otp_for_password_change(self):
        valid_datetime = self.now + timedelta(minutes=5)
        valid_time = valid_datetime.time()
        try:
            email = self.data['email']
            if email is None:
                return message('Invalid Email'), 404
            
            user = md.Users.objects.get(Email=email)
            if user is not None:
                otp = int(random.randint(1000,10000))
                send_reset_password_email(email,otp)
                md.OTPData.objects.create(OTP = otp , OTPUser = user , ValidDateTill = self.date , ValidTimeTill = valid_time)
                return message('Please check your mail for OTP')  ,200 
            return message('User Not Found') ,400
        except KeyError as key:
            return message(f'{key} is Missing') ,404
        except md.Users.DoesNotExist:
            return message(f'User Not Found') ,404
        except Exception as e:
            print(e)
            return message('Something Went Wrong') ,500  

    def verify_otp_for_password_change(self):
        try:
            email=self.data['email']
            otp=str(self.data['otp'])

            if email is None:
                return message('Email Not Found') ,404
            if otp is None:
                return message('OTP Not Found') ,404
    
            user = md.Users.objects.get(Email=email)
            otp_data = md.OTPData.objects.filter(OTPUser = user , IsValid = True , ValidDateTill = self.date).order_by('-ValidDateTill','-ValidTimeTill').first()
            print(otp , otp_data.OTP ,self.time ,otp_data.ValidTimeTill)

            if self.time <= otp_data.ValidTimeTill:
                if str(otp_data.OTP) == str(otp):
                    otp_data.IsValid = False
                    otp_data.save()
                    return message('OTP Verified Successfully') ,200
                return message('OTP Not Matched') , 400
            return message('OTP Experified') , 400
        except KeyError as key:
            return message(f'{key} is Missing') ,404
        except md.Users.DoesNotExist:
            return message(f'User Not Found') ,404
        except Exception as e:
            print(e)
            return message('Something Went Wrong') ,500  
        
    def change_password(self):
        email=self.data.get('email')
        passsword=self.data.get('password')
        password1=self.data.get('password1')

        if email is None:
            return message('Email Not Found') ,404
        
        if passsword is None and password1 is None:
            return message('Password Not Found') ,404
        
        if passsword != password1:
            return message('Password and Confirm Password donot Match') ,400
        
        try:    
            user =md.Users.objects.get(Email=email)
        except md.Users.DoesNotExist:
            return message('User Not Found') ,400

        user.set_password(passsword)
        user.save()
        return message('Password Changed Successfully') ,200
    
    def logout_usr(self ,request):
        try:
            token = Token.objects.get(user=request.user)
            token.delete()
            user = md.Users.objects.get(Email = request.user)
            user.LoginStatus = 'LogOut'
            user.save()
            logout(request)
            return message('Logout Successfully'), 200   
        except Exception as e:
            print(e) 
            return message('Something Went Wrong') ,500  