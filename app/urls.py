from django.conf.urls import url, include
from rest_framework import routers
from app.views import NoteListView, NoteViewSet

router = routers.DefaultRouter()
router.register(r'notes', NoteViewSet)

urlpatterns = [
    url(r'^$', NoteListView.as_view(), name="index"),
    url(r'^api/', include(router.urls))
]
