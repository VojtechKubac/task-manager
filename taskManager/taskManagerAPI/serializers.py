from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from .models import Task
from django.contrib.auth.models import User

class TaskSerializer(serializers.ModelSerializer):
    name = serializers.CharField(validators=[UniqueValidator(queryset=Task.objects.all())])

    class Meta:
        model = Task
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('email', 'username', 'password')
