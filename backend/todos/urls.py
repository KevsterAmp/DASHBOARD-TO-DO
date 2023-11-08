from django.urls import path

from .views import TodosHomeView, TodosCreateView, TodosEditView, todo_delete

urlpatterns = [
    path("", TodosHomeView.as_view(), name="home"), 
    path("create/", TodosCreateView.as_view(), name="todos_create"),
    path("<int:pk>/edit/", TodosEditView.as_view(), name="todos_edit"),
    path("<int:todo_id>/delete/", todo_delete, name="todo_delete"),
]