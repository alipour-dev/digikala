from django.db.models import Q
from django.shortcuts import render

from product.forms import AddToBasketForm
from product.models import Product


def product(request,id):
    product = Product.objects.filter(Q(pk=id) | Q(id = id)).first()


    form = AddToBasketForm({'product':product,})
    context = {
        'product': product,
        'form': form,
    }
    return render(request,'product.html',context)


def product_list(request):
    products = Product.objects.all()
    context = {
        'products': products,
    }
    return render(request,'product_list.html',context)