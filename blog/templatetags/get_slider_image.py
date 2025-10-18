from blog.models import Slider
from django import template
register = template.Library()
@register.simple_tag
def sliders():
    return Slider.objects.all()
        # [s.image for s in Slider.objects.all()]
