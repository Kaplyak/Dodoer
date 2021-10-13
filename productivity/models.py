from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.

class User(AbstractUser):
    pass


class Task(models.Model):
    # Fields: user, title, description, timestamp, color?
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=2048)
    description = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    color = models.CharField(max_length=128)

#class Profile(models.Model):
    # Fields: focus_time, ???
