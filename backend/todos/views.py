from django.shortcuts import render
from django.views.generic import ListView, CreateView, UpdateView

from .models import Todo


# Create your views here.
class TodosHomeView(ListView):
    model = Todo
    template_name = "home.html"


class TodosCreateView(CreateView):
    pass


class TodosEditView(UpdateView):
    model = Todo
    fields = (
        "title",
        "description",
        "tag",
        "status",
    )
    template_name = "todos_edit.html"

