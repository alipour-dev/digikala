from django.db import models


class Slider(models.Model):
    title = models.CharField(max_length=100)
    image = models.ImageField(upload_to='slider_images')
    def __str__(self):
        return self.title


    @staticmethod
    def get_images():
        sliders = Slider.objects.all()
        images = []
        for slider in sliders:
            images.append(slider.image)
        print(images)
        return images


