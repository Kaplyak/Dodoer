from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.

class User(AbstractUser):
    pass

class Task(models.Model):
    # Fields: user, title, description, timestamp, color?
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=1024)
    description = models.TextField()

class Profile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    profile_picture = models.ImageField()
    quote = models.CharField(max_length=2048)
    productive_time = models.IntegerField()
    break_time = models.IntegerField()