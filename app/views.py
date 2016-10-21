from django.views.generic import ListView
from rest_framework import viewsets

from .models import Note
from .serializers import NoteSerializer

class NoteListView(ListView):
    model = Note

class NoteViewSet(viewsets.ModelViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
