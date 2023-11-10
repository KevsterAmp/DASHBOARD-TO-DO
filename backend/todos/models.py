from django.conf import settings
from django.db import models
from django.urls import reverse


# Create your models here.
class Todo(models.Model):
    TAG_CHOICES = [
        ('Personal', 'Personal'),
        ('Work', 'Work'),
        ('School', 'School'),
        ('Coding', 'Coding'),
    ]

    tag = models.CharField(max_length=10, choices=TAG_CHOICES, default='Personal')
    title = models.CharField(max_length=90)
    description = models.TextField(blank=True)
    status = models.CharField(max_length=20)
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )

    def __str__(self):
        return self.title
    
    def get_absolute_url(self):
        return reverse("home")
    
    @property
    def tag_color(self):
        tag_colors = {  
            "Personal": "#7875A9",
            "Work": "#7DA9D6",
            "School": "#FF8E8E",
            "Coding": "#7BC683",
        }
        return tag_colors.get(self.tag, '#000000')  # default color if tag not found