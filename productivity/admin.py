from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import User, Task, Profile

# Register your models here.
admin.site.register(User, UserAdmin)
admin.site.register(Task)
admin.site.register(Profile)