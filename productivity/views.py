import json
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt

from .models import User, Profile, Task

# Create your views here.

def index(request):
    return render(request, "productivity/index.html", {
        "username": request.user.username,
    })

def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "productivity/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "productivity/login.html")

@login_required
def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "productivity/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "productivity/register.html", {
                "message": "Username already taken."
            })
        
        # Create profile
        profile = Profile.objects.create(user=user)

        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "productivity/register.html")

@login_required
def profile(request):
    profile = Profile.objects.get(user=request.user)

    return render(request, "productivity/profile.html", {
        "username": request.user.username,
        "profile": profile,
        "productive_time": int((profile.productive_time / 60)),
        "break_time": int((profile.break_time / 60))
    })

@login_required
def timer(request):
    return render(request, "productivity/timer.html", {
        "username": request.user.username
    })

@login_required
def tasklist(request):
    
    ideas_tasks = Task.objects.filter(owner=request.user, state="Ideas")
    todo_tasks = Task.objects.filter(owner=request.user, state="To do")
    doing_tasks = Task.objects.filter(owner=request.user, state="Doing")
    done_tasks = Task.objects.filter(owner=request.user, state="Done")





    return render(request, "productivity/tasklist.html", {
        "username": request.user.username,
        "ideas_tasks": ideas_tasks,
        "todo_tasks": todo_tasks,
        "doing_tasks": doing_tasks,
        "done_tasks": done_tasks
    })

def faq(request):
    return render(request, "productivity/faq.html", {
        "username": request.user.username
    })

@csrf_exempt
def tasks(request):
    data = json.loads(request.body)
    if request.method == "POST":
        title = data.get("title", "")
        description = data.get("description", "")


        newTask = Task.objects.create(owner=request.user, title=title, description=description, state="Ideas")
        newTask.save()
        return HttpResponse(status=204)

def addtask(request):
    return Hello

def removetask(request):
    return Hello

@csrf_exempt
def updatetime(request, username):
    profile = Profile.objects.get(user=request.user)

    if request.method == "PUT":
        data = json.loads(request.body)

        if data.get("productive"):
            profile.productive_time += data.get("time")
        else:
            profile.break_time += data.get("time")

        profile.save()
        return HttpResponse(status=204)

    elif request.method == "GET":
        return JsonResponse(profile.serialize())