from django.db import models
from django.utils.translation import ugettext_lazy as _

class Note(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    text = models.TextField()

    class Meta:
        ordering = "-created",
        verbose_name = _("Note")
        verbose_name_plural = _("Notes")
