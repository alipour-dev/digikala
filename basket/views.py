from urllib.request import Request

from django.contrib.auth.decorators import login_required
from django.core.exceptions import PermissionDenied
from django.http import HttpResponseRedirect, Http404
from django.shortcuts import render
from django.views.decorators.http import require_POST

from basket.models import Basket
from product.forms import AddToBasketForm
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
    basket = Basket.get_basket(request.COOKIES.get('basket_id',None))
    if basket is None:
        raise Http404
    response.set_cookie('basket_id', basket.id)
    if not basket.validate_user(request.user):
        raise PermissionDenied

    form = AddToBasketForm(request.POST)
    if form.is_valid():
        form.save(basket = basket)













    return response

