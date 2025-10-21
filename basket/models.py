from django.contrib.auth.models import User
from django.db import models

import basket
from product.models import Product


class Basket(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE,related_name='baskets',blank=True,null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.user.username if self.user else 'no user'

    def add(self, product,quantity):
        if self.lines.filter(product=product).exists():
            product_line = self.lines.filter(product=product).first()
            product_line.quantity =quantity
            product_line.save()
        else:
            product_line = self.lines.create(product=product)
        return product_line
    def validate_user(self,user):
        if user.is_authenticated:
            if self.user is not None and self.user != user:
                return False
            if self.user is None:
                self.user = user
                self.save()
        elif self.user is not None:
            return False
        return True
    @classmethod
    def get_basket(cls,basket_id):
        if basket_id is None:
            basket = cls.objects.create()
        else:
            try:
                basket = cls.objects.get(pk=basket_id)
            except cls.DoesNotExist:
                basket = None
        return  basket


class Basketline(models.Model):
    basket = models.ForeignKey(Basket,on_delete=models.CASCADE,related_name='lines')
    product = models.ForeignKey(Product,on_delete=models.CASCADE,related_name='lines')
    quantity = models.PositiveSmallIntegerField(default=1)

    def __str__(self):
        return str(self.basket)
