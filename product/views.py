from django.shortcuts import render

from product.models import Product


def product(request,id):
    product = Product.objects.get(id=id)
    context = {
        'product': product,
    }
    return render(request,'product.html',context)


def product_list(request):
    products = Product.objects.all()
    context = {
        'products': products,
    }
    return render(request,'product_list.html',context)