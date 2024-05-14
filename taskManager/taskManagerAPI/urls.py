from django.urls import path
from .views import TaskView, UserView

urlpatterns = [
    path('tasks/', TaskView.as_view(), name='tasks'),
    path('users/', UserView.as_view(), name='users'),
    ]
