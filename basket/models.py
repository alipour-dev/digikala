from django.contrib.auth.models import User
from django.db import models

from product.models import Product


class Basket(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE,related_name='baskets')
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.user.username

    def add(self, product):
        if self.lines.filter(product=product).exists():
            product_line = self.lines.filter(product=product).first()
            product_line.quantity += 1
            product_line.save()
        else:
            product_line = self.lines.create(product=product)
        return product_line


class Basketline(models.Model):
    basket = models.ForeignKey(Basket,on_delete=models.CASCADE,related_name='lines')
    product = models.ForeignKey(Product,on_delete=models.CASCADE,related_name='lines')
    quantity = models.PositiveSmallIntegerField(default=1)

    def __str__(self):
        return str(self.basket)
