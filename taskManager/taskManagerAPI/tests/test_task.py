import pytest

from taskManagerAPI.models import Task

@pytest.mark.django_db
def test_task_create():
    task_name = 'test_task'
    task_description = 'test_description'
    Task.objects.create(name=task_name, description=task_description)

    assert Task.objects.count() == 1
    new_task =  Task.objects.get(pk=1)
    assert new_task.name == task_name
    assert new_task.description == task_description