from django.shortcuts import render, redirect

from shipping.forms import ShippingAddressForm
from shipping.models import ShippingAddress


def address_create(request):
    if request.method == "POST":
        form = ShippingAddressForm(request.POST)
        if form.is_valid():
            instance = form.save(commit=False)
            instance.user = request.user
            instance.save()
            return redirect('address-list')
    form = ShippingAddressForm()
    return render(request,'address_create.html', {"form":form})

def address_list(request):
    shipping_addreses = ShippingAddress.objects.filter(user=request.user)

    return render(request,'address_list.html', {"shipping_addreses":shipping_addreses})
