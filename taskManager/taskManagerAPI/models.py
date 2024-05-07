from django.db import models

# Create your models here.
class Task(models.Model):
    name = models.CharField(max_length=80, unique=True)
    description = models.TextField(max_length=500)
    # # TODO:
    # asignee
    # progress
    # category
    # priority