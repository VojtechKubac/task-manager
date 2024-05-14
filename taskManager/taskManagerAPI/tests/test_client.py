import pytest

from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

from django.urls import reverse

# custom fixtures
@pytest.fixture
def api_client():
    from rest_framework.test import APIClient
    return APIClient()

@pytest.fixture
def create_user(db):
    def make_user():
        return User.objects.create_user('john', 'lennon@taskmanager.com', 'johnpassword')
    return make_user

@pytest.fixture
def get_or_create_token(db, create_user):
    user = create_user()
    token, _ = Token.objects.get_or_create(user=user)
    return token


# the client tests

@pytest.mark.django_db
def test_get_users(client):
    url = reverse('users')
    response = client.get(url)
    assert response.status_code == 200

@pytest.mark.django_db
def test_post_user(client):
    url = reverse('users')
    user = {'username': 'pytest_user',
            'email': 'pytest_user@taskmanager.com',
            'password': 'heslo_test_1212'
    }
    response = client.post(url, user)
    assert response.status_code == 201


@pytest.mark.django_db
def test_get_tasks(client):
    url = reverse('tasks')
    response = client.get(url)
    assert response.status_code == 401

@pytest.mark.django_db
def test_auth(api_client, get_or_create_token):
    url = reverse('tasks')
    token = get_or_create_token
    api_client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)
    response = api_client.get(url)
    assert response.status_code == 200

@pytest.mark.django_db
def test_craete_task(api_client, get_or_create_token):
    token = get_or_create_token
    api_client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)
    task = {
        'name': 'test_task', 'description': 'test_task_description'
    }
    url = reverse('tasks')
    response = api_client.post(url, task)
    assert response.status_code == 201