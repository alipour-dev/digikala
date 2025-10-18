from django.contrib import admin
from blog.models import Slider

class SliderAdmin(admin.ModelAdmin):
    list_display = ['title', 'image']
admin.site.register(Slider,SliderAdmin)