from django.contrib.auth.decorators import login_required
from django.http import HttpResponseRedirect, Http404
from django.shortcuts import render
from django.views.decorators.http import require_POST

from basket.models import Basket
from product.models import Product


@require_POST
@login_required(login_url='/admin/login')
def add_to_baske(request):
    # todo-1 : check if user has basket_id in cookie
    # todo-2 : create and assign if doesn't have
    # todo-3 : get product from submitted form
    # todo-4 : add product to the user basket lines
    # todo-5 : return to the 'next' url
    response=HttpResponseRedirect(request.POST.get('next'))
    basket_id = request.COOKIES.get('basket_id',None)
    if basket_id is None:
        basket=Basket.objects.create(user=request.user)
        response.set_cookie('basket_id',basket.id)
    else:
        try:
            basket=Basket.objects.get(pk=basket_id)
        except Basket.DoesNotExist:
            raise Http404
        if request.user.is_authenticated:
            if basket.user is not None and basket.user!=request.user:
                raise Http404
            basket.user = request.user
            basket.save()
    product_id=request.POST.get('product_id',None)
    if product_id is not None:
        try:
            product=Product.objects.get(pk=product_id)
        except Product.DoesNotExist:
            raise Http404
        else:
            basket.add(product)










    return response

