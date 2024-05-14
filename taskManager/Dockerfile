FROM python:3.10.12-bookworm
# Set environment variable to prevent Python from writing pyc files
ENV PYTHONDONTWRITEBYTECODE 1

# Set environment variable to prevent Python from buffering stdout and stderr
ENV PYTHONUNBUFFERED 1

# Set the working directory
WORKDIR /taskManager

# Copy the code
COPY . .

# Install dependencies using pipenv
RUN pip install --upgrade pip
RUN pip install pipenv
RUN pipenv install --deploy --ignore-pipfile

# Set the command to start the server
CMD ["pipenv", "run", "python", "manage.py", "runserver", "0.0.0.0:8000"]

