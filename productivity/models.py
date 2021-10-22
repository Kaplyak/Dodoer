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
    state = models.CharField(max_length=5)

class Profile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    profile_picture = models.ImageField(default='static/productivity/img/default_profile.svg')
    quote = models.CharField(max_length=2048)
    productive_time = models.IntegerField(default=0)
    break_time = models.IntegerField(default=0)

    def serialize(self):
        return {
            "productive_time": self.productive_time,
            "break_time": self.break_time
        }