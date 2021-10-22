from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

from . import views

urlpatterns = [
    #first arg = url
    #second arg = view to render
    #third arg (optional) = string name to represent the urlpattern
    path("", views.index, name="index"),
    path("register", views.register, name="register"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),

    path("timer", views.timer, name="timer"),
    path("tasklist", views.tasklist, name="tasklist"),
    path("profile", views.profile, name="profile"),
    path("faq", views.faq, name="faq"),

    # API routes
    # Timer
    path("<str:username>/updatetime", views.updatetime, name="updatetime"),


    # Tasks
    path("tasks", views.tasks, name="tasks"),
    path("<str:username>/addtask", views.addtask, name="addtask"),
    path("<str:username>/removetask", views.removetask, name="removetask")
    
    # Url to load user-uploaded images.
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)