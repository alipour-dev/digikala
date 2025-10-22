from django import forms

from shipping.models import ShippingAddress


class ShippingAddressForm(forms.ModelForm):
    class Meta:
        model = ShippingAddress
        exclude = ('user',)
