from django.urls import path

from .views import TodosHomeView, TodosCreateView, TodosEditView, todo_delete, todo_change_status

urlpatterns = [
    path("", TodosHomeView.as_view(), name="home"), 
    path("create/", TodosCreateView.as_view(), name="todos_create"),
    path("<int:pk>/edit/", TodosEditView.as_view(), name="todos_edit"),
    path("<int:todo_id>/delete/", todo_delete, name="todo_delete"),
    path("<int:todo_id>/change_status/<str:status>", todo_change_status, name="todo_change_status"),
]