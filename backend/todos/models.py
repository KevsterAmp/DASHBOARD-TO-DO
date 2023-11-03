from django.conf import settings
from django.db import models
from django.urls import reverse


# Create your models here.
class Todo(models.Model):
    title = models.CharField(max_length=90)
    description = models.TextField()
    tag = models.CharField(max_length=40)
    tag_color = models.CharField(max_length=20)
    status = models.CharField(max_length=20)
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )

    def __str__(self):
        return self.title
    
    def get_absolute_url(self):
        return reverse("home")