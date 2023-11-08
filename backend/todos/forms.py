from django import forms
from .models import Todo

class TodoForm(forms.ModelForm):
    class Meta:
        model = Todo
        fields = ['title', 'description', 'tag']
        widgets = {
            'tag': forms.RadioSelect
        }