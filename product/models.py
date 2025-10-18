from django.db import models
from django.utils.text import slugify


class Category(models.Model):
    name = models.CharField(max_length=100,verbose_name='نام دسته')
    description = models.CharField(max_length=255,blank=True,null=True, verbose_name='توضیح')
    icon = models.ImageField(upload_to='category_icons/',verbose_name="آیکون")
    parent = models.ForeignKey('self', on_delete=models.CASCADE, related_name='children',blank=True,null=True)
    slog = models.SlugField(unique=True, blank=True,null=True)
    class Meta:
        verbose_name = "دسته بندی"
        verbose_name_plural = "دسته بندی ها"
        ordering = ['name']
    def __str__(self):
        return self.name

    def save (self, *args, **kwargs):
        if not self.slog:
            self.slog = slugify(self.name)
            super().save(*args, **kwargs)

    def get_absolute_url(self):
        return f'/category/{self.slog}/'


class Product(models.Model):
    title = models.CharField(max_length=100)
    slug = models.SlugField(unique=True, blank=True,null=True)
    description = models.CharField(max_length=255)
    icon = models.ImageField(upload_to='icons/',blank=True,null=True)
    category = models.ForeignKey('Category',on_delete=models.CASCADE,related_name='products')


    def __str__(self):
        return f'{self.title}, {self.slug}, {self.category}'
