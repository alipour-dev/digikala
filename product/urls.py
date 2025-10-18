from django.urls import path
from product.views import product,product_list
urlpatterns = [
    path('product/<int:id>',product,name='product'),
    path('product/list', product_list, name='product_list'),
]