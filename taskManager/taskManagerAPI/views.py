from django.shortcuts import render
from django.shortcuts import get_object_or_404

from .models import Task
from .serializers import TaskSerializer

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

# Authentication
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.decorators import permission_classes

# Throttle
from rest_framework.throttling import AnonRateThrottle, UserRateThrottle
from rest_framework.decorators import throttle_classes


# Create your views here.
# TODO: add authentication
@permission_classes([IsAuthenticated])
class TaskView(APIView):
    serializer_class = TaskSerializer

    def get(self, request):
        tasks = [ {'name': task.name, 'description': task.description} for task in Task.objects.all() ]
        return Response(tasks, status=status.HTTP_200_OK)

    def post(self, request):
        serialied_task = TaskSerializer(data=request.data)
        serialied_task.is_valid(raise_exception=True)
        serialied_task.save()
        return Response(serialied_task.data, status=status.HTTP_201_CREATED)