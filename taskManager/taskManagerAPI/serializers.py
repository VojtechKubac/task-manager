from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from .models import Task

class TaskSerializer(serializers.ModelSerializer):
    name = serializers.CharField(validators=[UniqueValidator(queryset=Task.objects.all())])

    class Meta:
        model = Task
        fields = '__all__'