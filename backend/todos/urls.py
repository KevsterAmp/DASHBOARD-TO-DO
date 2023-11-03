from django.urls import path

from .views import TodosHomeView, TodosCreateView, TodosEditView

urlpatterns = [
    path("", TodosHomeView.as_view(), name="home"), 
    path("<int:pk>/create/", TodosCreateView.as_view(), name="todos_create"),
    path("<int:pk>/edit/", TodosEditView.as_view(), name="todos_edit"),
]