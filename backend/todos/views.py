from django.shortcuts import render
from django.views.generic import ListView, UpdateView, View
from django.views.decorators.http import require_POST
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import get_object_or_404, redirect
from django.shortcuts import render, redirect

from .forms import TodoForm
from .models import Todo


# Create your views here.
class TodosHomeView(LoginRequiredMixin, ListView):
    model = Todo
    template_name = "home.html"

class TodosCreateView(LoginRequiredMixin, View):
    def get(self, request, *args, **kwargs):
        return render(request, "todos_create.html")

    def post(self, request, *args, **kwargs):
        form = TodoForm(request.POST)
        if form.is_valid():
            print("form is valid")
            todo = form.save(commit=False)
            tag_colors = {  
                "Personal": "#7875A9",
                "Work": "#7DA9D6",
                "School": "#FF8E8E",
                "Coding": "#7BC683",
            }
            todo.tag_color = tag_colors[todo.tag] 
            todo.author = request.user
            todo.status = "todo"
            todo.save()
            return redirect('home')
        return render(request, 'todos_create.html', {'form': form})


class TodosEditView(LoginRequiredMixin, UpdateView):
    model = Todo
    fields = (
        "title",
        "description",
        "tag",
    )
    template_name = "todos_edit.html"

@login_required
@require_POST
def todo_delete(request, todo_id):
    todo = get_object_or_404(Todo, id=todo_id)
    todo.delete()
    return redirect('home')

@login_required
@require_POST
def todo_change_status(request, todo_id, status):
    todo = get_object_or_404(Todo, id=todo_id)
    todo.status = status
    todo.save()
    return redirect('home')