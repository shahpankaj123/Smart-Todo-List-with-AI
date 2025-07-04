from django.urls import path

from accounts import views as vw

urlpatterns = [
    path('user/register',vw.UserRegistrationView.as_view(),name='register'),
    path('user/login',vw.LoginView.as_view(),name='login'),
    path('user/logout',vw.UserLogoutView.as_view(),name='logout'),
    path('user/send-otp',vw.SendOTPView.as_view()),
    path('user/verify-otp',vw.VerifySendOTPView.as_view()),
    path('user/changepassword',vw.ChangePasswordView.as_view()),     
]