from django.urls import path

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
    path("profile", views.profile, name="profile")
]